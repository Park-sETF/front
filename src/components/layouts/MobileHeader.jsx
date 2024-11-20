export default function MobileHeader({ text }) {
    return (
        <div style={{ width:'100%', maxWidth: '430px', margin: '0 auto' }}>
          <div className="d-flex "
            style={{margin: '23px', marginTop: '30px'}}>
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
    
            <h1
                className="mb-0"
                style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                marginTop: '2.4px',
                marginLeft: '12px'
                }}
            >
                {text}
            </h1>

          </div>
          
        </div>
    );
  };
  
  