const burgerMenu = document.getElementById("burger-menu");
const burgerMenuIcons = document.querySelectorAll(".burger-menu-icon");
const burgerMenuLinks = document.querySelectorAll("#burger-menu a");
const loginButton = document.querySelectorAll(".login-button");
const loginWindow = document.getElementById("login-window");
const faqHeadings = document.querySelectorAll(".question-heading");

[burgerMenuIcons, burgerMenuLinks].forEach((array) => {
  array.forEach((element) => {
    element.addEventListener("click", function () {
      burgerMenu.classList.toggle("show");
    });
  });
});

faqHeadings.forEach((question) => {
  question.addEventListener("click", () => {
    question.nextElementSibling.classList.toggle("faq-answer-active");
    question.querySelector("i").classList.toggle("rotate-icon");
  });
});

loginButton.forEach((button) => {
  button.addEventListener("click", () => {
    loginWindow.classList.toggle("show");
  });
});

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector("#login-window.show")) {
    loginWindow.classList.remove("show");
  }
});
