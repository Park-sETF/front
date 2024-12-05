import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const gradeOrder = ['BRONZE', 'SILVER', 'GOLD', 'VIP'];

// 임시 사용자 데이터

export default function MyGrade() {
  const [progress, setProgress] = useState(0);
  const { level } = useParams(); // URL에서 portfolioId를 가져옴

  const userData = {
    currentGrade: gradeOrder[level - 1],
    commission: 2,
    investmentAmount: 3000000, // 300만원
    nextGradeTarget: 5000000, // 500만원
  };

  useEffect(() => {
    // 다음 등급까지 진행률 계산
    const calculateProgress = () => {
      const current = userData.investmentAmount;
      const target = userData.nextGradeTarget;
      return (current / target) * 100;
    };

    setProgress(calculateProgress());
  }, []);

  const currentGradeIndex = gradeOrder.indexOf(userData.currentGrade) + 1;
  const nextGrade = gradeOrder[currentGradeIndex];
  const remainingAmount = userData.nextGradeTarget - userData.investmentAmount;

  return (
    <div style={{ minWidth: '375px', maxWidth: '430px', margin: '0 auto' }}>
      <div className="px-4 py-3">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
          나의 등급
        </h2>

        <div className="d-flex align-items-center mb-4">
          <img
            src={`/images/grade/${nextGrade}.png`} // 경로 수정
            alt={userData.currentGrade}
            style={{ width: '60px', height: '60px', marginRight: '20px' }}
          />
          <div>
            <h3
              className="mb-2"
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              {userData.currentGrade}
            </h3>
            <p className="text-danger mb-0" style={{ fontSize: '16px' }}>
              수수료 {userData.commission}%
            </p>
          </div>
        </div>

        <div className="position-relative mb-3">
          <div
            className="progress"
            style={{ height: '8px', backgroundColor: '#E9ECEF' }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                // width: `${progress}%`,
                width: '2%',

                backgroundColor: '#4B7BF5',
                borderRadius: '4px',
              }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <img
            src={`/images/grade/${gradeOrder[currentGradeIndex + 1]}.png`} // 경로 수정
            alt={nextGrade}
            style={{
              width: '24px',
              height: '24px',
              position: 'absolute',
              right: '-12px',
              top: '-8px',
            }}
          />
        </div>

        <p
          className="text-center mb-0"
          style={{ fontSize: '14px', color: '#666' }}
        >
          수익률 10% 이상, 구독자수 100명 이상이면 <br/> SILVER 달성
        </p>
      </div>
    </div>
  );
}
