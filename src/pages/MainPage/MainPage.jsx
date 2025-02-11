import axios from 'axios';
import { useEffect, useState } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { API_BACKEND_URL } from "../../config";

import Banner from '../../components/banners/Banner';
// 모든 axios 요청에 쿠키 포함
// axios.defaults.withCredentials = true;

function MovieSection({ title, movies, loading, error }) {
    return (
        <div className="box-recommend">
            <p className="contents-title">{title}</p>
            <div className="contents-box">
                {loading ? (
                    <p>로딩 중...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul className="contents-ul">
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <Link to={`/detail/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    {movie.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function MainPage() {
    const [popularMovies, setBoxOfficeMovies] = useState([]);
    const [topRatedMovies, setRecommendedMovies] = useState([]);

    const [likeKeywordMovies, setLikeKeywordMovies] = useState([]);
    const [likeGenreMovies, setLikeGenreMovies] = useState([]);
    const [likeGenreMovies_2nd, setLikeGenreMovies_2nd] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        // ⭐ 새로고침 시 쿠키를 가져와 상태 유지
            useEffect(() => {
                const checkCookie = async () => {
                    try {
                        const res = await axios.get(`${API_BACKEND_URL}/api/v1/auth/check`, {
                        withCredentials: true  // 쿠키 포함
                        });
                        if(res.data === "쿠키가 없습니다.") {
                            console.log('비로그인 상태');
                        }else{
                            console.log('로그인 성공, 쿠키 확인:', res.data);
                        }
                    } catch (err) {
                        console.log('비로그인 상태');
                    }
                };
                checkCookie();
            }, []);

    // 로컬 데이터 설정
    const localPopularMovies = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ];
  
    const localTopRatedMovies = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ];
    const localLikeGenreMovies = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                // 백엔드 상태 확인: 헬스 체크로 서버가 동작하는지 확인
                const backendAvailable = await checkBackendAvailability();

                if (backendAvailable) {
                    const popularMovies = await axios.get(`${API_BACKEND_URL}/api/v1/movie/popular`);
                    setBoxOfficeMovies(popularMovies.data);

                    const topRatedMovies = await axios.get(`${API_BACKEND_URL}/api/v1/movie/top-rated`);
                    setRecommendedMovies(topRatedMovies.data);

                    // 좋아하는 키워드의 영화
                    const likeKeywordMovies = await axios.get(`${API_BACKEND_URL}/api/v1/movie/likes_keyword`, {
                        withCredentials: true
                    });
                    setLikeKeywordMovies(likeKeywordMovies.data);


                    // 좋아하는 첫 번째 장르의 영화
                    const likeGenreMovies = await axios.get(`${API_BACKEND_URL}/api/v1/movie/likes`, {
                        withCredentials: true
                    });
                    setLikeGenreMovies(likeGenreMovies.data);

                    // 좋아하는 두 번째 장르의 영화
                    const likeGenreMovies_2nd = await axios.get(`${API_BACKEND_URL}/api/v1/movie/likes_2nd`, {
                        withCredentials: true
                    });
                    setLikeGenreMovies_2nd(likeGenreMovies_2nd.data);
                } else {
                    // 백엔드 꺼져 있을 때 로컬 데이터를 사용
                    setBoxOfficeMovies(localPopularMovies);
                    setRecommendedMovies(localTopRatedMovies);
                    setLikeKeywordMovies(localLikeGenreMovies);
                    setLikeGenreMovies(localLikeGenreMovies);
                    setLikeGenreMovies_2nd(localLikeGenreMovies);
                }
            } catch (error) {
                console.error('영화 데이터를 불러오는 데 실패했습니다.', error);
                setError('영화 데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        // 백엔드 서버가 동작하는지 체크하는 함수
        const checkBackendAvailability = async () => {
            try {
                await axios.get(`${API_BACKEND_URL}/api/v1/movie/top-rated`);
                return true; // 서버가 정상
            } catch (err) {
                return false; // 서버가 비정상
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="contents">
            <div className="contents-div">
                {/* 인기 영화 섹션 */}
                <MovieSection title="PopularMovies" movies={popularMovies} loading={loading} error={error} />

                {/* 추천 영화 섹션 */}
                <MovieSection title="TopRatedMovies" movies={topRatedMovies} loading={loading} error={error} />

                {/* 좋아하는 키워드 영화 섹션 */}
                <div className="box-recommend">
                    <p className="contents-title">당신의 취향을 찾아드릴게요!</p>
                    <div className="contents-box">
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : error ? (
                            <p>{error}</p>  // 에러 메시지 표시
                        ) : (
                            <ul className="contents-ul">
                                {likeKeywordMovies.map((movie) => (
                                    <li key={movie.id}>
                                        <Link to={`/detail/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                            {movie.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* 좋아하는 장르 영화 섹션 */}
                <div className="box-recommend">
                    <p className="contents-title">당신이 가장 좋아하는 장르 영화</p>
                    <div className="contents-box">
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : error ? (
                            <p>{error}</p>  // 에러 메시지 표시
                        ) : (
                            <ul className="contents-ul">
                                {likeGenreMovies.map((movie) => (
                                    <li key={movie.id}>
                                        <Link to={`/detail/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                            {movie.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* 두 번째로 좋아하는 장르 영화 섹션 */}
                <div className="box-recommend">
                    <p className="contents-title">당신이 정말 좋아하는 장르 영화</p>
                    <div className="contents-box">
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : error ? (
                            <p>{error}</p>  // 에러 메시지 표시
                        ) : (
                            <ul className="contents-ul">
                                {likeGenreMovies_2nd.map((movie) => (
                                    <li key={movie.id}>
                                        <Link to={`/detail/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                            {movie.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;