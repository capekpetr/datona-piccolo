const slider = document.getElementById("monthSlider");
const output = document.getElementById("monthValue");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};
