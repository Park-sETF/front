import { Modal } from 'react-bootstrap';

export default function GuidelineModal({ show, onHide }) {
  const guidelines = [
    {
      type: '단기 투자 ',
      profit: '3% ~ 10%',
      loss: '-3% ~ -7%'
    },
    {
      type: '중기 투자',
      profit: '10% ~ 20%',
      loss: '-7% ~ -10%'
    },
    {
      type: '장기 투자 ',
      profit: '20% 이상',
      loss: '-15% ~ -20%'
    }
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="rounded-4"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 text-center fw-bold" style={{ fontSize: '18px' }}>
          손절점 / 익절점 설정 기준
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className={`p-3 ${index !== guidelines.length - 1 ? 'mb-3' : ''}`}
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div className="fw-bold mb-2" style={{ fontSize: '16px' }}>
              {item.type}
            </div>
            <div className="d-flex flex-column gap-1" style={{ fontSize: '14px' }}>
              <div className="text-success">
                익절 퍼센트 : {item.profit}
              </div>
              <div className="text-danger">
                손절 퍼센트: {item.loss}
              </div>
            </div>
          </div>
        ))}

        {/* 추가 멘트 */}
        <div
          className="p-3 mt-4"
          style={{
            backgroundColor: '#eaf7ea',
            borderRadius: '12px',
            border: '1px solid #c9eac9',
            fontSize: '14px',
            color: '#356635',
            textAlign: 'center'
          }}
        >
          다양한 종목에 분산 투자하고 있으므로, <strong>장기 투자</strong>를 추천합니다.
        </div>
      </Modal.Body>
    </Modal>
  );
}
