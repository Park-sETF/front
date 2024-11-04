// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from 'react-router-dom';
// import MainPage from "~/pages/MainPage";
// import SamplePage from "~/pages/SamplePage";
import MainPage from '~/routes/page';
import BoardListPage from '~/routes/board/page';
import BoardLayout from '~/routes/board/layout';

export const mainRoutes = [
  {
    path: '/',
    element: <MainPage />,
    index: true,
  },
  {
    // /board가 layout으로 사용 중
    path: '/board',
    // element: <BoardListPage />,
    element: <BoardLayout />,
    // index란?  index: true로 설정된 자식 경로는 부모 경로 /board를 방문했을 때 기본적으로 렌더링될 컴포넌트입니다.
    // index: true,
    // outlet쪽에서 children이 렌더링 됨
    children: [
      {
        path: '',
        index: true, // /board로 접근 시 기본적으로 렌더링되는 컴포넌트
        element: <BoardListPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRoutes);

export default router;
