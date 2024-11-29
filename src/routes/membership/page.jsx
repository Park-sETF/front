import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MembershipModal from "~/components/home/MembershipModal";
import api from '~/lib/apis/auth'

export default function Membership() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달에 표시할 메시지

  const id = localStorage.getItem('id');

  const handleUpdateMembership = async () => {
    try {
      const response = await api.post(`/userinfo/membership/${id}`);
      if (response.ok) {
        const message = await response.text(); // 서버에서 받은 메시지
        setModalMessage(message); // 모달 메시지 설정
        setIsModalOpen(true); // 모달 열기
      } else {
        const errorMessage = await response.text();
        setModalMessage(`${errorMessage}`); // 실패 메시지 설정
        setIsModalOpen(true); // 모달 열기
      }
    } catch (error) {
      console.error('가입 요청 중 오류 발생:', error);
      setModalMessage('가입 요청에 실패했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  const handleDeleteMembership = async () => {
    try {
      const response = await api.delete(`/userinfo/membership/${id}`);
      if (response.ok) {
        const message = await response.text(); // 서버에서 받은 메시지
        setModalMessage(message); // 모달 메시지 설정
        setIsModalOpen(true); // 모달 열기
      } else {
        const errorMessage = await response.text();
        setModalMessage(`${errorMessage}`); // 실패 메시지 설정
        setIsModalOpen(true); // 모달 열기
      }
    } catch (error) {
      console.error('해지 요청 중 오류 발생:', error);
      setModalMessage('해지 요청에 실패했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ 
      minWidth: '375px', 
      maxWidth: '430px', 
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Back button */}
      <button
        className="btn border-0 p-0"
        type="button"
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '30px',
          left: '23px',
          zIndex: 10,
          color: 'white'
        }}
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

      {/* Full membership image */}
      <img 
        src="/images/membership.png" 
        alt="Membership Benefits" 
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />

      {/* Fixed buttons */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '398px',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        <button
          onClick={handleDeleteMembership}
          className="btn"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            color: '#212529',
            fontWeight: '700'
          }}
        >
          해지하기 
        </button>
        <button
          onClick={handleUpdateMembership}
          className="btn"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#0245C2',
            border: 'none',
            color: 'white',
            fontWeight: '700'
          }}
        >
          가입하기
        </button>
      </div>

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={modalMessage} 
      />
    </div>
  );
}
