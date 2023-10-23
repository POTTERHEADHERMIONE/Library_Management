from pymongo import MongoClient
from datetime import datetime, timedelta

client = MongoClient('localhost', 27017)

db = client['libManagement']

adminList = db['admin']
studentList = db['student']
bookList = db['books']


def incBookCount(id, count):
    book = bookList.find_one({'id':id})
    if (book):
        book.available+=count
        return 1
    else :
        return 0
    
def decBookCount(id, count):
    book = bookList.find_one({'id':id})
    if (book):
        book.available -= count
        return 1
    else :
        return 0

def addNewClass(id, name, author, count):
    if (count < 1):
        return 0
    bookExists = bookList.find_one({'id':id})
    if (bookExists):
        print("Book with the id "+str(id)+" already exists")
        return 0
    else :
        bookList.insert_one({'id':id, 'name':name, 'author':author, 'total':count,'available':count, "withStudent":[]})
        return 1

def deleteClass(id):
    book = bookList.find_one({'id':id})
    if (book):
        bookList.delete_one(book)
        return 1
    else :
        return 0
    
def addUser(id, password,name,isStudent=1):
    collection = studentList
    if (isStudent == 0):
        collection = adminList
    userExists = collection.find_one({'id':id})
    if (userExists):
        print("User with the id "+str(id)+" already exists")
        return 0
    else :
        data = {'id':id, 'password':password, 'name':name}
        if (isStudent):
            data.update({"books":{}})
        collection.insert_one(data)
        return 1
    
def issueBook(bookid, studentid):
    book = bookList.find_one({'id':bookid})
    student = studentList.find_one({'id':studentid})
    if (book and student):
        if (bookid in student['books'].keys()):
            print("Student already has that book")
            return 0
        if (book['available'] > 0):
            currentDate = datetime.now()
            dueDate = currentDate + timedelta(days=30)

            updateBook = {"$set":{'available':book['available']-1}, "$push":{'withStudent':studentid}}
            bookList.update_one({'id':bookid},updateBook)
            
            dict = student['books']
            dict.update({bookid:{'issueDate':currentDate.strftime("%Y-%m-%d"), 'dueDate':dueDate.strftime("%Y-%m-%d")}})
            studentList.update_one({'id':studentid},{"$set":{'books':dict}})
            return 1
        else :
            return 0
    else :
        return 0
    
def takeBook(bookid, studentid):
    book = bookList.find_one({'id':bookid})
    student = studentList.find_one({'id':studentid})
    if (book and student):
        if (bookid in student['books'].keys()) :
            updateBook = {"$set":{'available':book['available']+1}, "$pull":{'withStudent':studentid}}
            bookList.update_one({'id':bookid},updateBook)

            dict = student['books']
            del dict[bookid]
            studentList.update_one({'id':studentid},{"$set":{'books':dict}})

            return 1
        else :
            return 0
    else :
        return 0
     
def getBookInfo(bookid, who="student"):
    book = bookList.find_one({"id":bookid})
    if (book) :
        response  = {'name':book['name'], 'author':book['author'], 'total':book['total'], 'available':book['available']}
        if (who == "admin") :
            response.update({'withStudent':book['withStudent']})
        return response
    else :
        return {}

def listBooks(isStudent=1):
    response = {}
    for document in bookList.find({}) :
        response.update({document['id'] : {'author' : document['author'] , 'name':document['name'], 'available':document['available'], 'total':document['total']}})
    return response

def clear():
    adminList.delete_many({})
    studentList.delete_many({})
    bookList.delete_many({})

if __name__ == "__main__":
    clear()
