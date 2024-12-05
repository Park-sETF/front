import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth';

export default function RankingUserInfo({ userId }) {
  const [userData, setUserData] = useState(null);
  const [profitRate, setProfitRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const images = [
    '/images/profile/doremi.png',
    '/images/profile/lay.png',
    '/images/profile/pli.png',
    '/images/profile/moli.png',
    '/images/profile/sol.png',
    '/images/profile/shoo.png',
    '/images/profile/rino.png',
    'images/ink.png',
  ];

  const gradeImages = [
    '/images/grade/BRONZE.png',
    '/images/grade/SILVER.png',
    '/images/grade/GOLD.png',
    '/images/grade/VIP.png',
  ];

  useEffect(() => {
    api
      .get(`/userinfo/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('사용자 정보를 불러올 수 없습니다.');
      });
  }, []);

  useEffect(() => {
    api
      .get(`/userinfo/${userId}/revenue-percentage`)
      .then((response) => {
        setProfitRate(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('수익률 정보를 불러올 수 없습니다.');
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {userData ? (
        <div
          className="px-3 py-4"
          style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ margin: '0 24px' }}
          >
            <div className="d-flex flex-column gap-2">
              <span className="fw-bold" style={{ fontSize: '26px' }}>
                {userData.nickname}
                <img
                  src={gradeImages[userData.level - 1]}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: '25px',
                    height: '25px',
                    objectFit: 'cover',
                    marginLeft: '5px',
                    marginBottom: '3px'                  }}
                  onClick={() => {
                    navigate(`/grade?level=${userData.level}`);
                  }}
                />
              </span>
              <div className="d-flex gap-3">
                <span
                  style={{
                    color: '#666',
                    fontSize: '14px',
                  }}
                >
                  구독자 {userData.subscriberCount}
                </span>
                <span
                  style={{
                    color: profitRate > 0 ? '#ff3b3b' : '#0051c7',
                    fontSize: '14px',
                  }}
                >
                  수익률 {profitRate > 0 ? '+' : ''}
                  {profitRate}%
                </span>
              </div>
            </div>

            <img
              src={images[userId % images.length]}
              alt="Profile"
              className="rounded-circle"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
