import StockHeader from '~/components/layouts/StockHeader';
import { useNavigate } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import BigButton from '~/components/buttons/BigButton';
import SearchHeader from '~/components/layouts/SearchHeader';
import { useState } from 'react';

export default function SelectSearchStock() {
  const navigate = useNavigate();

  const { selectedStocks } = useStockContext();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('검색어:', term);
  };

  const handlePocketClick = () => navigate('/etf-pocket');

  return (
    <div>
      {/* 검색창에 장바구니 아이콘 포함 */}
      <SearchHeader
        placeholder="종목 이름을 검색하세요"
        onSearch={handleSearch}
        Quantity={selectedStocks.length.toString()}
        handlePocketClick={handlePocketClick}
      />
      <BigButton text="ETF 포켓" onClick={() => navigate('/etf-pocket')} />
    </div>
  );
}
