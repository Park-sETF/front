import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronRight } from "react-bootstrap-icons";

export default function List({ items, onItemClick }) {
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
        className="px-3"
        style={{
          margin: "20px",
          marginTop: "3px",
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.portfolioId || index} // 고유 키로 설정
            className="d-flex justify-content-between align-items-center"
            style={{
              paddingTop: "1.1rem",
              paddingBottom: "1.1rem",
              cursor: "pointer",
            }}
            onClick={() => onItemClick(item)} // 전체 객체 전달
          >
            <span className="fw-medium" style={{ fontSize: "16px" }}>
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  color: item.isPositive ? "#ff3b3b" : "#0051c7",
                  fontSize: "16px",
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

