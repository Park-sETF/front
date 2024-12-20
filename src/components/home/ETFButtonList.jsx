import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import PercentageModal from './PercentageModal';
import { useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth';
import InvestAlertModal from './InvestAlertModal';
import AlarmAlertModal from './AlarmAlertModal';

export default function ETFButtonList({ items }) {
  const navigate = useNavigate();

  const [activeItems, setActiveItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPortfolioId, setCurrentPortfolioId] = useState(null);
  const [investAlertModalOpen, setInvestAlertModalOpen] = useState(false);
  const [investAlertMessage, setInvestAlertMessage] = useState('');
  const [alarmAlertModalOpen, setAlarmAlertModalOpen] = useState(false);
  const [alarmAlertMessage, setAlarmAlertMessage] = useState('');

  // 알림 상태를 localStorage에서 가져오기
  useEffect(() => {
    const savedActiveItems = JSON.parse(localStorage.getItem('activeItems')) || {};
    setActiveItems(savedActiveItems);
  }, []);

  // 알림 상태를 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem('activeItems', JSON.stringify(activeItems));
  }, [activeItems]);

  const handleToggle = (portfolioId, event) => {
    event.stopPropagation();
    setCurrentPortfolioId(portfolioId);
    setShowModal(true);
  };

  const handleModalSave = async (updatedValues) => {
    if (!currentPortfolioId) return;

    try {
      const requestBody = {
        userId: localStorage.getItem('id'),
        portfolioId: currentPortfolioId,
        profitSpot: parseFloat(updatedValues.takeProfit),
        lossSpot: parseFloat(updatedValues.stopLoss),
      };

      const response = await api.post('/notifications/subscribe/portfolio', requestBody);

      setActiveItems((prev) => ({
        ...prev,
        [currentPortfolioId]: true,
      }));

      setInvestAlertMessage(response.data || '알림 설정이 완료되었습니다!');
      setInvestAlertModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data || '알림 설정 중 오류가 발생했습니다!';
      setAlarmAlertMessage(errorMessage);
      setAlarmAlertModalOpen(true);
    } finally {
      setShowModal(false);
    }
  };

  const handleModalCancel = async () => {
    if (!currentPortfolioId) {
      setShowModal(false);
      return;
    }

    try {
      const requestBody = {
        userId: localStorage.getItem('id'),
        portfolioId: currentPortfolioId,
      };

      const response = await api.delete('/notifications/subscribe/portfolio', { data: requestBody });

      setActiveItems((prev) => ({
        ...prev,
        [currentPortfolioId]: false,
      }));

      setInvestAlertMessage(response.data || '알림이 해제되었습니다!');
      setInvestAlertModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data || '알림 해제 중 오류가 발생했습니다!';
      setAlarmAlertMessage(errorMessage);
      setAlarmAlertModalOpen(true);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div
      style={{
        minWidth: '375px',
        maxWidth: '430px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        className="px-3"
        style={{
          margin: '20px',
          marginTop: '3px',
        }}
      >
        {items.map((item) => (
          <div
            key={item.portfolioId}
            className="d-flex justify-content-between align-items-center"
            style={{
              paddingTop: '1.1rem',
              paddingBottom: '1.1rem',
              cursor: 'pointer',
            }}
            onClick={() =>
              navigate(`/etf/my-detail/${item.portfolioId || 'unknown'}`)
            }
          >
            <span
              style={{
                fontSize: '16px',
                minWidth: '100px',
                maxWidth: '100px',
                overflow: 'hidden',
                textAlign: 'left',
                flexShrink: 0,
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                color: item.revenue >= 0 ? '#ff3b3b' : '#0051c7',
                fontSize: '16px',
                minWidth: '140px',
                maxWidth: '140px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              수익률 {item.revenue >= 0 ? '+' : ''}
              {item.revenue.toFixed(2)}%
            </span>
            <button
              onClick={(e) => handleToggle(item.portfolioId, e)}
              className={`btn btn-sm rounded-pill ${
                activeItems[item.portfolioId] ? 'btn-primary' : 'btn-secondary'
              }`}
              style={{
                width: '48px',
                height: '24px',
                padding: 0,
                position: 'relative',
                transition: 'background-color 0.3s',
                flexShrink: 0,
              }}
            >
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'absolute',
                  top: '0.9px',
                  transition: 'transform 0.3s',
                  transform: `translateX(${
                    activeItems[item.portfolioId] ? '24px' : '2px'
                  })`,
                }}
              >
                {activeItems[item.portfolioId] ? (
                  <Bell size={12} color="#007bff" />
                ) : (
                  <BellOff size={12} color="#BBBBBB" />
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
      <PercentageModal
        show={showModal}
        onHide={handleModalCancel}
        onSave={handleModalSave}
      />
      <InvestAlertModal
        isOpen={investAlertModalOpen}
        onClose={() => setInvestAlertModalOpen(false)}
        message={investAlertMessage}
      />
      <AlarmAlertModal
        isOpen={alarmAlertModalOpen}
        onClose={() => setAlarmAlertModalOpen(false)}
        message={alarmAlertMessage}
      />
    </div>
  );
}
