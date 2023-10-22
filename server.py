from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return open('Website/home.html').read()

if __name__ == '__main__':
    app.run()
