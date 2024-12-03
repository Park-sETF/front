const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
        <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}>
          <h3 style={{
              fontSize: '17px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
            }}>
            {message}
          </h3>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  };
  
  export default AlertModal;
  