import { useNotifications } from "~/components/context/NotificationContext";
import "./NotificationPage.css"; 

const NotificationPage = () => {
  const { notifications } = useNotifications(); // 알림 데이터 가져오기

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
