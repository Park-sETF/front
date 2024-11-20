export default function BigButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary w-100 d-flex flex-row justify-content-center"
      style={{
        position: 'fixed', // 화면 하단에 고정
        bottom: '80px', // Footer 높이 + 추가 간격
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '430px',
        backgroundColor: '#4B7BF5',
        fontSize: '1.0rem',
        fontWeight: '500',
        borderRadius: '20rem',
        padding: '0.9rem',
        color: '#fff',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {text}
    </button>
  );
}
