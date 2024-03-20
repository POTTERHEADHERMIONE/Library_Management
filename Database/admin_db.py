from config import MONGO_URI
from functions import sha512_hasher, generate_token
from motor.motor_asyncio import AsyncIOMotorClient

class Admin_DB :
    db = AsyncIOMotorClient(MONGO_URI)['libManagement']['admins']

    @staticmethod
    async def verify_creds(id : str, password : str) -> dict :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['admins']
        member = await db.find_one({'id':id})
        if (member) :
            if (member['pass_hash'] == sha512_hasher(password)):
                token = generate_token()
                await db.update_one({'id':id}, {'$push':{"tokens":token}}) 
                response =  {'status':'success', 'token' : token}
            else :
                response = {'status':'invalid password'} 
        else :
            response = {'status':'User doesn\'t exist'}
        return response
    
    @staticmethod
    async def verify_token(id : str, token : str) -> bool :
        db = AsyncIOMotorClient(MONGO_URI)['libManagement']['admins']
        member = await db.find_one({'id':id})
        if (member):
            if (token in member['tokens']) :
                return True
            else :
                return False
        else :
            return False