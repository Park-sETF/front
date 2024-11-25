import StockLogo from './StockLogo';

export default function Chart({ stocks, selectedStocks, setSelectedStocks }) {
  // 주식 선택/해제 처리
  const handleButtonClick = (stock) => {
    const isSelected = selectedStocks.some((s) => s.id === stock.id);
    const updatedSelection = isSelected
      ? selectedStocks.filter((s) => s.id !== stock.id) // 빼기
      : [...selectedStocks, stock]; // 담기

    setSelectedStocks(updatedSelection); // 상태 업데이트
    localStorage.setItem('savedStocks', JSON.stringify(updatedSelection)); // 로컬스토리지 업데이트
  };

  // stocks와 StockLogo를 매핑
  const updatedstocks = stocks.map((stock) => {
    const matchedLogo = StockLogo.find(
      (logoItem) => logoItem.stockCode === stock.stockCode
    );
    return {
      ...stock,
      logo: matchedLogo ? matchedLogo.logoImageUrl : stock.logo, // 로고가 있으면 대체
    };
  });

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="container mt-4" style={{ margin: '23px' }}>
        {updatedstocks.map((stock, index) => {
          const isSaved = selectedStocks.some((s) => s.id === stock.id);

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
                className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'}`}
                style={{
                  marginRight: '23px',
                  fontSize: '1rem',
                  padding: '5px 20px',
                  borderRadius: '10px',
                  backgroundColor: isSaved ? '#8C97A7' : '#4B7BF5',
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
