import { useState, useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { Doughnut } from 'react-chartjs-2';
import { Plus } from 'react-bootstrap-icons';
import BigButton from '~/components/buttons/BigButton';
import api from '~/lib/apis/auth';
import debounce from 'lodash/debounce';

import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ETFInvestmentChart({ stocks, addStock, setStocks }) {
  const id = localStorage.getItem('id');

  const colorPalette = ['#62B2FD', '#9BDFC4', '#9F97F7', '#F99BAB', '#FFB44F'];

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 128);
    const g = Math.floor(Math.random() * 127 + 128);
    const b = Math.floor(Math.random() * 127 + 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [colors, setColors] = useState(
    stocks.map((_, index) =>
      index < colorPalette.length ? colorPalette[index] : generatePastelColor()
    )
  );

  const [percentages, setPercentages] = useState(stocks.map(() => 3));
  const initialInvestmentAmount = 5000000;

  const [totalBalance, setTotalBalance] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(
    initialInvestmentAmount
  );
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [isTotalPercentage100, setIsTotalPercentage100] = useState(false);
  const [initialTotalBalance, setInitialTotalBalance] = useState(0);
  const [title, setTitle] = useState('포트폴리오 제목을 입력해주세요');

  const inputRef = useRef(null);
  const chartRef = useRef(null);
  const percentagesRef = useRef(percentages);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await api.get(`/userinfo/${id}`);
        const { asset } = response.data;
        setInitialTotalBalance(asset);
        setTotalBalance(asset);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    setTotalBalance(initialTotalBalance - investmentAmount);

    if (inputRef.current) {
      const baseWidth = 50;
      const charWidth = 14;
      const maxWidth = 200;
      inputRef.current.style.width = `${Math.min(
        baseWidth + investmentAmount.toString().length * charWidth,
        maxWidth
      )}px`;
    }
  }, [investmentAmount]);

  useEffect(() => {
    const total = percentages.reduce((sum, percentage) => sum + percentage, 0);
    setIsTotalPercentage100(total === 100);
    percentagesRef.current = percentages;
  }, [percentages]);

  useEffect(() => {
    if (activeTooltipIndex !== null) {
      const timer = setTimeout(() => {
        setActiveTooltipIndex(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltipIndex]);

  const handleInvestmentChange = (value) => {
    if (typeof value !== 'string') return;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    let numberValue = sanitizedValue === '' ? 0 : Number(sanitizedValue);
    if (numberValue > initialTotalBalance) {
      numberValue = initialTotalBalance;
    }
    setInvestmentAmount(numberValue);
  };

  // 디바운스된 handlePercentageChange 함수 정의
  const debouncedHandlePercentageChange = useCallback(
    debounce((index, value) => {
      let newValue = parseInt(value, 10);
      if (isNaN(newValue)) newValue = 0;
      newValue = Math.min(100, Math.max(0, newValue));

      let newPercentages = [...percentagesRef.current];
      const oldValue = newPercentages[index];
      newPercentages[index] = newValue;

      let total = newPercentages.reduce((sum, p) => sum + p, 0);
      let difference = total - 100;

      if (difference !== 0) {
        const otherIndices = newPercentages
          .map((_, i) => i)
          .filter((i) => i !== index);

        // 음수 값 방지를 위한 로직 추가
        let adjustableIndices = otherIndices.filter(
          (i) => newPercentages[i] > 0
        );
        while (difference !== 0 && adjustableIndices.length > 0) {
          for (let i of adjustableIndices) {
            if (difference === 0) break;

            let maxAdjustable =
              difference > 0 ? newPercentages[i] : 100 - newPercentages[i];
            let adjustment = Math.min(maxAdjustable, Math.abs(difference), 1); // 한번에 1씩 조정

            if (difference > 0) {
              newPercentages[i] -= adjustment;
              difference -= adjustment;
            } else {
              newPercentages[i] += adjustment;
              difference += adjustment;
            }

            // 업데이트된 값이 0이 되었는지 확인
            if (newPercentages[i] <= 0) {
              newPercentages[i] = 0;
            }
          }
          adjustableIndices = otherIndices.filter((i) => newPercentages[i] > 0);
        }

        if (difference !== 0) {
          newPercentages[index] = oldValue;
        }
      }

      setPercentages(newPercentages);
    }, 30),
    []
  );

  const handlePercentageChange = (index, value) => {
    debouncedHandlePercentageChange(index, value);
  };

  const addStockWithColor = () => {
    addStock();
    const newColor =
      colors.length < colorPalette.length
        ? colorPalette[colors.length]
        : generatePastelColor();
    setColors([...colors, newColor]);
    setPercentages([...percentages, 0]);
  };

  const deleteStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
    setColors(colors.filter((_, i) => i !== index));
    setPercentages(percentages.filter((_, i) => i !== index));
  };

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

  // 나머지 비율 합산
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

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const distributeEqually = () => {
    const equalPercentage = Math.floor(100 / percentages.length);
    let newPercentages = percentages.map(() => equalPercentage);

    const total = newPercentages.reduce((sum, p) => sum + p, 0);
    if (total !== 100) {
      const difference = 100 - total;
      newPercentages[0] += difference;
    }

    setPercentages(newPercentages);
  };

  const addButtonClick = async () => {
    try {
      const etfList = stocks.map((stock, index) => ({
        stockCode: stock.stockCode,
        stockName: stock.stockName,
        price: stock.purchasePrice,
        percentage: percentages[index] || 0,
      }));

      const requestData = {
        etfList,
        title: title,
      };

      const response = await api.post(`/etf/buy/${id}`, requestData);

      console.log('ETF 투자 성공', response.data);
      alert('투자 요청이 성공적으로 완료되었습니다!');
    } catch (error) {
      console.error('ETF 투자하기 오류', error);
      alert('투자 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <div>
        <div className="text-center mb-4">
          <FormControl
            type="text"
            value={title}
            className="border-0 bg-transparent title-input"
            onChange={(e) => setTitle(e.target.value)}
            style={{color: '#9AA4B2'}}
            onFocus={() => setTitle('')}
          />
        </div>
        <Row className="justify-content-center">
          <Col className="w-100">
            <div className="text-center mb-2">
              <span className="text-danger">
                잔액: {totalBalance?.toLocaleString()}원
              </span>
            </div>

            <div
              className="my-4 donut-chart-container"
              style={{ position: 'relative' }}
            >
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
                <div className="d-flex flex-row">
                  <FormControl
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={investmentAmount}
                    onChange={(e) => handleInvestmentChange(e.target.value)}
                    className="border-0 bg-transparent investment-input"
                  />
                  <span className="py-2">원</span>
                </div>
              </div>
            </div>

            {/* <div className="text-center mb-2">
                  총 비율: {percentages.reduce((sum, p) => sum + p, 0)}%
                </div> */}

            <div className="text-center mb-3">
              <Button onClick={distributeEqually} className="distribute-button">
                비율 균등 분배
              </Button>
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
                  <div className="stock-percentage">
                    <input
                      type="range"
                      className="custom-slider"
                      value={percentages[index]}
                      onChange={(e) =>
                        handlePercentageChange(index, e.target.value)
                      }
                      style={{
                        background: `linear-gradient(to right, #3381F4 0%, #3381F4 ${percentages[index]}%, #e0e0e0 ${percentages[index]}%, #e0e0e0 100%)`,
                      }}
                      min={0}
                      max={100}
                      step={1}
                    />
                    <span className="percentage-value">
                      {Math.round(percentages[index])}%
                    </span>
                  </div>

                  <Button
                    variant="link"
                    className="delete-button"
                    onClick={() => deleteStock(index)}
                  >
                    x
                    {/* <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '1rem',
                        backgroundColor: '#c4c4c4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <Dash />
                    </div> */}
                  </Button>
                </div>
              ))}
            </div>

            <div className="stock-item px-3">
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '1rem',
                  backgroundColor: '#c4c4c4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginRight: '1rem',
                }}
              >
                <Plus />
              </div>
              <Button
                variant="link"
                className="add-button"
                onClick={addStockWithColor}
              >
                추가하기
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <BigButton
        text={'투자하기'}
        onClick={addButtonClick}
        disabled={!isTotalPercentage100}
      />
    </Container>
  );
}
