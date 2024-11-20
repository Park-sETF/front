// SelectStock.jsx
import BigButton from '~/components/buttons/BigButton';
// import Footer from '~/components/MyFooter';
// import MobileHeader from '~/components/Header/MobileHeader';
import StockHeader from '~/components/layouts/StockHeader';
import StockTab from '~/components/Stock/StockTab';
import Chart from '~/components/Stock/Chart';
import { useNavigate } from 'react-router-dom';

export default function SelectStock() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/etf-pocket'); // 클릭 시 경로 이동
  };

  // 주식 데이터 -> 사실 백에서 받아옴
  const stocks = [
    {
      id: 1,
      stockCode: 'A005930',
      name: '삼성전자',
      logo: '', // 로고를 동적으로 매핑
      price: '50,600원',
      change: '-4.5%',
      action: '담기',
      actionClass: 'btn-primary',
    },
    {
      id: 2,
      stockCode: 'A000660',
      name: 'SK하이닉스',
      logo: '',
      price: '18,2900원',
      change: '-1.5%',
      action: '빼기',
      actionClass: 'btn-secondary',
    },
    {
      id: 3,
      stockCode: 'A035420',
      name: 'NAVER',
      logo: '',
      price: '18,2900원',
      change: '+10.9%',
      action: '담기',
      actionClass: 'btn-primary',
    },
    {
      id: 4,
      stockCode: 'A012330',
      logo: '',
      name: '현대모비스',
      price: '353,000원',
      change: '-7.4%',
      action: '담기',
      actionClass: 'btn-primary',
    },
  ];

  return (
    <div>
      {/* <MobileHeader text={"종목 선택하기"} /> */}
      <StockHeader Quantity={'5'}></StockHeader>
      <StockTab></StockTab>
      <Chart stocks={stocks}></Chart> {/* 업데이트된 stocks 전달 */}
      <BigButton text={'ETF 포켓'} onClick={handleButtonClick}></BigButton>
      {/* <Footer></Footer> */}
    </div>
  );
}
