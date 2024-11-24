import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/stores/auth/authSlice';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // 버튼 클릭 여부 상태 추가
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { loading, error } = useSelector((state) => state.auth);

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
      const { accessToken, refreshToken, userId } = resultAction.payload;
      if (accessToken && refreshToken && userId) {
        setIsSubmitting(false);
        navigate('/'); // 메인 화면으로 이동
      } else {
        setIsSubmitting(false);
        console.error('Invalid response data:', resultAction.payload);
      }
    } else if (login.rejected.match(resultAction)) {
      setIsSubmitting(false); // 로그인 실패 시 초기화
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }} // 화면 중앙 정렬
    >
      <Row className="w-100">
        <Col lg={12} className="mx-auto">
          <div className="p-4 border rounded shadow">
            <h1 className="text-center mb-4">환영합니다</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="userId">
                <Form.Label>아이디</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="아이디"
                  value={credentials.userId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                {isSubmitting ? '로그인 중...' : '로그인'}
              </Button>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <p className="text-center mt-3">
              계정이 없으세요? <Link to="/signup">회원가입</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
