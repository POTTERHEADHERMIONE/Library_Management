from pymongo import MongoClient
from datetime import datetime, timedelta
import hashlib

client = MongoClient('localhost', 27017)

db = client['libManagement']

admin_list = db['admin']
student_list = db['student']
book_list = db['books']

# Store password as hash value
def sha512_hash(input_string):
    sha512_hasher = hashlib.sha512()
    sha512_hasher.update(input_string.encode('utf-8'))
    hashed_string = sha512_hasher.hexdigest()
    return hashed_string

# Add the token to user..
def add_token(id, token, is_admin):
    collection = student_list
    if (is_admin):
        collection = admin_list
    user = collection.find_one({'id':id})
    collection.update_one({'id':id},{"$set":{"tokens":user['tokens']+[token]}})

#Check if given token is associated with the user
def authenticate_token(id, token, is_admin):
    collection = student_list
    if (is_admin) :
        collection = admin_list
    user = collection.find_one({'id':id})
    if (user) :
        if (token in user['tokens']) :
            return 1
        else :
            return 0
    else :
        return 0

def update_book_count(isbn, count):
    book = book_list.find_one({"isbn":isbn})
    if (book):
        old_count = book['total']
        diff = count - old_count
        if (diff + book['available'] < 0):
            return {'status':'Invalid book count'}
        book_list.update_one({"isbn" : isbn}, {"$set":{"total":count, "available":diff + book['available']}})
        return {'status':'success','total':count, 'available':diff+book['available']}
    else :
        return {'status':"Could not find the book"}

def add_new_book(isbn, title, author, count, ebook_link):
    if (count < 1):
        return {'status':'Count cannot be less than 1'}
    book_exists = book_list.find_one({'isbn':isbn})
    if (book_exists):
        return {'status':str(isbn)+' already exists'}
    else :
        book_list.insert_one({'isbn':isbn, 'title':title, 'author':author, 'total':count,'available':count, "with_students":[], "ebook_link":ebook_link})
        return {'status':'success'}

def delete_book(isbn):
    book = book_list.find_one({'isbn':isbn})
    if (book):
        book_list.delete_one({'isbn':isbn})
        return {'status':'success'}
    else :
        return {'status':'Could not find the book with the id '+str(isbn)}
    
# def add_user(id, password,name,isStudent=1):
#     collection = student_list
#     if (isStudent == 0):
#         collection = admin_list
#     userExists = collection.find_one({'id':id})
#     if (userExists):
#         return {"status":"User with the id "+str(id)+" already exists"}
#     else :
#         data = {'id':id, 'password':password, 'name':name}
#         if (isStudent):
#             data.update({"books":{}})
#         collection.insert_one(data)
#         return {'status':'success'}

def add_user(id : str, name : str, password : str, is_admin : bool = 0):
    collection = student_list
    if (is_admin):
        collection = admin_list
    user = collection.find_one({'id':id})
    if (user):
        return {'status':'User with the id '+id+" already exists"}
    else :
        fields = {'id':id, 'pass_hash':sha512_hash(password), 
                  'name': name,'tokens':[] }
        if (is_admin == False):
            fields['books'] = {}
        collection.insert_one(fields)
        return {'status':'success'}
    
def delete_student(id):
    student = student_list.find_one({'id':id})
    if (student) :
        student_list.delete_one({'id':id})
        return {'status':'success'}
    else :
        return {'status':'Student with id '+str(id)+ ' doesn\'t exist'}

def issue_book(isbn, id):
    book = book_list.find_one({'isbn':isbn})
    student = student_list.find_one({'id':id})
    if (book and student):
        if (isbn in student['books'].keys()):
            return {"status":"Student already has that book"}
        if (book['available'] > 0):
            current_date = datetime.now()
            due_date = current_date + timedelta(days=30)

            updateBook = {"$set":{'available':book['available']-1}, "$push":{'with_students':id}}
            book_list.update_one({'isbn':isbn},updateBook)
            
            books_with_student = student['books']
            issue_date = current_date.strftime("%Y-%m-%d")
            due_date = due_date.strftime("%Y-%m-%d")
            books_with_student.update({isbn:{'issueDate':issue_date, 'dueDate':due_date}})
            student_list.update_one({'id':id},{"$set":{'books':books_with_student}})
            return {'status':'success','isbn':isbn,'issue_date':issue_date,'due_date':due_date,'author':book['author'],'title':book['title']}
        else :
            return {'status':'Available books are 0'}
    else :
        return {'status':'Either book or the user or both don\'t exist'}
    
def take_book(isbn, id):
    book = book_list.find_one({'isbn':isbn})
    student = student_list.find_one({'id':id})
    if (book and student):
        if (isbn in student['books'].keys()) :
            updated_book = {"$set":{'available':book['available']+1}, "$pull":{'with_tudents':id}}
            book_list.update_one({'isbn':isbn},updated_book)

            books_with_student = student['books']
            del books_with_student[isbn]
            student_list.update_one({'id':id},{"$set":{'books':books_with_student}})
            return {'status':'success'}
        else :
            return {'status':'Student didn\'t take the book'}
    else :
        return {'status':'Student or book or both don\'t exist'}
     

# For student details page (admin uses this), id, name, books taken by student
def get_student_info(id):
    response = student_list.find_one({"id":id})
    if (response):
        response.pop('_id')
        response.pop('password')
        response.pop('tokens')
        return response
    else :
        return {}

# For book details page (admin uses this), isbn, name, title, author, which students have the book
def get_book_info(isbn):
    book = book_list.find_one({"isbn":isbn})
    if (book) :
        book.pop('_id')
        book['status'] = 'success'
        return book
        response  = {'isbn':isbn, 'title':book['title'], 'author':book['author'], 
                     'total':book['total'], 'available':book['available'], 
                     'with_students':book['with_students'], 'status':'success'}
        return response
    else :
        return {}

def list_books():
    response = {}
    for document in book_list.find({}) :
        response.update({document['isbn'] : {'author' : document['author'] , 'title':document['title'], 'available':document['available'], 'total':document['total'],'ebookLink':document['ebook_link']}})
    return response

def list_students():
    response = {}
    for document in student_list.find({}) :
        response.update({document['id'] : document['name']})
    response['status']='success'
    return response

def clear_cookies(collection):
    for user in collection.find({}) :
        collection.update_one({'id':user['id']}, {"$set":{'tokens':[]}})

def clear():
    admin_list.delete_many({})
    student_list.delete_many({})
    # book_list.delete_many({})

if __name__ == "__main__":
    clear_cookies(admin_list)