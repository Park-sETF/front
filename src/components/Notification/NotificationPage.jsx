import React, { useState, useEffect } from "react";
import "./NotificationPage.css"; // 스타일링을 위한 CSS 파일

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = 1; // 고정된 userId (추후 필요 시 동적으로 변경 가능)

  // SSE 연결 및 알림 수신
  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications/subscribe/${userId}`);

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    // notice 이벤트 수신 처리
    eventSource.addEventListener("notice", (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        console.log("수신된 notice 이벤트:", newNotification);

        // 새로운 알림 추가
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      } catch (error) {
        console.error("알림 데이터 처리 중 오류 발생:", error, "데이터:", event.data);
      }
    });

    eventSource.onerror = () => {
      console.error("SSE 연결 오류 발생");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="notification-page">
      <div className="notification-list">
        {notifications.map((notification, index) => (
          <div className="notification-item" key={index}>
            <div className="notification-content">
              <div className="notification-icon">
                {/* 알림 내용에 따라 아이콘 표시 */}
                {notification.content.includes("익절") ? (
                  <img src="/images/alarm/alarm.svg" alt="익절 알림" />
                ) : notification.content.includes("손절") ? (
                  <img src="/images/alarm/alarm.png" alt="손절 알림" />
                ) : (
                  <img src="/icons/default.png" alt="기본 알림" />
                )}
              </div>
              <div className="notification-text">
                <p>{notification.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
