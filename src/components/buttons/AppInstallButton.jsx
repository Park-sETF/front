import { BoxArrowDown } from 'react-bootstrap-icons';

const AppInstallButton = ({ handleInstallClick }) => {
  const iconContainerStyle = {
    cursor: 'pointer', // 클릭 가능한 커서
    display: 'inline-flex', // 아이콘을 인라인 블록으로 표시
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // 대비되는 배경색 추가
    borderRadius: '50%', // 아이콘을 원형으로 감쌈
    width: '50px', // 컨테이너 크기 설정
    height: '50px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // 약간의 그림자 추가
  };

  const iconStyle = {
    color: '#007bff', // 아이콘 색상 설정 (파란색)
    fontSize: '24px', // 아이콘 크기 설정
  };

  return (
    <div style={iconContainerStyle} onClick={handleInstallClick}>
      <BoxArrowDown style={iconStyle} />
    </div>
  );
};

export default AppInstallButton;
