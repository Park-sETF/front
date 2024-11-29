import React, { useState, useEffect } from "react";
import BigButton from "~/components/buttons/BigButton";
import axios from "axios";

const SearchHeader = ({ placeholder, onSearch }) => {
  const userId = 1; // 임시로 userId를 1로 고정
//   const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 userId 직접 가져오기
  const [recentSearches, setRecentSearches] = useState([]); // 최근 검색어 상태

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

    if (userId) {
      fetchRecentSearches();
    }
  }, [userId]);

  const handleSearchChange = (event) => {
    onSearch(event.target.value); // 검색어 변경 시 상위로 전달
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
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "8px 8px 8px 30px",
              border: "none",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <svg
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "16px",
              height: "16px",
            }}
            viewBox="0 0 20 20"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="9" r="7" />
            <path d="M14 14L18 18" />
          </svg>
        </div>
      </div>

      {/* 최근 검색어 */}
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
              onClick={() => onSearch(search)} // 검색어 클릭 시 검색 이벤트 발생
            >
              {search}
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 버튼 */}
      <BigButton
        text="ETF 포켓"
        onClick={() => console.log("ETF 포켓 버튼 클릭")}
      />
    </div>
  );
};

export default SearchHeader;
