window.addEventListener('DOMContentLoaded', () => {
  initCaseListGalleries();
});

function initCaseListGalleries() {
  const images = document.querySelectorAll('.case-list-item_gallery_item');
  images.forEach((img) => {
    img.classList.add('js-enabled');
    // your logic...
  });
}