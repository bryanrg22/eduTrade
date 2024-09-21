import numpy as np
import pandas as pd
import matplotlib as plt
import yfinance as yf
import plotly.express as px
import datapane as dp
from GeminiPortal import *
from flask import Flask, app, jsonify

class StockUtilities:

    def get_stock_history(ticker: str, period: str = '1y', interval: str = '1d'):
    # Fetch historical data for the stock
        stock_data = yf.Ticker(ticker).history(period=period, interval=interval)

    # Check if data is retrieved
        if stock_data.empty:
            return None

        return stock_data

    @app.route('/api/stock/<ticker>', methods=['GET'])
    def stock_price(ticker):
        stock_data = StockUtilities.get_stock_history(ticker)
    
        if stock_data is None:
            return jsonify({"error": f"No data found for ticker: {ticker}"}), 404
    
        # Convert DataFrame to JSON format
        return jsonify(stock_data['Close'].to_dict())
