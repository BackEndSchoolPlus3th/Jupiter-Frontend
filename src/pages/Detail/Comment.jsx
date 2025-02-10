import { useEffect } from "react";

function Comment() {
  useEffect(() => {
    const reviews = document.querySelectorAll(".review-comment");

    const modal = document.querySelector(".modal-container");
    const modalOff = document.querySelector(".modal-header-btn");
    const modalWrap = document.querySelector(".modal-wrap");

    // 댓글버튼 눌렀을 때 모달창 on
    reviews.forEach((modalOn) => {
      modalOn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    });

    // X 버튼 눌렀을 때 모달창 off
    modalOff.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modalWrap.addEventListener("click", (e) => {
      const classCheck = e.target.className;

      if (classCheck == "modal-wrap") {
        modal.style.display = "none";
      }
    });
  });

  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <div className="modal">
          <header className="modal-header">
            댓글
            <button className="modal-header-btn">
              <svg
                className="modal-header-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
          </header>
          <div className="modal-body-container">
            <section className="modal-body-wrap">
              <ul className="modal-body-ul">
                <li className="modal-body-li">
                  <div className="modal-chat-container">
                    <a href="" className="modal-profile">
                      <img
                        src="https://an2-img.amz.wtchn.net/image/v2/M-sm43CKsshMokUK_HWcUQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1UQXdlREV3TUNKZExDSndJam9pTDNZeUwzTjBiM0psTDNWelpYSXZlVXRhZUROclJIQTNiM2cwWkM5d2NtOW1hV3hsTHpjd01UY3lNamswTkRFME5EY3pPVElpZlEuWk9RTWZWVEIzMUpPaW5Gc3ZMc3AwTnY0Wnc4RjY0NF9WRW94d05taTFuVQ"
                        alt=""
                        className="modal-profile-img"
                      />
                    </a>
                    <div className="modal-chat-wrap1">
                      <div className="modal-chat-writer-container">
                        <a href="" className="modal-chat-wrap">
                          <div className="modal-chat-writer">심심한꿍꿍이</div>
                          <svg className="modal-chat-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.77.562c.473-.718 1.541-.755 2.065-.07.338.442.939.61 1.467.408.818-.312 1.704.267 1.712 1.121.006.549.392 1.027.94 1.165.85.213 1.216 1.189.707 1.883a1.186 1.186 0 0 0 .053 1.477c.558.659.263 1.656-.57 1.926A1.22 1.22 0 0 0 10.29 9.7c.053.85-.79 1.488-1.628 1.233a1.275 1.275 0 0 0-1.433.506c-.473.719-1.542.755-2.065.07a1.275 1.275 0 0 0-1.467-.408c-.818.312-1.704-.268-1.713-1.12a1.222 1.222 0 0 0-.939-1.166C.196 8.6-.17 7.627.34 6.932a1.188 1.188 0 0 0-.053-1.479C-.272 4.795.023 3.8.856 3.527c.537-.174.888-.676.853-1.226-.053-.85.79-1.489 1.628-1.233A1.275 1.275 0 0 0 4.77.562Z"
                              fill="#000"
                            ></path>
                            <path
                              d="m7.697 2.45-.41 5.344-.11.004-.725-3.818h-1.19l-.596 3.912-.13.005L3.95 3.98H2.5l1.31 5.736 1.505-.102.53-3.642h.12L6.56 9.53l1.517-.103L9.105 2.45H7.697Z"
                              fill="#F82F62"
                            ></path>
                          </svg>
                        </a>
                        <div className="modal-chat-write-date">2일 전</div>
                      </div>
                      <p className="modal-chat">ㅋㅋㅋㅋㅋ다 봄?</p>
                      <div className="modal-chat-btns">
                        <div className="modal-chat-btns-wrap">
                          <button className="modal-chat-like">
                            <span className="modal-chat-like-text">좋아요</span>
                          </button>
                          <button className="modal-chat-like-img-container">
                            <span className="modal-chat-like-img-wrap">
                              <svg
                                className="modal-chat-like-svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <rect width="4" height="11" x="2" y="10" fill="currentColor" rx="0.75"></rect>
                                <path
                                  fill="currentColor"
                                  d="M7.5 9.31a.75.75 0 0 1 .22-.53l5.75-5.75a.75.75 0 0 1 1.06 0l.679.679a.75.75 0 0 1 .202.693L14.5 8.5h6.75a.75.75 0 0 1 .75.75v3.018a6 6 0 0 1-.485 2.364l-2.32 5.413a.75.75 0 0 1-.69.455H8.25a.75.75 0 0 1-.75-.75z"
                                ></path>
                              </svg>
                              0
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
          <footer className="modal-footer">
            <form action="" className="modal-footer-form">
              <img
                src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
                alt=""
                className="modal-footer-img"
              />
              <label className="modal-footer-label">
                <textarea className="modal-footer-text-area" name="reply" id="" placeholder="코멘트에 댓글을 남겨보세요"></textarea>
                <div className="dummy-textarea"></div>
              </label>
              <button className="modal-footer-btn">
                <span className="modal-footer-span"></span>
                댓글
              </button>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Comment;
