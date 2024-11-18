import UserInfo from "~/components/Home/UserInfo"
import Tab from "~/components/Home/Tab"
import Footer from "~/components/MyFooter"
import BigButton from "~/components/buttons/BigButton"
import { useNavigate } from 'react-router-dom';



export default function User() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/select-stock'); // 클릭 시 경로 이동
  };
  
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <UserInfo></UserInfo>
      <Tab></Tab>
      <BigButton text={"나만의 ETF 만들기"} onClick={handleButtonClick} />
      <Footer></Footer>

    </div>
  )
}
