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

function animateRadioButtons(inputsLocationClass) {
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

function animateCheckboxButtons(inputsLocationClass) {
  document.querySelectorAll(inputsLocationClass).forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        this.nextElementSibling.firstChild.classList.remove("primary-button");
        this.nextElementSibling.firstChild.classList.add("secondary-button");
        this.nextElementSibling.firstChild.innerText = "Odebrat";
      } else {
        this.nextElementSibling.firstChild.classList.remove("secondary-button");
        this.nextElementSibling.firstChild.classList.add("primary-button");
        this.nextElementSibling.firstChild.innerText = "Přidat";
      }
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
    let extensionsPrice = 0;
    document
      .querySelectorAll("#extensions .extensions-form-input:checked")
      .forEach(function (checkbox) {
        extensionsPrice = +extensionsPrice + +checkbox.dataset.price;
      });
    const deliveryField = document.querySelector("div.form-box#delivery");

    const licenceTotal = licencePrice * orderQuantity;
    const hardwareTotal = hardwarePrice * orderQuantity;
    const extensionsTotal = extensionsPrice * orderQuantity;
    const totalNoTax = +licenceTotal + +hardwareTotal + +extensionsTotal;
    const tax = totalNoTax * (taxPercentage / 100);
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
    document.querySelector(".calculation-field #extensions-price").innerText =
      numberFormatter.format(extensionsTotal.toFixed(2)) + " Kč";
    document.querySelector("#form-price").innerText =
      "Celkem: " + numberFormatter.format(totalWithTax.toFixed(2)) + " Kč";

    if (licenceTotal == totalNoTax) {
      deliveryField.style.display = "none";
    } else {
      deliveryField.style.display = "flex";
    }
  }

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", updatePrices);
  });
  updatePrices();
}

function formSwitchStep(buttonLocation) {
  const button = document.querySelector(buttonLocation);
  const formPart1 = document.querySelector("section#form-step-1");
  const formPart2 = document.querySelector("section#form-step-2");

  button.addEventListener("click", function () {
    if (
      document.querySelector("#calculation #order-quantity").value >= "1" &&
      formPart1.style.display !== "none"
    ) {
      formPart1.style.display = "none";
      formPart2.style.display = "flex";
      window.location.hash = "";
    } else {
      formPart1.style.display = "flex";
      formPart2.style.display = "none";
      window.location.hash = "#calculation";
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

function SwitchDeliveryAddressFields() {
  const checkbox = document.querySelector("input#delivery-address-checkbox");
  const addressFieldWrapper = document.querySelector(
    "section.delivery-address-wrapper"
  );

  checkbox.addEventListener("change", function () {
    addressFieldWrapper.classList.toggle("delivery-address-wrapper-visible");
  });
}

function Zasilkovna() {
  const packetaApiKey = "762a70838a1c4a35";
  const packetaOptions = {
    valueFormat: '"Packeta",id,carrierId,carrierPickupPointId,name,city,street',
    view: "modal",
  };
  const zasilkovnaButton = document.querySelector(
    "button.packeta-selector-open"
  );
  false;
  function showSelectedPickupPoint(point) {
    const saveElement = document.querySelector(".pickup-point-value");
    // Add here an action on pickup point selection
    saveElement.innerText = "";
    if (point) {
      console.log("Selected point", point);
      saveElement.innerText = "Address: " + point.formatedValue;
    }
  }
  zasilkovnaButton.addEventListener("click", function () {
    Packeta.Widget.pick(packetaApiKey, showSelectedPickupPoint, packetaOptions);
  });
}

updateLicencePrices(170, 490, 250, 20);
animateRadioButtons("#plans-table .form-input");
animateRadioButtons("#hardware .hardware-form-input");
animateCheckboxButtons("#extensions .extensions-form-input");
checkForNegativeNumber("#calculation #order-quantity");
formSwitchStep("button#continue");
formSwitchStep("button#back");
calculateTotalPrice();
SwitchDeliveryAddressFields();
Zasilkovna();
