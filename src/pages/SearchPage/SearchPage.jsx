import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { API_BACKEND_URL } from "../../config";
import './SearchPage.css';
import "../../index.css";
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
          `${API_BACKEND_URL}/api/v1/movie/search`,
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
        `${API_BACKEND_URL}/api/v1/movie/search/${option}`,
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
       <div className="wrap p-6 s-contents box-white h-100">
         {/* 제목 & 필터 */}
         <div
           className="flex justify-between items-center px-4 mb-6 search-contents-box1 relative z-10 box-white"
         >
           <p className="contents-title">검색 결과</p>
           <select
             onChange={handleSelectChange}
             className="select select-primary w-36 box-white mr-5"
           >
             <option value="latest">최신순</option>
             <option value="popular">인기순</option>
           </select>
         </div>

         {/* 영화 리스트 */}
         <div className="main_text0 card p-4 contents-div relative z-0 box-white">
           <div className="flex justify-start items-center px-4 mb-4 search-contents-box2">
             <h2 className="text-xl font-bold text-black">영화</h2>
           </div>

           <ul className="grid grid-cols-6 gap-4 box-white">
             {data.map((item) => (
               <li key={item.id} className="shadow-md w-48">
                 <Link to={`/detail/${item.id}`} className="block p-3">
                   {/* 포스터 */}
                   <div className="card rounded-lg overflow-hidden box-white w-48 shadow-lg">
                     {item.poster_path ? (
                       <img
                         src={`http://image.tmdb.org/t/p/w185${item.poster_path}`}
                         alt={item.title}
                         className="w-full h-40 object-cover"
                       />
                     ) : (
                       <div className="w-full h-40 flex items-center justify-center bg-gray-300">
                         <span className="text-gray-600">이미지 없음</span>
                       </div>
                     )}
                   </div>

                   {/* 제목 */}
                   <h3 className="text-sm font-semibold mt-2 truncate">{item.title}</h3>

                   {/* 개봉 연도 & 국가 */}
                   <p className="text-xs text-gray-500">
                     {item.release_date?.substring(0, 4)} ・ {item.original_country || "N/A"}
                   </p>
                 </Link>
               </li>
             ))}
           </ul>
         </div>
       </div>

  );
}

export default GeneralSearch;