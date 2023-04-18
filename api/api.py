from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import os
from pyth import transpiler
import pathlib


app = Flask(__name__)
cors = CORS(app, resources={r'/transpile': {'origins': '*'}})

@app.route('/', methods=['GET'])
def flask_landing_page():
    return "This is the Flask landing page. The user doesn't need to see this."

@app.route('/transpile', methods=['POST'])
def flask_transpile_page():
    # musicode -> lilypond
    user_input = request.get_json()['user_input']
    is_midi = True
    if request.get_json()['generate'] == "PDF":
        is_midi = False
    # TODO: report any errors from line below
    ly_code = transpiler.transpile(user_input=user_input, midi=is_midi)
    with open('my_song.ly', 'w') as f:
        f.write(ly_code)

    # lilypond -> PDF/MIDI
    ly_exec = pathlib.Path(__file__).parents[1]
    ly_exec = ly_exec.joinpath('lilypond-2.24.1', 'bin', 'lilypond.exe').resolve()
    os.system('"' + str(ly_exec) + '" my_song.ly')

    return {'midi': is_midi}
