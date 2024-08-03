const switchYearly = document.querySelector(" input#yearly");
const switchMonthly = document.querySelector("input#monthly");
const classicPrice = document.querySelector("p#classic-price");
const proPrice = document.querySelector("p#pro-price");
const plusPrice = document.querySelector("p#plus-price");
const classicPriceInput = document.querySelector("input#piccolo-classic");
const proPriceInput = document.querySelector("input#piccolo-pro");
const plusPriceInput = document.querySelector("input#piccolo-plus");

function updateLicencePrices(classic, pro, plus) {
  classicPrice.innerText = `${classic} Kč`;
  classicPriceInput.dataset.price = classic;
  proPrice.innerText = `${pro} Kč`;
  proPriceInput.dataset.price = pro;
  plusPrice.innerText = `${plus} Kč`;
  plusPriceInput.dataset.price = plus;
}

function animateButtons(inputsLocationClass) {
  document.querySelectorAll(inputsLocationClass).forEach((input) => {
    input.addEventListener("change", function () {
      document.querySelectorAll(inputsLocationClass).forEach((input) => {
        input.nextElementSibling.firstChild.classList.remove(
          "secondary-button"
        );
        input.nextElementSibling.firstChild.classList.add("primary-button");
        input.nextElementSibling.firstChild.innerText = "Vybrat";
      });
      this.nextElementSibling.firstChild.classList.remove("primary-button");
      this.nextElementSibling.firstChild.classList.add("secondary-button");
      this.nextElementSibling.firstChild.innerText = "Vybráno";
    });
  });
}

function calculateTotalPrice() {
  const orderQuantity = document.querySelector(
    "#calculation #order-quantity"
  ).value;
  const licencePrice = document.querySelector("#plans-table input:checked")
    .dataset.price;
  const hardwarePrice = document.querySelector("#hardware input:checked")
    .dataset.price;
  document.querySelector(".calculation-field #licence-price").innerText =
    licencePrice * orderQuantity;
  document.querySelector(".calculation-field #hardware-price").innerText =
    hardwarePrice * orderQuantity;
  document.querySelector(".calculation-field #total-no-tax").innerText =
    (+licencePrice + +hardwarePrice) * orderQuantity;
  document.querySelector(".calculation-field #total-tax").innerText =
    (+licencePrice + +hardwarePrice) * orderQuantity * 1.21;
}

switchMonthly.addEventListener("change", function () {
  updateLicencePrices(170, 490, 250);
});

switchYearly.addEventListener("change", function () {
  updateLicencePrices(135, 390, 200);
});

document.addEventListener("change", function () {
  calculateTotalPrice();
});

animateButtons("#plans-table .form-input");
animateButtons("#hardware .hardware-form-input");
