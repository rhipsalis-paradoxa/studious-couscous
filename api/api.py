import time
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import os
from pyth import transpiler


app = Flask(__name__)
cors = CORS(app, resources={r'/transpile': {'origins': '*'}})

@app.route('/', methods=['GET'])
def flask_landing_page():
    return "This is the Flask landing page. The user doesn't need to see this."

@app.route('/transpile', methods=['POST'])
def flask_transpile_page():
    user_input = request.get_json()['user_input']
    midi = True
    if request.get_json()['generate'] == "PDF":
        midi = False
    # TODO: report any errors from line below
    ly_code = transpiler.transpile(user_input=user_input, midi=midi)
    return {'ly_code': ly_code, 'midi': midi}
