import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchPage.css';
import axios from 'axios';

function GeneralSearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const word = searchParams.get('word');

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (!word) {
      setError('검색어가 없습니다');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
      
        const response = await axios.get(
          `${API_BASE_URL}` + '/api/v1/movie/search',
          { params: { word } } 
        );
        setData(response.data);
      } catch (error) {
    
        console.error('검색 오류:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [word]);
  const handleSelectChange = (e) => {
   
    submitOrderByLatest(e.target.value);
  }
 

  const submitOrderByLatest = async (option) =>{
    try {
    
      const response = await axios.get(
        `${API_BASE_URL}` + `/api/v1/movie/search/${option}`,
        { params: { word } }
      );
      setData(response.data);
    } catch (error) {
     
      console.error('검색 오류:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wrap">
      <div className="main_text0" id="link_main_text0">
        <div style={{ marginLeft: '45px', width: '95%', fontSize: '20px', color: 'black',display: 'flex',justifyContent: 'space-between' }}>
          <div>영화</div>
        <div>
          <select onChange={handleSelectChange}>
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select></div> 
        </div>
        <ul className="icons">
          {data.map((item) => (          
            <li key={item.id} className="icon">
              <Link to={`/detail/${item.id}`} key={item.id}>
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
              </div></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GeneralSearch;