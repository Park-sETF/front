import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import api from '~/lib/apis/auth';

export default function MyReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await api.get(`/userinfo/myreport/${id}`);
        setReportData(response.data);
  
      } catch {
        setError(true); // 에러 발생 시 에러 상태를 true로 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
  
    fetchReportData();
  }, [id]);
  

  // 로딩 상태 처리
  if (loading) {
    return <div>로딩 중입니다...</div>;
  }


  // 에러가 떴을 경우 멘트 처리 
  if (error) {
    return (
      <div className="container mt-4" style={{ margin: '23px' }}>
        <h1 className="fw-bold" style={{ fontSize: '18.5px', lineHeight: '1.5', marginBottom: 0 }}>
          투자 데이터가 없습니다
        </h1>
        <p style={{ fontSize: '13px', color: '#8E8E93', marginTop: '6px' }}>
          나만의 ETF를 만들고 투자 수익률을 확인해보세요!
        </p>
      </div>
    );
  }

  // 정규화 함수
  const normalize = (value, min, max) => {
    if (value >= 0) {
      return (value / max) * 100;
    } else {
      return (value / Math.abs(min)) * 100;
    }
  };

  const yields = reportData.stockPerformances.map((stock) => stock.weightedYield);
  const maxYield = Math.max(...yields);
  const minYield = Math.min(...yields);

  const highestPerformance = reportData.stockPerformances.reduce((prev, current) => {
    return prev.weightedYield > current.weightedYield ? prev : current;
  }, reportData.stockPerformances[0]);

  return (
    <div className="container mt-4" style={{ margin: '19px' }}>
      <h1 className="fw-bold" style={{ fontSize: '19px', lineHeight: '1.5', marginBottom: 0 }}>
        {reportData.nickName}님의 투자 중 <br />
        가장 수익률이 높은 ETF
      </h1>
      <p style={{ fontSize: '11px', color: '#8E8E93', marginTop: '6px' }}>
        ETF 내에서 수익에 중요한 역할을 하는 종목을 분석했어요.
      </p>

      <div>
        <div>
          <div className="d-flex align-items-center mb-3">
            <h3 className="fw-bold me-2 mb-0" style={{ fontSize: '17px', fontWeight: '600' }}>
              {reportData.portfolioTitle}
            </h3>
            <span
              style={{
                backgroundColor: reportData.portfolioRevenue > 0 ? '#FFC5C5' : '#CDE1FD',
                color: reportData.portfolioRevenue > 0 ? '#ff3b3b' : '#0051c7',
                padding: '4px 8px',
                fontWeight: 'bold',
                fontSize: '11px',
                borderRadius: '5px'
              }}
            >
              수익률 {(reportData.portfolioRevenue || 0).toFixed(2)}%
            </span>
          </div>

          <div
            className="container-fluid py-2"
            style={{ maxWidth: '280px', marginLeft: 0, paddingLeft: '3px' }}
          >
            {reportData.stockPerformances.map((stock, index) => {
              const normalizedYield = normalize(stock.weightedYield, minYield, maxYield);

              return (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      width: '90px',
                      paddingRight: '20px',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      flexShrink: 0,
                      lineHeight: '1.2'
                    }}
                  >
                    <span className="fw-bold" style={{ fontSize: '14px' }}>
                      {stock.stockName}
                    </span>
                  </div>
                  <div
                    className="flex-grow-1 position-relative"
                    style={{ height: '25px' }}
                  >
                    <div
                      className={`growBar-${index}`}
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: normalizedYield > 0 ? '70%' : `calc(70% - ${Math.abs(normalizedYield) * 0.6}%)`,
                        width: `${Math.abs(normalizedYield) * 0.6}%`,
                        height: '70%',
                        backgroundColor: normalizedYield > 0 ? '#FF6B6B' : '#4A7DFF',
                        borderRadius: '4px',
                        animation: `growBar-${index} 1s ease-out forwards`,
                      }}
                    />
                    <style>
                      {`
                        @keyframes growBar-${index} {
                          from {
                            width: 0;
                          }
                          to {
                            width: ${Math.abs(normalizedYield) * 0.6}%;
                          }
                        }
                      `}
                    </style>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="d-flex align-items-center text-muted mb-2"
        style={{ fontSize: '13px', maxWidth: '320px' }}
      >
        <span className="text-warning me-2">🔥</span>
        <span>
          {highestPerformance.stockName} 종목이 현재 가장 높은 수익률을 보이고 있어요!
        </span>
      </div>
    </div>
  );
}
