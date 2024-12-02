import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import PercentageModal from "./PercentageModal";
import { ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function ETFButtonList({ items }) {
  const navigate = useNavigate();

  const [activeItems, setActiveItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleToggle = (index, event) => {
    event.stopPropagation();
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleModalSave = () => {
    setActiveItems((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setActiveItems((prev) => ({
      ...prev,
      [currentIndex]: false,
    }));
    setShowModal(false);
  };

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
            key={index}
            className="d-flex justify-content-between align-items-center"
            style={{
              paddingTop: "1.1rem",
              paddingBottom: "1.1rem",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/etf/my-detail/${item.portfolioId || "unknown"}`)
            }
          >
            <span className="fw-medium" style={{ fontSize: "16px" }}>
              {item.name}
            </span>
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  color: item.revenue >= 0 ? "#ff3b3b" : "#0051c7",
                  fontSize: "16px",
                }}
              >
                {/* 안전한 toFixed 호출 */}
                수익률 {item.revenue >= 0 ? "+" : ""}
                {(typeof item.revenue === "number" ? item.revenue : 0).toFixed(
                  2
                )}
                %
              </span>
              <ChevronRight size={20} style={{ color: "#666" }} />

              {/* 알림 버튼 */}
              <button
                onClick={(e) => handleToggle(index, e)}
                className={`btn btn-sm rounded-pill ${
                  activeItems[index] ? "btn-primary" : "btn-secondary"
                }`}
                style={{
                  width: "48px",
                  height: "24px",
                  padding: 0,
                  position: "relative",
                  transition: "background-color 0.3s",
                }}
              >
                <div
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "20px",
                    height: "20px",
                    position: "absolute",
                    top: "0.9px",
                    transition: "transform 0.3s",
                    transform: `translateX(${
                      activeItems[index] ? "24px" : "2px"
                    })`,
                  }}
                >
                  {activeItems[index] ? (
                    <Bell size={12} color="#007bff" />
                  ) : (
                    <BellOff size={12} color="#BBBBBB" />
                  )}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      <PercentageModal
        show={showModal}
        onHide={handleModalCancel}
        onSave={handleModalSave}
      />

      <style>{`
        /* Custom scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        div::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        @media (min-width: 375px) and (max-width: 430px) {
          .fw-medium {
            font-weight: 500;
          }
        }
      `}</style>
    </div>
  );
}
