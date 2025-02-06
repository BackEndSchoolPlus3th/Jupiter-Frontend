import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuthHook from '../hooks/useAuthHook';

import '../styles/Mypage.css';

const MyPage = () => {
  const { user, logout, loading } = useAuthHook();
  const navigate = useNavigate();     // 페이지 이동 훅

  const [showMoreCountry, setShowMoreCountry] = useState(false);
  const [showMoreGenre, setShowMoreGenre] = useState(false);

  const handleMoreCountryClick = () => {
    setShowMoreCountry(!showMoreCountry);
  };

  const handleMoreGenreClick = () => {
    setShowMoreGenre(!showMoreGenre);
  };

  const handleLogout = () => {
    logout();          // 로그아웃 처리
    navigate('/');     // 로그아웃 후 홈으로 이동
  };

  const assessment = [];
  const interestedContents = [];
  const comments = [];

  const ratingAvg = 0;
  const ratingCnt = 0;
  const ratingMax = 0;

  const countryPreferences = [
    { name: '미국', score: 90, count: 3 },
    { name: '영국', score: 85, count: 2 },
    { name: '한국', score: 92, count: 4 },
    { name: '프랑스', score: 78, count: 1 },
    { name: '일본', score: 88, count: 2 },
    { name: '영국', score: 88, count: 2 },
    { name: '중국', score: 88, count: 2 },
    { name: '대만', score: 88, count: 2 }
  ];

  const genrePreferences = [
    { name: '액션', score: 85, count: 4 },
    { name: '모험', score: 85, count: 4 },
    { name: '코미디', score: 85, count: 4 },
    { name: '애니메이션', score: 80, count: 1 },
    { name: '드라마', score: 78, count: 1 },
    { name: 'SF', score: 72, count: 1 },
    { name: '공포', score: 70, count: 2 },
    { name: '로맨스', score: 68, count: 3 },
    { name: '판타지', score: 75, count: 2 }
  ];

  const likeCommentCnt = 2;

  if (loading) return <p>로딩 중...</p>;
  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="contents">
      <div className="mypage-wrap">
        <section className="mypage-section">
          <div className="mypage-background">
            <div className="mypage">
              <div className="mypage-container">
                <section className="section-all">
                  <div style={{ position: 'relative' }}>
                    <div style={{ padding: '4px' }}></div>
                    <div className="user-profile-div">
                      <div className="user-profile">
                        <div
                          style={{
                            backgroundImage: `url('https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg')`
                          }}
                        ></div>
                      </div>
                      <div className="user-info">
                        <h1 className="nickname">홍길동</h1>
                        <p className="email">test@gmail.com</p>
                      </div>
                    </div>
                    <div className="user-content">
                      <a href="#">
                        <span className="count">{assessment.length}</span>
                        <span className="count-title">평가</span>
                      </a>
                      <div className="line"></div>
                      <a href="#">
                        <span className="count">{interestedContents.length}</span>
                        <span className="count-title">관심 컨텐츠</span>
                      </a>
                      <div className="line"></div>
                      <a href="#">
                        <span className="count">{comments.length}</span>
                        <span className="count-title">코멘트</span>
                      </a>
                    </div>
                  </div>
                </section>

                <section className="section-all">
                  <div className="mypage-container">
                    <div className="user-content-title">취향분석</div>
                    <span className="rate-tag"># 별점분포</span>
                    <div className="user-taste-rate">
                      <div className="graph-container">
                        <div className="graph"></div>
                      </div>
                    </div>
                    <div className="user-content rating">
                      <div className='list'>
                        <span className="count">0</span>
                        <span className="count-title">별점 평균</span>
                      </div>
                      <div className="line"></div>
                      <div className='list'>
                        <span className="count">0</span>
                        <span className="count-title">별점 개수</span>
                      </div>
                      <div className="line"></div>
                      <div className='list'>
                        <span className="count">0</span>
                        <span className="count-title">많이 준 별점</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="section-all">
                  <div>
                    <div className="user-content-title">영화 선호국가</div>
                    <div className="top-3-container">
                      {countryPreferences.slice(0, 3).map((country, index) => (
                        <div className="user-content rating" key={index}>
                          <div className="list">
                            <span className="count">{country.name}</span>
                            <span className="count-title">
                              <span>{country.score}</span>점 • <span>{country.count}</span>편
                            </span>
                          </div>
                          {index < 2 && <div className="line"></div>}
                        </div>
                      ))}
                    </div>
                    <ul className="prefer-list">
                        {countryPreferences.slice(3, showMoreCountry ? countryPreferences.length : 6).map((country, index) => (
                          <li className="prefer-list-item" key={index}>
                            {country.name}
                            <span>{country.score}점 • {country.count}편</span>
                          </li>
                        ))}
                      </ul>
                    <button type="button" className="more" onClick={handleMoreCountryClick}>
                      <span role="textbox">{showMoreCountry ? '접기' : '더보기'}</span>
                    </button>
                  </div>

                  <hr className="section-devide" />

                  <div style={{ paddingBottom: '10px' }}>
                    <div className="user-content-title">영화 선호장르</div>
                    <div className="top-3-container">
                      {genrePreferences.slice(0, 3).map((genre, index) => (
                        <div className="user-content rating" key={index}>
                          <div className="list">
                            <span className="count">{genre.name}</span>
                            <span className="count-title">
                              <span>{genre.score}</span>점 • <span>{genre.count}</span>편
                            </span>
                          </div>
                          {index < 2 && <div className="line"></div>}
                        </div>
                      ))}
                    </div>
                    <ul className="prefer-list">
                        {genrePreferences.slice(3, showMoreGenre ? genrePreferences.length : 6).map((genre, index) => (
                          <li className="prefer-list-item" key={index}>
                            {genre.name}
                            <span>{genre.score}점 • {genre.count}편</span>
                          </li>
                        ))}
                      </ul>
                    <button type="button" className="more" onClick={handleMoreGenreClick}>
                      <span role="textbox">{showMoreGenre ? '접기' : '더보기'}</span>
                    </button>
                  </div>
                </section>

                <section className="section-all">
                  <div className="user-content-title">좋아요</div>
                  <div className="like-container">
                    <a href="#">
                      <div className="like-comment">
                        좋아요한 코멘트
                        <div className="like">{likeCommentCnt}</div>
                      </div>
                    </a>
                  </div>
                </section>

                <section className="section-all">
                  <div className="like-container">
                    <button >
                      <div onClick={handleLogout} className="logout">로그아웃</div>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;
