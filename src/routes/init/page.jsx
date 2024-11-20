import { Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Init() {
  const [isLogin, setIsLogin] = useState(false);

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
      <Button className="mt-3">{isLogin ? '로그인' : '회원가입'}</Button>
    </div>
  );
}
