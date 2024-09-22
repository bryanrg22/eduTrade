from flask import Flask, jsonify, request, send_file
from firebase_admin import credentials, firestore
from flask_cors import CORS
import os

# File
from firebase_config import create_user_in_firestore, check_for_user, read_user, update_user, delete_user

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})
    

@app.route('/user/parse/<ticker>')
def get_user_data(ticker):
    if check_for_user(ticker):
        return jsonify({"message": "Found!"})
    else:
        return jsonify({"message": "Not Found!"})


@app.route('/api/create_user')
def create_user():
    try:
        # Extract data from request
        data = request.get_json()
        print(data.get('name'))
        
        # Extract specific fields
        name = data.get('name')
        user = data.get('user')  # This could be the username or email, depending on your choice
        age = data.get('age')
        email = data.get('email')
        password = data.get('password')
        portfolio_initial = data.get('portfolio_initial')
        retirement_age = data.get('retirement_age')

        # Call your existing function to create the user in Firestore
        create_user_in_firestore(name, user, age, email, password, portfolio_initial, retirement_age)

        return jsonify({'message': 'User created successfully'}), 200

    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({'error': str(e)}), 500
