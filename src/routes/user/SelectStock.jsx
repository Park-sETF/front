import StockHeader from '~/components/layouts/StockHeader';
import StockTab from '~/components/stock/StockTab';
import { useNavigate } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import BigButton from '~/components/buttons/BigButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '~/lib/apis/auth'

export default function SelectStock() {
  const navigate = useNavigate();

  // 선택된 주식 상태
  const { selectedStocks } = useStockContext();

  // 거래량 기준 종목 리스트 상태
  const [volumeList, setVolumeList] = useState([]);
  // 거래량 기준 종목 리스트 상태 
  const [profitList, setProfitList] = useState([]);
  //급상승 기준 종목 리스트 상태 
  const [fluctuationList, setFluctuationList] = useState([]);
  //급하락 기준 종목 리스트 상태 
  const [marketcapList, setMarketcapList] = useState([]);

  // 페이지 로드 시 주식 데이터 받아오기
  useEffect(() => {
    const fetchVolumeList = async () => {
      try {
        const response = await api.get(`/api/stockList/top30/volume`);
        const volumeList = response.data.map((stock, index) => ({
          id: index, // 고유 id 생성
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          logo: stock.logo,
          purchasePrice: stock.price,
          change: stock.priceChangeRate || '+10', // 변화율 기본값
          percentage: stock.percentage || 0 //빈값 저장
        }));
        setVolumeList(volumeList); // 상태에 저장
      } catch (error) {
        console.error('거래량 기준 종목 목록 불러오기 오류', error);
      }
    };

    const fetchProfitList = async () => {
      try {
        const response = await api.get(`/api/stockList/top30/profit`);
        const profitList = response.data.map((stock, index) => ({
          id: index, // 고유 id 생성
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          logo: stock.logo,
          purchasePrice: stock.price,
          change: stock.priceChangeRate || '+10', // 변화율 기본값
          percentage: stock.percentage || 0 //빈값 저장
        }));
        setProfitList(profitList); // 상태에 저장
      } catch (error) {
        console.error('거래량 기준 종목 목록 불러오기 오류', error);
      }
    };

    const fetchFluctuationList = async () => {
      try {
        const response = await api.get(`/api/stockList/top30/market_cap`);
        const fluctuationList = response.data.map((stock, index) => ({
          id: index, // 고유 id 생성
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          logo: stock.logo,
          purchasePrice: stock.price,
          change: stock.priceChangeRate || '+10', // 변화율 기본값
          percentage: stock.percentage || 0 //빈값 저장
        }));
        setFluctuationList(fluctuationList) // 상태에 저장
      } catch (error) {
        console.error('거래량 기준 종목 목록 불러오기 오류', error);
      }
    };

    const fetchMarketcapList = async () => {
      try {
        const response = await api.get(`/api/stockList/top30/fluctuation`);
        const marketcapList = response.data.map((stock, index) => ({
          id: index, // 고유 id 생성
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          logo: stock.logo,
          purchasePrice: stock.price,
          change: stock.priceChangeRate || '+10', // 변화율 기본값
          percentage: stock.percentage || 0 //빈값 저장
        }));
        setMarketcapList(marketcapList); // 상태에 저장
      } catch (error) {
        console.error('거래량 기준 종목 목록 불러오기 오류', error);
      }
    };


    fetchVolumeList();// 컴포넌트 마운트 시 실행
    fetchProfitList(); 
    fetchFluctuationList();
    fetchMarketcapList();
  }, []);
  

  // 버튼 클릭 시 이동
  const handleButtonClick = () => {
    navigate('/etf-pocket');
  };

  // 장바구니 아이콘 클릭 시 이동
  const handlePocketClick = () => {
    navigate('/etf-pocket');
  };

  return (
    <div>
      {/* 실시간으로 선택된 주식 수 전달 */}
      <StockHeader Quantity={selectedStocks.length.toString()} handlePocketClick={handlePocketClick} />
      <StockTab volumeList={volumeList} profitList={profitList} fluctuationList={fluctuationList} marketcapList={marketcapList}/>
      <BigButton text="ETF 포켓" onClick={handleButtonClick} />
    </div>
  );
}
