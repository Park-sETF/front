// import MyNavbar from '~/components/MyNavbar/MyNavbar';
// import MyFooter from '~/components/MyFooter/MyFooter';
// import { MyNavbar, MyFooter } from '~/components';
// import { Container } from 'react-bootstrap';
// import Container  from 'react-bootstrap/Container';

import { ListGroup } from 'react-bootstrap';
import { fetchBoardList } from '~/lib/apis/board';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BoardListPage() {
  const [boardList, setboardList] = useState([]);

  useEffect(() => {
    fetchBoardList().then((data) => {
      setboardList([...data]);
    });
  }, []);
  return (
    <div>
      <h1>Board List</h1>
      <ListGroup>
        {boardList.map((ele) => (
          <Link key={ele._id} to={`/board/${ele._id}`}>
            <ListGroup.Item>{ele.title}</ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      {/* <MyNavbar brandTitle="My-React-Board" />
      <Container className="min-vh-100">
        <h1>My board</h1>
      </Container>
      <MyFooter brandTitle="My-React-Board" /> */}
    </div>
  );
}
