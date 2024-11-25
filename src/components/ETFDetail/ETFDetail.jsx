import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ETFDetail() {
  const { portfolioId } = useParams(); // URL에서 portfolioId 추출
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ETF 상세 데이터 가져오기
    fetch(`/api/etf/details/${portfolioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio details");
        }
        return response.json();
      })
      .then((data) => {
        setPortfolioData(data);
      })
      .catch((err) => {
        console.error(err);
        setError("ETF 데이터를 가져오는 중 문제가 발생했습니다.");
      });
  }, [portfolioId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: portfolioData.etfStocks.map((stock) => stock.name),
    datasets: [
      {
        data: portfolioData.etfStocks.map((stock) => stock.percentage),
        backgroundColor: portfolioData.etfStocks.map((stock) => stock.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ minWidth: "375px", maxWidth: "430px", margin: "0 auto" }}>
      <h1>{portfolioData.title}</h1>
      <h3 style={{ color: portfolioData.revenue > 0 ? "red" : "blue" }}>
        수익률: {portfolioData.revenue > 0 ? "+" : ""}
        {portfolioData.revenue}%
      </h3>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Doughnut data={chartData} />
      </div>
      <ul style={{ marginTop: "20px" }}>
        {portfolioData.etfStocks.map((stock, index) => (
          <li key={index}>
            {stock.name} - {stock.percentage}%
          </li>
        ))}
      </ul>
    </div>
  );
}
