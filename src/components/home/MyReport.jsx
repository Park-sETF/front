import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MyReport() {
  const stocks = [
    { name: '네이처셀', value: 100 },
    { name: 'SK 하이닉스', value: 80 },
    { name: '삼성전자', value: 50 },
    { name: '솔트웨어', value: -20 },
    { name: '삼성전자', value: -40 },
    { name: 'SK 하이닉스', value: -60 },
    { name: '네이처셀', value: -90 },
  ];

  return (
    <div className="container mt-4" style={{ margin: '23px' }}>
      <h1 className="fw-bold" style={{ fontSize: '20px', lineHeight: '1.5', marginBottom: 0 }}>
        이하늘님의 투자 중 <br />
        가장 수익률이 높은 ETF
      </h1>
      <p style={{ fontSize: '12px', color: '#8E8E93', marginTop: '6px' }}>
        ETF 내에서 수익에 중요한 역할을 하는 종목을 분석했어요.
      </p>

      <div>
        <div>
          <div className="d-flex align-items-center mb-3">
            <h3 className="fw-bold me-2 mb-0" style={{ fontSize: '18px', fontWeight: '600' }}>
              우량주가 좋아
            </h3>
            <span
              className="badge"
              style={{
                backgroundColor: '#FFF1F1',
                color: '#FF4646',
                padding: '4px 8px',
                fontWeight: 'bold',
                fontSize: '10px',
              }}
            >
              수익률 10%
            </span>
          </div>
          <div className="container-fluid py-2" style={{ maxWidth: '300px', marginLeft: 0, paddingLeft: '3px' }}>
            {stocks.map((stock, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <div style={{ width: '150px', paddingRight: '20px' }}>
                  <span className="fw-bold" style={{ fontSize: '16px' }}>
                    {stock.name}
                  </span>
                </div>
                <div className="flex-grow-1 position-relative" style={{ height: '30px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: stock.value > 0 ? '50%' : `calc(50% - ${Math.abs(stock.value)}%)`,
                      width: '0%',
                      height: '80%',
                      backgroundColor: stock.value > 0 ? '#4A7DFF' : '#FF6B6B',
                      borderRadius: '4px',
                      animation: `growBar-${index} 1s ease-out forwards`,
                      transformOrigin: stock.value > 0 ? 'left' : 'right',
                    }}
                  />
                  <style>
                    {`
                      @keyframes growBar-${index} {
                        from {
                          width: 0%;
                        }
                        to {
                          width: ${Math.abs(stock.value)}%;
                        }
                      }
                    `}
                  </style>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center text-muted mb-2" style={{ fontSize: '14px' }}>
        <i className="bi bi-arrow-right me-2"></i>
        <span className="text-warning me-2">🔥</span>
        <span>삼성전자가 현재 수익률의 30%를 차지하고 있어요!</span>
      </div>
    </div>
  );
}
