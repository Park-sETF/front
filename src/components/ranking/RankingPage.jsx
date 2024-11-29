import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RankingContent = () => {
  const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate(); // 네비게이션 훅 추가
  const subscriberId = localStorage.getItem('id'); // 현재 로그인한 사용자의 ID (임시 값)

  // 구독 목록과 랭킹 데이터를 가져오는 함수
  const fetchRankingData = async () => {
    try {
      // 구독 목록 가져오기
      const subscriptionsResponse = await api.get(
        `/api/subscribe/list/${subscriberId}`
      );

      const subscriptions = Array.isArray(subscriptionsResponse.data)
        ? subscriptionsResponse.data.map((sub) => sub.publisher_id)
        : []; // 데이터가 배열이 아니면 빈 배열 처리

      // 랭킹 데이터 가져오기
      const rankingsResponse = await api.get("/api/etf/user/ranking");
      const data = rankingsResponse.data.map((item, index) => ({
        userId: item.userId, // 수정된 필드명
        name: item.nickname,
        image: item.image,
        amount: `+${item.totalRevenue.toLocaleString()}원`,
        percentage: `${item.revenuePercentage.toFixed(1)}%`,
        subscribed: subscriptions.includes(item.userId), // 구독 여부
        color: getColorByIndex(index), // 기본 색상
      }));

      setRankingData(data);
    } catch (error) {
      console.error("데이터 불러오기 오류", error);
    }
  };

  // 유저 이미지가 없을 경우 기본 배경 색상
  const getColorByIndex = (index) => {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
    return colors[index % colors.length];
  };

  // 구독 상태 변경 함수
  const toggleSubscription = async (index, userId, isSubscribed) => {
    try {
      if (isSubscribed) {
        // 구독 취소 API 호출
        await api.delete(`/api/subscribe/${subscriberId}/${userId}`);
      } else {
        // 구독 API 호출
        await api.post(`/api/subscribe/${subscriberId}/${userId}`);
      }

      // 상태 업데이트
      setRankingData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, subscribed: !item.subscribed } : item
        )
      );
    } catch (error) {
      console.error(isSubscribed ? "구독 취소 오류" : "구독 오류", error);
    }
  };

  // 유저 클릭 시 상세 페이지로 이동
  const handleUserClick = (userId) => {
    navigate(`/ranking-detail/${userId}`); // 클릭한 유저의 userId를 전달
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <div style={{ padding: "0 23px" }}>
      <p
        style={{
          fontSize: "14px",
          color: "#666666",
          marginTop: "16px",
          marginBottom: "16px",
          lineHeight: "1.5",
        }}
      >
        <span style={{ display: "block" }}>최근 7일간</span>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          수익률이 제일 높아요
        </span>
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {rankingData.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
              cursor: "pointer", 
            }}
            onClick={() => handleUserClick(item.userId)} 
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginRight: "12px",
                width: "16px",
              }}
            >
              {index + 1}
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: item.image ? "transparent" : item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                marginRight: "12px",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt="유저 프로필"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name.charAt(0)}
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "medium",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#FF3B30",
                }}
              >
                {item.amount}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#666666",
                }}
              >
                ({item.percentage})
              </div>
            </div>
            {/* 구독 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 설정
                toggleSubscription(index, item.userId, item.subscribed);
              }}
              style={{
                backgroundColor: item.subscribed ? "#FF3B30" : "#34A853",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {item.subscribed ? "구독 취소" : "구독"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingContent;
