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
const ETFDetail = lazy(() => import('~/components/etfDetail/ETFDetail'));
const MyETFDetail = lazy(() => import('~/components/etfDetail/MyETFDetail'));
const Notification = lazy(() => import('~/routes/notification/page'));
const Search = lazy(() => import('~/routes/search/page'));

import GuestRoute from '~/routes/auth/GuestRoute';
import ProtectedRoute from '~/routes/auth/ProtectedRoute';

function wrapRoutes(routes) {
  return routes.map((route) => {
    // 하위 라우트가 있으면 재귀적으로 처리
    if (route.children) {
      route.children = wrapRoutes(route.children);
    }

    // 라우트에 'protected' 속성이 있으면 ProtectedRoute로 감쌈
    if (route.protected) {
      return {
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      };
    }

    // 라우트에 'guest' 속성이 있으면 GuestRoute로 감쌈
    if (route.guest) {
      return {
        ...route,
        element: <GuestRoute>{route.element}</GuestRoute>,
      };
    }

    // 그렇지 않으면 원래 라우트 반환
    return route;
  });
}

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
          { element: <Init />, index: true, guest: true },

          // 로그인되지 않은 사용자만 접근 가능한 라우트
          {
            element: <Login />,
            path: 'login',
            guest: true,
          },
          {
            element: <SignUp />,
            path: 'signup',
            guest: true,
          },

          // 로그인된 사용자만 접근 가능한 라우트
          {
            element: <User />,
            path: 'user',
            protected: true,
          },
          {
            element: <MyPocket />,
            path: 'mypocket',
            protected: true,
          },
          {
            element: <SelectStock />,
            path: 'select-stock',
            protected: true,
          },
          {
            element: <ETFPocket />,
            path: 'etf-pocket',
            protected: true,
          },
          {
            element: <CreateETF />,
            path: 'create-etf',
            protected: true,
          },
          {
            element: <MyETFDetail />,
            path: 'etf/my-detail/:portfolioId',
            protected: true,
          },
          {
            element: <Notification />,
            path: 'notification',
            protected: true,
          },

          // 누구나 접근 가능한 라우트
          { element: <Membership />, path: 'membership' },
          { element: <Ranking />, path: 'ranking', protected: true },
          {
            element: <RankingDetail />,
            path: 'ranking-detail/:userId',
            protected: true,
          },
          {
            element: <ETFDetail />,
            path: 'etf/detail/:portfolioId',
            protected: true,
          },
          { element: <Grade />, path: 'grade', protected: true },
          { element: <Search />, path: 'search' },
        ],
      },
    ],
  },
];

// 라우터 생성
const wrappedRoutes = wrapRoutes(mainRoutes);
const router = createBrowserRouter(wrappedRoutes);

export default router;
