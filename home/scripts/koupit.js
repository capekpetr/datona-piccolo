let licenceDiscount = 0;
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
      licenceDiscount = percentage;
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
      licenceDiscount = 0;
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

function animatePacketaButtons(inputsLocationClass) {
  document.querySelectorAll(inputsLocationClass).forEach((input) => {
    input.addEventListener("change", function () {
      document.querySelectorAll(inputsLocationClass).forEach((input) => {
        input.nextElementSibling.firstChild.classList.remove(
          "packeta-primary-button"
        );
        input.nextElementSibling.firstChild.classList.add(
          "packeta-secondary-button"
        );
      });
      this.nextElementSibling.firstChild.classList.remove(
        "packeta-secondary-button"
      );
      this.nextElementSibling.firstChild.classList.add(
        "packeta-primary-button"
      );
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
    const deliveryElement = document.querySelector("#delivery input:checked");
    const deliveryPrice = deliveryElement ? +deliveryElement.dataset.price : 0;
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
    document.querySelector("#form-price").innerHTML =
      'Celkem s dopravou: <span id="form-2-price">' +
      numberFormatter.format((totalWithTax + deliveryPrice).toFixed(2)) +
      " Kč</span>";

    const zasilkovnaRadioOption1 = document.querySelector("input#zasilkovna1");
    if (licenceTotal == totalNoTax) {
      deliveryField.style.display = "none";
      zasilkovnaRadioOption1.removeAttribute("required");
    } else {
      deliveryField.style.display = "flex";
      zasilkovnaRadioOption1.setAttribute("required", "");
    }
  }

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", updatePrices);
  });
  updatePrices();
}

function formSwitchStep(visibleFormStep) {
  const formPart1 = document.querySelector("section#form-step-1");
  const formPart2 = document.querySelector("section#form-step-2");
  const formPartSuccess = document.querySelector("section#form-step-success");
  const formPartError = document.querySelector("section#form-step-error");

  if (visibleFormStep == "formStep1") {
    formPart1.style.display = "flex";
    formPartError.style.display = "none";
    formPartSuccess.style.display = "none";
    formPart2.style.display = "none";
    window.location.hash = "";
    window.scrollTo(0, 0);
  } else if (visibleFormStep == "formStep2") {
    formPart1.style.display = "none";
    formPart2.style.display = "flex";
    formPartError.style.display = "none";
    formPartSuccess.style.display = "none";
    window.location.hash = "";
    window.scrollTo(0, 0);
  } else if (visibleFormStep == "formStepSuccess") {
    formPart1.style.display = "none";
    formPart2.style.display = "none";
    formPartError.style.display = "none";
    formPartSuccess.style.display = "flex";
    window.location.hash = "";
    window.scrollTo(0, 0);
  } else if (visibleFormStep == "formStepError") {
    formPart1.style.display = "none";
    formPart2.style.display = "none";
    formPartError.style.display = "flex";
    formPartSuccess.style.display = "none";
    window.location.hash = "";
    window.scrollTo(0, 0);
  }
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
    country: "cz",
    language: "cs",
    valueFormat: "name,city",
    view: "modal",
    defaultCurrency: "Kč",
    defaultPrice: "70",
  };
  const zasilkovnaButton = document.querySelector(".packeta-selector-open");
  const saveElementInput = document.querySelector("input#pickup-point-input");

  false;
  function showSelectedPickupPoint(point) {
    const saveElement = document.querySelector(".pickup-point-value");
    // Add here an action on pickup point selection
    saveElement.innerText = "";
    if (point) {
      console.log("Selected point", point);
      saveElement.innerHTML = "<b>Vybrané místo: </b>" + point.formatedValue;
      saveElementInput.value = point.formatedValue;
    }
  }
  zasilkovnaButton.addEventListener("click", function () {
    Packeta.Widget.pick(packetaApiKey, showSelectedPickupPoint, packetaOptions);
  });
}

function ZasilkovnaConditionalLogic(inputsLocationClass) {
  const zasilkovnaPointValue = document.querySelector(".pickup-point-value");
  const deliveryAddressCheckbox = document.querySelector(
    "section#delivery-address-checkbox-field"
  );
  document.querySelectorAll(inputsLocationClass).forEach((input) => {
    input.addEventListener("click", function () {
      document.querySelectorAll(inputsLocationClass).forEach((input) => {
        if (
          document.querySelector("div#delivery input:checked").id ==
          "zasilkovna1"
        ) {
          deliveryAddressCheckbox.style.display = "none";
        } else if (
          document.querySelector("div#delivery input:checked").id ==
          "zasilkovna2"
        ) {
          zasilkovnaPointValue.innerHTML = "";
          deliveryAddressCheckbox.style.display = "flex";
        }
      });
    });
  });
}

function formAddHiddenFields() {
  const cenaSDPH = document.querySelector(
    'input[name="kalkulace.celkova_cena_s_DPH"]'
  );
  const cenaBezDPH = document.querySelector(
    'input[name="kalkulace.celkova_cena_bez_DPH"]'
  );
  const PlatbaZaLicenciSeSlevou = document.querySelector(
    'input[name="polozky.licence.cena_bez_DPH_se_slevou"]'
  );
  const SlevaLicence = document.querySelector(
    'input[name="polozky.licence.sleva"]'
  );

  PlatbaZaLicenciSeSlevou.value = document.querySelector(
    "#plans-table input:checked"
  ).dataset.price;

  SlevaLicence.value = licenceDiscount;

  cenaBezDPH.value = document
    .querySelector(".calculation-field #total-no-tax")
    .innerText.replace(/Kč/g, "")
    .replace(/\s+/g, "")
    .replace(/,/g, ".");

  cenaSDPH.value = document
    .querySelector(".calculation-field #total-with-tax")
    .innerText.replace(/Kč/g, "")
    .replace(/\s+/g, "")
    .replace(/,/g, ".");
}

function HandleOrderFormSubmit() {
  const orderForm = document.querySelector("form#order-form");

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formAddHiddenFields();

    const formElement = event.target;
    const formData = new FormData(formElement);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        formSwitchStep("formStepSuccess");
      })
      .catch((error) => {
        console.error("Error:", error);
        formSwitchStep("formStepError");
      });
  });
}

updateLicencePrices(170, 490, 250, 20);
animateRadioButtons("#plans-table .form-input");
animateRadioButtons("#hardware .hardware-form-input");
animatePacketaButtons("#delivery .form-input");
animateCheckboxButtons("#extensions .extensions-form-input");
checkForNegativeNumber("#calculation #order-quantity");
document
  .querySelector("button#continue")
  .addEventListener("click", function () {
    formSwitchStep("formStep2");
  });
document.querySelector("button#back").addEventListener("click", function () {
  formSwitchStep("formStep1");
});
document
  .querySelectorAll("section.alert button.alert-back")
  .forEach((button) => {
    button.addEventListener("click", function () {
      location.reload();
    });
  });

calculateTotalPrice();
SwitchDeliveryAddressFields();
Zasilkovna();
ZasilkovnaConditionalLogic("#delivery .form-input");
HandleOrderFormSubmit();
