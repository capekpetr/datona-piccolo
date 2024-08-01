const SwitchYearly = document.querySelector(" input#yearly");
const SwitchMonthly = document.querySelector("input#monthly");
const ClassicPrice = document.querySelector("p#classic-price");
const ProPrice = document.querySelector("p#pro-price");
const PlusPrice = document.querySelector("p#plus-price");
const LicenceFormInputs = document.querySelectorAll("#plans-table .form-input");
const HardwareFormInputs = document.querySelectorAll(
  "#hardware .hardware-form-input"
);

SwitchMonthly.addEventListener("change", function () {
  ClassicPrice.innerText = "170 Kč";
  ProPrice.innerText = "490 Kč";
  PlusPrice.innerText = "250 Kč";
});

SwitchYearly.addEventListener("change", function () {
  ClassicPrice.innerText = "135 Kč";
  ProPrice.innerText = "390 Kč";
  PlusPrice.innerText = "200 Kč";
});

LicenceFormInputs.forEach((input) => {
  input.addEventListener("change", function () {
    LicenceFormInputs.forEach((input) => {
      input.nextElementSibling.firstChild.classList.remove("secondary-button");
      input.nextElementSibling.firstChild.classList.add("primary-button");
      input.nextElementSibling.firstChild.innerText = "Vybrat";
    });
    this.nextElementSibling.firstChild.classList.remove("primary-button");
    this.nextElementSibling.firstChild.classList.add("secondary-button");
    this.nextElementSibling.firstChild.innerText = "Vybráno";
  });
});

HardwareFormInputs.forEach((input) => {
  input.addEventListener("change", function () {
    HardwareFormInputs.forEach((input) => {
      input.nextElementSibling.firstChild.classList.remove("secondary-button");
      input.nextElementSibling.firstChild.classList.add("primary-button");
      input.nextElementSibling.firstChild.innerText = "Vybrat";
    });
    this.nextElementSibling.firstChild.classList.remove("primary-button");
    this.nextElementSibling.firstChild.classList.add("secondary-button");
    this.nextElementSibling.firstChild.innerText = "Vybráno";
  });
});
