export default function StockHeader({ Quantity, handlePocketClick, handleSearchClick }) {
  return (
    <div style={{ width: '100%', maxWidth: '430px', margin: '0 auto' }}>
      <div className="container-fluid d-flex justify-content-between px-3" style={{ marginRight: '23px' }}>
        <button className="btn" style={{ marginRight: 0 }} onClick={handleSearchClick}>
          {/* 돋보기 아이콘 */}
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
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="btn border-0 position-relative" onClick={handlePocketClick}>
          {/* 장바구니 아이콘 */}
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
          <span
            className="position-absolute badge rounded-pill bg-danger"
            style={{
              top: '10px',
              start: '100%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {Quantity}
          </span>
        </button>
      </div>
    </div>
  );
}
