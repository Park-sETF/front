import { useState,useEffect } from 'react';
import Chart from './Chart';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StockTab({
  volumeList,
  profitList,
  fluctuationList,
  marketcapList,
}) {
  const [activeTab, setActiveTab] = useState('거래대금');

  // 컴포넌트가 처음 로드될 때 기본 활성화 탭 설정
  useEffect(() => {
    setActiveTab('거래대금'); // 초기 탭을 명시적으로 설정
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      {/* 탭 버튼 */}
      <div
        className="d-flex justify-content-between border-bottom"
        style={{ margin: '23px', marginTop: 0, marginBottom: 0 }}
      >
        {/* 거래대금 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '거래대금' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('거래대금')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '거래대금' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          거래대금
          {activeTab === '거래대금' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

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

        {/* 급상승 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '급상승' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('급상승')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '급상승' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          급상승
          {activeTab === '급상승' && (
            <div
              className="position-absolute bottom-0 start-0 w-100"
              style={{
                height: '2px',
                backgroundColor: '#000',
              }}
            />
          )}
        </button>

        {/* 급하락 버튼 */}
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '급하락' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('급하락')}
          style={{
            color: '#666',
            fontSize: '16px',
            fontWeight: activeTab === '급하락' ? '600' : '400',
            flexGrow: 1,
            whiteSpace: 'nowrap',
          }}
        >
          급하락
          {activeTab === '급하락' && (
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
        {activeTab === '거래대금' && <Chart stocks={volumeList} />}
        {activeTab === '거래량' && <Chart stocks={profitList} />}
        {activeTab === '급상승' && <Chart stocks={fluctuationList} />}
        {activeTab === '급하락' && <Chart stocks={marketcapList} />}
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
