import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { Doughnut } from 'react-chartjs-2';
import {useNavigate} from 'react-router-dom'

import { Container, Row, Col, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/components/myPocket/Chart.css';
import BigButton from '../buttons/BigButton';

import api from '~/lib/apis/auth';

ChartJS.register(ArcElement, Tooltip, Legend);

const sellMyETF = async () => {
  await api
    .delete(`/etf/sell/${portfolioId}`)
    .then(() => {
      console.log('포트폴리오 삭제가 완료되었습니다.');
    })
    .catch(() => {
      console.log('포트폴리오 삭제 실패.');
    });
};

export default function Component() {
  const [stocks, setLocalStocks] = useState([]); // 로컬 stocks 상태
  const [percentages, setPercentages] = useState([]);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const { portfolioId } = useParams(); // URL에서 portfolioId를 가져옴
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const colorPalette = ['#62B2FD', '#9BDFC4', '#9F97F7', '#F99BAB', '#FFB44F'];

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 128);
    const g = Math.floor(Math.random() * 127 + 128);
    const b = Math.floor(Math.random() * 127 + 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const sellMyETF = async () => {
    await api
      .delete(`/etf/sell/${portfolioId}`)
      .then(() => {
        console.log('포트폴리오 삭제가 완료되었습니다.');
      })
      .catch(() => {
        console.log('포트폴리오 삭제 실패.');
      });
  };

  const [colors, setColors] = useState(
    stocks.map((_, index) =>
      index < colorPalette.length ? colorPalette[index] : generatePastelColor()
    )
  );

    // stockData를 생성하고, 비율에 따라 정렬하여 상위 5개를 선택하고 나머지는 '기타'로 합침.

    const stockData = stocks.map((stock, index) => ({
      stockName: stock.stockName,
      purchasePrice: stock.purchasePrice,
      percentage: percentages[index],
      color: colors[index],
      stockIndex: index, // 원래 인덱스 저장
    }));

    // 비율에 따라 내림차순 정렬
    const sortedStockData = [...stockData].sort(
      (a, b) => b.percentage - a.percentage
    );
  
    // 상위 5개 선택
    const topStockData = sortedStockData.slice(0, 5);
    const otherStockData = sortedStockData.slice(5);

    const otherPercentage = otherStockData.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    if (otherPercentage > 0) {
      topStockData.push({
        stockName: '기타',
        percentage: otherPercentage,
        color: 'rgb(188, 194, 229)', // '기타'의 색상
        purchasePrice: 0,
        stockIndex: null, // '기타'는 인덱스 없음
      });
    }

  // 데이터 받아오기

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await api.get(`/etf/details/${portfolioId}`);
        const data = response.data;
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

      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (activeTooltipIndex !== null) {
      const timer = setTimeout(() => {
        setActiveTooltipIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeTooltipIndex]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!stocks.length) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: topStockData.map((item) => item.stockName),
    datasets: [
      {
        data: topStockData.map((item) => item.percentage),
        backgroundColor: topStockData.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
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
          activeTooltipIndex === clickedIndex ? null : clickedIndex
        );

        // 마우스 클릭 위치 계산
        const canvasPosition = getRelativePosition(event, chartRef.current);

        const chartArea = chartRef.current.chartArea;

        // 툴팁의 예상 크기
        const tooltipWidth = 150; // 툴팁의 예상 너비
        const tooltipHeight = 70; // 툴팁의 예상 높이

        // 툴팁 위치 계산 및 경계 검사
        let x = chartArea.left + canvasPosition.x;
        let y = chartArea.top + canvasPosition.y;

        // 가로 위치 조정
        if (x - tooltipWidth / 2 < chartArea.left) {
          x = chartArea.left + tooltipWidth / 2;
        } else if (x + tooltipWidth / 2 > chartArea.right) {
          x = chartArea.right - tooltipWidth / 2;
        }

        // 세로 위치 조정
        if (y - tooltipHeight < chartArea.top) {
          y = chartArea.top + tooltipHeight;
        }

        setTooltipPosition({ x, y });
      } else {
        setActiveTooltipIndex(null);
      }
    },
  };

  return (
    <Container>
      <div>
        <h1 className="text-center mb-4">{responseData.title}</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-2">
              <span className={responseData.revenue.toString().includes('-') ? 'text-primary' : 'text-danger'}>
                수익률: {responseData.revenue}%
              </span>
            </div>

            <div className="my-4 donut-chart-container">
              <Doughnut
                  data={chartData}
                  options={chartOptions}
                  ref={chartRef}
                  style={{ maxWidth: '430px' }}
              />
              {activeTooltipIndex !== null && (
                <div
                  className="custom-tooltip"
                  style={{
                    position: 'absolute',
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    transform: 'translate(-50%, -80%)',
                    width: '150px',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      color: topStockData[activeTooltipIndex].color,
                    }}
                  >
                    ● {topStockData[activeTooltipIndex].stockName}
                  </span>
                  <span>
                    비율: {topStockData[activeTooltipIndex].percentage}%
                  </span>
                  {topStockData[activeTooltipIndex].stockIndex !== null && (
                    <>
                      <br />
                      <span>
                        가격:{' '}
                        {topStockData[
                          activeTooltipIndex
                        ].purchasePrice.toLocaleString()}
                        원
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className="investment-amount-container">
                <div className="mb-2">투자 금액</div>
                <span className="border-0 bg-transparent investment-input">
                  {responseData.investAmount.toLocaleString()}원
                </span>
              </div>
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

      <BigButton text={'매도하기'} onClick={() => sellMyETF(responseData.portfolioId)}>
      </BigButton>
    </Container>
  );
}
