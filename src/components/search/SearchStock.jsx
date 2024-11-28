import BigButton from '~/components/buttons/BigButton';

const SearchHeader = ({ placeholder, onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value); // 검색어 변경 시 상위로 전달
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#fff'
    }}>

      <div style={{
        padding: '10px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <input
            type="search"
            placeholder={placeholder}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '8px 8px 8px 30px',
              border: 'none',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <svg 
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px'
            }}
            viewBox="0 0 20 20"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="9" r="7" />
            <path d="M14 14L18 18" />
          </svg>
        </div>
      </div>

      <div style={{ padding: '10px', marginTop: '10px', flex: 1 }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>최근에 본 주식</h2>
      </div>

      <BigButton text="ETF 포켓" onClick={() => console.log('ETF 포켓 버튼 클릭')} />
    </div>
  );
};

export default SearchHeader;
