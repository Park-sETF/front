import './CustomModal.css';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = '확인',
  cancelText = '취소',
  children,
}) {
  if (!isOpen) return null;

  const showButtons = onConfirm ? true : false;

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div
        className="modal-content zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {message && <h3 className="modal-title">{message}</h3>}
        {children}
        <div className={showButtons ? 'modal-buttons' : 'modal-button-single'}>
          {showButtons ? (
            <>
              <button className="modal-button cancel" onClick={onClose}>
                {cancelText}
              </button>
              <button className="modal-button confirm" onClick={onConfirm}>
                {confirmText}
              </button>
            </>
          ) : (
            <button className="modal-button confirm" onClick={onClose}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
