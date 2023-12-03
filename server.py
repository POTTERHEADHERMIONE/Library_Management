from flask import Flask, render_template, request, jsonify
import database

app = Flask(__name__)

# Configure the path to the templates folder
app.template_folder = 'templates'

@app.route('/listBooks', methods=['GET'])
def studentPage():
    response = database.listBooks()
    return response



#new change

@app.route('/listStudents', methods=['GET'])
def studentpage():
    response = database.listStudents()
    return response



@app.route('/admin')
def adminpage():
    return render_template('admin.html')




@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    collection = database.studentList

    if data['isAdmin']:
        collection = database.adminList

    user = collection.find_one({'id': data['id']})
    response = {}

    if user:
        if user['password'] == data['password']:
            if data['isAdmin']:
                # Redirect to admin.html for admin login
                return render_template('admin.html', name=user['name'], id=user['id'])
            else:
                response = {'status': 'success', 'name': user['name'], 'id': user['id'], 'books': {}}
                for a in user['books'].keys():
                    response['books'].update({a: database.getBookInfo(a)})
                    response['books'][a].update(
                        {'issueDate': user['books'][a]['issueDate'], 'dueDate': user['books'][a]['dueDate']})
        else:
            response = {'status': 'invalid password'}
    else:
        response = {'status': 'User doesn\'t exist'}

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
