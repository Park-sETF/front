import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '~/lib/apis/auth';
import { logout } from '~/stores/auth/authSlice';
import { useDispatch } from 'react-redux';
import LogoutModal from './LogoutModal';

export default function UserInfo() {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달창 상태
  const id = localStorage.getItem('id');

  const images = [
    '/images/profile/doremi.png',
    '/images/profile/lay.png',
    '/images/profile/pli.png',
    '/images/profile/moli.png',
    '/images/profile/sol.png',
    '/images/profile/shoo.png',
    '/images/profile/rino.png',
    'images/ink.png',
  ];

  const gradeImages = [
    '/images/grade/BRONZE.png',
    '/images/grade/SILVER.png',
    '/images/grade/GOLD.png',
    '/images/grade/VIP.png',
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMembership = () => {
    navigate(`/membership`);
  };
  const handleLogoutConfirm = () => {
    dispatch(logout()); // 로그아웃 Thunk 호출
    navigate('/'); // 로그아웃 후 /로 리디렉션
  };

  const handleLogoutClick = () => {
    setModalOpen(true); // 모달창 열기
  };

  const handleModalClose = () => {
    setModalOpen(false); //모달창 닫기
  };

  useEffect(() => {
    // 비동기 함수 정의
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/userinfo/${id}`);
        setUserData(response.data); // API 응답 데이터를 상태에 저장
      } catch (err) {
        console.error(err);
        setError('사용자 정보를 불러올 수 없습니다.');
        dispatch(logout()); // 로그아웃 Thunk 호출
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchUserData(); // 비동기 함수 호출
  }, []);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  if (error) {
    return <div>{error}</div>; // 에러 메시지 표시
  }

  return (
    <div
      className="px-3 py-4"
      style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}
    >
      <div
        className="d-flex justify-content-between align-items-start mb-2"
        style={{ margin: '0 24px' }}
      >
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fw-bold" style={{ fontSize: '26px' }}>
              {userData.nickname}
              <img
                src={gradeImages[userData.level - 1]}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: '25px',
                  height: '25px',
                  objectFit: 'cover',
                  margin: '10px',
                }}
                onClick={() => {
                  navigate(`/grade?level=${userData.level}`);
                }}
              />
            </span>
            <div>
              <span
                style={{
                  position: 'static',
                  backgroundColor: '#e8f3ff',
                  color: '#0051c7',
                  fontSize: '12px',
                  padding: '3px 6px',
                  borderRadius: '10px',
                }}
                onClick={handleMembership}
              >
                {userData.member ? '쏠 회원' : '비회원'}
              </span>
              <span
                className="rounded-pill"
                style={{ color: '#333', fontSize: '10px', padding: '4px 8px' }}
              >
                구독자 {userData.subscriberCount}
              </span>
            </div>
          </div>
        </div>
        <img
          src={images[id % images.length]}
          alt="Profile"
          className="rounded-circle"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
      </div>
      <div className="mt-3" style={{ margin: '24px', marginBottom: 0 }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-secondary mb-1" style={{ fontSize: '14px' }}>
            투자 가능 금액
          </div>

          {/* 로그아웃 버튼 추가 */}
          <button
            className="btn btn-link "
            style={{
              color: '#62626C',
              fontSize: '12px',
              padding: 0,
              marginRight: '9px',
              marginBottom: '2px',
            }}
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>
        </div>

        <div className="d-flex align-items-baseline gap-2">
          <span className="fs-4 fw-bold" style={{ color: '#333' }}>
            {(userData.asset ?? 0).toLocaleString()}원
          </span>
          <span
            style={{
              color: userData.revenue >= 0 ? '#ff3b3b' : '#0051c7', // 수익률 양수면 빨간색, 음수면 파란색
              fontSize: '14px',
              marginLeft: '10px',
            }}
          >
            수익률 {userData.revenue?.toFixed(2) ?? '0'}%
          </span>
        </div>
      </div>
      <LogoutModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        message={'정말 로그아웃 하시겠습니까?'}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
