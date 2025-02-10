import axios from 'axios';
import { API_BACKEND_URL } from "../config";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api',               // API 서버 기본 주소
  withCredentials: true          // ✅ 쿠키 자동 전송 설정
});

// 로그인 요청
export const login = async (email, password) => {
  const response = await api.post(`${API_BACKEND_URL}/api/v1/member/login`, { email, password });
  return response.data;
};

// 프로필 조회 (로그인 상태 확인)
export const getProfile = async () => {
  const response = await api.get(`${API_BACKEND_URL}/api/v1/member/me`);
  return response.data;
};

// 로그아웃 요청
export const logout = async () => {
  await api.post(`${API_BACKEND_URL}/api/v1/member/logout`);
};
