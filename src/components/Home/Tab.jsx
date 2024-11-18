import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './List';

export default function Tab() {
  const [activeTab, setActiveTab] = useState('구독 목록');

  const ETFList = [
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '스타트업', rate: 20, isPositive: true },
    { name: '개미게미', rate: 4, isPositive: false },
    { name: '개미게미', rate: 4, isPositive: false },
    { name: '스타트업', rate: 20, isPositive: true },
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '우량주가 좋아', rate: 35, isPositive: true },
  ];

  const SubscriberList = [
    { name: '장우진', rate: 2, isPositive: true },
    { name: '조인후', rate: 10, isPositive: true },
    { name: '이하늘', rate: 4, isPositive: false },
  ]

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      {/* 탭 버튼 */}
      <div
        className="d-flex justify-content-between border-bottom"
        style={{ margin: '23px', marginTop: 0, marginBottom:0}}
      >
        {/* 내 거래 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '내 거래' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('내 거래')}
          style={{
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '내 거래' ? '600' : '400',
          }}
        >
          내 거래
          {activeTab === '내 거래' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 나의 ETF 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '나의 ETF' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('나의 ETF')}
          style={{
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '나의 ETF' ? '600' : '400',
          }}
        >
          나의 ETF
          {activeTab === '나의 ETF' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 구독 목록 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '구독 목록' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('구독 목록')}
          style={{
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '구독 목록' ? '600' : '400',
          }}
        >
          구독 목록
          {activeTab === '구독 목록' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>
      </div>

      {/* 조건부 렌더링 */}
      <div>
        {activeTab === '내 거래' && <div></div>}
        {activeTab === '나의 ETF' && <List items={ETFList}/>} {/* 나의 ETF 탭 선택 시 ETFList 컴포넌트 렌더링 */}
        {activeTab === '구독 목록' && <List items={SubscriberList}/>}
      </div>

      <style>{`
        .btn-link:hover {
          color: #333 !important;
        }
        .btn-link.active {
          color: #000 !important;
        }
        @media (min-width: 375px) and (max-width: 430px) {
          .btn-link {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
