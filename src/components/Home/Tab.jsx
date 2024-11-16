import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tab() {
  const [activeTab, setActiveTab] = useState('구독 목록');

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between border-bottom" style={{margin:'23px',marginTop:0}}>
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '내 거래' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('내 거래')}
          style={{ 
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '내 거래' ? '600' : '400'
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
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '나의 ETF' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('나의 ETF')}
          style={{ 
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '나의 ETF' ? '600' : '400'
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
        <button
          className={`btn btn-link text-decoration-none px-3 py-2 position-relative ${
            activeTab === '구독 목록' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('구독 목록')}
          style={{ 
            color: '#666',
            fontSize: '18px',
            fontWeight: activeTab === '구독 목록' ? '600' : '400'
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

      <style jsx>{`
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