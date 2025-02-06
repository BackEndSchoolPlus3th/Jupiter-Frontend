import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';

import '../styles/Header.css';
import LoginPage from './Login';

function Header() {
    const [inputSearchValue, setInputSearchValue] = useState(''); // 상태 선언
    const [inputValue, setInputValue] = useState(''); // 상태 선언
    const [searchResults,setSearchResults] = useState('');
    const [searchTerm,setSearchTerm] = useState('');

    const navigate = useNavigate();
    // 입력값 변경 처리 함수
    const handleSearchChange = (e) => {
        setInputSearchValue(e.target.value); // 상태 업데이트
    };

    const handleChange = (e) => {
        setInputValue(e.target.value); // 상태 업데이트
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리

    const { user, login, logout } = useAuth(); // 유저 정보와 로그인, 로그아웃 함수 가져오기

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

    const handleLogout = () => {
        setIsLoggedIn(false); // 로그아웃 처리
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
                        <li className="logo nav-li">우주라이크</li>
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
                            {user ? (
                                <>
                                    <a className="nav-button" href="/mypage">
                                        <span role="textbox">마이페이지</span>
                                    </a>
                                    <button onClick={handleLogout} className="nav-button">
                                        <span role="textbox">로그아웃</span>
                                    </button>
                                </>
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
