from flask import Flask, render_template, request, jsonify
from Routes.admin_bp import admin_bp
from Routes.user_bp import user_bp
from Routes.pages_bp import pages_bp

app = Flask(__name__)

app.register_blueprint(admin_bp, url_prefix = '/api/admin')
app.register_blueprint(user_bp, url_prefix = '/api/user')
app.register_blueprint(pages_bp, url_prefix = '/')

app.template_folder = 'Templates'
app.static_folder = 'Static'

# @app.route('/',methods=['GET'])
# def home():
#     return render_template('login.html')

# @app.route('/student',methods=['GET'])
# def home():
#     return render_template('student.html')

# @app.route('/admin',methods=['GET'])
# def home():
#     return render_template('admin.html')

if (__name__ == '__main__') :
    app.run(debug=True, host='0.0.0.0')



# import database
# from isbnlib import meta
# import string
# import random

# COOKIE_STRING_LEN = 256



# app = Flask(__name__)

# app.template_folder = 'templates'

# # Student, admin, login html pages ------------------------------------------------------------------------------------------

# @app.route('/admin')
# def adminPage():
#     return render_template('admin.html')

# @app.route('/student')
# def studentPage():
#     return render_template('student.html')

# @app.route('/')
# def home():
#     return render_template('login.html')

# # ---------------------------------------------------------------------------------------------------------------------------

# # Student (Books taken by student, issue, take book), Book info (who took this book)

# @app.route('/admin/display_book_info/<isbn>')
# def display_book_info(isbn) :
#     # data = request.get_json()
#     # if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=data['isAdmin'])) :
#         data = database.get_book_info(isbn)
#         return render_template('bookInfo.html',isbn = data['isbn'],title=data['title'],
#                             author=data['author'],total=data['total'],
#                             available=data['available'], withStudents = data['with_students'])
#     # else :
#     #     return render_template('login.html')

# @app.route('/admin/display_student_info/<studentID>',methods=['POST'])
# def get_student_info(id):
#     data = database.get_student_info(id)
#     return render_template('studentInfo.html',studentName = data['name'], 
#                            books = data['books'], 
#                            id = data['id'])

# # ------------------------------------------------------------------------------------------------------------------------------

# # @app.route('/get_issue_due_penalty',methods=['POST'])
# # def get_issue_due_penalty():
# #     data = request.get_json()
# #     return database.get_issue_due_penalty(data['studentID'],data['bookID'])

# #Gotta work on this
# @app.route('/get_title_author', methods=['POST'])
# def get_title_author():
#     data = database.get_book_info(request.get_json()['isbn'])
#     return {'name':data['name'],'author':data['author']}


# #work on the name of this route
# # this is barcode - isbn thing..
# @app.route('/admin/get_details_from_barcode',methods=['POST'])
# def get_details_from_barcode():
#     isbn = request.get_json()['isbn']
#     try :
#         # if (isbn == '4181120509621'):
#         return {'title':'Operating System Principles', 'author':'Abraham Silberschatz', 'status':'success'}
#         book = meta(isbn)
#         return {'title':book['Title'], 'author':book['Authors'][0],'status':'success'}
#     except Exception as E:
#         return {'status':str(E)}
    
# # manipulate book data (Add, delete, update Count) -----------------------------------------------------------------------------------------------------------------------------------

# @app.route('/admin/add_new_book',methods=['POST'])
# def add_new_book():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)):
#         return database.add_new_book(data['isbn'],data['title'],data['author'],int(data['count']),data['ebookLink'])
#     else :
#         return {'status':'authFail'}

# @app.route('/admin/delete_book',methods=['POST'])
# def delete_book():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)):
#         return database.delete_book(data['isbn'])
#     else :
#         return {'status':'authFail'}
    
# #gotta work on this
# @app.route('/admin/update_book_count',methods=['POST'])
# def updateBookCount():
#     data = request.get_json()
#     return database.update_book_count(str(data['isbn']), int(data['updatedCount']))

# # ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# # Add + delete student -------------------------------------------------------------------------------------------------------------------------------------------------------------------
# @app.route('/admin/add_new_student',methods=['POST'])
# def add_new_student():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)):
#         return database.add_user(data['studentID'],data['id']+data['name'],data['name'])
#     else :
#         return {'status':'authFail'}
    


# @app.route('/admin/delete_student',methods=['POST'])
# def delete_student():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)):
#         id = request.get_json()['studentID']
#         return database.delete_student(id)
#     else :
#         return {'status':'authFail'}

# #------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    
# @app.route('/get_books_list', methods=['POST'])
# def list_books():
#     data = request.get_json()
#     print(data)
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=data['isAdmin'])) :
#         response = database.list_books()
#         response['status'] = 'success'
#         return response
#     else :
#         return {'status':'authFail'}

# @app.route('/get_taken_books', methods = ["POST"])
# def get_taken_books():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=data['isAdmin'])) :
#         return {database.get_taken_books(data['id'])}
    
#         response = {'status':'success','name':user['name'],'id':user['id'], 'books':{}, 'token' : cookie_string}
#         for a in user['books'].keys() :
#             response['books'].update({a : database.getBookInfo(a)})
#             response['books'][a].update({'issueDate':user['books'][a]['issueDate'],'dueDate':user['books'][a]['dueDate']})
#     else :
#         return {'status' : 'authFail'}

# @app.route('/admin/get_students_list', methods=['POST'])
# def list_students():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)) :
#         return database.list_students()
#     else :
#         return {'status':'authFail'}


# @app.route('/admin/get_issue_due', methods=['POST'])
# def get_issue_due():
#     data = request.get_json()
    
    

# # Take, issue book ------------------------------------------------------------------------------------------------------

# @app.route('/admin/take_book',methods=['POST'])
# def take_book():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)) :
#         isbn = data['isbn']
#         student_id = data['studentID']
#         return database.take_book(isbn, student_id)
#     else :
#         return {'status':'authFailed'}

# #gotta work on this
# @app.route('/admin/issue_book', methods = ['POST'])
# def issue_book():
#     data = request.get_json()
#     if (database.authenticate_token(id = data['id'] , token=data['token'], is_admin=True)) :
#         isbn = data['isbn']
#         student_id = data['studentID']
#         return database.issue_book(isbn, student_id)
#     else :
#         return {'status':'authFailed'}


# # -------------------------------------------------------------------------------------------------------------------------

# @app.route('/login',methods=['POST'])
# def login():
#     data = request.get_json()
#     collection = database.student_list
#     if (data['isAdmin']):
#         collection = database.admin_list
#     user = collection.find_one({'id':data['id']})
#     response = {}
#     if (user) :
#         if (user['pass_hash'] == database.sha512_hash(data['password'])):
#             token = generate_random_string(COOKIE_STRING_LEN)
#             database.add_token(id=data['id'], is_admin=data['isAdmin'], token=token)
#             return jsonify({'status':'success', 'token' : token})
#         else :
#             response = {'status':'invalid password'}
#     else :
#         response = {'status':'User doesn\'t exist'}
#     print(response)
#     return jsonify(response), 200

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0')