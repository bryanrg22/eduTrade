import firebase_admin
from firebase_admin import credentials, firestore
from flask import jsonify

# Use the downloaded service account key JSON file
#cred = credentials.Certificate("./pennapps-f858c-firebase-adminsdk-6fjg6-3a09c6ee8a.json")

# Initialize the Firebase app with your credentials
firebase_admin.initialize_app(cred)

# Access Firestore
db = firestore.client()

# 'C'
# prev. create_stock_analysis
def create_user_in_firestore(name, user, age, email, password, portfolio_initial, retirement_age):
    doc_ref = db.collection('user').document(user)
    data = {
        'name': name,
        'password': password,
        'age': age,
        'portfolio_initial': portfolio_initial,
        'email': email,
        'retirement-age': retirement_age
    }
    doc_ref.set(data)

# 'R'
# prev. check_for_stock(user)
def check_for_user(user):
    doc = db.collection('user').document(user).get()
    if doc.exists:
        return True
    else:
        return False
    
#prev. read_stock_analysis()
def read_user(user):
    doc = db.collection('user').document(user).get()
    data = doc.to_dict()
    
    name = data.get('name')
    password = data.get('password')
    age = data.get('age')
    portfolio_initial  = data.get('portfolio_intiial')
    email = data.get('email')
    retirement_age = data.get('retirement_age')

    return jsonify({
        'name' : name,
        'password': password,
        'age': age,
        'portfolio_initial': portfolio_initial,
        'email': email,
        'retirement-age': retirement_age
    })

# 'U'
# prev. update_stock_analysis()
def update_user(user, paramter, value):
    db.collection('user').document(user).update({
        paramter: value
    })

# 'D'
# prev. delete_user()
def delete_user(user):
    db.collection('user').document(user).delete()


