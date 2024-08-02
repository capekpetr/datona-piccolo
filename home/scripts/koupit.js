const SwitchYearly = document.querySelector(" input#yearly");
const SwitchMonthly = document.querySelector("input#monthly");
const ClassicPrice = document.querySelector("p#classic-price");
const ProPrice = document.querySelector("p#pro-price");
const PlusPrice = document.querySelector("p#plus-price");
const RadioButtons = function (InputsClass) {
  document.querySelectorAll(InputsClass).forEach((input) => {
    input.addEventListener("change", function () {
      document.querySelectorAll(InputsClass).forEach((input) => {
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
};

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

RadioButtons("#plans-table .form-input");
RadioButtons("#hardware .hardware-form-input");
