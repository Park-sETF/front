import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, checkDuplicate } from '~/stores/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Confetti from 'react-confetti'; // Confetti 라이브러리 임포트

function Signup() {
  const [step, setStep] = useState(0); // 단계별 입력 처리
  const [userData, setUserData] = useState({
    userId: '',
    nickname: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // 성공 상태 추가
  const [localError, setLocalError] = useState(null); // 로컬 에러 상태 추가
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
      if (!value) {
        error = '아이디를 입력해주세요.';
      } else if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
        error = '아이디는 4자 이상의 영문, 숫자만 가능합니다.';
      } else {
        const { isDuplicate, message } = await checkDuplicate('userId', value);
        if (isDuplicate) error = message;
      }
    }

    if (name === 'nickname') {
      if (!value) {
        error = '닉네임을 입력해주세요.';
      } else if (!/^[a-zA-Z가-힣0-9]{4,}$/.test(value)) {
        error = '닉네임은 4자 이상의 한글, 영문, 숫자만 가능합니다.';
      } else {
        const { isDuplicate, message } = await checkDuplicate(
          'nickname',
          value
        );
        if (isDuplicate) error = message;
      }
    }

    if (name === 'password') {
      if (!value) {
        error = '비밀번호를 입력해주세요.';
      } else if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
        error = '비밀번호는 4자 이상의 영문, 숫자만 가능합니다.';
      }
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
        }, 5000); // 5초 후 이동
      }
    } catch (err) {
      console.error('회원가입 실패:', err);
    }
  };

  // 화면 크기 가져오기 (Confetti 크기 조절)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 에러 메시지 상태 처리
  useEffect(() => {
    if (error) {
      setLocalError(error); // 로컬 에러 상태 업데이트
      const timer = setTimeout(() => setLocalError(null), 10000); // 3초 후 에러 제거
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [error]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: '75vh' }}
    >
      {success && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
        />
      )}
      <Row className="w-100">
        <Col lg={12} md={12} sm={12}>
          <div className="p-4 border rounded shadow">
            <h1 className="text-center mb-3">회원가입</h1>
            <p className="text-center text-muted mb-4">
              {!success && step === 0 && '아이디를 입력해주세요.'}
              {!success && step === 1 && '닉네임을 입력해주세요.'}
              {!success && step === 2 && '비밀번호를 입력해주세요.'}
            </p>

            {success ? (
              <div className="text-center">
                <div className="display-3 mb-2">🎉</div>
                <p>회원가입이 완료되었습니다.</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                {step === 0 && (
                  <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      placeholder="아이디를 입력해주세요"
                      value={userData.userId}
                      onChange={handleChange}
                      isInvalid={!!errors.userId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userId}
                    </Form.Control.Feedback>
                    <Button
                      variant="primary"
                      className="w-100 mt-3"
                      onClick={handleNextStep}
                      disabled={!!errors.userId || !userData.userId}
                    >
                      다음
                    </Button>
                  </Form.Group>
                )}
                {step === 1 && (
                  <Form.Group className="mb-3" controlId="nickname">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control
                      type="text"
                      name="nickname"
                      placeholder="닉네임을 입력해주세요"
                      value={userData.nickname}
                      onChange={handleChange}
                      isInvalid={!!errors.nickname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nickname}
                    </Form.Control.Feedback>
                    <Button
                      variant="primary"
                      className="w-100 mt-3"
                      onClick={handleNextStep}
                      disabled={!!errors.nickname || !userData.nickname}
                    >
                      다음
                    </Button>
                  </Form.Group>
                )}
                {step === 2 && (
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={userData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 mt-3"
                      disabled={
                        !!errors.password || !userData.password || loading
                      }
                    >
                      {loading ? '회원가입 중...' : '회원가입'}
                    </Button>
                  </Form.Group>
                )}
              </Form>
            )}
            {localError && (
              <Alert variant="danger" className="mt-3">
                {localError}
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
