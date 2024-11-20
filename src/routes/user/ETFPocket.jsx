import BigButton from "~/components/buttons/BigButton";
import Footer from "~/components/MyFooter";
import MobileHeader from "~/components/Header/MobileHeader";
import Chart from "~/components/Stock/Chart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chart from '~/components/MyPocket/Chart';

export default function ETFPocket() {
  const navigate = useNavigate();

  const handleButtonClick = () => {

    navigate("/create-etf");
  };

  const [storedStocks, setStoredStocks] = useState([])

  // 로컬 스토리지에서 데이터 복구
  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem('savedStocks'));
    console.log(storedStocks);
    setStoredStocks(storedStocks)
  }, []);

  return (
    <div>
      <MobileHeader text={"ETF 포켓"} />
      {/* 저장된 종목 데이터를 Chart로 전달 */}
      <Chart stocks={storedStocks} />
      <Chart stocks={stocks} addStock={addStock} setStocks={setStocks} />
      <BigButton text={"ETF 만들기"} onClick={handleButtonClick} />

  
  };

  const colorPalette = ['#62B2FD', '#9BDFC4', '#B4A4FF', '#F99BAB', '#FFB44F'];

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 128); // 128~255 범위로 제한
    const g = Math.floor(Math.random() * 127 + 128);
    const b = Math.floor(Math.random() * 127 + 128);
    console.log(`rgb(${r}, ${g}, ${b})`);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [stocks, setStocks] = useState([
    { name: '삼성전자', percentage: 40, price: 60000, color: colorPalette[0] },
    {
      name: '현대자동차',
      percentage: 35,
      price: 230000,
      color: colorPalette[1],
    },
    { name: '하이닉스', percentage: 12, price: 230000, color: colorPalette[2] },
    { name: 'LG전자', percentage: 3, price: 80000, color: colorPalette[3] },
    {
      name: '한화에어로스페이스',
      percentage: 10,
      price: 300000,
      color: colorPalette[4],
    },
  ]);

  const addStock = () => {
    const newStock = {
      name: `주식 ${stocks.length + 1}`,
      percentage: 0,
      price: 0,
      color: generatePastelColor(), // 파스텔색의 팔레트
    };
    setStocks([...stocks, newStock]);
  };

  return (
    <div>
      <MobileHeader text={'ETF 포켓'} />
      <Chart stocks={stocks} addStock={addStock} setStocks={setStocks} />
      <BigButton text={'ETF 만들기'} onClick={handleButtonClick} />

      <Footer />
    </div>
  );
}
