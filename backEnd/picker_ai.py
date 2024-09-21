import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf
from datetime import datetime, timedelta
import tkinter as tk
from tkinter import ttk
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


sp500_df = pd.read_csv('backEnd/MVP_Data/SP500_Indicators_21092024.csv')

# Drop rows with NaN values in relevant columns
sp500_df = sp500_df.dropna(subset=['Beta', 'EPS Growth', 'Dividend Yield'])



# Normalize Beta, EPS Growth, and Dividend Yield
scaler = MinMaxScaler()
sp500_df[['Beta', 'EPS Growth', 'Dividend Yield']] = scaler.fit_transform(sp500_df[['Beta', 'EPS Growth', 'Dividend Yield']])

# Assign weights (adjust as per your preference)
sp500_df['Beta_rank'] = abs(sp500_df['Beta'])  # Closer to 0 is better
sp500_df['EPS_rank'] = sp500_df['EPS Growth'].rank(ascending=False)  # Higher growth is better
sp500_df['Dividend_rank'] = sp500_df['Dividend Yield'].rank(ascending=False)  # Steady yield is better

# Combine into a final ranking (adjust weights as needed)
sp500_df['final_rank'] = sp500_df['Beta_rank'] + sp500_df['EPS_rank'] + sp500_df['Dividend_rank']

# Sort based on the final ranking
ranked_stocks = sp500_df.sort_values(by='final_rank')

# Assume ranked_stocks is a DataFrame with tickers in the first column
# Define how many tickers to fetch (e.g., 7 tickers in your case)
tickers = ranked_stocks.iloc[:7, 0].tolist()  # Get top 7 tickers from ranked_stocks

# Initialize an empty DataFrame to hold the combined historical data
combined_histories = pd.DataFrame()

# Convert histories to a DataFrame for better manipulation
histories_df = pd.DataFrame({
    "Period": ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "Max"],
    "period_value": ["1d", "5d", "1mo", "6mo", "ytd", "1y", "5y", "max"],
    "interval_value": ["5m", "30m", "1d", "1d", "1d", "1d", "1wk", "1d"]
})

# Iterate over each ticker
for ticker in tickers:
    stock = yf.Ticker(ticker)  # Create Ticker object

    # Iterate over the rows of the histories DataFrame
    for _, row in histories_df.iterrows():
        period_name = row['Period']
        period_value = row['period_value']
        interval_value = row['interval_value']
        
        # Fetch historical data for the current ticker, period, and interval
        hist = stock.history(period=period_value, interval=interval_value)
        
        # If it's the "Max" period, limit the number of entries to 700
        if period_name == "Max" and len(hist) > 700:
            hist = hist.tail(700)  # Limit to last 700 entries

        # Add a column for the ticker and the period to identify the data
        hist['Ticker'] = ticker
        hist['Period'] = period_name
        
        # Concatenate the current stock's history to the combined DataFrame
        combined_histories = pd.concat([combined_histories, hist])

# Reset index of the combined DataFrame for better readability
##############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################


'''
combined_histories.reset_index(inplace=True)

# Display the combined historical data
print(combined_histories)
'''




'''
Intervals:
• 1D - 5 minutes
• 5D - 30 minutes
• 1M - 1 Day
• 6M - 1 Day
• YTD - 1 Day
• 1Y - 1 Day
• 5Y - 1 Week
• Max - 700 Entries Total
'''
