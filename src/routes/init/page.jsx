import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '~/stores/auth/authSlice';

export default function Init() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // 로그아웃 Thunk 호출
    navigate('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center flex-column bg-white"
      style={{
        maxWidth: '430px',
        textAlign: 'center',
      }}
    >
      <h1
        className="display-5 fw-bold text-center"
        style={{ fontSize: '42px', marginBottom: '20px' }}
      >
        What's your ETF?
      </h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ maxWidth: '280px' }}
      >
        <img
          src="/images/logo.png"
          alt="ETF Character"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {user ? (
        // 로그인된 상태일 때 로그아웃 버튼 표시
        <div>
          <p>안녕하세요, {user.userId}님!</p>
          <Button className="mt-3" variant="danger" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      ) : (
        // 비로그인 상태일 때 로그인/회원가입 버튼 표시
        <div
          className="d-flex flex-row margin-auto mx-3"
          style={{ gap: '10px' }}
        >
          <Button className="mt-3" onClick={() => navigate('/login')}>
            로그인
          </Button>
          <Button className="mt-3" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </div>
      )}
    </div>
  );
}
