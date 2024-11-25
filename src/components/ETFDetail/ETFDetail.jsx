import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function ETFDetail() {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const chartData = portfolioData.etfStocks.map((stock) => ({
    name: stock.name,
    value: stock.percentage,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div style={{ minWidth: "375px", maxWidth: "430px", margin: "0 auto" }}>
      <h1>{portfolioData.title}</h1>
      <h3 style={{ color: portfolioData.revenue > 0 ? "green" : "red" }}>
        수익률: {portfolioData.revenue > 0 ? "+" : ""}
        {portfolioData.revenue}%
      </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul style={{ marginTop: "20px" }}>
        {portfolioData.etfStocks.map((stock, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "10px"
              }}
            />
            {stock.stockName} - {stock.percentage}%
          </li>
        ))}
      </ul>
    </div>
  );
}

