import BigButton from '~/components/buttons/BigButton';
import Chart from '~/components/Stock/Chart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ETFPocket() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/create-etf'); // ETF 만들기 페이지로 이동
  };

  const [storedStocks, setStoredStocks] = useState([]); // 로컬스토리지에서 가져온 stocks
  const [selectedStocks, setSelectedStocks] = useState([]); // 선택된 주식 상태

  // 로컬 스토리지에서 데이터 복구
  useEffect(() => {
    const savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
    setStoredStocks(savedStocks); // 로컬스토리지 데이터로 stocks 설정
    setSelectedStocks(savedStocks); // selectedStocks 초기화
  }, []);



  return (
    <div>
      <Chart 
        stocks={storedStocks} 
        selectedStocks={selectedStocks} 
        setSelectedStocks={setSelectedStocks} 
      />
      <BigButton text={'ETF 만들기'} onClick={handleButtonClick} />
    </div>
  );
}
