// import MyNavbar from '~/components/MyNavbar/MyNavbar';
// import MyFooter from '~/components/MyFooter/MyFooter';
// import { MyNavbar, MyFooter } from '~/components';
// import { Container } from 'react-bootstrap';
// import Container  from 'react-bootstrap/Container';

import { Table } from 'react-bootstrap';
import { fetchBoardList } from '~/lib/apis/board';
import { useEffect, useState } from 'react';

export default function BoardListPage() {
  const [boardList, setboardList] = useState([]);

  useEffect(() => {
    fetchBoardList().then((data) => {
      setboardList([...data]);
    });
  }, []);
  return (
    <div>
      <Table bordered>
        <tbody>
          {boardList.map((ele, idx) => (
            <tr key={idx}>
              <td key={idx}>
                <h2>{ele.title}</h2>
                <p>{ele.body}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <MyNavbar brandTitle="My-React-Board" />
      <Container className="min-vh-100">
        <h1>My board</h1>
      </Container>
      <MyFooter brandTitle="My-React-Board" /> */}
    </div>
  );
}
