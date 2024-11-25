import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RankingUserInfo from "~/components/Ranking/RankingUserInfo";
import List from "~/components/Home/List";

export default function RankingDetail() {
  const [etfItems, setEtfItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 ID (예시로 하드코딩)
    const userId = 1;

    // 서버에서 ETF 데이터 가져오기
    fetch(`/api/userinfo/etf/list/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch ETF data");
        }
        return response.json();
      })
      .then((data) => {
        // 서버에서 받은 데이터를 프론트에서 사용하도록 변환
        const transformedData = data.portfolios.map((portfolio) => ({
          portfolioId: portfolio.portfolioId, // 상세 페이지로 전달할 ID
          name: portfolio.title,
          rate: portfolio.revenue,
          isPositive: portfolio.revenue > 0, // 양수/음수 처리
        }));
        setEtfItems(transformedData);
      })
      .catch((error) => console.error("Error fetching ETF data:", error));
  }, []);

  // 각 ETF 클릭 시 상세 페이지 이동
  const handleItemClick = (etfItem) => {
    // `portfolioId`를 함께 상세 페이지로 전달
    navigate(`/etf/detail/${etfItem.portfolioId}`, { state: etfItem });
  };

  return (
    <div style={{ minWidth: "375px", maxWidth: "430px", margin: "0 auto" }}>
      {/* 유저 정보 컴포넌트 */}
      <RankingUserInfo />
      {/* ETF 목록 */}
      <h3 style={{ margin: "20px", color: "#333" }}>준기님의 ETF 목록</h3>
      <List
        items={etfItems}
        onItemClick={handleItemClick} // 항목 클릭 시 상세 페이지로 이동
      />
    </div>
  );
}
