import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { fetchSignUp } from '~/lib/apis/signup';
import { useNavigate } from 'react-router-dom';
export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <>
      <Form.Label htmlFor="basic-url">회원가입</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          style={{ width: '100%', borderRadius: '0.3rem', margin: '0.2rem' }}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          style={{ width: '100%', borderRadius: '0.3rem', margin: '0.2rem' }}
        />
      </InputGroup>
      <br />
      <Button
        onClick={() =>
          fetchSignUp(email, password).then(
            () => navigate('/'),
            alert('회원가입이 완료되었습니다.')
          )
        }
      >
        회원가입
      </Button>
    </>
  );
}
