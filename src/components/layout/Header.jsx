import {useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BACKEND_URL } from "../../config";
import Cookies from "js-cookie";

import '../../styles/Header.css';
import LoginPage from '../modals/LoginModal';

// 모든 axios 요청에 쿠키 포함
// axios.defaults.withCredentials = true;

function Header() {
    const [inputSearchValue, setInputSearchValue] = useState(''); // 상태 선언
    const [inputValue, setInputValue] = useState(''); // 상태 선언
    const [searchResults,setSearchResults] = useState('');
    const [searchTerm,setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log('🚀 ~ isLoggedIn', `${API_BACKEND_URL}`);
    // ⭐ 새로고침 시 쿠키를 가져와 상태 유지
        useEffect(() => {
            const checkCookie = async () => {
                try {
                    const res = await axios.get(`${API_BACKEND_URL}/api/v1/auth/check`, {
                    withCredentials: true  // 쿠키 포함
                    });
                    if(res.data ==="쿠키가 없습니다.") {
                        console.log('비로그인 상태');
                        setIsLoggedIn(false);
                    }else{
                        setIsLoggedIn(true);
                        console.log('로그인 성공, 쿠키 확인:', res.data);
                    }
                } catch (err) {
                    console.log('비로그인 상태');
                    setIsLoggedIn(false);
                }
            };
            checkCookie();
        }, []);

    const navigate = useNavigate();
    // 입력값 변경 처리 함수
    const handleSearchChange = (e) => {
        setInputSearchValue(e.target.value); // 상태 업데이트
    };

    const handleChange = (e) => {
        setInputValue(e.target.value); // 상태 업데이트
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const { user, login, logout } = useAuth(); // 유저 정보와 로그인, 로그아웃 함수 가져오기

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
        closeModal();
    };

    // 🔥 로그아웃 함수 (쿠키 삭제 후 새로고침)
    const handleLogout = async () => {
        try {
            await axios.get(`${API_BACKEND_URL}/api/v1/member/logout`,{
              withCredentials: true  // 요청에 쿠키 포함
            }); // 로그아웃 요청
            setIsLoggedIn(false);
            Cookies.remove("accessToken");  // 쿠키 삭제
            Cookies.remove("refreshToken");  // 쿠키 삭제
            alert("로그아웃 성공!");
            window.location.reload(); // 새로고침
        } catch (err) {
            console.error('로그아웃 실패:', err);
        }
    };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputSearchValue.trim()) {
          navigate(`/searchResult?word=${encodeURIComponent(inputSearchValue)}`);
        }
      };

    return (
        <header className="header">
            <nav>
                <section className="nav">
                    <ul className="nav-list">
                        <li className="logo nav-li"><a className="nav-button" href="/">우주라이크</a></li>
                        <li className="home nav-li"><a className="nav-button" href="/"><span role="textbox">홈</span></a></li>
                        <li className="movie nav-li"><a className="nav-button" href="/ko-KR"><span role="textbox">영화</span></a></li>
                        <li className="book nav-li"><a className="nav-button" href="/ko-KR"><span role="textbox">도서</span></a></li>
                        <li className="search search-div nav-li">
                            <div className="search-box">
                                <form>
                                    <label className="search-label" data-select="gnb-search-label">
                                        {/* Material Icons */}
                                        {/* <span className="material-icons">search</span> */}
                                        <input
                                            autoComplete="off"
                                            className="search-input"
                                            placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                                            type="text"
                                            name="word"
                                            value={inputSearchValue}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleKeyPress}                                
                                        />
                                    </label>
                                </form>
                            </div>
                        </li>
                        <li className="rate nav-li"><a className="nav-button" href="/ko-KR"><span role="textbox">평가</span></a></li>
                        <li className="myPage nav-li">
                            {/* 🔥 로그인 상태에 따라 버튼 변경 */}
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="logout-button">로그아웃</button>
                            ) : (
                                <button onClick={openModal} className="nav-button">
                                    <span role="textbox">로그인</span>
                                </button>
                            )}

                        </li>
                    </ul>
                </section>
            </nav>

            {isModalOpen && <LoginPage onClose={closeModal} onLoginSuccess={handleLoginSuccess} />}
        </header>
    );
}

export default Header;
