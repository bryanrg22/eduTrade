import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


AAPL = pd.read_csv('backEnd/MVP_Data/AAPL_100_D_Ago.csv')
MSFT = pd.read_csv('backEnd/MVP_Data/MSFT_100_D_Ago.csv')


#Set initial portfolio allocations
# Initial investment
total_investment = 1000
aapl_investment = total_investment * 0.8
msft_investment = total_investment * 0.2

# Calculate number of shares bought
aapl_shares = aapl_investment / AAPL['Close'].iloc[0]
msft_shares = msft_investment / MSFT['Close'].iloc[0]

# Calculate portfolio value over time
portfolio_values = []
for i in range(len(AAPL)):
    aapl_value = aapl_shares * AAPL['Close'].iloc[i]
    msft_value = msft_shares * MSFT['Close'].iloc[i]
    total_value = aapl_value + msft_value
    portfolio_values.append(total_value)


# Add portfolio values to DataFrame
AAPL['Portfolio Value'] = portfolio_values

# Calculate percentages
AAPL['AAPL Percentage'] = AAPL['Portfolio Value'] * (AAPL['Close'] * aapl_shares) / AAPL['Portfolio Value']
AAPL['MSFT Percentage'] = AAPL['Portfolio Value'] * (MSFT['Close'] * msft_shares) / AAPL['Portfolio Value']

# Plotting total portfolio value over time
plt.figure(figsize=(12, 6))
plt.plot(AAPL['Date'], AAPL['Portfolio Value'], label='Total Portfolio Value', color='green')
plt.axhline(y=total_investment, color='red', linestyle='--', label='Initial Investment ($1000)')
plt.title('Total Portfolio Value Over Time')
plt.xlabel('Date')
plt.ylabel('Portfolio Value ($)')
plt.legend()
plt.grid()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()


'''
# Plotting percentages
plt.figure(figsize=(12, 6))
plt.plot(AAPL['Date'], AAPL['AAPL Percentage'], label='AAPL Portfolio Percentage', color='blue')
plt.plot(AAPL['Date'], AAPL['MSFT Percentage'], label='MSFT Portfolio Percentage', color='orange')
plt.title('Portfolio Percentages Over Time')
plt.xlabel('Date')
plt.ylabel('Portfolio Value ($)')
plt.legend()
plt.grid()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()'''