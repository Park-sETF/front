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
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/logout')) {
      originalRequest._retry = true; 
      try {
        await axios.post(`/api/auth/refresh`, {}, { withCredentials: true });
        return api(originalRequest); 
      } catch (refreshError) {
        console.error('Refresh Token 갱신 실패:', refreshError);
        dispatch(logout()); // 상태 초기화
        window.location.href = '/login'; 
      }
    }

    return Promise.reject(error);
  }
);


export default api;
