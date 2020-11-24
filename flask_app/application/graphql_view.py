from flask import Flask, url_for
from flask import current_app as app


@app.route("/")
def home():
    return "hello from flask serverless"


@app.route("/page")
def page():
    return url_for("static", filename="test.html")
