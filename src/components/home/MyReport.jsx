import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  // 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // 포트폴리오가 없을 경우 처리
  if (!reportData.stockPerformances || reportData.stockPerformances.length === 0) {
    return (
      <div className="container mt-4" style={{ margin: '23px' }}>
        <h1 className="fw-bold" style={{ fontSize: '19px', lineHeight: '1.5', marginBottom: 0 }}>
          {reportData.nickName}님의 투자 데이터가 없습니다
        </h1>
        <p style={{ fontSize: '11px', color: '#8E8E93', marginTop: '6px' }}>
          포트폴리오를 추가하고 투자 수익률을 확인해 보세요!
        </p>
      </div>
    );
  }

  // 정규화 함수; 수익률을 -100% 에서 +100%로 정규화 
  const normalize = (value, min, max) => {
    if (value >= 0) {
      // 양수: 0 ~ 100%로 정규화
      return (value / max) * 100;
    } else {
      // 음수: 0 ~ -100%로 정규화
      return (value / Math.abs(min)) * 100;
    }
  };

  // 최대/최소값 계산 
  const yields = reportData.stockPerformances.map(stock => stock.weightedYield);
  const maxYield = Math.max(...yields); // 최대값 (양수)
  const minYield = Math.min(...yields); // 최소값 (음수)

  // 최대 수익률을 가진 종목 찾기
  const highestPerformance = reportData.stockPerformances.reduce((prev, current) => {
    return prev.weightedYield > current.weightedYield ? prev : current;
  }, reportData.stockPerformances[0]);

  return (
    <div className="container mt-4" style={{ margin: '23px' }}>
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
              className="badge"
              style={{
                backgroundColor: reportData.portfolioRevenue > 0 ? '#FFC5C5' : '#CDE1FD',
                color: reportData.portfolioRevenue > 0 ? '#ff3b3b' : '#0051c7',
                padding: '4px 8px',
                fontWeight: 'bold',
                fontSize: '9px',
              }}
            >
              {/* 기본 값 설정 */}
              수익률 {(reportData.portfolioRevenue || 0).toFixed(2)}%
            </span>
          </div>

          <div className="container-fluid py-2" style={{  maxWidth: '280px', marginLeft: 0, paddingLeft: '3px'}}>
            {reportData.stockPerformances.map((stock, index) => {
              const normalizedYield = normalize(stock.weightedYield, minYield, maxYield); // 정규화

              return (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div style={{ width: '150px', paddingRight: '20px' }}>
                    <span className="fw-bold" style={{ fontSize: '15px'}}>
                      {stock.stockName}
                    </span>
                  </div>
                  {/* height 가 막대그래프 높이  */}
                  <div className="flex-grow-1 position-relative" style={{ height: '25px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        // 막대가 중앙에서 확장 (양수인 경우... 중앙에서 오른쪽으로 확장)
                        left: normalizedYield > 0 ? '50%' : `calc(50% - ${Math.abs(normalizedYield)}%)`,
                        // 막대의 길이를 정규화된 수익률의 절대값으로 설정 
                        width: `${Math.abs(normalizedYield)}%`,
                        height: '70%',
                        // 비율이 양수면 빨간색, 음수면 파란색 
                        backgroundColor: normalizedYield > 0 ? '#FF6B6B' : '#4A7DFF',
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
              );
            })}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center text-muted mb-2" style={{ fontSize: '13px' }}>
        <span className="text-warning me-2">🔥</span>
        <span>
          {highestPerformance.stockName} 종목이 현재 가장 높은 수익률을 보이고 있어요!
        </span>
      </div>
    </div>
  );
}
