from flask import Flask, url_for

app = Flask(__name__)
@app.route("/")
def home():
    return "hello from flask serverless"
@app.route("/page")
def page():
    return url_for('static', filename='test.html')
