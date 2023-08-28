#!/usr/bin/python3
from flask import Flask, render_template

wapp = Flask(__name__)

@wapp.route("/wapp")
def w_app():
    return render_template('index copy.html')

if __name__ == '__main__':
    wapp.run(debug=True)
