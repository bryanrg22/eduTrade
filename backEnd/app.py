from flask import Flask, jsonify
#from firebase_admin import credentials, firestore
#import firebase_admin

from flask_cors import CORS
import os

# File
from firebase_config import create_user, check_for_user, read_user, update_user, delete_stock_analysis

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})

#@app.route('/stocks/parse/<ticker>')
@app.route('/stock/<string:ticker>', methods=['GET'])

def get_stock_data(ticker):
    return ""