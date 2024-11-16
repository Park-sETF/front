import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronRight } from 'react-bootstrap-icons';

export default function ETFList() {
  const items = [
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '스타트업', rate: 20, isPositive: true },
    { name: '개미게미', rate: 4, isPositive: false },
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '스타트업', rate: 20, isPositive: true },
    { name: '개미게미', rate: 4, isPositive: false },
    // Add more items to test scrolling
    { name: '우량주가 좋아', rate: 35, isPositive: true },
    { name: '스타트업', rate: 20, isPositive: true },
    { name: '개미게미', rate: 4, isPositive: false },
  ];

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div 
        className="px-3"
        style={{ 
          height: '400px', // Adjust this height as needed
          overflowY: 'auto',
          margin: '20px',
          marginTop: '3px'
        }}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className="d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-medium" style={{ fontSize: '16px' }}>
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span 
                style={{ 
                  color: item.isPositive ? '#ff3b3b' : '#0051c7',
                  fontSize: '16px'
                }}
              >
                수익률 {item.isPositive ? '+' : '-'}{item.rate}%
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