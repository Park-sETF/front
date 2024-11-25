import PropTypes from 'prop-types';

export default function RankingHeader({ text, notifications }) {
  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div
        className="d-flex"
        style={{
          margin: '23px',
          marginTop: '30px',
          marginBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          className="btn border-0 p-0"
          type="button"
          onClick={() => window.history.back()}
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

        {/* 가운데 텍스트 */}
        <h2
          style={{
            margin: '0 auto',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {text}
        </h2>

        {/* 알림 버튼 */}
        <button className="btn border-0 position-relative">
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
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications > 0 && (
            <span
              className="position-absolute badge rounded-pill bg-danger"
              style={{
                top: '10px',
                start: '100%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {notifications}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// PropTypes 추가
RankingHeader.propTypes = {
  text: PropTypes.string.isRequired, // 헤더 텍스트
  notifications: PropTypes.number, // 알림 개수
};

// 기본 props 설정
RankingHeader.defaultProps = {
  notifications: 0, // 기본적으로 알림 개수는 0
};
