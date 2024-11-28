import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useNavigate} from 'react-router-dom'

import { Container, Row, Col, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/components/myPocket/Chart.css';
import BigButton from '../buttons/BigButton';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Component() {
  const { portfolioId } = useParams(); // URL에서 portfolioId를 가져옴
  const colorPalette = ['#62B2FD', '#9BDFC4', '#B4A4FF', '#F99BAB', '#FFB44F'];
  const navigate = useNavigate();

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 128);
    const g = Math.floor(Math.random() * 127 + 128);
    const b = Math.floor(Math.random() * 127 + 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [stocks, setLocalStocks] = useState([]); // 로컬 stocks 상태
  const [colors, setColors] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  // 데이터 받아오기
  useEffect(() => {
    fetch(`/api/etf/details/${portfolioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio details');
        }
        return response.json();
      })
      .then((data) => {
        setLocalStocks(data.etfStocks);
        setColors(
          data.etfStocks.map((_, index) =>
            index < colorPalette.length
              ? colorPalette[index]
              : generatePastelColor()
          )
        );
        setPercentages(data.etfStocks.map((stock) => stock.percentage));
        setResponseData(data);
      })
      .catch((error) => {
        console.error(error);
        setFetchError('ETF 데이터를 가져오는 중 문제가 발생했습니다.');
      });
  }, [portfolioId]);

  useEffect(() => {
    if (activeTooltipIndex !== null) {
      const timer = setTimeout(() => {
        setActiveTooltipIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeTooltipIndex]);

  const handlePercentageChange = (index, newValue) => {
    const newPercentages = [...percentages];
    newValue = Math.min(100, Math.max(0, newValue));
    newPercentages[index] = newValue;
    setPercentages(newPercentages);
  };

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!stocks.length) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: stocks.map((stock) => stock.stockName),
    datasets: [
      {
        data: percentages,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Container>
      <div>
        <h1 className="text-center mb-4">{responseData.title}</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-2">
              <span className="text-danger">
                수익률: {responseData.revenue}%
              </span>
            </div>

            <div className="my-4 donut-chart-container">
              <Doughnut
                data={chartData}
                options={{
                  cutout: '70%',
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                  animation: { animateRotate: true, animateScale: true },
                  onClick: (event, elements) => {
                    if (elements.length > 0) {
                      const clickedIndex = elements[0].index;
                      setActiveTooltipIndex(
                        activeTooltipIndex === clickedIndex
                          ? null
                          : clickedIndex
                      );
                    } else {
                      setActiveTooltipIndex(null);
                    }
                  },
                }}
                style={{ maxWidth: '430px' }}
              />
              {activeTooltipIndex !== null && (
                <div className="custom-tooltip">
                  <span
                    style={{
                      display: 'block',
                      color: colors[activeTooltipIndex],
                    }}
                  >
                    ● {stocks[activeTooltipIndex].stockName}
                  </span>
                  <span>비율 : {percentages[activeTooltipIndex]}%</span>
                  <br />
                  <span>
                    가격 : {''}
                    {stocks[activeTooltipIndex].purchasePrice.toLocaleString()}
                    원
                  </span>
                </div>
              )}
            </div>

            <div className="stock-list px-3">
              {stocks.map((stock, index) => (
                <div key={index} className="stock-item">
                  <div
                    className="stock-color"
                    style={{
                      backgroundColor: colors[index],
                      borderRadius: '1rem',
                    }}
                  ></div>
                  <span className="stock-name">{stock.stockName}</span>
                  <div>
                    <span>{percentages[index]} </span>
                    <span className="mx-2">%</span>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <BigButton text={'복사하기'} onClick={() => navigate('/create-etf', { state: { stocks: stocks } })}
      >

      </BigButton>
    </Container>
  );
}