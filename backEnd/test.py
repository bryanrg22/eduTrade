<<<<<<< HEAD
import yfinance as yf
import matplotlib as plt

msft = yf.Ticker("MSFT")


# get historical market data
hist = msft.history(period="1mo")

# show meta information about the history (requires history() to be called first)

plt
=======
from backEnd.StockUtilities import *;

StockUtilities.plot_stock_history("AMZN")
>>>>>>> b61bbb608125d44feb613cd6b73bf4fb0af5328c
