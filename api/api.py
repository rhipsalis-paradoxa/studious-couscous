import time
from flask import Flask, request
import os

menu = {
    'truffles': 20.00,
    'sugar': 0.90,
    'mustard': 1.50,
    'avocado': 9.00,
    'latte': 16.00,
}


app = Flask(__name__)

@app.route('/hi', methods=['POST'])
def handle_hi():
    print('got request:', request.get_json())
    code = request.get_json()['code']
    print('code:', code)
    with open('tmp.txt', 'w') as f:
        f.write(code)
    os.system("convert TEXT:tmp.txt out.pdf")
    return 'bad news for cod'
