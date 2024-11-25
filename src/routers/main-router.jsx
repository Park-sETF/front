import ProtectedRoute from '~/routes/auth/ProtectedRoute';
import GuestRoute from '~/routes/auth/GuestRoute';

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Layout from '~/components/layouts/Layout'; // Layout 컴포넌트 가져오기

const Init = lazy(() => import('~/routes/init/page'));
const User = lazy(() => import('~/routes/user/page'));
const Membership = lazy(() => import('~/routes/membership/page'));
const Ranking = lazy(() => import('~/routes/ranking/page'));
const RankingDetail = lazy(() => import('~/routes/rankingDetail/page'));
const MyPocket = lazy(() => import('~/routes/myPocket/page'));
const SelectStock = lazy(() => import('~/routes/user/SelectStock'));
const ETFPocket = lazy(() => import('~/routes/user/ETFPocket'));
const CreateETF = lazy(() => import('~/routes/user/CreateETF'));
const Login = lazy(() => import('~/routes/login/page'));
const SignUp = lazy(() => import('~/routes/signup/page'));

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
<<<<<<< HEAD
          { element: <User />, path: 'user' },
          { element: <Membership />, path: 'membership' },
          { element: <Ranking />, path: 'ranking' },
          { element: <RankingDetail />, path: 'ranking-detail' }, 
          { element: <MyPocket />, path: 'mypocket' },
          { element: <SelectStock />, path: 'select-stock' },
          { element: <ETFPocket />, path: 'etf-pocket' },
          { element: <CreateETF />, path: 'create-etf' },
=======
          {
            path: 'user',
            element: (
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            ),
          },
          {
            path: 'membership',
            element: (
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            ),
          },
          {
            path: 'ranking',
            element: (
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            ),
          },
          {
            path: 'mypocket',
            element: (
              <ProtectedRoute>
                <MyPocket />
              </ProtectedRoute>
            ),
          },
          {
            path: 'select-stock',
            element: (
              <ProtectedRoute>
                <SelectStock />
              </ProtectedRoute>
            ),
          },
          {
            path: 'etf-pocket',
            element: (
              <ProtectedRoute>
                <ETFPocket />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create-etf',
            element: (
              <ProtectedRoute>
                <CreateETF />
              </ProtectedRoute>
            ),
          },
          {
            path: 'signup',
            element: (
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            ),
          },
          {
            path: 'login',
            element: (
              <GuestRoute>
                <Login />
              </GuestRoute>
            ),
          },
>>>>>>> 19d01c5c7a056227b7e9b135cabe0d9dc6cf2f2c
        ],
      },
    ],
  },
];

// 라우터 생성
const router = createBrowserRouter(mainRoutes);

export default router;
