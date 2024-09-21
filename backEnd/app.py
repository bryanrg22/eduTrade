from flask import Flask, jsonify
from firebase_admin import credentials, firestore

from flask_cors import CORS
import os

# File
from firebase_config import create_user, check_for_user, read_user, update_user, delete_user

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})
    
@app.route('/user/parse/<ticker>')
#@app.route('/user/<string:ticker>', methods=['GET'])
def get_user_data(ticker):
    if check_for_user(ticker):
        return jsonify({"message": "Found!"})
    else:
        return jsonify({"message": "Not Found!"})