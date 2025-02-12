import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../config";
import axios from "axios";

const useMovieDetail = (status) => {
  const [movieReview, setMovieReview] = useState([]);
  const { id: movieId } = useParams();

  useEffect(() => {

    const fetchReviews = async () => {
      if (!movieId) return; // movieId가 없으면 실행 안 함
  
      try {
        const reviewResponse = await axios.get(`${API_BACKEND_URL}/api/v1/movie/reviews/${movieId}`);
        setMovieReview(reviewResponse.data); // 데이터를 리스트로 저장
        console.log(reviewResponse.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
  
      // if (reviewResponse.ok) {
      //   const reviewerName = await axios.get(`${API_BACKEND_URL}/api/v1/movie/reviewer/${movieId}`);
      // }

      fetchReviews();
    };
  }, [status]);

  return { movieReview };
};

export default useMovieDetail;
