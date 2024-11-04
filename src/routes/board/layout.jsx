import MyNavbar from '~/components/MyNavbar/MyNavbar';
import MyFooter from '~/components/MyFooter/MyFooter';
import { Container } from 'react-bootstrap';
// import Container  from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

export default function BoardListPage() {
  return (
    <div>
      <MyNavbar brandTitle="My-React-Board" />
      <Container className="min-vh-100">
        <Outlet />
      </Container>
      <MyFooter brandTitle="My-React-Board" />
    </div>
  );
}
