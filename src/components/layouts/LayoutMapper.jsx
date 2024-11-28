import MobileHeader from '~/components/layouts/MobileHeader';
import HomeHeader from '~/components/layouts/HomeHeader';
import RankingHeader from '~/components/layouts/RankingHeader';

// 헤더 매퍼 로직
const layoutMapper = (pathname) => {
  let headerComponent = null; // 헤더가 없는 경우
  let headerProps = {}; // 헤더에 전달할 props

  switch (pathname) {
    case '/select-stock':
      headerComponent = MobileHeader;
      headerProps = { text: '종목 선택하기' }; 
      break;

    case '/user':
      headerComponent = HomeHeader;
      headerProps = { Quantity: '4' }; 
      break;

    case '/membership': 
      headerComponent = null;
      break;

    case '/ranking': 
      headerComponent = MobileHeader;
      headerProps = { text: '오늘의 랭킹', notifications: 5 };
      break;
<<<<<<< HEAD

    case '/mypocket': 
=======
      
    case '/mypocket': // 개발 예정
>>>>>>> e74d8c83e863da1ad17ee036cd215ad7b236c2b1
      headerComponent = null;
      break;

    case '/etf-pocket':
      headerComponent = MobileHeader;
      headerProps = { text: 'ETF 포켓' }; 
      break;

    case '/create-etf':
      headerComponent = MobileHeader;
      headerProps = { text: '나만의 ETF 만들기' }; 
      break;

    case '/login':
      headerComponent = MobileHeader;
      headerProps = { text: '로그인하기' }; 
      break;

    case '/signup':
      headerComponent = MobileHeader;
      headerProps = { text: '간편회원가입 하기' }; 
      break;

    case '/grade':
      headerComponent = MobileHeader;
      headerProps = { text: '등급' }; 
      break;

    case '/search':
      headerComponent = MobileHeader;
      headerProps = { text: '종목 검색' }; 
      break;

    default:
      headerComponent = null;
      if (pathname.includes('/ranking-detail')){
        headerComponent = RankingHeader;
        headerProps = { text: '유저 랭킹 상세보기', notifications: 5 }; 
      }

      if(pathname.includes('/my-detail')) {
        headerComponent = MobileHeader;
        headerProps = {text: ''};
      }

      if(pathname.includes('/etf/detail')) {
        headerComponent = MobileHeader;
        headerProps = {text: ''};
      }

      if (pathname.includes('/notification')){
        headerComponent = MobileHeader;
        headerProps = { text: '알림' }; 
      }
      break;
  }

  return { headerComponent, headerProps };
};

export default layoutMapper;
