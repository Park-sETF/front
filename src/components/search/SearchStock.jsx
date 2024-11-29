import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchHeader = ({ placeholder }) => {
  const userId = 1; // 임시로 userId를 1로 고정
  const [recentSearches, setRecentSearches] = useState([]); // 최근 검색어 상태
  const [searchedStock, setSearchedStock] = useState(null); // 검색 결과 상태
  const [searching, setSearching] = useState(false); // 검색 중 여부 상태

  // 최근 검색어 가져오기
  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await axios.get(`/api/search/recent`, {
          params: {
            userId,
            count: 10, // 최신 10개 검색어 가져오기
          },
        });
        setRecentSearches(response.data); // 검색어 상태 업데이트
      } catch (error) {
        console.error("최근 검색어 조회 실패:", error);
      }
    };

    fetchRecentSearches();
  }, [userId]);

  // 검색 API 호출
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`/api/search`, {
        params: {
          userId,
          stockName: searchTerm,
        },
      });
      setSearchedStock(response.data); // 검색 결과 업데이트
      setSearching(true); // 검색 상태 활성화
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // 숫자 포맷 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원";
  };

  // 검색 결과 뷰
  const renderSearchResult = () => {
    if (!searchedStock) return null;

    return (
      <div style={{ padding: "10px" }}>
        <div
          className="d-flex align-items-center justify-content-between p-2 bg-white"
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={
                searchedStock.logo ||
                "https://static.toss.im/png-icons/securities/icn-sec-fill-900340.png"
              }
              alt={searchedStock.stockName}
              className="rounded"
              width="48"
              height="48"
            />
            <div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {searchedStock.stockName}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                {formatPrice(searchedStock.price)}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color:
                    searchedStock.priceChangeRate &&
                    searchedStock.priceChangeRate.includes("+")
                      ? "red"
                      : "blue",
                }}
              >
                {searchedStock.priceChangeRate}
              </div>
            </div>
          </div>
          <button
            className={`btn btn-primary`}
            style={{
              fontSize: "1rem",
              padding: "5px 20px",
              borderRadius: "10px",
              backgroundColor: "#4B7BF5",
              color: "white",
              width: "80px",
              border: "none",
            }}
          >
            담기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* 검색 바 */}
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <input
            type="search"
            placeholder={placeholder}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.target.value.trim() !== "") {
                handleSearch(event.target.value.trim());
              }
            }}
            style={{
              width: "100%",
              padding: "8px 8px 8px 30px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      {/* 검색 결과 */}
      {searching && renderSearchResult()}

      {/* 최근 검색어 */}
      {!searching && (
        <div style={{ padding: "10px", marginTop: "10px", flex: 1 }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>최근에 본 주식</h2>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {recentSearches.map((search, index) => (
              <li
                key={index}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #e0e0e0",
                  cursor: "pointer",
                }}
                onClick={() => handleSearch(search)} // 검색어 클릭 시 검색
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
