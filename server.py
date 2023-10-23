from flask import Flask, render_template, request, jsonify

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
    #simulate stuff
    response = {'status':'Success','name' : "Saakshi", 'roll':"307",'books':{"13":{"title":"As if I care","author":"Saakshi","taken":"23/03/23","due":"23/04/23"}}}
    # response = {'status':'Invalid Credentials'}
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)
