import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useMovieDetail from "../../hooks/useMovieDetail";

function Banner() {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const { movieDetail, videoKey } = useMovieDetail(id); // 받아온 id를 hook에 전달

  return (
    <div className="top-banner">
      <div className="top-banner-img">
        <iframe
          className="iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="top-banner-content-box">
        <div>
          <h1 className="top-banner-text-big-title">{movieDetail?.title}</h1>
          <div className="top-banner-text-small-title">{movieDetail?.title}</div>
          <div className="top-banner-text-content1">{movieDetail?.genres}</div>
          <div className="top-banner-text-content2">{movieDetail?.release_date} · {movieDetail?.original_country}</div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
