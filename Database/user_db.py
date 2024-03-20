from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI
from functions import sha512_hasher, generate_token, get_issue_due_dates, gen_password

class User_DB :
    db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']

    @staticmethod 
    async def get_users_list() -> dict :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        response = {}
        async for user in db.find({}) :
            response.update({user['id'] : user['name']})
        return response
    
    @staticmethod
    async def get_user_info(id :str) -> dict :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        user = await db.find_one({"id" : id})
        response = {}
        if (user) :
            response = {'books':user['books'], 'id':user['id'], 'name':user['name']}
        return response
    
    @staticmethod
    async def verify_creds(id : str, password : str) -> dict :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        member = await db.find_one({'id':id})
        if (member) :
            if (member['pass_hash'] == sha512_hasher(password)):
                token = generate_token()
                await User_DB.db.update_one({'id':id}, {'$push':{"tokens":token}}) 
                response =  {'status':'success', 'token' : token}
            else :
                response = {'status':'invalid password'} 
        else :
            response = {'status':'User doesn\'t exist'}
        return response
    
    @staticmethod
    async def verify_token(id : str, token : str) -> bool :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        member = await db.find_one({'id':id})
        if (member):
            response = {}
            if (token in member['tokens']) :
                response = {'status' : 'success', 'name':member['name'], 'id':member['id']}
            else :
                response = {'status':'Invalid Token'}
            return response
        else :
            return {'status':'User doesn\'t exist'}
    
    @staticmethod
    async def with_user_details(id : str, isbn : str) -> dict :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        user = await db.find_one({'id':id})
        if (user):
            book = user['books'].get(isbn, None)
            if (book) :
                return {'dueDate':book['dueDate'], 'issueDate':book['issueDate'], 'name':user['name'], 'status':'success'}
            else :
                return {'status' : 'user didn\'t take the book mentioned'}
        else :
            return {'status':'user doesn\'t exist'}
        
    @staticmethod
    async def take_book(id : str, isbn : str) -> dict :
        id = str(id)
        user_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        book_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']
        book = await book_db.find_one({'isbn':isbn})
        user = await user_db.find_one({'id':id})
        if (book and user):
            if (isbn in user['books'].keys()) :
                updated_book = {"$set":{'available':book['available']+1}, "$pull":{'with_tudents':id}}
                await book_db.update_one({'isbn':isbn},updated_book)
                books_with_user = user['books']
                del books_with_user[isbn]
                print(books_with_user)
                await user_db.update_one({'id':id},{"$set":{'books':books_with_user}})
                return {'status':'success'}
            else :
                return {'status':'user didn\'t take the book'}
        else :
            return {'status':'user or book or both don\'t exist'}
        
    @staticmethod
    async def issue_book(id : str, isbn : str) -> dict :
        id = str(id)
        isbn = str(isbn)

        user_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        book_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['books']

        book = await book_db.find_one({'isbn':isbn})
        user = await user_db.find_one({'id':id})
        if (book and user):
            if (isbn in user['books'].keys()):
                return {"status":"user already has that book"}
            if (book['available'] > 0):
                updateBook = {"$set":{'available':book['available']-1}, "$push":{'with_students':id}}
                await book_db.update_one({'isbn':isbn},updateBook)
        
                issue_due_dates = get_issue_due_dates()
                issue_date = issue_due_dates['issue_date']
                due_date = issue_due_dates['due_date']

                books_with_user = user['books']
                books_with_user.update({isbn:{'issueDate':issue_date, 'dueDate':due_date}})
                await user_db.update_one({'id':id},{"$set":{'books':books_with_user}})

                return {'status':'success','isbn':isbn,'issueDate':issue_date,'dueDate':due_date,'author':book['author'],'title':book['title']}
            else :
                return {'status':'Available books are 0'}
        else :
            return {'status':'Either book or the user or both don\'t exist'}
        
    @staticmethod
    async def add_new_user(id : str, name : str) :
        user_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        user = await user_db.find_one({'id':id})
        if (user):
            return {'status':'User with the id '+id+" already exists"}
        else :
            password = gen_password(id, name)
            fields = {'id':id, 'pass_hash':sha512_hasher(password), 
                    'name': name,'tokens':[], 'books' : {} }
            await user_db.insert_one(fields)
            return {'status':'success'}    
        
    @staticmethod
    async def delete_user(id : str):
        user_db = AsyncIOMotorClient(MONGO_URI)['libManagement']['users']
        user = await user_db.find_one({'id':id})
        if (user):
            await user_db.delete_one({'id':id})
            return {'status':'success'}
        else :
            return {'status':'User with the id '+str(id)+' doesn\'t exist'}