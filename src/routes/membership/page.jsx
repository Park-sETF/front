import { useNavigate } from "react-router-dom";

export default function Membership() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minWidth: '375px', 
      maxWidth: '430px', 
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Back button */}
      <button
        className="btn border-0 p-0"
        type="button"
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '30px',
          left: '23px',
          zIndex: 10,
          color: 'white'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Full membership image */}
      <img 
        src="/images/membership.png" 
        alt="Membership Benefits" 
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />

      {/* Fixed buttons */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '398px',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        <button
          onClick={() => {/* 탈퇴 처리 로직 */}}
          className="btn"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            color: '#212529',
            fontWeight: '700'  // Changed from '500' to '700' for bold text
          }}
        >
          탈퇴하기
        </button>
        <button
          onClick={() => {/* 가입 처리 로직 */}}
          className="btn"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#0245C2',
            border: 'none',
            color: 'white',
            fontWeight: '700'  // Changed from '500' to '700' for bold text
          }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

