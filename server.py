from flask import Flask, render_template, request, jsonify
import database

app = Flask(__name__)
app.template_folder = 'templates'

@app.route('/admin')
def adminPage():
    render_template('admin.html')

@app.route('/getBookInfo/<bookID>')
def getBookInfo(bookID) :
    return database.getBookInfo(bookID,0)

@app.route('/getStudentInfo/<studentID>')
def getStudentInfo(studentID):
    return database.getStudentInfo(studentID)

@app.route('/listBooks', methods=['GET'])
def studentPage():
    response = database.listBooks()
    return response

@app.route('/updateBookCount')
def updateBookCount():
    data = request.get_json()
    bookID = data['bookID']
    newCount = data['newCount']
    database.updateBookCount(bookID, newCount)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    collection = database.studentList

    if (data['isAdmin']):
        collection = database.adminList

    user = collection.find_one({'id':data['id']})
    response = {}
    if (user) :
        if (user['password'] == data['password']) :
            if (data['isAdmin']):
                return jsonify({'status':'success'})
            else :
                response = {'status':'success','name':user['name'],'id':user['id'], 'books':{}}
                for a in user['books'].keys() :
                    response['books'].update({a : database.getBookInfo(a)})
                    response['books'][a].update({'issueDate':user['books'][a]['issueDate'],'dueDate':user['books'][a]['dueDate']})
        else :
            response = {'status':'invalid password'}
    else :
        response = {'status':'User doesn\'t exist'}
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
