export default function BigButton() {
    return (
      <button
        className="btn btn-primary w-100 position-absolute start-50 translate-middle-x"
        style={{
          bottom: "5.5rem", // Footer의 높이 + 간격
          maxWidth: "90%",
          backgroundColor: "#4B7BF5",
          fontSize: "1.0rem",
          fontWeight: "500",
          borderRadius: "20rem",
          paddingTop: "0.9rem",
          paddingBottom: "0.9rem",
        }}
      >
        나만의 ETF 만들기
      </button>
    );
  }
  