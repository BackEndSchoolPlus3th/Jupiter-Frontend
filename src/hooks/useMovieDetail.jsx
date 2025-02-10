import { useEffect, useState } from "react";
import axios from "axios";

const useMovieDetail = (id) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!id) return;

        // 🎬 영화 상세 정보 가져오기
        const movieResponse = await axios.get(`${API_BACKEND_URL}/api/v1/movie/${id}`);
        setMovieDetail(movieResponse.data);

        // 🎥 유튜브 트레일러 가져오기
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=00818fb3c14d88bec4f27119b14606a9&language=ko`
        );

        // 🎯 첫 번째 영상의 key 저장
        const movieKey = videoResponse.data.results[0]?.key;
        setVideoKey(movieKey);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, [id]);

  return { movieDetail, videoKey };
};

export default useMovieDetail;
