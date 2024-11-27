// import React from 'react';
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
    </div>
  );
}