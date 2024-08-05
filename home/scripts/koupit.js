function updateLicencePrices(classic, pro, plus, percentage) {
  const switchInputs = document.querySelectorAll("#switch-section input");
  const classicPrice = document.querySelector("p#classic-price");
  const proPrice = document.querySelector("p#pro-price");
  const plusPrice = document.querySelector("p#plus-price");
  const classicPriceInput = document.querySelector("input#piccolo-classic");
  const proPriceInput = document.querySelector("input#piccolo-pro");
  const plusPriceInput = document.querySelector("input#piccolo-plus");
  const licencePriceLabel = document.querySelector(
    ".calculation-field #licence-price-label"
  );

  function setPrices() {
    if (
      document.querySelector("#switch-section input:checked").id == "yearly"
    ) {
      classicPrice.innerText = `${(classic * (1 - percentage / 100)).toFixed(
        0
      )} Kč`;
      classicPriceInput.dataset.price = (
        12 *
        classic *
        (1 - percentage / 100)
      ).toFixed(1);
      proPrice.innerText = `${(pro * (1 - percentage / 100)).toFixed(0)} Kč`;
      proPriceInput.dataset.price = (12 * pro * (1 - percentage / 100)).toFixed(
        1
      );
      plusPrice.innerText = `${(plus * (1 - percentage / 100)).toFixed(0)} Kč`;
      plusPriceInput.dataset.price = (
        12 *
        plus *
        (1 - percentage / 100)
      ).toFixed(1);
      licencePriceLabel.innerText = "Cena licence (1 rok)";
    } else {
      classicPrice.innerText = `${classic} Kč`;
      classicPriceInput.dataset.price = classic;
      proPrice.innerText = `${pro} Kč`;
      proPriceInput.dataset.price = pro;
      plusPrice.innerText = `${plus} Kč`;
      plusPriceInput.dataset.price = plus;
      licencePriceLabel.innerText = "Cena licence (1 měsíc)";
    }
  }
  setPrices();
  switchInputs.forEach((input) => {
    input.addEventListener("change", setPrices);
  });
  calculateTotalPrice();
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
  const taxPercentage = 21;
  const numberFormatter = new Intl.NumberFormat("cs-CZ");

  function updatePrices() {
    const orderQuantity = document.querySelector(
      "#calculation #order-quantity"
    ).value;
    const licencePrice = document.querySelector("#plans-table input:checked")
      .dataset.price;
    const hardwarePrice = document.querySelector("#hardware input:checked")
      .dataset.price;

    const licenceTotal = licencePrice * orderQuantity;
    const hardwareTotal = hardwarePrice * orderQuantity;
    const totalNoTax = (+licencePrice + +hardwarePrice) * orderQuantity;
    const tax =
      (+licencePrice + +hardwarePrice) * orderQuantity * (taxPercentage / 100);
    const totalWithTax = totalNoTax + tax;

    document.querySelector(".calculation-field #licence-price").innerText =
      numberFormatter.format(licenceTotal.toFixed(2)) + " Kč";
    document.querySelector(".calculation-field #hardware-price").innerText =
      numberFormatter.format(hardwareTotal.toFixed(2)) + " Kč";
    document.querySelector(".calculation-field #tax").innerText =
      numberFormatter.format(tax.toFixed(2)) + " Kč";
    document.querySelector(".calculation-field #total-with-tax").innerText =
      numberFormatter.format(totalWithTax.toFixed(2)) + " Kč";
    document.querySelector(".calculation-field #total-no-tax").innerText =
      numberFormatter.format(totalNoTax.toFixed(2)) + " Kč";
    document.querySelector("#form-price").innerText =
      "Celkem: " + numberFormatter.format(totalWithTax.toFixed(2)) + " Kč";
  }

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", updatePrices);
  });
  updatePrices();
}

function formNextStep() {
  const button = document.querySelector("button#continue");
  const formPart1 = document.querySelector("section#form-step-1");
  const formPart2 = document.querySelector("section#form-step-2");

  button.addEventListener("click", function () {
    if (document.querySelector("#calculation #order-quantity").value >= "1") {
      formPart1.style.display = "none";
      formPart2.style.display = "flex";
    } else {
    }
  });
}

function checkForNegativeNumber(inputSelector) {
  input = document.querySelector(inputSelector);

  input.addEventListener("change", function () {
    if (input.value <= 0) {
      input.value = 1;
    } else if (input.value > 20) {
      input.value = 20;
    }
  });
}

updateLicencePrices(170, 490, 250, 20);
animateButtons("#plans-table .form-input");
animateButtons("#hardware .hardware-form-input");
checkForNegativeNumber("#calculation #order-quantity");
calculateTotalPrice();
formNextStep();
