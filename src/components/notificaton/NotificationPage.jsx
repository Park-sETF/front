import { useNotifications } from "~/components/context/NotificationContext";
import "./NotificationPage.css";

const NotificationPage = () => {
  const { notifications } = useNotifications(); 

  return (
    <div className="notification-page">
      <div className="notification-list">
        {notifications.map((notification, index) => (
          <div className="notification-item" key={index}>
            <div className="notification-content">
              <div className="notification-icon">
                {/* 알림 내용에 따라 아이콘 표시 */}
                {notification.content.includes("익절") ? (
                  <img src="/images/alarm/profitspot.svg" alt="익절 알림" />
                ) : notification.content.includes("손절") ? (
                  <img src="/images/alarm/lossspot.svg" alt="손절 알림" />
                ) : (
                  <img src="/icons/default.png" alt="기본 알림" />
                )}
              </div>
              <div className="notification-text">
                <p>{notification.content}</p>
              </div>
            </div>
            {/* 알림 종류에 따른 버튼 */}
            <div className="notification-button">
              {notification.content.includes("익절") ? (
                <button className="profit-button small-button">익절 알림</button>
              ) : notification.content.includes("손절") ? (
                <button className="loss-button small-button">손절 알림</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
