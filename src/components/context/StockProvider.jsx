
import { createContext, useContext } from "react";
import { useState, useEffect} from "react";

//context 생성
const StockContext = createContext();


//Context Provider 컴포넌트 
export function StockProvider({children}){
    //내가 선택한 종목 저장변수 
    const [selectedStocks,setSelectedStocks] = useState([]);

    //페이지 새로 고침시 localstorage에 저장되어 있는 데이터 업데이트 
    useEffect(()=>{
        const savedStocks = JSON.parse(localStorage.getItem('savedStocks')) || [];
        setSelectedStocks(savedStocks);
    },[])

    //상태 변경 시 localstorage 에 업데이트 
    useEffect(()=>{
        localStorage.setItem('savedStocks', JSON.stringify(selectedStocks));
    },[selectedStocks])

    return (
        <StockContext.Provider value={{selectedStocks, setSelectedStocks}}>
            {children}
            {/* context로 감싸진 컴포넌트  */}
        </StockContext.Provider>
    )
}

//context 사용하는 훅 -> context 데이터를 쉽게 가져오는 훅 
export function useStockContext(){
    return useContext(StockContext);
}
