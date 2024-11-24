import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function GuestRoute({ children }) {
  const user = useSelector((state) => state.auth.user); // Redux 상태에서 로그인 정보 확인

  if (user) {
    return <Navigate to="/user" replace />; // 로그인된 경우 /user로 리디렉션
  }

  return children; // 비로그인 상태일 경우 자식 컴포넌트 렌더링
}

export default GuestRoute;
