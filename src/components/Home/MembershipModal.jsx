const MembershipModal = ({ isOpen, onClose, message }) => {
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
            opacity: 0,
            animation: 'fadeIn 0.3s forwards',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                transform: 'scale(0.9)',
                opacity: 0,
                animation: 'zoomIn 0.3s 0.1s forwards',
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
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(74, 144, 226, 0.3)',
                        outline: 'none',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#357ABD';
                        e.target.style.boxShadow = '0 6px 8px rgba(74, 144, 226, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#4A90E2';
                        e.target.style.boxShadow = '0 4px 6px rgba(74, 144, 226, 0.3)';
                    }}
                >
                    확인
                </button>
            </div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes zoomIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};

export default MembershipModal;
