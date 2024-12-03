import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import List from "~/components/home/List";
import RankingUserInfo from "./RankingUserInfo";

export default function RankingDetail() {
  const { userId } = useParams();
  const [etfItems, setEtfItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/userinfo/etf/list/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch ETF data");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = (data.portfolios || []).map((portfolio) => ({
          portfolioId: portfolio.portfolioId || "unknown",
          name: portfolio.title || "Untitled",
          rate: typeof portfolio.revenue === "number" ? portfolio.revenue : 0, 
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
      <RankingUserInfo userId={userId} />
      <h3 className="px-3" style={{ margin: "20px", color: "#333" }}>ETF 목록</h3>
      <List items={etfItems} onItemClick={handleItemClick} />
    </div>
  );
}
