import BigButton from '~/components/buttons/BigButton';
import Chart from '~/components/myPocket/Chart';
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import api from '~/lib/apis/auth'

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

  const addButtonClick = async () => {
    try {

      const etfList = selectedStocks.map((stock) => ({
        stockCode: stock.stockCode,
        stockName: stock.stockName,
        price: stock.purchasePrice,
        percentage: stock.percentage || 0, 
      }));
      console.log(etfList);

      // 서버에 전달할 데이터 구성 (예: 선택된 종목)
      const requestData = {
        etfList,
        title: "우량주가 좋아", // 여기에 적절한 title 값을 추가
      };

      // POST 요청
      const response = await api.post(
        `/etf/buy/${id}`,
        requestData
      );

      // 성공 메시지 확인 또는 후속 처리
      console.log('ETF 투자 성공', response.data);
      alert('투자 요청이 성공적으로 완료되었습니다!');
    } catch (error) {
      console.error('ETF 투자하기 오류', error);
      alert('투자 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Chart stocks={selectedStocks} addStock={addStock} setStocks={setSelectedStocks} />
      <BigButton text={'투자하기'} onClick={addButtonClick}/>
    </div>
  );
}
