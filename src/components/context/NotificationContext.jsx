import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]); // 알림 데이터
  const [eventSource, setEventSource] = useState(null); // SSE 연결 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로그인 상태를 주기적으로 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const id = localStorage.getItem("id");
      if (id && !isLoggedIn) {
        setIsLoggedIn(true); // 로그인 상태로 변경
      } else if (!id && isLoggedIn) {
        setIsLoggedIn(false); // 로그아웃 상태로 변경
      }
    };

    const interval = setInterval(checkLoginStatus, 1000); // 1초마다 확인
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [isLoggedIn]);

  // SSE 연결 설정
  useEffect(() => {
    if (isLoggedIn) {
      const id = localStorage.getItem("id");
      const source = new EventSource(`/api/notifications/subscribe/${id}`);
      setEventSource(source);

      source.onopen = () => {
        console.log("SSE 연결이 열렸습니다.");
      };

      // notice 이벤트 수신
      source.addEventListener("notice", (event) => {
        try {
          const newNotification = JSON.parse(event.data);
          console.log("수신된 알림:", newNotification);
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        } catch (error) {
          console.error("알림 데이터 처리 중 오류 발생:", error);
        }
      });

      source.onerror = () => {
        console.error("SSE 연결 오류 발생");
        source.close();
      };

      return () => {
        source.close(); // 컴포넌트 언마운트 시 연결 종료
      };
    } else if (eventSource) {
      // 로그아웃 시 SSE 연결 종료
      eventSource.close();
      setEventSource(null);
      console.log("SSE 연결이 종료되었습니다.");
    }
  }, [isLoggedIn]); // 로그인 상태가 변경되면 SSE 연결 상태도 업데이트

  // 로그아웃 처리
  const handleLogout = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      console.log("SSE 연결이 종료되었습니다.");
    }

    // 상태 초기화
    setNotifications([]);
    setIsLoggedIn(false);
    localStorage.removeItem("id"); // 로컬 스토리지에서 사용자 ID 제거
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        handleLogout, // 로그아웃 함수 제공
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
