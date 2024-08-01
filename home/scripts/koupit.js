const SwitchYearly = document.querySelector(" input#yearly");
const SwitchMonthly = document.querySelector("input#monthly");
const ClassicPrice = document.querySelector("p#classic-price");
const ProPrice = document.querySelector("p#pro-price");
const PlusPrice = document.querySelector("p#plus-price");

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
