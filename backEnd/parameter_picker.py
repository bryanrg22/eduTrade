import yfinance as yf
import pandas as pd
from bs4 import BeautifulSoup
import requests

url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'

# Fetch page content
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract table containing tickers
table = soup.find('table', {'class': 'wikitable sortable'})
tickers = []

# Iterate over the rows to extract the ticker symbols
for row in table.find_all('tr')[1:]:
    ticker = row.find_all('td')[0].text.strip()
    tickers.append(ticker)

sp500 = pd.DataFrame(tickers)


data = {}


# Need a measure of volatility
for ticker in tickers:
    stock = yf.Ticker(ticker)
    info = stock.info
    data[ticker] = {
        'P/E Ratio': info.get('trailingPE'),
        'Beta': info.get('beta'),
        'Market Cap': info.get('marketCap'),
        'EPS Growth': info.get('earningsGrowth'),
        'ROE': info.get('returnOnEquity'),
        'Dividend Yield': info.get('dividendYield'),
        'Current Ratio': info.get('currentRatio'),
        'Quick Ratio': info.get('quickRatio'),
        'Insider Ownership': info.get('heldPercentInsiders'),
    }

# Convert to DataFrame
df = pd.DataFrame(data).T

df.to_csv('backEnd/MVP_Data/SP500_Indicators_21092024.csv')