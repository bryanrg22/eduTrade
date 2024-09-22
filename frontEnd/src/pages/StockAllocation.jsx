import React from 'react'

const StockBlock = ({ stock }) => (
  <div
    className="flex items-center justify-center p-2 text-white font-bold"
    style={{ backgroundColor: stock.color, height: `${stock.allocation}%` }}
  >
    {stock.symbol}
  </div>
)

const Portfolio = ({ title, stocks, value }) => (
  <div className="flex-1 bg-gray-800 p-4 rounded-lg flex flex-col">
    <h3 className="text-center text-white font-bold py-2 text-xl mb-4">{title}</h3>
    <div className="flex-grow flex flex-col">
      <div className="h-64 flex flex-col mb-4">
        {stocks.map((stock) => (
          <StockBlock key={stock.symbol} stock={stock} />
        ))}
      </div>
      <div className="text-white mb-4">
        <div className="flex justify-between font-bold mb-2">
          <span>Stock:</span>
          <span>Weight:</span>
        </div>
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex justify-between">
            <span>{stock.symbol}</span>
            <span>{stock.allocation}%</span>
          </div>
        ))}
      </div>
    </div>
    <div className="text-white text-xl font-bold mt-auto text-center">
      Portfolio Value: ${value.toFixed(2)}
    </div>
  </div>
)

export default function StockAllocation() {
  const myStocks = [
    { symbol: 'AMZN', allocation: 100, color: '#f6ad55' },
  ]

  const recommendedStocks = [
    { symbol: 'AMZN', allocation: 45, color: '#f6ad55' },
    { symbol: 'NVDA', allocation: 25, color: '#68d391' },
    { symbol: 'TSLA', allocation: 20, color: '#fc8181' },
    { symbol: 'AAPL', allocation: 10, color: '#a0aec0' },
  ]

  return (
    <div className="p-6 bg-gray-900">
      <div className="flex gap-4">
        <Portfolio title="My Stocks" stocks={myStocks} value={191.6} />
        <Portfolio title="+ Recommended" stocks={recommendedStocks} value={414.70} />
      </div>
    </div>
  )
}