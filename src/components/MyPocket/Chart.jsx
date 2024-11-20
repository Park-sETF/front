import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Plus } from 'react-bootstrap-icons';

import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Component({ stocks, addStock, setStocks }) {
  const [totalBalance, setTotalBalance] = useState(100000000);
  const [investmentAmount, setInvestmentAmount] = useState(50000000);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [initialTotalBalance, setInitialTotalBalance] = useState(0);
  const [initialInvestmentAmount, setInitialInvestmentAmount] = useState(0);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const inputRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
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
    setInitialTotalBalance(totalBalance);
    setInitialInvestmentAmount(investmentAmount);
  }, []);

  useEffect(() => {
    if (totalBalance <= 0) {
      setTotalBalance(initialTotalBalance);
      setInvestmentAmount(initialInvestmentAmount);
    }
  }, [totalBalance, investmentAmount]);

  useEffect(() => {
    const total = stocks.reduce((sum, stock) => sum + stock.percentage, 0);
    setError(total > 100);
    setWarning(total < 100);
  }, [stocks]);

  useEffect(() => {
    if (activeTooltipIndex !== null) {
      const timer = setTimeout(() => {
        setActiveTooltipIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeTooltipIndex]);

  useEffect(() => {
    setTotalBalance(totalBalance - investmentAmount);
  }, [investmentAmount]);

  const handleInvestmentChange = (value) => {
    const sanitizedValue = Number(value);
    const newValue = Math.min(totalBalance, Math.max(0, sanitizedValue));
    setInvestmentAmount(newValue);
  };

  const handlePercentageChange = (index, newValue) => {
    const newStocks = [...stocks];
    newValue = Math.min(100, Math.max(0, newValue));
    newStocks[index].percentage = Number(newValue);
    setStocks(newStocks);
  };

  const chartData = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        data: stocks.map((stock) => stock.percentage),
        backgroundColor: stocks.map((stock) => stock.color),
        borderWidth: 0,
      },
    ],
  };

  const deleteStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        setActiveTooltipIndex(
          activeTooltipIndex === clickedIndex ? null : clickedIndex
        );
      } else {
        setActiveTooltipIndex(null);
      }
    },
  };

  return (
    <Container
      className="mt-4 flex-grow-1 overflow-auto"
      style={{ maxWidth: '430px', margin: 'auto' }}
    >
      <div>
        <h1 className="text-center mb-4">나만의 ETF 만들기</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-2">
              <span className="text-danger">
                잔액: {totalBalance.toLocaleString()}원
              </span>
            </div>

            {error && (
              <Alert variant="danger" className="text-center">
                전체 비율이 100%를 초과할 수 없습니다
              </Alert>
            )}

            {warning && (
              <Alert variant="warning" className="text-center">
                설정한 투자 금액보다 더 적은 금액을 투자 중입니다.
              </Alert>
            )}

            <div className="my-4 donut-chart-container">
              <Doughnut
                data={chartData}
                options={chartOptions}
                ref={chartRef}
                style={{ maxWidth: '430px' }}
              />
              {activeTooltipIndex !== null && (
                <div className="custom-tooltip">
                  <span
                    style={{
                      display: 'block',
                      color: stocks[activeTooltipIndex].color,
                    }}
                  >
                    ● {stocks[activeTooltipIndex].name}
                  </span>
                  <span>
                    비율: {stocks[activeTooltipIndex].percentage}%, 가격:{' '}
                    {Number(stocks[activeTooltipIndex].price).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="investment-amount-container">
                <div className="mb-2">투자 금액</div>
                <FormControl
                  ref={inputRef}
                  type="text"
                  value={investmentAmount}
                  onChange={(e) =>
                    handleInvestmentChange(Number(e.target.value))
                  }
                  className="border-0 bg-transparent investment-input"
                />
                원
              </div>
            </div>

            <div className="stock-list">
              {stocks.map((stock, index) => (
                <div key={index} className="stock-item">
                  <div
                    className="stock-color"
                    style={{
                      backgroundColor: stock.color,
                      borderRadius: '1rem',
                    }}
                  ></div>
                  <span className="stock-name">{stock.name}</span>
                  <div className="stock-percentage">
                    <FormControl
                      type="number"
                      value={stock.percentage}
                      onChange={(e) =>
                        handlePercentageChange(index, Number(e.target.value))
                      }
                      className="percentage-input border-0 bg-transparent"
                    />
                    <span className="percentage-symbol">%</span>
                  </div>
                  <Button
                    variant="link"
                    className="delete-button"
                    onClick={() => deleteStock(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>

            <div className="stock-item">
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
              <Button variant="link" className="add-button" onClick={addStock}>
                추가하기
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
