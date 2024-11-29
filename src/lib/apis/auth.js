import axios from 'axios';

// const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL: `/api`, // Spring Boot API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 자동으로 쿠키 포함
});

// Add Access Token to request headers
api.interceptors.request.use(
  (config) => {
    return config; // 쿠키는 브라우저가 자동으로 포함하므로 추가 작업 불필요
  },
  (error) => Promise.reject(error)
);

// 토큰 만료와 리프레쉬 토큰 처리
api.interceptors.response.use(
  (response) => response, // 응답 성공
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지
      try {
        // Refresh API 요청
        await axios.post(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // 원래 요청을 다시 실행
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh Token 갱신 실패 시
        console.error('Refresh Token 갱신 실패:', refreshError);
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
      }
    }

    return Promise.reject(error); // 다른 에러 처리
  }
);

export default api;
