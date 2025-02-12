import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BACKEND_URL } from "../../config";
import useMovieDetail from "../../hooks/useMovieDetail";
import useAuthHook from "../../hooks/useAuthHook";
// import useDetailHook from "../../hooks/useDetailHook";
import Banner from "./Banner";
import Credits from "./Credits";
import Comment from "./Comment";
import { getProfile, login as apiLogin, logout as apiLogout } from "../../services/auth";

function Content() {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const { movieDetail, videoKey } = useMovieDetail(id); // 받아온 id를 hook에 전달

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  const [status, setStatus] = useState(0);
  const [memberReview, setMemberReview] = useState();
  const [comment, setComment] = useState(""); // 입력된 값 저장
  const [starPoint, setStarPoint] = useState(0); // 별점 상태 추가

  // useEffect(() => {
    
  // }, [status]);

  // 페이지 로드 시 자동 로그인 확인
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
        console.log("check login");
        setStatus(prevStatus => prevStatus + 1);
      } catch {
        setUser(null); // 인증 실패 시 null
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const [movieReview, setMovieReview] = useState([]);

  useEffect(() => {
    console.log("status 변경 감지됨:", status);
    const fetchReviews = async () => {
      console.log(id);
      if (!id) return; // movieId가 없으면 실행 안 함
  
      try {
        const reviewResponse = await axios.get(`${API_BACKEND_URL}/api/v1/movie/reviews/${id}`);
        setMovieReview(reviewResponse.data); // 데이터를 리스트로 저장
        console.log(reviewResponse.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
  
      // if (reviewResponse.ok) {
      //   const reviewerName = await axios.get(`${API_BACKEND_URL}/api/v1/movie/reviewer/${movieId}`);
      // }

    };

    fetchReviews();
    console.log('fetchreview 실행됌')
  }, [status]);

  // console.log(user.data.email);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (user) {
      if (!memberReview) {
        if (!comment.trim()) {
          alert("내용을 입력하세요!");
          return;
        }

        try {
          const response = await fetch(`${API_BACKEND_URL}/api/v1/movie/review/write`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reviewContent: comment, movie: id, user: user.data.email, rating: starPoint }),
            credentials: "include",
          });

          if (response.ok) {
            alert("리뷰가 성공적으로 저장되었습니다!");
            setComment(""); // 입력 필드 초기화
            setStatus(prevStatus => prevStatus + 1);
            console.log(status);
          } else {
            alert("저장 실패");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("오류가 발생했습니다.");
        }
      } else {
        alert("수정");
        const reviewId = memberReview.id;
        console.log("reviewId:", reviewId);
        const updateReview = await fetch(`${API_BACKEND_URL}/api/v1/movie/review/update/${reviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewContent: comment, rating: starPoint }),
          credentials: "include",
        });
        console.log(updateReview);

        if (updateReview.ok) {
          const myReview = document.querySelector(".my-review");
          alert("리뷰가 성공적으로 수정되었습니다!");
          setComment(""); // 입력 필드 초기화
          setStatus(prevStatus => prevStatus + 1);
          console.log(status);
          // myReview.innerText = memberReview.reviewContent;
        } else {
          alert("수정 실패");
        }
      }
    } else {
      alert("로그인 후 이용해주세요!");
    }
  };

  // const [memberReview, setMemberReview] = useState(() => {
  //   const savedMemberReview = localStorage.getItem("memberReview");
  //   return savedMemberReview ? JSON.parse(savedMemberReview) : null;
  // });

  // useEffect(() => {
  //   // 로컬 스토리지에 movie 데이터를 저장
  //   if (memberReview) {
  //     localStorage.setItem("memberReview", JSON.stringify(memberReview));
  //   }
  // }, [memberReview]);



  useEffect(() => {
    const fetchMovieReviewResponse = async () => {
      if (!user) {
        return;
      }
  
      try {
        const userEmail = user.data.email;
        const movieReviewResponse = await axios.get(`${API_BACKEND_URL}/api/v1/movie/review/${userEmail}/${id}`);
        setMemberReview(movieReviewResponse.data);
        console.log("fetchMovieReview");
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };
    fetchMovieReviewResponse();
    console.log('내가 쓴 리뷰 불러오기')
  }, [status]);

  useEffect(() => {
    const review = document.querySelector(".acting-comment");
    const modal = document.querySelector(".review-modal-container");
    const modalOff = document.querySelector(".review-modal-close");
    const modalWrap = document.querySelector(".review-modal-wrap");


    // 작성버튼 눌렀을 때 모달창 on
    review.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // X 버튼 눌렀을 때 모달창 off
    modalOff.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // 모달창 외의 다른 부분 클릭시 모달창 off
    modalWrap.addEventListener("click", (e) => {
      const classCheck = e.target.className;
      if (classCheck == "review-modal-wrap") {
        modal.style.display = "none";
      }
    });

    const reviewTextArea = document.querySelector(".review-modal-textarea");
    const reviewTextCount = document.querySelector(".review-modal-text-count");
    const saveBtn = document.querySelector(".review-modal-save-btn");

    // 리뷰 작성 시 글자 수 세기
    reviewTextArea.addEventListener("keyup", (e) => {
      reviewTextCount.innerText = `${e.target.value.length} / 10000`;
    });

    saveBtn.addEventListener("click", () => {
      reviewTextCount.innerText = `0 / 10000`;
    });

    const starRating = document.querySelectorAll(".star-rating");
    const starRating1 = document.querySelector(".star-rating1");
    const starRating2 = document.querySelector(".star-rating2");
    const starRating3 = document.querySelector(".star-rating3");
    const starRating4 = document.querySelector(".star-rating4");
    const starRating5 = document.querySelector(".star-rating5");

    let starPoint = 0;

    starRating.forEach((star) => {
      star.addEventListener("click", (e) => {
        if (e.target.parentNode === starRating1) {
          setStarPoint(1);
          starRating1.style = "color: red";
          starRating2.style = "color: black";
          starRating3.style = "color: black";
          starRating4.style = "color: black";
          starRating5.style = "color: black";
        } else if (e.target.parentNode === starRating2) {
          setStarPoint(2);
          starRating1.style = "color: red";
          starRating2.style = "color: red";
          starRating3.style = "color: black";
          starRating4.style = "color: black";
          starRating5.style = "color: black";
        } else if (e.target.parentNode === starRating3) {
          setStarPoint(3);
          starRating1.style = "color: red";
          starRating2.style = "color: red";
          starRating3.style = "color: red";
          starRating4.style = "color: black";
          starRating5.style = "color: black";
        } else if (e.target.parentNode === starRating4) {
          setStarPoint(4);
          starRating1.style = "color: red";
          starRating2.style = "color: red";
          starRating3.style = "color: red";
          starRating4.style = "color: red";
          starRating5.style = "color: black";
        } else if (e.target.parentNode === starRating5) {
          setStarPoint(5);
          starRating1.style = "color: red";
          starRating2.style = "color: red";
          starRating3.style = "color: red";
          starRating4.style = "color: red";
          starRating5.style = "color: red";
        }
      });
    });
    if (memberReview) {

      if (memberReview.rating === 1) {
        starRating1.style = "color: red";
        starRating2.style = "color: black";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 2) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 3) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 4) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: red";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 5) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: red";
        starRating5.style = "color: red";
      } else if (memberReview.rating === 0) {
        starRating1.style = "color: black";
        starRating2.style = "color: black";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      }
    }
  });

  useEffect(() => {
    const starRating = document.querySelectorAll(".star-rating");
    const starRating1 = document.querySelector(".star-rating1");
    const starRating2 = document.querySelector(".star-rating2");
    const starRating3 = document.querySelector(".star-rating3");
    const starRating4 = document.querySelector(".star-rating4");
    const starRating5 = document.querySelector(".star-rating5");

    if (memberReview) {

      if (memberReview.rating === 1) {
        starRating1.style = "color: red";
        starRating2.style = "color: black";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 2) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 3) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 4) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: red";
        starRating5.style = "color: black";
      } else if (memberReview.rating === 5) {
        starRating1.style = "color: red";
        starRating2.style = "color: red";
        starRating3.style = "color: red";
        starRating4.style = "color: red";
        starRating5.style = "color: red";
      } else if (memberReview.rating === 0) {
        starRating1.style = "color: black";
        starRating2.style = "color: black";
        starRating3.style = "color: black";
        starRating4.style = "color: black";
        starRating5.style = "color: black";
      }
    }
  }, [status]);

  return (
    <>
      {/* ----------------------------------- */}
      <div className="root-div">
        {/* <Header /> */}
        <section className="section-1">
          <div>
            <div className="base-div">
              <div className="top-container">
                <div>
                  <Banner />
                  <div className="mid-div">
                    <section className="mid-content-box">
                      <div className="mid-content-left">
                        <div className="mid-content-left-img-box">
                          <div className="mid-content-img-wrap">
                            <img src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`} alt="" className="mid-content-img" />
                          </div>
                        </div>
                      </div>
                      <div className="mid-content-right">
                        <section className="mid-content-right-estimate">
                          <div className="estimate-star">
                            <div className="star-images">
                              <div className="star-images-container" data-select="content-rating-stars">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="star-rating star-rating1">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className=" star-rating star-rating2">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="star-rating star-rating3">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="star-rating star-rating4">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="star-rating star-rating5">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <div className="star-images-background" style={{ width: "0%" }}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: "24", height: "24" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="n_QBRgMG Nkr_Gl7d"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                    ></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: "24", height: "24" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="n_QBRgMG Nkr_Gl7d"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                    ></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: "24", height: "24" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="n_QBRgMG Nkr_Gl7d"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                    ></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: "24", height: "24" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="n_QBRgMG Nkr_Gl7d"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                    ></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: "24", height: "24" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="n_QBRgMG Nkr_Gl7d"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="star-images-text">
                              <div className="star-images-text-inner">평가하기</div>
                            </div>
                          </div>
                          <div className="estimate-rating">
                            <div className="estimate-rating-inner">
                              <div className="rating-inner-num">{(movieDetail?.vote_average / 2)?.toFixed(1)}</div>
                              <div className="rating-inner-text">
                                평균 별점
                                <br className="rating-inner-count" />({movieDetail?.vote_count})
                              </div>
                            </div>
                          </div>
                          <div className="estimate-acting">
                            <button className="acting-bookmark" type="button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "48", height: "48" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                className="bookmark-btn"
                              >
                                <rect width="4" height="11" x="2" y="10" fill="currentColor" rx="0.75"></rect>
                                <path
                                  fill="currentColor"
                                  d="M7.5 9.31a.75.75 0 0 1 .22-.53l5.75-5.75a.75.75 0 0 1 1.06 0l.679.679a.75.75 0 0 1 .202.693L14.5 8.5h6.75a.75.75 0 0 1 .75.75v3.018a6 6 0 0 1-.485 2.364l-2.32 5.413a.75.75 0 0 1-.69.455H8.25a.75.75 0 0 1-.75-.75z"
                                ></path>
                              </svg>
                              보고싶어요
                            </button>
                            <button className="bookmark-write" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "24", height: "24" }} fill="none" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="m17.273 3.186 3.536 3.536a1 1 0 0 1 0 1.414L19.395 9.55l-4.95-4.95 1.414-1.414a1 1 0 0 1 1.414 0M4.904 14.152l4.95 4.95 8.486-8.486-4.95-4.95zm-1.997 6.367a.5.5 0 0 0 .58.58l5.307-.937-4.95-4.95z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              코멘트
                            </button>
                            <button className="acting-comment" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "48", height: "48" }} fill="none" viewBox="0 0 48 48">
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="m35.584 4.64 7.771 7.766c.86.86.86 2.247 0 3.106l-3.107 3.106L29.369 7.745l3.108-3.106a2.2 2.2 0 0 1 3.107 0ZM8.403 28.727 19.28 39.6l18.65-18.64-10.88-10.87zM4.014 42.714a1.096 1.096 0 0 0 1.273 1.272l11.665-2.056L6.073 31.057z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              {memberReview ? "코멘트 수정" : "코멘트"}
                              <div className="comment-container">
                                <div className="comment-write">
                                  <div className="comment-modify">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ width: "24", height: "24" }}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="modify-icon"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="m17.273 3.186 3.536 3.536a1 1 0 0 1 0 1.414L19.395 9.55l-4.95-4.95 1.414-1.414a1 1 0 0 1 1.414 0M4.904 14.152l4.95 4.95 8.486-8.486-4.95-4.95zm-1.997 6.367a.5.5 0 0 0 .58.58l5.307-.937-4.95-4.95z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    코멘트 수정
                                  </div>
                                  <div className="comment-delete">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ width: "24", height: "24" }}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="delete-icon"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M3.75 4.5a.75.75 0 0 0 0 1.5h.29l.42 15.5A1.54 1.54 0 0 0 6 23h12a1.54 1.54 0 0 0 1.54-1.5L19.96 6h.29a.75.75 0 0 0 0-1.5zM18.46 6H5.54l.42 15.5h12.08z"
                                        clipRule="evenodd"
                                      ></path>
                                      <path fill="currentColor" d="M8.5 5H7V2.5A1.5 1.5 0 0 1 8.5 1zm7 0H17V2.5A1.5 1.5 0 0 0 15.5 1z"></path>
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M19 4.5H5V22h14zM8.74 18.284a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5a.75.75 0 0 1-.75.75m2.622-.75a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 1 0-1.5 0zm4.12.75a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5a.75.75 0 0 1-.75.75"
                                        clipRule="evenodd"
                                      ></path>
                                      <path fill="currentColor" d="M8.5 1h7v1.5h-7z"></path>
                                    </svg>
                                    코멘트 삭제
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button className="acting-add-none" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "40", height: "40" }} fill="none" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M18.998 13.498a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-5.498-1.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m-6.998 0a1.5 1.5 0 1 0-2.998-.002 1.5 1.5 0 0 0 2.998.002"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              더보기
                            </button>
                            <button className="acting-add" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "40", height: "40" }} fill="none" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M18.998 13.498a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-5.498-1.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m-6.998 0a1.5 1.5 0 1 0-2.998-.002 1.5 1.5 0 0 0 2.998.002"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              더보기
                              <div className="acting-add-menu">
                                <div className="add-menu-container">
                                  <div className="add-disinterest">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ width: "24", height: "24" }}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="disinterest-icon"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M18.166 19.227A9.46 9.46 0 0 1 12 21.5 9.5 9.5 0 0 1 2.5 12c0-2.353.856-4.507 2.273-6.166zm1.061-1.06L5.834 4.772A9.46 9.46 0 0 1 12 2.5a9.5 9.5 0 0 1 9.5 9.5 9.46 9.46 0 0 1-2.273 6.166ZM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    관심없어요
                                  </div>
                                  <div className="add-collection">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ width: "24", height: "24" }}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="collection-icon"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M4.747 6.083 5.802 3.5h12.392l1.056 2.583zm11.25 8.662h-3.249v3.25a.75.75 0 0 1-1.5 0v-3.25h-3.25a.75.75 0 0 1 0-1.5h3.25v-3.25a.75.75 0 0 1 1.5 0v3.25h3.25a.75.75 0 0 1 0 1.5Zm4.665-9.118-1.368-3.159A.99.99 0 0 0 18.462 2H5.535a.99.99 0 0 0-.832.468L3.336 5.627C3.116 5.973 3 6.379 3 6.794v14.154C3 21.528 3.447 22 4 22h15.998c.552 0 1-.471 1-1.052V6.794c0-.415-.117-.82-.336-1.167"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    컬렉션에 추가
                                  </div>
                                  <div className="add-calendar">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ width: "24", height: "24" }}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      className="calendar-icon"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M6 2.75a.75.75 0 0 1 1.5 0V4h9V2.75a.75.75 0 0 1 1.5 0V4h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zM3.5 5.5v15h17v-15z"
                                        clipRule="evenodd"
                                      ></path>
                                      <rect width="5" height="5" x="13" y="13" fill="currentColor" rx="0.75"></rect>
                                    </svg>
                                    본 날짜 추가
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </section>
                        <section className="content-summary">
                          {memberReview && <div className="my-review">{memberReview?.reviewContent}</div>}
                          <p className="summary-text">{movieDetail?.overview}</p>
                        </section>
                      </div>
                    </section>
                  </div>
                  <div className="review-modal-container">
                    <div className="review-modal-wrap">
                      <div className="review-modal">
                        <header className="review-modal-header">
                          <em className="review-modal-title">{movieDetail?.title}</em>
                          <div className="review-modal-close">
                            <button className="review-modal-close-btn" type="button">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "18", height: "18" }}
                                fill="none"
                                viewBox="0 0 18 18"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M15.279 2.72a.666.666 0 0 0-.942 0L9 8.059 3.663 2.721a.666.666 0 1 0-.942.942L8.058 9l-5.337 5.337a.666.666 0 0 0 .942.942L9 9.942l5.337 5.337a.666.666 0 0 0 .942-.942L9.942 9l5.337-5.337a.666.666 0 0 0 0-.942"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </header>
                        <div className="review-modal-comment-container">
                          <div className="review-modal-comment-wrap">
                            <div className="review-modal-comment">
                              <div className="review-modal-comment-area">
                                <textarea
                                  className="review-modal-textarea"
                                  placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
                                  maxLength="10000"
                                  value={comment}
                                  onChange={handleChange}
                                ></textarea>
                                <div className="review-textarea-div"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="review-modal-save-container">
                          <div className="review-modal-save-box">
                            <p className="review-text-count"></p>
                            <p className="review-modal-text-count">0/10000</p>
                            <button className="review-modal-save-btn" type="button" onClick={handleSubmit}>
                              저장
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="content-credits-wrap">
                <Credits />
                <section className="review-wrap">
                  <header className="review-container">
                    <h2 className="review-header">리뷰</h2>
                    <div className="review-more-container">
                      <div className="review-more-wrap">{/* <a href="" className="review-more">더보기</a> */}</div>
                    </div>
                  </header>
                  <ul className="review-ul">
                    {/* 리뷰 리스트 렌더링 */}
                    {movieReview.length > 0 ? (
                      movieReview.map((review, index) => (
                        <li key={index} className="review-li">
                          <div className="review-content-container">
                            <div className="review-writer-container">
                              <div className="review-writer">
                                <a href="#" className="review-writer-profile">
                                  <div className="profile-wrap">
                                    <div className="profile"></div>
                                  </div>
                                  <div className="profile-name">
                                    {review.userId}
                                    <span></span>
                                  </div>
                                </a>
                              </div>
                              <div className="star-rank-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="star-rank">
                                  <path
                                    fill="currentColor"
                                    d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"
                                  ></path>
                                </svg>
                                <span>{review.rating?.toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="review-content-wrap">
                              <a href="#">
                                <div className="review-text-wrap">
                                  <div className="review-text-box">
                                    <div className="review-text">{review.reviewContent}</div>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="review-rating">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-like">
                                <rect width="4" height="11" x="2" y="10" fill="currentColor" rx="0.75"></rect>
                                <path
                                  fill="currentColor"
                                  d="M7.5 9.31a.75.75 0 0 1 .22-.53l5.75-5.75a.75.75 0 0 1 1.06 0l.679.679a.75.75 0 0 1 .202.693L14.5 8.5h6.75a.75.75 0 0 1 .75.75v3.018a6 6 0 0 1-.485 2.364l-2.32 5.413a.75.75 0 0 1-.69.455H8.25a.75.75 0 0 1-.75-.75z"
                                ></path>
                              </svg>
                              <em>좋아요</em>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>리뷰가 없습니다.</p>
                    )}
                  </ul>
                </section>
                {/* <Collection /> */}
              </section>
            </div>
            <Comment />
            {/* <ReviewModal /> */}
          </div>
        </section>
        {/* <Footer /> */}
      </div>
      {/* ------------------------------------ */}
    </>
  );
}

export default Content;
