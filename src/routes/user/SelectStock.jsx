import BigButton from "~/components/buttons/BigButton"
import Footer from "~/components/MyFooter"
import MobileHeader from "~/components/Header/MobileHeader";
import StockHeader from "~/components/Header/StockHeader";
import StockTab from "~/components/Stock/StockTab";
import Chart from "~/components/Stock/Chart";
import { useNavigate } from 'react-router-dom';


export default function SelectStock(){

    const navigate = useNavigate();

    const handleButtonClick = () => {

        navigate('/etf-pocket'); // 클릭 시 경로 이동

    };
    const stocks = [
        {
          id: 1,
          name: '삼성전자',
          logo: '/images/stocks/samsung.png',
          price: '50,600원',
          change: '-4.5%',
          action: '담기',
          actionClass: 'btn-primary'
        },
        {
          id: 2,
          name: 'SK하이닉스',
          logo: '/images/stocks/sk.png',
          price: '18,2900원',
          change: '-1.5%',
          action: '빼기',
          actionClass: 'btn-secondary'
        },
        {
          id: 3,
          name: '네이처셀',
          logo: '/images/stocks/nature.png',
          price: '18,2900원',
          change: '+10.9%',
          action: '담기',
          actionClass: 'btn-primary'
        },
        {
          id: 4,
          name: 'HD현대일렉트릭',
          logo: '/images/stocks/hd.png',
          price: '353,000원',
          change: '-7.4%',
          action: '담기',
          actionClass: 'btn-primary'
        }
      ]

    return(
        <div>
            <MobileHeader text={"종목 선택하기"}/>
            <StockHeader Quantity={"5"}></StockHeader> 
            <StockTab></StockTab>
            <Chart stocks={stocks}></Chart>
            <BigButton text={"ETF 포켓"} onClick={handleButtonClick}></BigButton>
            <Footer></Footer>
        </div>

    )
}