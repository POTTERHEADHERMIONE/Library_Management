from flask import Blueprint, jsonify, request 

from Database.admin_db import Admin_DB
from Database.book_db import Book_DB
from Database.user_db import User_DB
from functions import get_details_from_isbn

admin_bp = Blueprint('admin_routes',__name__)

@admin_bp.route('/login', methods=['POST'])
async def login() :
    data = request.get_json()
    return jsonify(await Admin_DB.verify_creds(id = data['id'], password = data['password']))

@admin_bp.route('/get_books_list', methods=['POST'])
async def get_books_list() :
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await Book_DB.get_books_list()
    else :
        return {'status':'Invalid token'}
    
@admin_bp.route('/get_users_list',methods=['POST'])
async def get_students_list():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.get_users_list()
    else :  
        return {'status':'Invalid token'}

@admin_bp.route('/add_new_user', methods=['POST'])
async def add_new_user():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.add_new_user(id = data['userID'], name = data['name'])
    else :
        return {'status':'Invalid token'}

@admin_bp.route('/delete_user', methods=['POST'])
async def delete_user():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.delete_user(id = data['userID'])
    else :
        return {'status':'Invalid token'} 

@admin_bp.route('/add_new_book', methods=['POST'])
async def add_book():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await Book_DB.add_new_book(isbn = data['isbn'], title = data['title'], author = data['author'],
                                    count = int(data['count']), ebook_link = data['ebookLink'])
    else :
        return {'status':'Invalid token'}    

@admin_bp.route('/get_details_from_isbn', methods=['POST'])
async def get_details_from_isbn():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return get_details_from_isbn(data['isbn'])
    else :
        return {'status':'Invalid token'}   

@admin_bp.route('/update_book_count', methods=['POST'])
async def update_book_count():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return User_DB.update_book_count(isbn = data['isbn'], count = data['count'])
    else :
        return {'status':'Invalid token'}


@admin_bp.route('/with_user_details', methods=['POST'])
async def with_user_details():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.with_user_details(id = data['userID'], isbn = str(data['isbn']))
    else :  
        return {'status':'Invalid token'}


@admin_bp.route('/taken_book_details', methods = ['POST'])
async def taken_book_details():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await Book_DB.taken_book_details(isbn = data['isbn'])
    else :  
        return {'status':'Invalid token'}

    
@admin_bp.route('/take_book', methods=['POST'])
async def take_book():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.take_book(id = data['userID'], isbn = data['isbn'] )
    else :  
        return {'status':'Invalid token'}
    
@admin_bp.route('/issue_book', methods=['POST'])
async def issue_book():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await User_DB.issue_book(id = data['userID'], isbn = data['isbn'])
    else :  
        return {'status':'Invalid token'}
    
@admin_bp.route('/delete_book', methods=['POST'])
async def delete_book():
    data = request.get_json()
    if (await Admin_DB.verify_token(id = data['id'], token = data['token'])) :
        return await Book_DB.delete_book(isbn = data['isbn'])
    else :  
        return {'status':'Invalid token'}