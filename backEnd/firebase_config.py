import firebase_admin
#from firebase_admin import credentials, firestore
from flask import jsonify

# Use the downloaded service account key JSON file
cred = credentials.Certificate("./pennapps-f858c-firebase-adminsdk-6fjg6-3a09c6ee8a.json")

# Initialize the Firebase app with your credentials
firebase_admin.initialize_app(cred)

# Access Firestore
db = firestore.client()

# 'C'
def create_stock_analysis(ticker, description, sentiment, action, positive, neutral, negative, date):
    # Extract data from the Gemini response
    
    # Create a Firestore document reference based on stock ticker
    doc_ref = db.collection('user').document(ticker)

    # Data structure that matches your Firestore scheme
    data = {
        'action': action,
        'date': date,
        'description': description,
        'negative': negative,
        'neutral': neutral,
        'positive': positive,
        'sentiment': sentiment
    }

    # Set document data in Firestore
    doc_ref.set(data)

# 'R'
def check_for_stock(ticker):
    doc = db.collection('stocks').document(ticker).get()
    if doc.exists:
        return True
    else:
        return False
    
def read_stock_analysis(ticker):
    doc = db.collection('stocks').document(ticker).get()
    data = doc.to_dict()
    
    sentiment = data.get('sentiment')
    description = data.get('description')
    action = data.get('action')
    date = data.get('date')
    positive = data.get('positive')
    neutral = data.get('neutral')
    negative = data.get('negative')

    return jsonify({
        "ticker": ticker,
        "sentiment": sentiment,
        "description": description,
        "action": action,
        "date": date, 
        "positive": positive,
        "neutral": neutral,
        "negative": negative 
    })

# 'U'
def update_stock_analysis(ticker, paramter, value):
    db.collection('stocks').document(ticker).update({
        paramter: value
    })

# 'D'
def delete_stock_analysis(ticker):
    db.collection('stocks').document(ticker).delete()