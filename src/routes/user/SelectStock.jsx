import StockHeader from '~/components/layouts/StockHeader';
import StockTab from '~/components/stock/StockTab';
import { useNavigate } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import BigButton from '~/components/buttons/BigButton';
import { useState, useEffect } from 'react';
import api from '~/lib/apis/auth';

export default function SelectStock() {
  const navigate = useNavigate();

  const { selectedStocks } = useStockContext();

  const [volumeList, setVolumeList] = useState([]);
  const [profitList, setProfitList] = useState([]);
  const [fluctuationList, setFluctuationList] = useState([]);
  const [marketcapList, setMarketcapList] = useState([]);

  useEffect(() => {
    const fetchStockData = async (endpoint, setter) => {
      try {
        const response = await api.get(endpoint);
        const data = response.data.map((stock, index) => ({
          id: index,
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          logo: stock.logo,
          purchasePrice: stock.price,
          change: stock.priceChangeRate || '+10',
          percentage: stock.percentage || 0,
        }));
        setter(data);
      } catch (error) {
        console.error(`${endpoint} 불러오기 오류:`, error);
      }
    };

    fetchStockData('/stockList/top30/volume', setVolumeList);
    fetchStockData('/stockList/top30/profit', setProfitList);
    fetchStockData('/stockList/top30/fluctuation', setFluctuationList);
    fetchStockData('/stockList/top30/market_cap', setMarketcapList);
  }, []);

  const handlePocketClick = () => navigate('/etf-pocket');

  const handleSearchClick = () => navigate('/search');

  return (
    <div>
      <StockHeader
        Quantity={selectedStocks.length.toString()}
        handlePocketClick={handlePocketClick}
        handleSearchClick={handleSearchClick} // 돋보기 클릭
      />
      <StockTab
        volumeList={volumeList}
        profitList={profitList}
        fluctuationList={fluctuationList}
        marketcapList={marketcapList}
      />
      <BigButton text="ETF 포켓" onClick={() => navigate('/etf-pocket')} />
    </div>
  );
}
