const images = [
  "./images/gallery/obrazek1.png",
  "./images/gallery/obrazek3.png",
  "./images/gallery/obrazek5.png",
  "./images/gallery/obrazek6.png",
  "./images/gallery/obrazek8.png",
  "./images/gallery/obrazek9.png",
  "./images/gallery/obrazek10.png",
  "./images/gallery/obrazek11.png",
  "./images/gallery/obrazek4.png",
  "./images/gallery/obrazek12.png",
  "./images/gallery/obrazek13.png",
  "./images/gallery/obrazek14.png",
  "./images/gallery/obrazek15.png",
  "./images/gallery/obrazek16.png",
];
const gallery = document.querySelector("section#gallery");
const modalContainer = document.querySelector("section#modal-container");
const modalImage = document.querySelector("img#modal-image");

images.forEach((image) => {
  const newImage = document.createElement("img");
  newImage.src = image;
  newImage.alt = "pokladna PiCCOLO screenshot";
  gallery.appendChild(newImage);
  newImage.classList.add("gallery-image");
  newImage.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    modalImage.src = image;
  });
});

modalContainer.addEventListener("click", (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});
