import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "~/components/context/NotificationContext"; // 알림 데이터 가져오기
import { House, Clipboard, Bell } from "react-bootstrap-icons";

export default function Footer() {
  const [activeTab, setActiveTab] = useState("홈");
  const { notifications } = useNotifications(); // 알림 데이터
  const navigate = useNavigate();

  return (
    <div
      className="fixed-bottom bg-white border-top"
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        height: "60px",
        marginBottom: '4px'
      }}
    >
      <div className="d-flex justify-content-between px-4">
        <button
          onClick={() => {
            setActiveTab("홈");
            navigate("/user");
          }}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center"
          style={{
            color: activeTab === "홈" ? "#000" : "#999",
            transition: "color 0.2s ease",
          }}
        >
          <House size={24} />
          <span style={{ fontSize: "12px", marginTop: "4px" }}>홈</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("포트폴리오");
            navigate("/ranking");
          }}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center"
          style={{
            color: activeTab === "포트폴리오" ? "#000" : "#999",
            transition: "color 0.2s ease",
          }}
        >
          <Clipboard size={24} />
          <span style={{ fontSize: "12px", marginTop: "4px" }}>포트폴리오</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("알림");
            navigate("/notification");
          }}
          className="btn btn-link text-decoration-none d-flex flex-column align-items-center position-relative"
          style={{
            color: activeTab === "알림" ? "#000" : "#999",
            transition: "color 0.2s ease",
          }}
        >
          <Bell size={24} />
          {notifications.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{
                fontSize: "13px",
                transform: "translate(-50%, -50%)", // 위치를 왼쪽 아래로 이동
              }}
            >
              {notifications.length}
            </span>
          )}
          <span style={{ fontSize: "12px", marginTop: "4px" }}>알림</span>
        </button>
      </div>

      <style>{`
        .btn-link:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
