import { useState } from 'react';

export default function Chart({ stocks }) {
  const [savedStocks, setSavedStocks] = useState(
    JSON.parse(localStorage.getItem('savedStocks')) || []
  );

  const handleButtonClick = (stock) => {
    const isSaved = savedStocks.includes(stock.id);
    const updatedStocks = isSaved
      ? savedStocks.filter((id) => id !== stock.id) // Remove from saved
      : [...savedStocks, stock.id]; // Add to saved

    setSavedStocks(updatedStocks);
    localStorage.setItem('savedStocks', JSON.stringify(updatedStocks));
  };

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="container mt-4" style={{ margin: '23px' }}>
        {stocks.map((stock, index) => {
          const isSaved = savedStocks.includes(stock.id);
          return (
            <div
              key={stock.id}
              className="d-flex align-items-center justify-content-between mb-2 p-2 bg-white"
            >
              <div className="d-flex align-items-center gap-3">
                <span className="text-primary fs-5 fw-bold">{index + 1}</span>
                <img
                  src={stock.logo}
                  alt={stock.name}
                  className="rounded"
                  width="48"
                  height="48"
                />
                <div>
                  <div className="fw" style={{ fontSize: '1rem' }}>
                    {stock.name}
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: '0.83rem' }}
                  >
                    <span className="fw">{stock.price}</span>
                    <span
                      className={
                        stock.change.includes('+') ? 'text-danger' : 'text-primary'
                      }
                    >
                      {stock.change}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleButtonClick(stock)}
                className={`btn ${isSaved ? 'btn-secondary' : ''}`}
                style={{
                  marginRight: '23px',
                  fontSize: '1rem',
                  padding: '5px 20px',
                  borderRadius: '10px',
                  backgroundColor: isSaved ? '#8C97A7' : '#4B7BF5', // 색상 변경
                  color: 'white',
                  border: 'none',
                }}
              >
                {isSaved ? '빼기' : '담기'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
