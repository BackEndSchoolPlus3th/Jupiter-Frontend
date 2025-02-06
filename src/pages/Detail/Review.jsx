import axios from "axios";
import { useEffect, useState } from "react";

function Review() {

  
  return (
    <section className="review-wrap">
      <header className="review-container">
        <h2 className="review-header">리뷰</h2>
        <div className="review-more-container">
          <div className="review-more-wrap">
            <a href="" className="review-more">
              더보기
            </a>
          </div>
        </div>
      </header>
      <ul className="review-ul">
        <li className="review-li">
          <div className="review-content-container">
            <div className="review-writer-container">
              <div className="review-writer">
                <a href="" className="review-writer-profile">
                  <div className="profile-wrap">
                    <div className="profile"></div>
                  </div>
                  <div className="profile-name">
                    kyo
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
                <span>4.5</span>
              </div>
            </div>
            <div className="review-content-wrap">
              <a href="">
                <div className="review-text-wrap">
                  <div className="review-text-box">
                    <div className="review-text">나는 이미 이준혁에 대한 객관성을 잃었다...</div>
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
              <em>217</em>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-comment">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M21.25 10.5c0 4.17-4.022 7.75-9.25 7.75s-9.25-3.58-9.25-7.75S6.772 2.75 12 2.75s9.25 3.58 9.25 7.75Z"
                ></path>
                <path fill="currentColor" stroke="currentColor" strokeWidth="1.2" d="M8.987 18.164 6.6 20.551v-3.58z"></path>
              </svg>
              <em>1</em>
            </div>
          </div>
        </li>
        <li className="review-li">
          <div className="review-content-container">
            <div className="review-writer-container">
              <div className="review-writer">
                <a href="" className="review-writer-profile">
                  <div className="profile-wrap">
                    <div className="profile"></div>
                  </div>
                  <div className="profile-name">
                    kyo
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
                <span>4.5</span>
              </div>
            </div>
            <div className="review-content-wrap">
              <a href="">
                <div className="review-text-wrap">
                  <div className="review-text-box">
                    <div className="review-text">나는 이미 이준혁에 대한 객관성을 잃었다...</div>
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
              <em>217</em>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-comment">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M21.25 10.5c0 4.17-4.022 7.75-9.25 7.75s-9.25-3.58-9.25-7.75S6.772 2.75 12 2.75s9.25 3.58 9.25 7.75Z"
                ></path>
                <path fill="currentColor" stroke="currentColor" strokeWidth="1.2" d="M8.987 18.164 6.6 20.551v-3.58z"></path>
              </svg>
              <em>1</em>
            </div>
          </div>
        </li>
        <li className="review-li">
          <div className="review-content-container">
            <div className="review-writer-container">
              <div className="review-writer">
                <a href="" className="review-writer-profile">
                  <div className="profile-wrap">
                    <div className="profile"></div>
                  </div>
                  <div className="profile-name">
                    kyo
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
                <span>4.5</span>
              </div>
            </div>
            <div className="review-content-wrap">
              <a href="">
                <div className="review-text-wrap">
                  <div className="review-text-box">
                    <div className="review-text">나는 이미 이준혁에 대한 객관성을 잃었다...</div>
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
              <em>217</em>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-comment">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M21.25 10.5c0 4.17-4.022 7.75-9.25 7.75s-9.25-3.58-9.25-7.75S6.772 2.75 12 2.75s9.25 3.58 9.25 7.75Z"
                ></path>
                <path fill="currentColor" stroke="currentColor" strokeWidth="1.2" d="M8.987 18.164 6.6 20.551v-3.58z"></path>
              </svg>
              <em>1</em>
            </div>
          </div>
        </li>
        <li className="review-li">
          <div className="review-content-container">
            <div className="review-writer-container">
              <div className="review-writer">
                <a href="" className="review-writer-profile">
                  <div className="profile-wrap">
                    <div className="profile"></div>
                  </div>
                  <div className="profile-name">
                    kyo
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
                <span>4.5</span>
              </div>
            </div>
            <div className="review-content-wrap">
              <a href="">
                <div className="review-text-wrap">
                  <div className="review-text-box">
                    <div className="review-text">나는 이미 이준혁에 대한 객관성을 잃었다...</div>
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
              <em>217</em>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-comment">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M21.25 10.5c0 4.17-4.022 7.75-9.25 7.75s-9.25-3.58-9.25-7.75S6.772 2.75 12 2.75s9.25 3.58 9.25 7.75Z"
                ></path>
                <path fill="currentColor" stroke="currentColor" strokeWidth="1.2" d="M8.987 18.164 6.6 20.551v-3.58z"></path>
              </svg>
              <em>1</em>
            </div>
          </div>
        </li>
        <li className="review-li">
          <div className="review-content-container">
            <div className="review-writer-container">
              <div className="review-writer">
                <a href="" className="review-writer-profile">
                  <div className="profile-wrap">
                    <div className="profile"></div>
                  </div>
                  <div className="profile-name">
                    kyo
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
                <span>4.5</span>
              </div>
            </div>
            <div className="review-content-wrap">
              <a href="">
                <div className="review-text-wrap">
                  <div className="review-text-box">
                    <div className="review-text">나는 이미 이준혁에 대한 객관성을 잃었다...</div>
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
              <em>217</em>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="review-comment">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M21.25 10.5c0 4.17-4.022 7.75-9.25 7.75s-9.25-3.58-9.25-7.75S6.772 2.75 12 2.75s9.25 3.58 9.25 7.75Z"
                ></path>
                <path fill="currentColor" stroke="currentColor" strokeWidth="1.2" d="M8.987 18.164 6.6 20.551v-3.58z"></path>
              </svg>
              <em>1</em>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Review;
