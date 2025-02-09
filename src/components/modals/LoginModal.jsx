import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css'; // 스타일 파일 import

const LoginPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // 로그인 상태를 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 회원가입에서 비밀번호 확인
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('정확하지 않은 이메일입니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError && !confirmPasswordError) {
      console.log(isLogin ? '로그인 시도:' : '회원가입 시도:', { email, password });
      if(isLogin){
          try {
              const response = await axios.post("http://localhost:8090/api/v1/member/login", {
                email,
                password,
              },{
                 withCredentials: true  // 요청에 쿠키 포함
              });

              console.log("로그인 성공:", response.data);

              if (response.data.token) {
                localStorage.setItem("token", response.data.token);
              }

              alert("로그인 성공!");
              onClose();

            } catch (error) {
              console.error("로그인 실패:", error.response?.data || error.message);
              alert("로그인 실패! 다시 시도해주세요.");
            }
      }else {
        try {
          const response = await axios.post("http://localhost:8090/api/v1/member/signup", {
            email,
            password,
          });

          console.log("회원가입 성공:", response.data);

          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }

          alert("회원가입 성공!");
          onClose();

        } catch (error) {
          console.error("회원가입 실패:", error.response?.data || error.message);
          alert("회원가입 실패! 다시 시도해주세요.");
        }
      }

    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // 로그인/회원가입 폼 전환
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="login-page" onClick={(e) => e.stopPropagation()}>
        <div className="login-box">
          <div className="logo">우주라이크</div>
          <h1>{isLogin ? '로그인' : '회원가입'}</h1>
          <form className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일"
                className={`w-full ${emailError ? 'border-red-500 bg-red-50' : 'bg-gray-50'}`}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호"
                className={`w-full ${passwordError ? 'border-red-500 bg-red-50' : 'bg-gray-50'}`}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>

            {!isLogin && (
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="비밀번호 확인"
                  className={`w-full ${confirmPasswordError ? 'border-red-500 bg-red-50' : 'bg-gray-50'}`}
                  required
                />
                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
              </div>
            )}

            <button type="button" onClick={handleSubmit}>{isLogin ? '로그인' : '회원가입'}</button>

          </form>

            <a className="signup-link" onClick={toggleForm}>
              {isLogin ? '회원가입' : '로그인'}
            </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
