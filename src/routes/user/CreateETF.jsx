import BigButton from '~/components/buttons/BigButton';
import Chart from '~/components/MyPocket/Chart';
import { useState } from 'react';

export default function ETFPocket() {
  const [stocks, setStocks] = useState([
    { name: '삼성전자', price: 60000 },
    { name: '현대자동차', price: 230000 },
    { name: '하이닉스', price: 230000 },
    { name: 'LG전자', price: 80000 },
    { name: '한화에어로스페이스', price: 300000 },
  ]);

  const addStock = () => {
    const newStock = {
      name: `주식 ${stocks.length + 1}`,
      percentage: 0,
      price: 0,
    };
    setStocks([...stocks, newStock]);
  };

  return (
    <div>
      <Chart stocks={stocks} addStock={addStock} setStocks={setStocks} />
      <BigButton text={'투자하기'} />
    </div>
  );
}
