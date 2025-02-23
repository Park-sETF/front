import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth'


export default function UserInfo() {
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  const navigate = useNavigate();

  const handleMembership = ()=>{
    navigate(`/membership`);

  };

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await api.get(`/userinfo/${id}`);
        setUserData(response.data); 
      } catch (err) {
        console.error(err);
        setError('사용자 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData(); 
  }, []);

  

  if (loading) {
    return <div>로딩 중...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="px-3 py-4" style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-start mb-2" 
        style={{ margin: '0 24px'}}>
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fw-bold" style={{ fontSize: '26px' }}>{userData.nickname}</span>
            <div>
              <span className="badge" style={{ backgroundColor: '#e8f3ff', color: '#0051c7', fontSize: '12px', padding: '4px 8px' }} 
              onClick={handleMembership}>
                {userData.member ? '쏠 회원' : '비회원'}
              </span>
              <span className="badge rounded-pill" style={{ color: '#333', fontSize: '10px', padding: '4px 8px' }}>
                구독자 {userData.subscriberCount}
              </span>
            </div>
          </div>
        </div>
        <img
          src="/images/ink.png"
          alt="Profile"
          className="rounded-circle"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
      </div>
      <div className="mt-3" style={{ margin: '24px', marginBottom: 0 }}>
        <div className="text-secondary mb-1" style={{ fontSize: '14px' }}>총 투자금액</div>
        <div className="d-flex align-items-baseline gap-2">
          <span className="fs-4 fw-bold" style={{ color: '#333' }}>
            {(userData.asset ?? 0).toLocaleString()}원
          </span>
          <span
            style={{
              color: userData.revenue >= 0 ? '#ff3b3b' : '#0051c7', 
              fontSize: '14px',
              marginLeft: '10px',
            }}
          >
            수익률 {userData.revenue?.toFixed(2) ?? '0'}%
          </span>
        </div>
      </div>
    </div>
  );
}
