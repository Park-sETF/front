import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '~/stores/auth/authSlice';
import InstallPWA from '~/components/layouts/InstallPwa';

export default function Init() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // 로그아웃 Thunk 호출
    navigate('/'); // 로그아웃 후 /로 리디렉션
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center flex-column bg-white"
      style={{
        maxWidth: '430px',
        textAlign: 'center',
        overflowX: 'hidden',
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
            marginRight: '28px',
          }}
        />
      </div>

      {user ? (
        // 로그인된 상태일 때 로그아웃 버튼 표시
        <div>
          <p>안녕하세요, {user.nickname}님!</p>
          <Button className="mt-3" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      ) : (
        // 비로그인 상태일 때 로그인/회원가입 버튼 표시
        <div
          className="d-flex flex-column margin-auto mx-3"
          style={{ gap: '10px' }}
        >
          <Button
            className="mt-3"
            onClick={() => navigate('/login')}
            style={{ backgroundColor: '#3182F6' }}
          >
            로그인
          </Button>
          <Button
            variant="link"
            className="text-primary text-decoration-none"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              color: '#3182F6',
            }}
            onClick={() => navigate('/signup')}
          >
            회원 가입 바로가기
          </Button>
          {/* <Button className="" onClick={() => navigate('/signup')}>
            회원가입
          </Button> */}
        </div>
      )}
      <InstallPWA className="fixed-bottom mt-3" />
    </div>
  );
}
