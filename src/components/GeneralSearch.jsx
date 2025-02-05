import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/GeneralSearch.css';
import axios from 'axios'; // 1. Axios 대소문자 수정

function GeneralSearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const word = searchParams.get('word'); // 2. 훅 순서 변경

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 3. 검색어 유효성 검사 추가
    if (!word) {
      setError('검색어가 없습니다');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // 4. API 엔드포인트 수정
        const response = await axios.get(
          'http://localhost:8090/api/v1/movie/search',
          { params: { word } } // 5. 올바른 파라미터 전달
        );
        setData(response.data);
      } catch (error) {
        // 6. 에러 처리 강화
        console.error('검색 오류:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [word]); // 7. word 의존성 추가

  // 8. 조건부 렌더링 위치 수정
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wrap">
      <div className="main_text0" id="link_main_text0">
        <div style={{ marginLeft: '45px', width: '100px', fontSize: '20px' }}>
          영화
        </div>
        <ul className="icons">
          {data.map((item) => (
            <li key={item.id} className="icon"> 
              <div className="icon_img">
            {item.poster_path==null ? <div></div> : 
              <img
                src={`http://image.tmdb.org/t/p/w185${item.poster_path}`}
                alt={item.title}
              />}
              </div>
              <div className="contents1_bold">
                {item.title.length > 14
                  ? item.title.substring(0, 13).concat('..')
                  : item.title}
              </div>
              <div className="contents2">
                {item.release_date?.substring(0, 4)} ・{' '}
                {item.original_country}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GeneralSearch;