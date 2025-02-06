// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, login as apiLogin, logout as apiLogout } from '../api/auth';

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // 현재 로그인한 사용자 정보
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  // 페이지 로드 시 자동 로그인 확인
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch {
        setUser(null); // 인증 실패 시 null
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // 로그인 메서드
  const login = async (email, password) => {
    const userData = await apiLogin(email, password);
    setUser(userData);  // 로그인 성공 시 사용자 정보 저장
  };

  // 로그아웃 메서드
  const logout = async () => {
    await apiLogout();
    setUser(null);      // 로그아웃 시 사용자 정보 초기화
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅으로 Context 사용하기
export const useAuth = () => useContext(AuthContext);
