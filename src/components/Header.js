import React, { useState } from 'react';
import '../styles/Header.css';

function Header() {
    const [inputValue, setInputValue] = useState(''); // 상태 선언

    // 입력값 변경 처리 함수
    const handleChange = (e) => {
        setInputValue(e.target.value); // 상태 업데이트
    };

    return (
        <header className="header">
            <nav>
                <section className="nav">
                    <ul className="nav-list">
                        <li className="logo nav-li">우주라이크</li>
                        <li className="home nav-li"><a type="button" className="nav-button" href="/ko-KR"><span role="textbox">홈</span></a></li>
                        <li className="movie nav-li"><a type="button" className="nav-button" href="/ko-KR"><span role="textbox">영화</span></a></li>
                        <li className="book nav-li"><a type="button" className="nav-button" href="/ko-KR"><span role="textbox">도서</span></a></li>
                        <li className="search search-div nav-li">
                            {/* 검색 입력 필드 */}
                            <div className="search-box">
                                <form action="#">
                                    <label className="search-label" data-select="gnb-search-label">
                                        {/* Material Icons */}
                                        <span className="material-icons">search</span>
                                        <input
                                            autoComplete="off"
                                            className="search-input"
                                            id="desktop-search-field"
                                            placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                                            type="text"
                                            name="searchKeyword"
                                            value={inputValue}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </form>
                            </div>
                        </li>
                        <li className="rate nav-li"><a type="button" className="nav-button" href="/ko-KR"><span role="textbox">평가</span></a></li>
                        <li className="myPage nav-li"><a type="button" data-select="header-my-watcha-page" title="my page" href="/ko-KR/users/Q9L5prw7dYqNb"><span className="ZTeRZiZs" role="textbox">마이 페이지</span></a></li>
                    </ul>
                </section>
            </nav>
        </header>
    );
}

export default Header;
