from flask import Flask, jsonify
#from firebase_admin import credentials, firestore
#import firebase_admin

from flask_cors import CORS
import os

# File
from firebase_config import create_stock_analysis, check_for_stock, read_stock_analysis, update_stock_analysis, delete_stock_analysis

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})

#@app.route('/stocks/parse/<ticker>')
@app.route('/stock/<string:ticker>', methods=['GET'])

def get_stock_data(ticker):
    

