import React from "react";
import { CartFill } from "react-bootstrap-icons";

export default function SearchHeaderBar({ Quantity, handlePocketClick, handleSearch }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "430px",
        margin: "0 auto",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      {/* 검색 바 */}
      <div
        style={{
          position: "relative",
          flex: 1,
          marginRight: "10px", // 장바구니 아이콘 공간 확보
        }}
      >
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          onKeyPress={(event) => {
            if (event.key === "Enter") handleSearch(event.target.value);
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
        <svg
          onClick={() => handleSearch(document.querySelector("input[type='search']").value)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            cursor: "pointer",
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

      {/* 장바구니 아이콘 */}
      <button
        className="btn border-0 position-relative"
        onClick={handlePocketClick}
        style={{
          background: "none",
          padding: 0,
        }}
      >
        <CartFill size={30} color="#4B7BF5" />
        {Quantity > 0 && (
          <span
            className="position-absolute badge rounded-pill bg-danger"
            style={{
              top: "5px", // 아이콘 위쪽으로 배지 위치
              right: "0", // 아이콘의 오른쪽에 배치
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
              padding: "2px 6px",
              transform: "translate(50%, -50%)", // 위치 중앙 조정
            }}
          >
            {Quantity}
          </span>
        )}
      </button>
    </div>
  );
}
