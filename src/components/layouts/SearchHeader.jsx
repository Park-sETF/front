export default function SearchHeader({ placeholder, onSearch, Quantity, handlePocketClick }) {
  const handleChange = (e) => onSearch(e.target.value);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        gap: '10px', // 검색창과 아이콘 간의 간격
      }}
    >
      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          flex: 1, // 가변 너비로 설정
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />

      {/* 장바구니 아이콘 */}
      <button
        onClick={handlePocketClick}
        className="btn border-0 position-relative"
        style={{
          backgroundColor: 'transparent',
          padding: '0',
          margin: '0',
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
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* 장바구니 알림 수량 */}
        <span
          className="position-absolute badge rounded-pill bg-danger"
          style={{
            top: '5px',
            start: '100%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
          }}
        >
          {Quantity}
        </span>
      </button>
    </div>
  );
}
