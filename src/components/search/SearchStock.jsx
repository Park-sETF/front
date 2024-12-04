import StockLogo from "../stock/StockLogo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStockContext } from "~/components/context/StockProvider";
import BigButton from "~/components/buttons/BigButton";
import axios from "axios";
import "./SearchStock.css";

export default function SearchStock() {
  const navigate = useNavigate();
  const { selectedStocks, setSelectedStocks } = useStockContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchedStocks, setSearchedStocks] = useState([]); 
  const [searching, setSearching] = useState(false);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchRecentSearches();
  }, [userId]);

  const fetchRecentSearches = async () => {
    try {
      const response = await axios.get(`/api/search/recent`, {
        params: { userId, count: 10 },
      });
      setRecentSearches(response.data);
    } catch (error) {
      console.error("최근 검색어 조회 실패:", error);
    }
  };

  const getStockLogo = (stockCode) => {
    const defaultLogo =
      "https://static.toss.im/png-icons/securities/icn-sec-fill-900340.png";
    const matchedLogo = StockLogo.find(
      (logoItem) => logoItem.stockCode === stockCode
    );
    return matchedLogo ? matchedLogo.logoImageUrl : defaultLogo;
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`/api/search`, {
        params: { userId, stockName: term },
      });

      const stocks = response.data || [];
      const formattedStocks = stocks.map((stock) => ({
        stockCode: stock.stockCode || "N/A",
        stockName: stock.stockName || "알 수 없음",
        price: stock.price || 0,
        priceChangeRate: stock.priceChangeRate || "0%",
        logo: getStockLogo(stock.stockCode),
      }));

      setSearchedStocks(formattedStocks);
      setSearching(true);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  const handleAddToBasket = (stock) => {
    const formattedStock = {
      stockCode: stock.stockCode,
      stockName: stock.stockName,
      purchasePrice: stock.price,
      change: stock.priceChangeRate,
      logo: stock.logo,
    };

    if (!selectedStocks.some((s) => s.stockCode === formattedStock.stockCode)) {
      setSelectedStocks((prev) => [...prev, formattedStock]);
    }
  };

  const handlePocketClick = () => navigate("/etf-pocket");

  const renderSearchResults = () => {
    if (!searchedStocks.length) return null;

    return (
      <div className="search-results">
        {searchedStocks.map((stock, index) => (
          <div key={index} className="search-result-item">
            <div className="d-flex align-items-center gap-3">
              <img
                src={stock.logo}
                alt={stock.stockName}
                className="rounded stock-logo"
              />
              <div>
                <div className="stock-name">{stock.stockName}</div>
                <div className="d-flex align-items-center gap-2 stock-info">
                  <span>{stock.price?.toLocaleString()}원</span>
                  <span
                    className={
                      stock.priceChangeRate.includes("+")
                        ? "text-danger"
                        : "text-primary"
                    }
                  >
                    {stock.priceChangeRate}%
                  </span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary add-button"
              onClick={() => handleAddToBasket(stock)}
            >
              담기
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* 검색창 및 장바구니 */}
      <div className="search-container">
        <input
          type="search"
          placeholder="종목 이름을 검색하세요"
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) handleSearch(searchTerm);
          }}
        />
        <button className="btn pocket-button" onClick={handlePocketClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="badge">{selectedStocks.length}</span>
        </button>
      </div>
      {/* 검색 결과 */}
      {searching && renderSearchResults()}
      {/* 최근 검색어 */}
      {!searching && (
        <div className="recent-container">
          <h2 className="recent-title">최근에 본 주식</h2>
          <hr className="recent-divider" />
          <ul className="recent-list">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="recent-item"
                onClick={() => handleSearch(search)}
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
      <BigButton text="ETF 포켓" onClick={handlePocketClick} />
    </div>
  );
}
