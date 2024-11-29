import Chart from '~/components/myPocket/Chart';
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';

export default function ETFPocket() {
  // 임시로 지정함!
  const id = localStorage.getItem("id");

  const location = useLocation();
  const navigate = useNavigate();

  const { selectedStocks, setSelectedStocks } = useStockContext(); // context로 가져오기

  // location.state에 stocks가 있으면 setSelectedStocks 업데이트
  useEffect(() => {
    if (location.state && location.state.stocks) {
      setSelectedStocks([...location.state.stocks]);
    }
  }, [location.state, setSelectedStocks]);

  const addStock = () => {
    navigate('/select-stock'); // 추가하기 버튼 클릭시 종목 선택하기 페이지로 이동
  };

  return (
    <div>
      <Chart stocks={selectedStocks} addStock={addStock} setStocks={setSelectedStocks} />
    </div>
  );
}
