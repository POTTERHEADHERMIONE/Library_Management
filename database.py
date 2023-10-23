from pymongo import MongoClient

# Connect to the local MongoDB server
client = MongoClient('localhost', 27017)

# Access a specific database
db = client['libManagement']

# Access a specific collection within the database
adminList = db['admin']
studentList = db['student']
bookList = db['books']

# adminList.delete_many({})
# studentList.delete_many({})
# bookList.delete_many({})

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
        return 0
    else :
        data = {'id':id, 'password':password, 'name':name}
        if (isStudent):
            data.update({"books":[]})
        collection.insert_one(data)
        return 1
    
def issueBook(bookid, studentid):
    book = bookList.find_one(bookid)
    student = studentList.find_one(studentid)
    if (book and student):
        if (book['available'] > 1):
            book['available'] -= 1
            book['withStudent'].append(studentid)
            student['books'].append(bookid)
            return 1
        else :
            return 0
    else :
        return 0
    
def takeBook(bookid, studentid):
    book = bookList.find_one(bookid)
    student = studentList.find_one(studentid)
    if (book and student):
        book['available'] += 1
        book['withStudent'].remove(studentid)
        student['CurrentBooks'].remove(bookid)
        return 1
    else :
        return 0
     
def getBookInfo(bookid, who="student"):
    book = bookList.find_one(bookid)
    if (book) :
        response  = {'name':book['name'], 'author':book['author'], 'total':book['total'], 'available':book['available']}
        if (who == "admin") :
            response.update({'withStudent':book['withStudent']})
        return response
    else :
        return {}

def clear():
    adminList.delete_many({})
    studentList.delete_many({})
    bookList.delete_many({})

if __name__ == "__main__":
    clear()
