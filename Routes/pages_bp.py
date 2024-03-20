from flask import Blueprint, render_template
from Database.book_db import Book_DB
from Database.user_db import User_DB

pages_bp = Blueprint('page_routes',__name__)

@pages_bp.route('',methods=['GET'])
def login_page():
    return render_template('login.html')

@pages_bp.route('admin',methods=['GET'])
def admin_page():
    return render_template('admin.html')

@pages_bp.route('student',methods=['GET'])
def student_page():
    return render_template('student.html')

# (MINOR) Gotta work on the security patch here...
# can be fixed with js, cookies, fetch, verify token... (JS updates the data...)
@pages_bp.route('book/<isbn>',methods=['GET'])
async def display_book_info(isbn):
    data =  await Book_DB.get_book_info(isbn = isbn)
    return render_template('bookInfo.html',isbn = data['isbn'],title=data['title'],
                              author=data['author'],total=data['total'],
                              available=data['available'], 
                              withStudents = data['with_students'])
                            # withUsers = data['with_users]

# (MINOR) Gotta work on the security patch here...
@pages_bp.route('user/<id>', methods=['GET'])
async def display_user_info(id):
    data = await User_DB.get_user_info(id = id)
    return render_template('studentInfo.html',studentName = data['name'], 
                           books = data['books'], 
                           id = data['id'])
