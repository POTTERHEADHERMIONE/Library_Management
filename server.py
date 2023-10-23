from flask import Flask, render_template, request, jsonify
print("Importing")
from pymongo import MongoClient
import database
print("imported")

app = Flask(__name__)

# Configure the path to the templates folder
app.template_folder = 'templates'

@app.route('/studentPage')
def studentPage():
    return render_template('studentPage.html')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    student = database.studentList.find_one(data['id'])
    response = {}

    if (student) :
        if (student['password'] == data['password']) :
            response = {'status':'Success','name':student['name'],'roll':student['roll'], 'books':{}}
            for a in student['books'] :
                response['books'].update(a = database.getBookInfo(a))
        else :
            response = {'status':'invalid password'}
    else :
        response = {'status':'User doesn\'t exist'}
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)
