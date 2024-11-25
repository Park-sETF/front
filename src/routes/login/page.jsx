import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/stores/auth/authSlice';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null); // 에러 메시지 상태
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setLocalError(error);
      const timer = setTimeout(() => setLocalError(null), 3000); // 3초 후 에러 메시지 제거
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 버튼 클릭 상태 설정
    const resultAction = await dispatch(login(credentials));

    // 로그인 성공 여부 확인 및 메인 화면 이동
    if (login.fulfilled.match(resultAction)) {
      // const { accessToken, refreshToken, userId } = resultAction.payload;
      const { userId } = resultAction.payload;

      if (userId) {
        setIsSubmitting(false);
        navigate('/user'); // 메인 화면으로 이동
      } else {
        setIsSubmitting(false);
        console.error('Invalid response data:', resultAction.payload);
      }
    } else if (login.rejected.match(resultAction)) {
      setIsSubmitting(false); // 로그인 실패 시 초기화
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            value={credentials.userId}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={credentials.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
        {localError && <p className="error-message">{localError}</p>}
        <p className="secondary-text">
          계정이 없으세요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
