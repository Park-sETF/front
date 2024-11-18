import BigButton from "~/components/buttons/BigButton"
import Footer from "~/components/MyFooter"
import MobileHeader from "~/components/Header/MobileHeader";
import StockHeader from "~/components/Header/StockHeader";
import { useNavigate } from 'react-router-dom';


export default function SelectStock(){

    const navigate = useNavigate();

    const handleButtonClick = () => {

        navigate('/etf-pocket'); // 클릭 시 경로 이동

    };

    return(
        <div>
            <MobileHeader text={"종목 선택하기"}/>
            <StockHeader Quantity={"5"}></StockHeader>
            <BigButton text={"ETF 포켓"} onClick={handleButtonClick}></BigButton>
            <Footer></Footer>
        </div>

    )
}