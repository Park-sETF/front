const axios = require("axios");

const fetchData = async () => {
  try {
    // API 요청
    const response = await axios.get(
      "https://wts-cert-api.tossinvest.com/api/v1/dashboard/wts/overview/rankings/by-investors",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      }
    );

    // 응답 데이터 확인
    console.log("응답 데이터:", JSON.stringify(response.data, null, 2)); // 전체 JSON 구조 보기
    return response.data;
  } catch (error) {
    console.error("요청 실패:", error.message);
    return null;
  }
};

// 실행 함수
const main = async () => {
  const data = await fetchData();
  if (data) {
    console.log("받은 데이터:", JSON.stringify(data, null, 2)); // JSON 형식으로 출력
  } else {
    console.log("데이터를 가져오지 못했습니다.");
  }
};

main();
