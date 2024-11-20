// ETFPocket.jsx
import BigButton from "~/components/buttons/BigButton";
import Footer from "~/components/MyFooter";
import MobileHeader from "~/components/Header/MobileHeader";
import Chart from "~/components/Stock/Chart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <BigButton text={"ETF 만들기"} onClick={handleButtonClick} />
      <Footer />
    </div>
  );
}
