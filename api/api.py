from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from mc_transpiler import transpiler
import pathlib


app = Flask(__name__)
cors = CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/', methods=['GET'])
def flask_landing_page():
    return "This is the Flask landing page. The user doesn't need to see this."

@app.route('/transpile', methods=['POST'])
def flask_transpile_page():
    # musicode -> lilypond
    user_input = request.get_json()['user_input']
    project_title = request.get_json()['project_title']
    is_midi = True
    if request.get_json()['generate'] == "PDF":
        is_midi = False

    error = ""
    try:
        ly_code = transpiler.transpile(user_input=user_input, midi=is_midi)
    except Exception as e:
        error = str(e)
    else:
        with open(project_title + '.ly', 'w') as f:
            f.write(ly_code)

        # lilypond -> PDF/MIDI
        ly_exec = pathlib.Path(__file__).parent
        ly_exec = ly_exec.joinpath('lilypond-2.24.1', 'bin', 'lilypond.exe').resolve()
        # ly_exec = "/usr/local/bin/lilypond" # TODO: detect lilypond dynamically
        command1 = '"' + str(ly_exec) + f'" -o ../build/{project_title} {project_title}.ly'
        command2 = '"' + str(ly_exec) + f'" -o ../public/{project_title} {project_title}.ly'
        os.system(command1)
        os.system(command2)
    finally:
        response = jsonify({'midi': is_midi, 'error': error})
        # response.headers.add("Access-Control-Allow-Origin", "*")
        # response.headers.add("Access-Control-Allow-Headers", "*")
        # response.headers.add("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE, OPTIONS")
        return response
