import { useState } from 'react';

const gradeData = {
  BRONZE: {
    benefits: '기본 수수료에서 2% 할인',
    criteria: '수익률 5% 이상, 구독자수 50명 이상 ~ 수익률 10%미만, 구독자 수 100명 미만',
    color: '#CD7F32',
    height: '35%', // Changed to fixed steps
  },
  SILVER: {
    benefits: '기본 수수료에서 5% 할인',
    criteria: '수익률 10% 이상, 구독자수 100명 이상 ~ 수익률 15%미만, 구독자 수 500명 미만',
    color: '#C0C0C0',
    height: '50%', // Changed to fixed steps
  },
  GOLD: {
    benefits: '기본 수수료에서 10% 할인',
    criteria: '수익률 20% 이상, 구독자수 1,000명 이상 ~ 수익률 25%미만, 구독자 수 10,000명 미만',
    color: '#FFD700',
    height: '70%', // Changed to fixed steps
  },
  VIP: {
    benefits: '기본 수수료에서 20% 할인',
    criteria: '수익률 25%이상, 구독자 수 10,000명 이상',
    color: '#B9F2FF',
    height: '100%', // Changed to fixed steps
  },
};

export default function GradeBenefits() {
  const [selectedGrade, setSelectedGrade] = useState('BRONZE');

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div className="px-4 py-3">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
          등급별 혜택
        </h2>

        <div
          className="d-flex justify-content-between mb-4"
          style={{ height: '150px' }}
        >
          {Object.keys(gradeData).map((grade) => (
            <div
              key={grade}
              className="d-flex flex-column align-items-center"
              style={{
                width: '70px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedGrade(grade)}
            >
              <div
                style={{
                  width: '100%',
                  height: gradeData[grade].height, // Using the height from gradeData
                  backgroundColor:
                    grade === selectedGrade ? '#C2E2FF' : '#E9ECEF',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  marginTop: 'auto', // This will push the columns to the bottom
                }}
              >
                <img
                  src={`/images/grade/${grade}.png`}
                  alt={grade}
                  style={{
                    width: '24px',
                    height: '24px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '12px',
                  marginTop: '8px',
                  color: grade === selectedGrade ? '#000' : '#666',
                  fontWeight: grade === selectedGrade ? '600' : '400',
                }}
              >
                {grade}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-3" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="mb-4">
            <h3 className="mb-2" style={{ fontSize: '16px', color: '#666' }}>
              혜택
            </h3>
            <p className="mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
              {gradeData[selectedGrade].benefits}
            </p>
          </div>
          <div>
            <h3 className="mb-2" style={{ fontSize: '16px', color: '#666' }}>
              기준
            </h3>
            <p className="mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
              {gradeData[selectedGrade].criteria}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
