console.log("SCRIPT FILE LOADED");

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired");

  const images = document.querySelectorAll(".case-list-item_gallery_item");
  console.log("Found images:", images.length);

  images.forEach((img) => {
    img.classList.add("js-enabled");
  });

  console.log("Init finished");
});