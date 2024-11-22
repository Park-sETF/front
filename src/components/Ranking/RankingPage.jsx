import { useEffect, useState } from 'react';
import axios from 'axios';

const RankingContent = () => {
  const [rankingData, setRankingData] = useState([]);

  const subscriberId = 1; // 현재 로그인한 사용자의 ID 임시로둠

  const fetchRankingData = async () => {
    try {
      // 1. 구독 목록 가져오기
      const subscriptionsResponse = await axios.get(`/list/${subscriberId}`);
      const subscriptions = subscriptionsResponse.data.map((sub) => sub.publisher_id);

      // 2. 랭킹 데이터 가져오기
      const rankingsResponse = await axios.get('/user/ranking');
      const data = rankingsResponse.data.map((item, index) => ({
        userId: item.userId,
        name: item.nickname,
        image: item.image,
        amount: `+${item.totalRevenue.toLocaleString()}원`,
        percentage: `${item.revenuePercentage.toFixed(1)}%`,
        subscribed: subscriptions.includes(item.userId), // 구독 목록에 포함 여부로 초기 상태 설정
        color: getColorByIndex(index),
      }));

      setRankingData(data);
    } catch (error) {
      console.error('데이터 불러오기 오류', error);
    }
  };

  // 유저 이미지가 없을 경우 기본 배경 색상
  const getColorByIndex = (index) => {
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
    return colors[index % colors.length];
  };

  // 구독 상태 변경 함수
  const toggleSubscription = async (index, userId, isSubscribed) => {
    try {
      if (isSubscribed) {
        // 구독취소 
        await axios.delete(`/subscribe/${subscriberId}/${userId}`);
      } else {
        // 구독 
        await axios.post(`/subscribe/${subscriberId}/${userId}`);
      }

  
      setRankingData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, subscribed: !item.subscribed } : item
        )
      );
    } catch (error) {
      console.error(isSubscribed ? '구독 취소 오류' : '구독 오류', error);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <div style={{ padding: '0 23px' }}>
      <p style={{ fontSize: '14px', color: '#666666', marginTop: '16px', marginBottom: '16px', lineHeight: '1.5' }}>
        <span style={{ display: 'block' }}>최근 7일간</span>
        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>수익률이 제일 높아요</span>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {rankingData.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '12px', width: '16px' }}>
              {index + 1}
            </span>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: item.image ? 'transparent' : item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginRight: '12px',
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt="유저 프로필"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                  {item.name.charAt(0)}
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'medium' }}>{item.name}</div>
              <div style={{ fontSize: '14px', color: '#FF3B30' }}>{item.amount}</div>
              <div style={{ fontSize: '12px', color: '#666666' }}>({item.percentage})</div>
            </div>
            <button
              onClick={() => toggleSubscription(index, item.userId, item.subscribed)}
              style={{
                backgroundColor: item.subscribed ? '#F2F2F7' : '#007AFF',
                color: item.subscribed ? '#3A3A3C' : 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 'medium',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = item.subscribed ? '#E0E0E0' : '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = item.subscribed ? '#F2F2F7' : '#007AFF';
              }}
            >
              {item.subscribed ? '구독취소' : '구독'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingContent;
