import { useState,useEffect } from 'react';
import Chart from './Chart';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StockTab({
  volumeList,
  profitList,
  fluctuationList,
  marketcapList,
}) {
  const [activeTab, setActiveTab] = useState('거래량');

  // 컴포넌트가 처음 로드될 때 기본 활성화 탭 설정
  useEffect(() => {
    setActiveTab('거래량'); // 초기 탭을 명시적으로 설정
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      {/* 탭 버튼 */}
      <div
        className="d-flex justify-content-between border-bottom"
      >
        {/* 거래량 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '거래량' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('거래량')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '거래량' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          거래량
          {activeTab === '거래량' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 수익자산 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '수익자산' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('수익자산')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '수익자산' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          수익자산
          {activeTab === '수익자산' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 등락률 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '등락률' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('등락률')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '등락률' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          등락률
          {activeTab === '등락률' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 시가총액 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '시가총액' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('시가총액')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '시가총액' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          시가총액
          {activeTab === '시가총액' && (
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

      <div>
        {activeTab === '거래량' && <Chart stocks={volumeList} />}
        {activeTab === '수익자산' && <Chart stocks={profitList} />}
        {activeTab === '등락률' && <Chart stocks={fluctuationList} />}
        {activeTab === '시가총액' && <Chart stocks={marketcapList} />}
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
