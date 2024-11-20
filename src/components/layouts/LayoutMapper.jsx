import MobileHeader from '~/components/layouts/MobileHeader';
import HomeHeader from '~/components/layouts/HomeHeader';

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

    case '/ranking': // 개발 예정
      headerComponent = null;
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

    default:
      headerComponent = null;
      break;
  }

  return { headerComponent, headerProps };
};

export default layoutMapper;
