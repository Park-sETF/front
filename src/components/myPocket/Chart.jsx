import { useState, useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import { Doughnut } from 'react-chartjs-2';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import BigButton from '~/components/buttons/BigButton';
import api from '~/lib/apis/auth';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import { useStockContext } from '~/components/context/StockProvider';
import Modal from '~/components/modal/CustomModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Chart.css';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function ETFInvestmentChart({
  stocks,
  addStock,
  setStocks,
  isForCopy = false,
}) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="container mt-4" style={{ margin: "23px" }}>
        <h1
          className="fw-bold"
          style={{
            fontSize: "18.5px",
            lineHeight: "1.5",
            marginBottom: 0,
          }}
        >
          담은 주식이 없습니다.
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "#8E8E93",
            marginTop: "6px",
          }}
        >
          주식 선택을 해서 주식을 담아보세요!
        </p>
      </div>
    );
  }
  
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const colorPalette = ['#62B2FD', '#9BDFC4', '#9F97F7', '#F99BAB', '#FFB44F'];

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 128);
    const g = Math.floor(Math.random() * 127 + 128);
    const b = Math.floor(Math.random() * 127 + 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const MESSAGES = {
    INVEST_CONFIRM: '정말 투자하시겠습니까?',
    ALERT_TITLE_REQUIRED: '제목을 입력해주세요.',
    ALERT_PERCENTAGE: '모든 주식의 비율 합이 100%가 되어야 합니다.',
    INVEST_SUCCESS: '투자 요청이 성공적으로 완료되었습니다!',
    INVEST_FAILURE: '투자 요청 중 오류가 발생했습니다.',
    TITLE_LENGTH: '제목은 14자까지만 입력가능합니다.',
  };

  const [percentages, setPercentages] = useState([]);

  const [investmentAmount, setInvestmentAmount] = useState(5000000);
  const [title, setTitle] = useState('포트폴리오 제목을 입력해주세요');

  const [totalBalance, setTotalBalance] = useState(0);
  const [initialTotalBalance, setInitialTotalBalance] = useState(0);

  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [isTotalPercentage100, setIsTotalPercentage100] = useState(false);

  const inputRef = useRef(null);
  const chartRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [investAlertModalOpen, setInvestAlertModalOpen] = useState(false);
  const [investAlertMessage, setInvestAlertMessage] = useState('');

  const { setSelectedStocks } = useStockContext();
  const [loading, setLoading] = useState(true);

  const [colors, setColors] = useState(() => {
    return stocks.map((_, index) =>
      index < colorPalette.length ? colorPalette[index] : generatePastelColor()
    );
  });
  
  useEffect(() => {
    setColors((prevColors) => {
      const newColors = stocks.map((_, index) =>
        prevColors[index] || (index < colorPalette.length ? colorPalette[index] : generatePastelColor())
      );
      return newColors;
    });
  }, [stocks]);
  

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
    setLoading(stocks.length === 0);
  }, [stocks.length]);

  useEffect(() => {
    if (!loading) {
      const initialPercentages = stocks.map((stock) =>
        isForCopy ? (stock.percentage != null ? stock.percentage : 0) : 3
      );
      setPercentages(initialPercentages);
    }
  }, [isForCopy, loading]);

  useEffect(() => {
    const total = percentages.reduce((sum, p) => sum + p, 0);
    setIsTotalPercentage100(total === 100);
  }, [percentages]);

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
  }, [investmentAmount, initialTotalBalance]);

  const handleInvestmentChange = (value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    let numberValue = sanitizedValue === '' ? 0 : Number(sanitizedValue);
    if (numberValue > initialTotalBalance) {
      numberValue = initialTotalBalance;
    }
    setInvestmentAmount(numberValue);
  };

  const handlePercent = (index, value) => {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) newValue = 0;
    newValue = Math.min(100, Math.max(0, newValue));

    let newPercentages = [...percentages];
    const oldValue = newPercentages[index];
    newPercentages[index] = newValue;

    let total = newPercentages.reduce((sum, p) => sum + p, 0);
    let difference = total - 100;

    if (difference !== 0) {
      const otherIndices = newPercentages
        .map((_, i) => i)
        .filter((i) => i !== index);

      let adjustableIndices = otherIndices.filter(
        (i) => newPercentages[i] >= 0
      );
      while (difference !== 0 && adjustableIndices.length > 0) {
        for (let i of adjustableIndices) {
          if (difference === 0) break;

          let maxAdjustable =
            difference > 0 ? newPercentages[i] : 100 - newPercentages[i];
          let adjustment = Math.min(maxAdjustable, Math.abs(difference), 1);

          if (difference > 0) {
            newPercentages[i] -= adjustment;
            difference -= adjustment;
          } else {
            newPercentages[i] += adjustment;
            difference += adjustment;
          }

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
  }

  const handlePercentageChange = (index,value) => useCallback(
    handlePercent(index, value),
    [index, value]
  );

  const handleInvestClick = () => {
    if (title === '포트폴리오 제목을 입력해주세요') {
      setAlertMessage(MESSAGES.ALERT_TITLE_REQUIRED);
      setAlertModalOpen(true);
      return;
    }

    if(title.length > 14) {
      setAlertMessage(MESSAGES.TITLE_LENGTH);
      setAlertModalOpen(true);
      return; 
    }

    if (!isTotalPercentage100) {
      setAlertMessage(MESSAGES.ALERT_PERCENTAGE);
      setAlertModalOpen(true);
      return;
    }

    setModalOpen(true);
  };

  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInvestConfirm = async () => {
    try {
      const etfList = stocks.map((stock, index) => ({
        stockCode: stock.stockCode,
        stockName: stock.stockName,
        price: stock.purchasePrice,
        percentage: percentages[index] || 0,
      }));

      const requestData = {
        etfList,
        title,
        investmentAmount,
      };

      const response = await api.post(`/etf/buy/${id}`, requestData);

      console.log('ETF 투자 성공', response.data);
      setInvestAlertMessage('투자 요청이 성공적으로 완료되었습니다!');
      setModalOpen(false); // Close the current modal first
      setInvestAlertModalOpen(true); // Then open the next modal

      setSelectedStocks([]);
      localStorage.removeItem('saveStocks');
    } catch (error) {
      console.error('ETF 투자하기 오류', error);
      setInvestAlertMessage('투자 요청 중 오류가 발생했습니다.');
      setModalOpen(false); // Close the current modal first
      setInvestAlertModalOpen(true); // Then open the next modal
    }
  };

  const handleInvestAlertClose = () => {
    setInvestAlertModalOpen(false);
    navigate('/user?activeTab=나의+ETF');
  };

  const addStockWithColor = () => {
    addStock();
    setPercentages((prevPercentages) => [...prevPercentages, 0]);
    setColors((preColors) => [...preColors, generatePastelColor()])
  };

  const deleteStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
    setPercentages(percentages.filter((_, i) => i !== index));
    setColors(colors.filter((_, i) => i !== index));
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

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const stockData = stocks.map((stock, index) => ({
    stockName: stock.stockName,
    purchasePrice: stock.purchasePrice,
    percentage: percentages[index],
    color: colors[index],
    stockIndex: index,
  }));

  const sortedStockData = [...stockData].sort(
    (a, b) => b.percentage - a.percentage
  );

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
      color: 'rgb(188, 194, 229)',
      purchasePrice: 0,
      stockIndex: null,
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

        const canvasPosition = getRelativePosition(event, chartRef.current);

        const chartArea = chartRef.current.chartArea;

        let x = chartArea.left + canvasPosition.x;
        let y = chartArea.top + canvasPosition.y;

        const tooltipWidth = 150;
        const tooltipHeight = 70;

        if (x - tooltipWidth / 2 < chartArea.left) {
          x = chartArea.left + tooltipWidth / 2;
        } else if (x + tooltipWidth / 2 > chartArea.right) {
          x = chartArea.right - tooltipWidth / 2;
        }

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
        <div className="text-center mt-1 mb-3">
          <FormControl
            type="text"
            value={title}
            className="border-0 bg-transparent title-input"
            onChange={(e) => setTitle(e.target.value)}
            style={{ color: '#9AA4B2' }}
            onFocus={() =>
              title === '포트폴리오 제목을 입력해주세요' && setTitle('')
            }
            onBlur={() => {
              if (title.trim() === '') {
                setTitle('포트폴리오 제목을 입력해주세요');
              }
            }}
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
                      borderRadius: '1rem'
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
        onClick={handleInvestClick}
        disabled={!isTotalPercentage100}
      />
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleInvestConfirm}
        message={MESSAGES.INVEST_CONFIRM}
      />

      <Modal
        isOpen={alertModalOpen}
        onClose={handleAlertClose}
        message={alertMessage}
      />

      <Modal
        isOpen={investAlertModalOpen}
        onClose={handleInvestAlertClose}
        message={investAlertMessage}
      />
    </Container>
  );
}
