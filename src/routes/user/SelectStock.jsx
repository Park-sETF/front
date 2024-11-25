import StockHeader from '~/components/layouts/StockHeader';
import StockTab from '~/components/Stock/StockTab';
import Chart from '~/components/Stock/Chart';
import { useNavigate } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import BigButton from '~/components/buttons/BigButton';



export default function SelectStock() {
  const navigate = useNavigate();

  // selectedStocks 상태 추가
  const {selectedStocks} = useStockContext();
  

  //버튼 클릭 시 이동
  const handleButtonClick = () => {

    navigate('/etf-pocket'); // 클릭 시 경로 이동
  };

  //장바구니 아이콘 클릭 시 이동 
  const handlePocketClick = () =>{
    navigate('/etf-pocket'); // 클릭 시 경로 이동
  }

  // 주식 데이터
  const stocks = [
    {
      id: 1,
      stockCode: 'A005930',
      name: '삼성전자',
      logo: '',
      price: '50,600원',
      change: '-4.5%',
    },
    {
      id: 2,
      stockCode: 'A000660',
      name: 'SK하이닉스',
      logo: '',
      price: '18,2900원',
      change: '-1.5%',
    },
    {
      id: 3,
      stockCode: 'A035420',
      name: 'NAVER',
      logo: '',
      price: '18,2900원',
      change: '+10.9%',
    },
    {
      id: 4,
      stockCode: 'A012330',
      name: '현대모비스',
      logo: '',
      price: '353,000원',
      change: '-7.4%',
    },
  ];

  return (
    <div>
      {/* 실시간으로 선택된 주식 수 전달 */}
      <StockHeader Quantity={selectedStocks.length.toString()} handlePocketClick={handlePocketClick} />
      <StockTab />
      {/* Chart에 stocks와 상태 관리 함수 전달 */}
      <Chart stocks={stocks}/>
      {/* <button onClick={handleButtonClick}>ETF pocket</button> */}
      <BigButton text='ETF 포켓'  onClick={handleButtonClick} />
    </div>
  );
}
