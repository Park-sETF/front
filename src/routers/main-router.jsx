import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Layout from '~/components/layouts/Layout'; 

const Init = lazy(() => import('~/routes/init/page'));
const User = lazy(() => import('~/routes/user/User'));
const Membership = lazy(() => import('~/routes/membership/page'));
const Ranking = lazy(() => import('~/routes/ranking/page'));
const RankingDetail = lazy(() => import('~/routes/rankingDetail/page'));
const MyPocket = lazy(() => import('~/routes/myPocket/page'));
const SelectStock = lazy(() => import('~/routes/user/SelectStock'));
const ETFPocket = lazy(() => import('~/routes/user/ETFPocket'));
const CreateETF = lazy(() => import('~/routes/user/CreateETF'));
const Grade = lazy(() => import('~/routes/grade/page'));
const Login = lazy(() => import('~/routes/login/page'));
const SignUp = lazy(() => import('~/routes/signup/page'));
const ETFDetail = lazy(() => import('~/routes/etfDetail/page'));

// 로딩 스피너 컴포넌트
function MySpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

// Suspense 레이아웃
function SuspenseLayout() {
  return (
    <Suspense fallback={<MySpinner />}>
      <Outlet />
    </Suspense>
  );
}

export const mainRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <SuspenseLayout />,
        children: [
          { element: <Init />, index: true },
          { element: <User />, path: 'user' },
          { element: <Membership />, path: 'membership' },
          { element: <Ranking />, path: 'ranking' },
          { element: <RankingDetail />, path: 'ranking-detail' },
          { element: <ETFDetail />, path: 'etf/detail/:portfolioId' }, 
          { element: <MyPocket />, path: 'mypocket' },
          { element: <SelectStock />, path: 'select-stock' },
          { element: <ETFPocket />, path: 'etf-pocket' },
          { element: <CreateETF />, path: 'create-etf' },
          { element: <Grade />, path: 'grade' },
          { element: <Login />, path: 'login' },
          { element: <SignUp />, path: 'signup' },
        ],
      },
    ],
  },
];

// 라우터 생성
const router = createBrowserRouter(mainRoutes);

export default router;
