import BigButton from "~/components/buttons/BigButton"
import Footer from "~/components/MyFooter"
import MobileHeader from "~/components/Header/MobileHeader"
import { useNavigate } from 'react-router-dom';

export default function ETFPocket(){

    const navigate = useNavigate();

    const handleButtonClick= ()=>{
        navigate("/create-etf");
    };

    return(
        <div>
            <MobileHeader text={"ETF 포켓"}></MobileHeader>
            <BigButton text={"ETF 만들기"} onClick={handleButtonClick}/>
            <Footer/>
        </div>



    )
}