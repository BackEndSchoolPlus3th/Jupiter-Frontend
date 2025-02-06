import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useMovieDetail from "../../hooks/useMovieDetail";

function Credits() {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const { movieDetail, videoKey } = useMovieDetail(id); // 받아온 id를 hook에 전달

  return (
    <section className="content-credits">
                  <header className="credits-text">
                    <h2 className="credit-text">출연/제작</h2>
                  </header>
                  <section className="members-wrap">
                    <div className="members-container">
                      {movieDetail?.genres?.replace(/,$/, "").split(",").join(", ")}
                    </div>
                  </section>
                </section>
  );
}

export default Credits;
