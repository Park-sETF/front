import { useState } from "react";
import StockLogo from "./StockLogo";

export default function Chart({ stocks }) {
  // 선택된 주식 상태 관리
  const [selectedStocks, setSelectedStocks] = useState(
    () => JSON.parse(localStorage.getItem("savedStocks")) || []
  );

  // 주식 선택/해제 처리
  const handleButtonClick = (stock) => {
    //selectedStocks 상태 배열에서 해당 주식이 선택되었는지 확인
    const isSelected = selectedStocks.some((s) => s.id === stock.id);
    const updatedSelection = isSelected
      ? selectedStocks.filter((s) => s.id !== stock.id) // 장바구니에 있는 경우에는 빼기! 
      : [...selectedStocks, stock]; // 장바구니에 종목 넣기!! 

    setSelectedStocks(updatedSelection);
    console.log(selectedStocks);

    // 선택된 종목만 localStorage에 저장
    localStorage.setItem("savedStocks", JSON.stringify(updatedSelection));
  };

  // stocks와 StockLogo를 매핑
  const updatedstocks = stocks.map((stock) => {
    const matchedLogo = StockLogo.find(
      (logoItem) => logoItem.stockCode === stock.stockCode
    );
    return {
      ...stock,
      logo: matchedLogo ? matchedLogo.logoImageUrl : stock.logo, // 로고가 있으면 대체
    };
  });

  return (
    <div style={{ width: "100%", maxWidth: "430px", margin: "0 auto" }}>
      <div className="container mt-4" style={{ margin: "23px" }}>
        {updatedstocks.map((stock, index) => {

          // some 메서드는 selectedStocks 배열의 각 요소(s)를 순회하며, s.id === stock.id 조건을 평가합니다.
          // 조건이 true인 요소를 찾으면 isSelected는 true, 그렇지 않으면 false.
          const isSaved = selectedStocks.some((s) => s.id === stock.id);

          return (
            <div
              key={stock.id}
              className="d-flex align-items-center justify-content-between mb-2 p-2 bg-white"
            >
              <div className="d-flex align-items-center gap-3">
                <span className="text-primary fs-5 fw-bold">{index + 1}</span>
                <img
                  src={stock.logo}
                  alt={stock.name}
                  className="rounded"
                  width="48"
                  height="48"
                />
                <div>
                  <div className="fw" style={{ fontSize: "1rem" }}>
                    {stock.name}
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "0.83rem" }}
                  >
                    <span className="fw">{stock.price}</span>
                    <span
                      className={
                        stock.change.includes("+") ? "text-danger" : "text-primary"
                      }
                    >
                      {stock.change}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleButtonClick(stock)}
                className={`btn ${isSaved ? "btn-secondary" : "btn-primary"}`}
                style={{
                  marginRight: "23px",
                  fontSize: "1rem",
                  padding: "5px 20px",
                  borderRadius: "10px",
                  backgroundColor: isSaved ? "#8C97A7" : "#4B7BF5", // 색상 변경
                  color: "white",
                  border: "none",
                }}
              >
                {isSaved ? "빼기" : "담기"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
