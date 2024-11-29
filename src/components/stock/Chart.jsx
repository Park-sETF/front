import StockLogo from './StockLogo';
import { useStockContext } from '~/components/context/StockProvider';

export default function Chart({stocks}) {

  console.log("#####stock/chart.jsx: "+ JSON.stringify(stocks));

  //주식 종목 저장 변수 context에서 가져오기 
  const {selectedStocks, setSelectedStocks} = useStockContext();

  // 주식 선택/해제 처리
  const handleButtonClick = (stock) => {
    const isSelected = selectedStocks.some((s) => s.stockCode === stock.stockCode);
    
    const updatedSelection = isSelected
      ? selectedStocks.filter((s) => s.stockCode  !== stock.stockCode) // 빼기
      : [...selectedStocks, stock]; // 담기

    setSelectedStocks(updatedSelection); // 상태 업데이트
  };

  // stocks와 StockLogo를 매핑
  // 종목에 해당하는 로고가 없을 경우 defaultLogo로 설정
  const defaultLogo = "https://static.toss.im/png-icons/securities/icn-sec-fill-900340.png";

  const updatedstocks = stocks.map((stock) => {
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
    // 숫자 여부 확인
    if (isNaN(price)) return price;

    // 천 단위 쉼표 추가 및 "원" 표시
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };



  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="container mt-4" style={{ margin: '14px' }}>
        {updatedstocks.map((stock, index) => {
          const isSaved = selectedStocks.some((s) => s.stockCode === stock.stockCode);

          return (
            <div
              key={stock.id}
              className="d-flex align-items-center justify-content-between mb-2 p-2 bg-white"
            >

              <div className="d-flex align-items-center gap-3">
                <span className="text-primary fs-5 fw-bold" style={{width:'15px', textAlign: 'center'}}>{index + 1}</span>
                <img
                  src={stock.logo}
                  alt={stock.stockName}
                  className="rounded"
                  width="48"
                  height="48"
                />
                <div style={{ maxWidth: '120px', overflow: 'hidden' }}>
                  <div className="fw" 
                  style={{
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',       // 텍스트 줄바꿈 방지
                  overflow: 'hidden',         // 넘치는 텍스트 숨김
                  textOverflow: 'ellipsis',   // "..." 처리
                }}>
                    {stock.stockName}
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: '0.83rem' }}
                  >
                    <span className="fw">{formatPrice(stock.purchasePrice)}</span>
                    <span
                      className={
                        stock.change.includes('-') ? 'text-primary' : 'text-danger'
                      }
                    >
                      {stock.change}%
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
