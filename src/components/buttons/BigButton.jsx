export default function BigButton({text, onClick}) {
    return (
      <button
        onClick={onClick}
        className="btn btn-primary w-100 position-absolute start-50 translate-middle-x"
        style={{
          bottom: "7.3rem", // Footer의 높이 + 간격
          maxWidth: "90%",
          backgroundColor: "#4B7BF5",
          fontSize: "1.0rem",
          fontWeight: "500",
          borderRadius: "20rem",
          paddingTop: "0.9rem",
          paddingBottom: "0.9rem",
        }}
      >
        {text}
      </button>
    );
  }
  