import { Outlet, useLocation } from 'react-router-dom';
import LayoutMapper from './LayoutMapper';
import Footer from '~/components/layouts/MyFooter';

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;

  // 매퍼로 헤더 컴포넌트와 텍스트 가져오기
  const { headerComponent: HeaderComponent, headerProps } =
    LayoutMapper(pathname);

  return (
    <div
      className="vh-100 w-100"
      style={{
        maxWidth: '430px',
        margin: '0 auto', // 가로 중앙 정렬
        position: 'relative', // BigButton과 Footer 위치를 위해 추가
      }}
    >
      {/* 헤더: 조건부 렌더링 */}
      {HeaderComponent &&
        (headerProps ? (
          <HeaderComponent {...headerProps} />
        ) : (
          <HeaderComponent />
        ))}
      {/* 메인 콘텐츠 */}
      <main
        className="flex-grow-1 overflow-auto"
        style={{
          paddingBottom: '200px', // BigButton의 높이만큼 여백 추가
        }}
      >
        <Outlet />
      </main>
      {/* Footer */}
      {pathname == '/' ? null : <Footer />}
    </div>
  );
}
