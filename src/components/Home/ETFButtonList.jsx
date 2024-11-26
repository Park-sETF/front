import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import PercentageModal from './PercentageModal';

export default function ETFButtonList({ items, onItemClick }) {

  //각 항목의 알림 상태를 저장하는 객체 
  const [activeItems, setActiveItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null); // 현재 선택된 항목의 인덱스 저장

  const handleToggle = (index, event) => {
    event.stopPropagation();
    setCurrentIndex(index); // 현재 항목 설정
    setShowModal(true); // 모달 열기
  };

  const handleModalSave = () => {
    // "알림 켜기" 버튼 클릭 시 알림 활성화 true 일 경우 파란색 버튼
    setActiveItems((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));
    setShowModal(false); // 모달 닫기
  };

  const handleModalCancel = () => {
    // "알림 끄기" 버튼 클릭 시 알림 비활성화 false 인 경우 회색 버튼 
    setActiveItems((prev) => ({
      ...prev,
      [currentIndex]: false,
    }));
    setShowModal(false); // 모달 닫기
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
            onClick={() => onItemClick(item)}
          >
            <span className="fw-medium" style={{ fontSize: '16px' }}>
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  color: item.isPositive ? '#ff3b3b' : '#0051c7',
                  fontSize: '16px',
                }}
              >
                수익률 {item.isPositive ? '+' : '-'}
                {item.rate}%
              </span>

              {/* 알림 버튼 */}
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
          </div>
        ))}
      </div>

      <PercentageModal
        show={showModal}
        //알림 끄기 
        onHide={handleModalCancel}
        //알림 켜기 
        onSave={handleModalSave}
      />

      <style>{`
        /* Custom scrollbar styling */
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

        @media (min-width: 375px) and (max-width: 430px) {
          .fw-medium {
            font-weight: 500;
          }
        }
      `}</style>
    </div>
  );
}
