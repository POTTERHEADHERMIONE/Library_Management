from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI

class Book_DB :
    db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']

    @staticmethod
    async def get_book_info(isbn : str):
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        book = await db.find_one({'isbn':isbn})
        if (book) :
            return {'isbn':isbn, 'title':book['title'], 'author':book['author'], 
                    'total':book['total'], 'available':book['available'], 
                    'with_students':book['with_students'],
                   #'with_users' : book['with_users']  
                    'status':'success'}
        else :
            return {}
        
    @staticmethod
    async def get_books_list():
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        response = {}
        async for book in db.find({}) :
            response.update({book['isbn'] : {'author':book['author'], 'title':book['title'], 'available':book['available'],
                                        'total':book['total'], 'ebookLink':book['ebook_link']}})
        return response 
    
    @staticmethod
    async def taken_book_details(isbn):
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        book = await db.find_one({'isbn':isbn})
        if (book) :
            return {'title':book['title'], 'author':book['author']}
        else :
            return {}
        
    @staticmethod
    async def update_book_count(isbn, count):
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        book = await db.find_one({'isbn':isbn})
        if (book) :
            old_count = book['total']
            diff = count - old_count
            if (diff + book['available'] < 0):
                return {'status':'Invalid book count'}
            await db.update_one({"isbn" : isbn}, {"$set":{"total":count, "available":diff + book['available']}})
            return {'status':'success','total':count, 'available':diff+book['available']}
        else :
            return {'status':"Could not find the book"}

    @staticmethod
    async def add_new_book(isbn, title, author,  count, ebook_link):
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        if (count < 1):
            return {'status':'Count cannot be less than 1'}
        book_exists = await db.find_one({'isbn':isbn})
        if (book_exists):
            return {'status':str(isbn)+' already exists'}
        else :
            await db.insert_one({'isbn':isbn, 'title':title, 'author':author, 'total':count,'available':count, "with_students":[], "ebook_link":ebook_link})
            return {'status':'success'}

    @staticmethod
    async def delete_book(isbn) :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        book = await db.find_one({'isbn':isbn})
        if (book):
            await db.delete_one({'isbn':isbn})
            return {'status':'success'}
        else :
            return {'status':'Could not find the book with the id '+str(isbn)}
    