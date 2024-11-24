import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user); // Redux 상태에서 로그인 정보 확인

  if (!user) {
    return <Navigate to="/login" replace />; // 로그인되지 않은 경우 /login으로 리디렉션
  }

  return children; // 로그인된 경우 자식 컴포넌트 렌더링
}

export default ProtectedRoute;
