import { useEffect, useState } from 'react';
import AppInstallButton from '../buttons/AppInstallButton';

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // 기본 이벤트 방지
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true); // 설치 가능 상태 설정
    };

    // 설치 가능 여부를 감지하는 이벤트 리스너 추가
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 설치 프롬프트 실행
    deferredPrompt.prompt();

    // 사용자 선택 결과 확인
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // 프롬프트 초기화
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // 설치 가능 상태가 아니면 버튼을 숨김
  if (!isInstallable) return null;

  return <AppInstallButton handleInstallClick={handleInstallClick} />;
}

export default InstallPWA;
