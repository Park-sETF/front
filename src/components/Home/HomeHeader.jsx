export default function HomeHeader({Quantity}) {
    return (
        <div style={{ width:'100%', maxWidth: '430px', margin: '0 auto' }}>
          <div className="d-flex "
            style={{margin: '23px', marginTop: '30px',marginBottom: 0, display: 'flex',justifyContent:'space-between'}}>
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
            <span
              className="position-absolute badge rounded-pill bg-danger"
              style={{
                top: '10px', // 숫자를 SVG와 겹치게 위로 올림
                start: '100%', // SVG 오른쪽 끝 기준으로 정렬
                transform: 'translate(-50%, -50%)', // 정확히 겹치도록 중앙 조정
              }}
            >
              {Quantity}
            </span>
          </button>
          </div>
          
        </div>
    );
  };
  
  