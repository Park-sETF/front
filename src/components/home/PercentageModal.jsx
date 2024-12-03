import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import GuidelineModal from './GuideLine';

export default function PercentageModal({ show, onHide, onSave }) {
  const [values, setValues] = useState({
    takeProfit: 80,
    stopLoss: -20,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    if (show) {
      // 모달이 열릴 때마다 초기값 설정
      setValues({ takeProfit: 80, stopLoss: -20 });

      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  // 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // "알림 켜기" 버튼 클릭 시 부모 컴포넌트로 값 전달
  const handleSave = (e) => {
    e.preventDefault();
    onSave(values); // 입력된 값을 부모 컴포넌트로 전달
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered contentClassName="rounded-4">
        <div className="position-relative">
          {showTooltip && (
            <div
              className="position-absolute"
              style={{
                right: '20px',
                top: '60px',
                zIndex: 1000,
                animation: 'fadeIn 0.5s',
              }}
            >
              <button
                onClick={() => setShowGuidelines(true)}
                className="bg-dark text-white px-3 py-2 rounded-3 border-0"
                style={{
                  position: 'relative',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                정하기 어려우신가요?
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-6px',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderRight: '6px solid #212529',
                  }}
                />
              </button>
            </div>
          )}

          <Modal.Header className="border-0 pb-0">
            <Modal.Title
              className="w-100 text-center fw-bold"
              style={{ fontSize: '18px' }}
            >
              손절점 / 익절점 알림 조정
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4">
            <Form onSubmit={handleSave}>
              {/* 익절점 */}
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary">익절점</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="takeProfit"
                    value={values.takeProfit}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                    style={{ fontSize: '16px' }}
                  />
                  <InputGroup.Text className="rounded-3 py-2">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* 손절점 */}
              <Form.Group className="mb-4">
                <Form.Label className="text-secondary">손절점</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="stopLoss"
                    value={values.stopLoss}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                    style={{ fontSize: '16px' }}
                  />
                  <InputGroup.Text className="rounded-3 py-2">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div className="d-flex gap-3 mt-4">
                <Button
                  variant="light"
                  onClick={onHide}
                  className="flex-grow-1 py-2 rounded-3"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  알림 끄기
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1 py-2 rounded-3"
                >
                  알림 켜기
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateX(10px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>
      </Modal>

      <GuidelineModal
        show={showGuidelines}
        onHide={() => setShowGuidelines(false)}
      />
    </>
  );
}
