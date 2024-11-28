import PropTypes from 'prop-types';

export default function RankingHeader({ text }) {
  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div
        className="d-flex"
        style={{
          margin: '23px',
          marginTop: '30px',
          marginBottom: 0,
          display: 'flex',
          alignItems: 'center',
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

        {/* 왼쪽 정렬 텍스트 */}
        <h2
          style={{
            margin: '0',
            marginLeft: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}

// PropTypes 추가
RankingHeader.propTypes = {
  text: PropTypes.string.isRequired, // 헤더 텍스트
};

// 기본 props 설정
RankingHeader.defaultProps = {};
