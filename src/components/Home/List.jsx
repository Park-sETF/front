import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronRight } from 'react-bootstrap-icons';

// props로 리스트 전달
export default function List({ items }) {
  return (
    <div
      style={{
        minWidth: '375px',
        maxWidth: '430px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column', // 수직 레이아웃
        height: '100%', // 부모 높이에 맞추기
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
            className="d-flex justify-content-between align-items-center "
            style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem' }}
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
              <ChevronRight size={20} style={{ color: '#666' }} />
            </div>
          </div>
        ))}
      </div>

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
