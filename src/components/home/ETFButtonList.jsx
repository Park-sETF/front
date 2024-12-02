import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import PercentageModal from './PercentageModal';
import { useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth';

export default function ETFButtonList({ items }) {
  const navigate = useNavigate();

  const [activeItems, setActiveItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalValues, setModalValues] = useState({
    takeProfit: 80,
    stopLoss: -20,
  });

  const handleToggle = (index, event) => {
    event.stopPropagation();
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleModalSave = async () => {
    if (currentIndex === null || !items[currentIndex]) return;

    const selectedItem = items[currentIndex];

    try {
      const requestBody = {
        userId: localStorage.getItem('id'), 
        portfolioId: selectedItem.portfolioId, 
        profitSpot: modalValues.takeProfit, 
        lossSpot: modalValues.stopLoss, 
      };

      await api.post('/notifications/subscribe/portfolio', requestBody);

      setActiveItems((prev) => ({
        ...prev,
        [currentIndex]: true,
      }));

      alert('알림 설정이 완료되었습니다!');
    } catch (error) {
      console.error('알림 설정 오류:', error);
      alert('알림 설정 중 오류가 발생했습니다.');
    } finally {
      setShowModal(false);
    }
  };

  const handleModalCancel = async () => {
    if (currentIndex === null || !items[currentIndex]) {
      setShowModal(false);
      return;
    }

    const selectedItem = items[currentIndex];

    try {
      const requestBody = {
        userId: localStorage.getItem('id'),
        portfolioId: selectedItem.portfolioId, 
      };

      await api.delete('/notifications/subscribe/portfolio', { data: requestBody });

      setActiveItems((prev) => ({
        ...prev,
        [currentIndex]: false,
      }));

      alert('알림이 해제되었습니다.');
    } catch (error) {
      console.error('알림 해제 오류:', error);
      alert('알림 해제 중 오류가 발생했습니다.');
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
        {items.map((item, index) => (
          <div
            key={index}
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
            {/* ETF 이름 */}
            <span
              className="fw-medium"
              style={{
                fontSize: '16px',
                minWidth: '100px',
                maxWidth: '100px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                flexShrink: 0,
              }}
            >
              {item.name}
            </span>

            {/* 수익률 */}
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

            {/* 알림 설정 버튼 */}
            <button
              onClick={(e) => handleToggle(index, e)}
              className={`btn btn-sm rounded-pill ${
                activeItems[index] ? 'btn-primary' : 'btn-secondary'
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
                    activeItems[index] ? '24px' : '2px'
                  })`,
                }}
              >
                {activeItems[index] ? (
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
        onHide={handleModalCancel} // 알림 끄기
        onSave={handleModalSave} // 알림 켜기
        values={modalValues}
        setValues={setModalValues}
      />

      <style>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        div::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
