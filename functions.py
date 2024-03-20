from string import ascii_letters, digits
from config import COOKIE_STRING_LEN, LEND_PERIOD
from datetime import datetime, timedelta
from random import choice 
from hashlib import sha512
from isbnlib import meta

def generate_token(length=COOKIE_STRING_LEN):
    characters = ascii_letters + digits 
    random_string = ''.join(choice(characters) for _ in range(length))
    return random_string

def sha512_hasher(input_string):
    sha512_hasher = sha512()
    sha512_hasher.update(input_string.encode('utf-8'))
    hashed_string = sha512_hasher.hexdigest()
    return hashed_string

def get_issue_due_dates(days = LEND_PERIOD):
    issue_date = datetime.now()
    due_date = issue_date+timedelta(days = days)
    issue_date = issue_date.strftime("%Y-%m-%d")
    due_date = due_date.strftime("%Y-%m-%d")
    return {'issue_date':issue_date, 'due_date':due_date}

# Will get back to these

def gen_password(id : str, name : str ) -> str:
    return id+name

async def clear_tokens() :
    pass

async def clear_taken_books():
    pass 

async def populate_take_books():
    pass 

def get_details_from_isbn(isbn):
    try :
        book = meta(isbn)
        return {'title':book['Title'], 'author':book['Authors'][0], 'status':'success'}
    except Exception as exception :
        return {'status':str(exception)}


