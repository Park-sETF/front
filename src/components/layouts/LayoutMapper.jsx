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
      headerProps = { text: '종목 선택하기' }; // MobileHeader에 전달할 props
      break;

    case '/user':
      headerComponent = HomeHeader;
      headerProps = { Quantity: '4' }; // HomeHeader에 전달할 props
      break;

    case '/membership': // 개발 예정
      headerComponent = null;
      break;

    case '/ranking': 
      headerComponent = RankingHeader;
      headerProps = { text: '오늘의 랭킹', notifications: 5 };
      break;
    

    case '/mypocket': // 개발 예정
      headerComponent = null;
      break;

    case '/etf-pocket':
      headerComponent = MobileHeader;
      headerProps = { text: 'ETF 포켓' }; // MobileHeader에 전달할 props
      break;

    case '/create-etf':
      headerComponent = MobileHeader;
      headerProps = { text: '나만의 ETF 만들기' }; // MobileHeader에 전달할 props
      break;

    case '/login':
      headerComponent = MobileHeader;
      headerProps = { text: '로그인하기' }; // MobileHeader에 전달할 props
      break;

    case '/signup':
      headerComponent = MobileHeader;
      headerProps = { text: '간편회원가입 하기' }; // MobileHeader에 전달할 props
      break;

    case '/grade':
      headerComponent = MobileHeader;
      headerProps = { text: '등급' }; // MobileHeader에 전달할 props
      break;
      

    default:
      headerComponent = null;
      if (pathname.includes('/ranking-detail')){
        console.log("BB")
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
      break;
  }

  return { headerComponent, headerProps };
};

export default layoutMapper;
