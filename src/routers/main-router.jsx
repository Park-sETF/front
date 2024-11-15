// Router: 각 URL에 따른 page 컴포넌트 연결

// lazy, suspense
// 동적 코드 분할 => 동적인 import용
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'

const Init = lazy(() => import('~/routes/init/page'));
const User = lazy(() => import('~/routes/user/page'))
const Membership = lazy(() => import('~/routes/membership/page'))
const Ranking = lazy(() => import('~/routes/ranking/page'))
const MyPocket = lazy(() => import('~/routes/myPocket/page'))

export const mainRoutes = [
  {
    path: '/',
    children: [
      { element: <Init />, index: true },
      { element: <User />, path: 'user' },
      { element: <Membership />, path: 'membership' },
      { element: <Ranking />, path: 'ranking' },
      { element: <MyPocket />, path: 'mypocket' }
    ],
  },
];

const router = createBrowserRouter(mainRoutes);

export default router;
