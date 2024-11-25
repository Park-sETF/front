import BigButton from '~/components/buttons/BigButton';
import Chart from '~/components/Stock/Chart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStockContext } from '~/components/context/StockProvider';

export default function ETFPocket() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/create-etf'); // ETF 만들기 페이지로 이동
  };

  const {selectedStocks} = useStockContext(); // context로 가져오기 

  return (
    <div>
      <Chart 
        stocks={selectedStocks} 
      />
      <BigButton text={'ETF 만들기'} onClick={handleButtonClick} />
    </div>
  );
}
