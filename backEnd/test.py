import yfinance as yf
import matplotlib as plt

msft = yf.Ticker("MSFT")


# get historical market data
hist = msft.history(period="1mo")

# show meta information about the history (requires history() to be called first)

plt