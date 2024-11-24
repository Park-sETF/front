import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '~/lib/apis/auth';
import Cookies from 'js-cookie';

// 초기 상태
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// 로그인 Thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', credentials); // 쿠키에 accessToken 저장

      Cookies.set('accessToken', response.data.accessToken);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 로그아웃 Thunk
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // 클라이언트 쪽 상태 초기화 (API 호출 없음)
    Cookies.remove('accessToken'); // 쿠키에서 액세스 토큰 제거
    Cookies.remove('refreshToken'); // 쿠키에서 리프레시 토큰 제거
    return null; // 서버와 통신하지 않으므로 null 반환
  } catch (error) {
    console.error('로그아웃 처리 중 에러 발생:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const checkDuplicate = async (field, value) => {
  try {
    const response = await api.get(`/auth/check-duplicate`, {
      params: { field, value },
    });
    return { isDuplicate: false, message: response.data }; // 사용 가능 메시지
  } catch (error) {
    return { isDuplicate: true, message: error.response.data }; // 중복 메시지
  }
};

// 회원가입 Thunk (추가)
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          userId: action.payload.userId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null; // 사용자 정보 초기화
        state.loading = false; // 로딩 상태 초기화
        state.error = null; // 오류 상태 초기화
      })

      // 회원가입 처리
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
