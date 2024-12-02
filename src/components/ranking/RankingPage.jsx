import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RankingContent.module.css"; // CSS 모듈을 임포트
import api from "~/lib/apis/auth";

function getRandomImage() {
  const images = [
    "/profile/chunsik.jpg",
    "/profile/doremi.webp",
    "/profile/lululala.webp",
    "/profile/moli.webp",
    "/profile/pli.webp",
    "/profile/rino.webp",
    "/profile/shoo.webp",
    "/profile/sol.jpg",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

const RankingContent = () => {
  const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate();
  const subscriberId = 1; // 테스트용 고정 값

  const fetchRankingData = async () => {
    try {
      const subscriptionsResponse = await api.get(
        `/subscribe/list/${subscriberId}`
      );

      const subscriptions = Array.isArray(subscriptionsResponse.data)
        ? subscriptionsResponse.data.map((sub) => sub.publisher_id)
        : [];

      const rankingsResponse = await api.get("/etf/user/ranking");
      const data = rankingsResponse.data.map((item) => ({
        userId: item.userId,
        name: item.nickname,
        image: item.image || getRandomImage(),
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
      <p className={styles.header}>
        <span>최근 7일간</span>
        <span className={styles.title}>수익률이 제일 높아요</span>
      </p>
      <ul className={styles.list}>
        {rankingData.map((item, index) => (
          <li
            key={item.userId} // index 대신 userId를 key로 사용
            className={styles.listItem}
            onClick={() => handleUserClick(item.userId)}
          >
            <span className={styles.rank}>{index + 1}</span>
            <div className={styles.avatarWrapper}>
              <img src={item.image} alt="유저 프로필" className={styles.avatar} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.revenue}>
                <span
                  className={
                    item.totalRevenue > 0 ? styles.positive : styles.negative
                  }
                >
                  {item.totalRevenue > 0
                    ? `+${item.totalRevenue.toLocaleString()}원`
                    : `-${Math.abs(item.totalRevenue).toLocaleString()}원`}
                </span>
                <span className={styles.percentage}>
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

