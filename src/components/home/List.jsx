import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronRight } from "react-bootstrap-icons";

export default function List({ items, onItemClick }) {
  // 구독 목록이 없을 때 처리
  if (!items || items.length === 0) {
    return (
      <div className="container mt-4" style={{ margin: "23px" }}>
        <h1
          className="fw-bold"
          style={{
            fontSize: "18.5px",
            lineHeight: "1.5",
            marginBottom: 0,
          }}
        >
          구독한 사람이 없습니다
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "#8E8E93",
            marginTop: "6px",
          }}
        >
          포트폴리오 메뉴에 들어가서 구독을 해보세요!
        </p>
      </div>
    );
  }

  // 구독 목록이 있을 때 처리
  return (
    <div
      style={{
        minWidth: "375px",
        maxWidth: "430px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className="px-4"
        style={{
          margin: "20px",
          marginTop: "3px",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.userId || index}
            className="d-flex justify-content-between align-items-center"
            style={{
              paddingTop: "1.1rem",
              paddingBottom: "1.1rem",
              cursor: "pointer",
            }}
            onClick={() => onItemClick(item)}
          >
            <span
              style={{
                fontSize: "16px",
                width: "80px",
                overflow: "hidden",
              }}
            >
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  color: item.isPositive ? "#ff3b3b" : "#0051c7",
                  fontSize: "16px",
                  width: "150px",
                }}
              >
                수익률 {item.isPositive ? "+" : ""}
                {item.rate.toFixed(2)}%
              </span>
              <ChevronRight size={20} style={{ color: "#666" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
