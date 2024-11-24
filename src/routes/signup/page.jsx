import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, checkDuplicate } from '~/stores/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import './Signup.css'; // 스타일 적용

function Signup() {
  const [step, setStep] = useState(0); // 단계별 입력 처리
  const [userData, setUserData] = useState({
    userId: '',
    nickname: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // 성공 상태 추가
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const validateField = async (name, value) => {
    let error = '';

    if (name === 'userId') {
      if (!value) error = '아이디를 입력해주세요.';
      else if (value.length < 4) error = '아이디는 4글자 이상이어야 합니다.';
      else {
        const { isDuplicate, message } = await checkDuplicate('userId', value);
        if (isDuplicate) error = message;
      }
    }

    if (name === 'nickname') {
      if (!value) error = '닉네임을 입력해주세요.';
      else if (value.length < 4) error = '닉네임은 4글자 이상이어야 합니다.';
      else {
        const { isDuplicate, message } = await checkDuplicate(
          'nickname',
          value
        );
        if (isDuplicate) error = message;
      }
    }

    if (name === 'password') {
      if (!value) error = '비밀번호를 입력해주세요.';
      else if (value.length < 4) error = '비밀번호는 4글자 이상이어야 합니다.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleNextStep = () => {
    if (!errors[Object.keys(userData)[step]])
      setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signup(userData)).unwrap();
      if (result.message === '회원가입이 완료되었습니다.') {
        setSuccess(true); // 성공 상태 업데이트
        setTimeout(() => {
          navigate('/login'); // 메시지 후 로그인 화면 이동
        }, 3000); // 3초 후 이동
      }
    } catch (err) {
      console.error('회원가입 실패:', err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box d-flex flex-column align-items-center align-items-center">
        <h1>회원가입</h1>
        <p className="signup-subtitle">빠르고 간편하게 회원가입하기</p>
        {success ? (
          <div className="success-animation">
            <div className="success-icon">🎉</div>
            <p className="success-message">회원가입이 완료되었습니다!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <div className="step">
                <input
                  type="text"
                  name="userId"
                  placeholder="아이디"
                  value={userData.userId}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.userId && (
                  <p className="error-message">{errors.userId}</p>
                )}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="next-step-btn"
                  disabled={!!errors.userId || !userData.userId}
                >
                  다음
                </button>
              </div>
            )}
            {step === 1 && (
              <div className="step">
                <input
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={userData.nickname}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.nickname && (
                  <p className="error-message">{errors.nickname}</p>
                )}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="next-step-btn"
                  disabled={!!errors.nickname || !userData.nickname}
                >
                  다음
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="step">
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={userData.password}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
                <button
                  type="submit"
                  className="next-step-btn"
                  disabled={!!errors.password || !userData.password || loading}
                >
                  {loading ? '회원가입 중...' : '회원가입'}
                </button>
              </div>
            )}
          </form>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Signup;
