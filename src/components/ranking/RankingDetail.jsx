import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import RankingUserInfo from "~/components/ranking/RankingUserInfo";
import List from "~/components/Home/List";

export default function RankingDetail() {
  const { userId } = useParams(); // URL에서 userId 추출
  const [etfItems, setEtfItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/userinfo/etf/list/${userId}`) // userId를 사용
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch ETF data");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.portfolios.map((portfolio) => ({
          portfolioId: portfolio.portfolioId,
          name: portfolio.title,
          rate: portfolio.revenue,
          isPositive: portfolio.revenue > 0,
        }));
        setEtfItems(transformedData);
      })
      .catch((error) => console.error("Error fetching ETF data:", error));
  }, [userId]);

  const handleItemClick = (etfItem) => {
    navigate(`/etf/detail/${etfItem.portfolioId}`, { state: etfItem });
  };

  return (
    <div style={{ minWidth: "375px", maxWidth: "430px", margin: "0 auto" }}>
      <RankingUserInfo />
      <h3 style={{ margin: "20px", color: "#333" }}>ETF 목록</h3>
      <List items={etfItems} onItemClick={handleItemClick} />
    </div>
  );
}
