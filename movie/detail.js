const reviews = document.querySelectorAll(".review-comment");

const modal = document.querySelector(".modal-container");
const modalOff = document.querySelector(".modal-header-btn");

reviews.forEach((modalOn) => {
  modalOn.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

modalOff.addEventListener("click", () => {
  modal.style.display = "none";
  console.log("123");
});
