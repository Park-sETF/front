import RankingUserInfo from '~/components/Ranking/RankingUserInfo';
import List from '~/components/Home/List';


export default function RankingDetail() {
  // ETF 데이터 (하드코딩)
  const etfItems = [
    { name: "우량주가 좋아", rate: 35, isPositive: true },
    { name: "스타트업", rate: 20, isPositive: true },
    { name: "개미개미", rate: -4, isPositive: false },
    { name: "개미개미", rate: -4, isPositive: false },
    { name: "개미개미", rate: -4, isPositive: false },
  ];

  return (
    <div style={{ minWidth: "375px", maxWidth: "430px", margin: "0 auto" }}>
      {/* 유저 정보 컴포넌트 */}
      <RankingUserInfo />
      {/* ETF 목록 */}
      <h3 style={{ margin: "20px", color: "#333" }}>준기님의 ETF 목록</h3>
      <List items={etfItems} />
    </div>
  );
}
