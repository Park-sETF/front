import { useEffect, useState } from 'react';
import axios from 'axios';

const RankingContent = () => {
  const [rankingData, setRankingData] = useState([]);

  const fetchRankingData = async () => {
    try {
      const response = await axios.get('/user/ranking'); 
      const data = response.data.map((item, index) => ({
        name: item.nickname,
        image: item.image, 
        amount: `+${item.totalRevenue.toLocaleString()}원`, 
        percentage: `${item.revenuePercentage.toFixed(1)}%`, 
        subscribed: false, 
        color: getColorByIndex(index), 
      }));
      setRankingData(data);
    } catch (error) {
      console.error('데이터 불러오기 오류', error);
    }
  };

  //유저 이미지가 없을 경우 기본 배경 색상
  const getColorByIndex = (index) => {
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
    return colors[index % colors.length];
  };


  useEffect(() => {
    fetchRankingData();
  }, []);

  // 구독 상태 변경 함수
  const toggleSubscription = (index) => {
    setRankingData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, subscribed: !item.subscribed } : item
      )
    );
  };

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
                backgroundColor: item.image ? 'transparent' : item.color, // 이미지가 없을 경우 색상 적용
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
              onClick={() => toggleSubscription(index)}
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
                e.target.style.color = item.subscribed ? '#3A3A3C' : 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = item.subscribed ? '#F2F2F7' : '#007AFF';
                e.target.style.color = item.subscribed ? '#3A3A3C' : 'white';
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
