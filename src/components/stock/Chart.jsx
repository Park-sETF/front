import StockLogo from './StockLogo';
import { useStockContext } from '~/components/context/StockProvider';

export default function Chart({ stocks }) {
  console.log('Received stocks:', stocks);

  // 주식 종목 저장 변수 context에서 가져오기
  const { selectedStocks, setSelectedStocks } = useStockContext();

  // 주식 선택/해제 처리
  const handleButtonClick = (stock) => {
    const isSelected = selectedStocks.some((s) => s.stockCode === stock.stockCode);

    const updatedSelection = isSelected
      ? selectedStocks.filter((s) => s.stockCode !== stock.stockCode) // 빼기
      : [...selectedStocks, stock]; // 담기

    setSelectedStocks(updatedSelection); // 상태 업데이트
  };

  // stocks와 StockLogo를 매핑
  const defaultLogo = 'https://static.toss.im/png-icons/securities/icn-sec-fill-900340.png';

  const updatedStocks = stocks.map((stock) => {
    const matchedLogo = StockLogo.find(
      (logoItem) => logoItem.stockCode === stock.stockCode
    );
    return {
      ...stock,
      logo: matchedLogo ? matchedLogo.logoImageUrl : defaultLogo, // 기본 로고 설정
    };

    
  });


  // 숫자 포맷 함수
  const formatPrice = (price) => {
    if (isNaN(price)) return price; // 숫자가 아니면 그대로 반환
    return new Intl.NumberFormat('ko-KR').format(price) + '원'; // 천 단위 쉼표 추가
  };

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="container mt-4" style={{ margin: '14px' }}>
        {updatedStocks.map((stock, index) => {
          const isSaved = selectedStocks.some((s) => s.stockCode === stock.stockCode);
          const change = stock.change || '0%'; // change가 없으면 기본값 '0%' 설정
          console.log(stock)
          return (
            <div 
              key={stock.stockCode || index} // 안전한 key 설정
              className="d-flex align-items-center justify-content-between mb-2 p-2 bg-white"
            >
              <div className="d-flex align-items-center gap-3">
                <span
                  className="text-primary fs-5 fw-bold"
                  style={{ width: '15px', textAlign: 'center' }}
                >
                  {index + 1}
                </span>
                <img
                  src={stock.logo}
                  alt={stock.stockName}
                  className="rounded"
                  width="48"
                  height="48"
                />
                <div style={{ maxWidth: '120px', overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      whiteSpace: 'wrap', // 텍스트 줄바꿈 방지
                      overflow: 'hidden', // 넘치는 텍스트 숨김
                      textOverflow: 'ellipsis', // "..." 처리
                    }}
                  >
                    {stock.stockName}
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: '0.83rem' }}
                  >
                    <span className="fw">{formatPrice(stock.purchasePrice)}</span>
                    <span
                      className={change.includes('-') ? 'text-primary' : 'text-danger'}
                    >
                      {change}
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
                  width: '80px',
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
