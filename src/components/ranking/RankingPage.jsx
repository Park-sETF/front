import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RankingContent.module.css"; // CSS 모듈을 임포트
import api from "~/lib/apis/auth";


const images = [
  "/images/profile/doremi.png",
  "/images/profile/lay.png",
  "/images/profile/pli.png",
  "/images/profile/moli.png",
  "/images/profile/sol.png",
  "/images/profile/shoo.png",
  "/images/profile/rino.png",
  "images/ink.png",
];

const RankingContent = () => {
  const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate();
  const subscriberId = localStorage.getItem("id");
  // const subscriberId = 1; // 테스트용 고정 값 구독하는사람,유저아이디

  const fetchRankingData = async () => {
    try {
      const subscriptionsResponse = await api.get(
        `/subscribe/list/${subscriberId}`
      );

      const subscriptions = Array.isArray(subscriptionsResponse.data)
        ? subscriptionsResponse.data.map((sub) => sub.publisher_id)
        : [];

      const rankingsResponse = await api.get("/etf/user/ranking");
      const data = rankingsResponse.data.map((item,index) => ({
        userId: item.userId,
        name: item.nickname,
        image: images[index % images.length], // 순서대로 이미지를 배치
        totalRevenue: item.totalRevenue,
        revenuePercentage: item.revenuePercentage || 0, // 기본값 0 설정
        subscribed: subscriptions.includes(item.userId),
      }));

      setRankingData(data);
    } catch (error) {
      console.error("데이터 불러오기 오류", error);
    }
  };

  const toggleSubscription = async (index, userId, isSubscribed) => {
    try {
      if (isSubscribed) {
        await api.delete(`/subscribe/${subscriberId}/${userId}`);
      } else {
        await api.post(`/subscribe/${subscriberId}/${userId}`);
      }

      setRankingData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, subscribed: !item.subscribed } : item
        )
      );
    } catch (error) {
      console.error(isSubscribed ? "구독 취소 오류" : "구독 오류", error);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/ranking-detail/${userId}`);
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.header} style={{marginBottom:'17px'}}>
        <span>최근 7일간</span>
        <span className={styles.title}>수익률이 제일 높아요</span>
      </p>
      <ul className={styles.list}>
        {rankingData.map((item, index) => (
          <li
            key={item.userId} 
            className={styles.listItem}
            onClick={() => handleUserClick(item.userId)}
          >
            <span className={styles.rank}>{index + 1}</span>
            <div className={styles.avatarWrapper}>
              <img src={item.image} alt="유저 프로필" className={styles.avatar} />
            </div>
            <div className={styles.info}>
              <div className={styles.name} style={{fontSize: '15px',fontWeight: '500'}}>{item.name}</div>
              <div className={styles.revenue} style={{fontSize: '14px',fontWeight: '500'}}>
                <span
                  className={
                    item.totalRevenue > 0 ? styles.positive : styles.negative
                  }
                >
                  {item.totalRevenue > 0
                    ? `+${item.totalRevenue.toLocaleString()}원`
                    : `-${Math.abs(item.totalRevenue).toLocaleString()}원`}
                </span>
                <span className={
                  item.revenuePercentage > 0 ? styles.positive : styles.negative
                } style={{marginLeft: '3px'}}>
                  ({item.revenuePercentage.toFixed(1)}%) {/* 기본값 보장 */}
                </span>
              </div>
            </div>
            <button
              className={`${styles.button} ${
                item.subscribed ? styles.subscribed : styles.notSubscribed
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSubscription(index, item.userId, item.subscribed);
              }}
              style={{
                color: 'white',
                backgroundColor: item.subscribed ? '#8C97A7' : '#4B7BF5',
              }}
            >
              {item.subscribed ? "구독취소" : "구독"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingContent;

