import BigButton from '~/components/buttons/BigButton';
import Chart from '~/components/MyPocket/Chart';
import { useState } from 'react';

export default function ETFPocket() {
  const [stocks, setStocks] = useState([
    { name: '삼성전자', percentage: 40, price: 60000, color: colorPalette[0] },
    {
      name: '현대자동차',
      percentage: 35,
      price: 230000,
      // color: colorPalette[1],
      // color: generatePastelColor(),
    },
    {
      name: '하이닉스',
      percentage: 12,
      price: 230000,
      // color: colorPalette[2],

      // color: generatePastelColor(),
    },
    {
      name: 'LG전자',
      percentage: 3,
      price: 80000,
      // color: colorPalette[3],
    },
    {
      name: '한화에어로스페이스',
      percentage: 10,
      price: 300000,
      // color: colorPalette[4],
    },
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
