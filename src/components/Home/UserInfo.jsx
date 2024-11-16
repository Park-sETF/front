export default function UserInfo() {
  return (      
    <div className="px-3 py-4" style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-start mb-2" 
        style={{margin: '24px', marginBottom:0}}>
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fw-bold"style={{fontSize: '26px'}}>이하늘</span>
            <div>
              <span className="badge" style={{ backgroundColor: '#e8f3ff', color: '#0051c7', fontSize: '12px', padding: '4px 8px' }}>
              쏠 회원
              </span>
              <span className="badge rounded-pill" style={{ color: '#333', fontSize: '10px', padding: '4px 8px' }}>
                구독자 10
              </span>
            </div>
          </div> 

        </div>
        <img
          src="/images/ink.png"
          alt="Profile"
          className="rounded-circle"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
      </div>
      <div className="mt-3" style={{margin: '24px'}}>
        <div className="text-secondary mb-1" style={{ fontSize: '14px' }}>총 투자금액</div>
        <div className="d-flex align-items-baseline gap-2">
          <span className="fs-4 fw-bold" style={{ color: '#333' }}>778,000원</span>
          <span className="fw-medium" style={{ color: '#ff3b3b', fontSize: '14px', marginLeft:'10px'}}>
            수익률 10%
          </span>
        </div>
      </div>
    </div>
  );
}