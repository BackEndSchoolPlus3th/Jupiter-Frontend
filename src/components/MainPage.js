import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/MainPage.css';

import Header from './Header';
import Footer from './Footer';

function MainPage() {
    const [popularMovies, setBoxOfficeMovies] = useState([]);
    const [topRatedMovies, setRecommendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                // 백엔드 요청 대신 로컬 데이터를 사용
                if (false) {  // 백엔드가 꺼졌을 때 로컬 데이터를 사용할 수 있도록 조건 추가
                    const popularMovies = await axios.get('http://localhost:8090/api/movies/popular');
                    setBoxOfficeMovies(popularMovies.data);

                    const topRatedMovies = await axios.get('http://localhost:8090/api/movies/top-rated');
                    setRecommendedMovies(topRatedMovies.data);
                } else {
                    // 백엔드 꺼져 있을 때 로컬 데이터를 사용
                    setBoxOfficeMovies(localPopularMovies);
                    setRecommendedMovies(localTopRatedMovies);
                }
            } catch (error) {
                console.error('영화 데이터를 불러오는 데 실패했습니다.', error);
                setError('영화 데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="contents">
            <Header />
            <div className="contents-div">
                {/* 인기 영화 섹션 */}
                <div className="box-office">
                    <p className="contents-title">PopularMovies</p>
                    <div className="contents-box">
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : error ? (
                            <p>{error}</p>  // 에러 메시지 표시
                        ) : (
                            <ul className="contents-ul">
                                {popularMovies.map((movie) => (
                                    <li key={movie.id}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                        {movie.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* 추천 영화 섹션 */}
                <div className="box-recommend">
                    <p className="contents-title">TopRatedMovies</p>
                    <div className="contents-box">
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : error ? (
                            <p>{error}</p>  // 에러 메시지 표시
                        ) : (
                            <ul className="contents-ul">
                                {topRatedMovies.map((movie) => (
                                    <li key={movie.id}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                        {movie.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
