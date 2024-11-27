import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function List({ items, onItemClick }) {
  const navigate = useNavigate();

  console.log(">>>>>>>>" + JSON.stringify(items))
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
            onClick={() => {
              navigate(`/etf/detail/${items[index].portfolioId}`)
              console.log("$$$$$$$" + JSON.stringify(items))
            }}
          >
            <span className="fw-medium" style={{ fontSize: '16px' }}>
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  color: item.revenue >= 0 ? '#ff3b3b' : '#0051c7',
                  fontSize: '16px',
                }}
              >
                수익률 {item.revenue >= 0 ? '+' : ''}
                {item.revenue.toFixed(2)}%
              </span>
              <ChevronRight size={20} style={{ color: '#666' }} />
            </div>
          </div>
        ))}
      </div>

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
