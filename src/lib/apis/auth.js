import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL: `${baseURL}/api`, // Spring Boot API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함하여 요청
});

// Add access token from cookies to request headers
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration and refresh token
api.interceptors.response.use(
  (response) => response, // 응답 성공
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지
      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(
          `${baseURL}/api/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // 리프레시 토큰 전송
            },
            withCredentials: true,
          }
        );

        const { accessToken } = response.data;

        // 새 토큰을 쿠키에 저장
        Cookies.set('accessToken', accessToken);

        // 원래 요청을 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 유효하지 않은 경우 로그아웃 처리
        console.error('리프레시 토큰 갱신 실패:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
      }
    }

    return Promise.reject(error); // 다른 에러 처리
  }
);

export default api;
