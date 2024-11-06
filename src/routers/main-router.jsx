// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from 'react-router-dom';
// import SamplePage from "~/pages/SamplePage";
// import MainPage from '~/routes/page';
// import BoardListPage from '~/routes/board/page';
// import BoardDetailPage from '~/routes/board/detail/page';
// import LoginPage from '~/routes/login/page';
// import SignUpPage from '~/routes/signup/page';
import MainPage from '~/pages/MainPage';

import BoardLayout from '~/routes/board/layout';

// lazy, suspense
// 동적 코드 분할 => 동적인 import용
import { lazy } from 'react';

const BoardListPage = lazy(() => import('~/routes/board/page'));
const BoardDetailPage = lazy(() => import('~/routes/board/detail/page'));
const LoginPage = lazy(() => import('~/routes/login/page'));
const SignUpPage = lazy(() => import('~/routes/signup/page'));

export const mainRoutes = [
  {
    path: '/',
    element: <BoardLayout />,
    children: [
      { element: <MainPage />, index: true },
      { element: <LoginPage />, path: 'login' },
      { element: <SignUpPage />, path: 'signup' },
      {
        // /board가 layout으로 사용 중
        path: '/board',
        // element: <BoardListPage />,
        // index란?  index: true로 설정된 자식 경로는 부모 경로 /board를 방문했을 때 기본적으로 렌더링될 컴포넌트입니다.
        // index: true,
        // outlet쪽에서 children이 렌더링 됨
        children: [
          {
            path: '',
            index: true, // /board로 접근 시 기본적으로 렌더링되는 컴포넌트
            element: <BoardListPage />,
          },
          { path: ':boardId', element: <BoardDetailPage /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(mainRoutes);

export default router;
