import numpy as np
import pandas as pd
import matplotlib as plt
import yfinance as yf
import plotly.express as px
import datapane as dp

class StockHistoryOutput:

    def plot_stock_history(ticker: str, period: str = '1y', interval: str = '1d'):
        """
        Plots the historical stock prices for a given ticker symbol.

        Parameters:
            ticker (str): The stock ticker symbol.
            period (str): The period for which to fetch historical data (e.g., '1y', '5y', 'max').
            interval (str): The interval of the data (e.g., '1d', '1wk', '1mo').
        """
        # Fetch historical data for the stock
        stock_data = yf.Ticker(ticker).history(period=period, interval=interval)

        # Check if data is retrieved
        if stock_data.empty:
            print(f"No data found for ticker: {ticker}")
            return

        # Create the price chart
        fig = px.line(stock_data, 
                    x=stock_data.index, 
                    y='Close', 
                    title=f'{ticker} Daily Close Price', 
                    labels={'Close': 'Close Price'},
                    width=800, 
                    height=600)

        # Show the figure
        fig.show()