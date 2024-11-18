// Router: 각 URL에 따른 page 컴포넌트 연결

// lazy, suspense 
// 동적 코드 분할 => 동적인 import용
// npm run build하면 js파일이 나뉘어서 빌드됨. -> 결국 비동기 처리
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

// ()=> import() // dynamic import

const Init = lazy(() => import('~/routes/init/page'));
const User = lazy(() => import('~/routes/user/page'))
const Membership = lazy(() => import('~/routes/membership/page'))
const Ranking = lazy(() => import('~/routes/ranking/page'))
const MyPocket = lazy(() => import('~/routes/myPocket/page'))
const SelectStock = lazy(() => import('~/routes/user/SelectStock')) // 새로운 페이지 추가
const ETFPocket = lazy(() => import('~/routes/user/ETFPocket'));
const CreateETF = lazy(()=> import('~/routes/user/CreateETF'));


function MySpinner(){
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

function SuspenseLayout(){
  return (
  <Suspense fallback={<MySpinner/>}>
    <Outlet/>
  </Suspense>
  )
}


export const mainRoutes = [
  {
    path: '/',
    element: <SuspenseLayout/>,
    children: [
      { element: <Init />, index: true },
      { element: <User />, path: 'user' },
      { element: <Membership />, path: 'membership' },
      { element: <Ranking />, path: 'ranking' },
      { element: <MyPocket />, path: 'mypocket' },
      { element: <SelectStock />, path: 'select-stock' }, //나의 ETF 만들기 버튼 클릭시 이동 
      { element: <ETFPocket />, path: 'etf-pocket'},
      { element: <CreateETF/>, path: 'create-etf'}
    ],
  },
];

const router = createBrowserRouter(mainRoutes);

export default router;
