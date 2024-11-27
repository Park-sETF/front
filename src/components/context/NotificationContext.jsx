import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]); // 알림 데이터
  const id = localStorage.getItem("id");

  // SSE 연결
  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications/subscribe/${id}`);

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    // notice 이벤트 수신
    eventSource.addEventListener("notice", (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        console.log("수신된 알림:", newNotification);
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      } catch (error) {
        console.error("알림 데이터 처리 중 오류 발생:", error);
      }
    });

    eventSource.onerror = () => {
      console.error("SSE 연결 오류 발생");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 연결 종료
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
