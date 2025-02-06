import axios from 'axios';
import { useEffect, useState } from 'react';
import './MainPage.css';

import Banner from '../../components/banners/Banner';

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
    );
}

function MainPage() {
    const [popularMovies, setBoxOfficeMovies] = useState([]);
    const [topRatedMovies, setRecommendedMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
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

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                // 백엔드 상태 확인: 헬스 체크로 서버가 동작하는지 확인
                const backendAvailable = await checkBackendAvailability();

                if (backendAvailable) {
                    const popularMovies = await axios.get('http://localhost:8090/api/v1/movie/popular');
                    setBoxOfficeMovies(popularMovies.data);

                    const topRatedMovies = await axios.get('http://localhost:8090/api/v1/movie/top-rated');
                    setRecommendedMovies(topRatedMovies.data);

                    const actionMovies = await axios.get('http://localhost:8090/api/v1/movie/genre/28'); // 액션 장르의 ID 28 사용
                    setActionMovies(actionMovies.data);

                    const comedyMovies = await axios.get('http://localhost:8090/api/v1/movie/genre/35'); // 로맨스 장르의 ID 10749 사용
                    setComedyMovies(comedyMovies.data);
                } else {
                    // 백엔드 꺼져 있을 때 로컬 데이터를 사용
                    setBoxOfficeMovies(localPopularMovies);
                    setRecommendedMovies(localPopularMovies);
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
                await axios.get('http://localhost:8090/');
                return true; // 서버가 정상
            } catch (err) {
                return false; // 서버가 비정상
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="contents">
            <Header />
            <div className="contents-div">
                {/* 인기 영화 섹션 */}
                <MovieSection title="PopularMovies" movies={popularMovies} loading={loading} error={error} />
                
                {/* 추천 영화 섹션 */}
                <MovieSection title="TopRatedMovies" movies={topRatedMovies} loading={loading} error={error} />
                
                {/* 액션 영화 섹션 */}
                <MovieSection title="ActionMovies" movies={actionMovies} loading={loading} error={error} />
                
                {/* 코미디 영화 섹션 */}
                <MovieSection title="ComedyMovies" movies={comedyMovies} loading={loading} error={error} />
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
