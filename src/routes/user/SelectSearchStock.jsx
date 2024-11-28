import StockHeader from '~/components/layouts/StockHeader';
import { useNavigate } from 'react-router-dom';
import { useStockContext } from '~/components/context/StockProvider';
import BigButton from '~/components/buttons/BigButton';
import SearchHeader from '~/components/layouts/SearchHeader';
import { useState } from 'react';

export default function SelectSearchStock() {
  const navigate = useNavigate();

  // 선택된 주식 상태를 Context에서 가져옴
  const { selectedStocks } = useStockContext();

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 변경 시 처리
  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('검색어:', term); // 검색어 확인 (API 호출 등 추가 가능)
  };

  // 버튼 클릭 시 처리
  const handleButtonClick = () => {
    console.log('Selected Stocks:', selectedStocks);
    navigate('/etf-pocket');
  };

  // 장바구니 아이콘 클릭 시 처리
  const handlePocketClick = () => {
    navigate('/etf-pocket');
  };

  return (
    <div>
      {/* 실시간으로 선택된 주식 수 전달 */}
      <StockHeader Quantity={selectedStocks.length.toString()} handlePocketClick={handlePocketClick} />

      {/* 검색 헤더 */}
      <SearchHeader placeholder="종목 이름을 검색하세요" onSearch={handleSearch} />

      {/* ETF 포켓 이동 버튼 */}
      <BigButton text="ETF 포켓" onClick={handleButtonClick} />
    </div>
  );
}
