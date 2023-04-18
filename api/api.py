import time
from flask import Flask, request
import os
from pyth import transpiler

menu = {
    'truffles': 20.00,
    'sugar': 0.90,
    'mustard': 1.50,
    'avocado': 9.00,
    'latte': 16.00,
}


app = Flask(__name__)

@app.route('/', methods=['GET'])
def flask_landing_page():
    return "This is the Flask landing page. The user doesn't need to see this."

@app.route('/transpile')
def flask_transpile_page():
    # user_input = request.json['user_input']
    # midi = True
    # if request.json['generate'] == "PDF":
    #     midi = False
    user_input = "(title \"WIP\")"
    midi = False
    return transpiler.transpile(user_input=user_input, midi=midi)

@app.route('/hi', methods=['POST'])
def handle_hi():
    print('got request:', request.get_json())
    code = request.get_json()['code']
    print('code:', code)
    with open('tmp.txt', 'w') as f:
        f.write(code)
    os.system("convert TEXT:tmp.txt out.pdf")
    return 'bad news for cod'
