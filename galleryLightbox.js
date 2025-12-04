// Get ScrollSmoother instance (must be created before this script)
const smoother = ScrollSmoother.get();

let savedScrollY = 0;

function disableScroll() {
  if (!smoother) return;

  // remember current scroll position in smoother space
  savedScrollY = smoother.scrollTop();

  // freeze smooth scrolling
  smoother.paused(true);

  // hard-lock native scroll just in case
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  console.log("scroll disabled at", savedScrollY);
}

function enableScroll() {
  if (!smoother) return;

  // resume smoother
  smoother.paused(false);

  // jump back to where we left off
  smoother.scrollTop(savedScrollY);

  // unlock native scroll
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  console.log("scroll enabled, restored to", savedScrollY);
}

// LIGHTBOX LOGIC ///////////////////////////////////////////////////////

$(".lightbox-wrapper").each(function () {
  let wrapper = $(this);
  let lightbox = wrapper.find(".is--lightbox");
  let lightboxItems = wrapper.find(".lightbox_item");
  let galleryItems = wrapper.find(".gallery-collection-item.is--cms-item");
  let header = document.querySelector(".header-z-index");

  console.log("lightbox wrapper loaded");

  // Open lightbox
  galleryItems.on("click", function () {
    let index = $(this).index();

    lightboxItems.removeClass("is--active");
    lightboxItems.eq(index).addClass("is--active");

    lightbox.css("display", "block");

    // Disable scroll via ScrollSmoother
    disableScroll();

    // Dim header
    header.style.opacity = 0.03;
    header.style.pointerEvents = "none";

    // Mark this wrapper as active
    $(".lightbox-wrapper").removeClass("is--active");
    wrapper.addClass("is--active");
  });

  // Close lightbox (click on close button)
  wrapper.find(".close-button").on("click", function () {
    lightbox.css("display", "none");
    wrapper.removeClass("is--active");

    enableScroll();

    header.style.opacity = 1;
    header.style.pointerEvents = "auto";
  });
});

// Close lightbox on ESC (global)
document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape" && event.key !== "Esc") return;

  let activeWrapper = $(".lightbox-wrapper.is--active");
  if (!activeWrapper.length) return;

  let lightbox = activeWrapper.find(".is--lightbox");
  let header = document.querySelector(".header-z-index");

  lightbox.css("display", "none");
  activeWrapper.removeClass("is--active");

  enableScroll();

  header.style.opacity = 1;
  header.style.pointerEvents = "auto";
});

// Arrow navigation (global, but only acts on active wrapper)
document.addEventListener("keydown", function (event) {
  let activeWrapper = $(".lightbox-wrapper.is--active");
  if (!activeWrapper.length) return;

  let lightboxItems = activeWrapper.find(".lightbox_item");

  if (event.key === "ArrowLeft") {
    prevImage(activeWrapper, lightboxItems);
  } else if (event.key === "ArrowRight") {
    nextImage(activeWrapper, lightboxItems);
  }
});

// Global functions for image navigation
function nextImage(wrapper, lightboxItems) {
  let activeItem = wrapper.find(".lightbox_item.is--active");
  let nextItem = activeItem.next(".lightbox_item").length
    ? activeItem.next()
    : lightboxItems.first(); // loop to first

  activeItem.removeClass("is--active");
  nextItem.addClass("is--active");
}

function prevImage(wrapper, lightboxItems) {
  let activeItem = wrapper.find(".lightbox_item.is--active");
  let prevItem = activeItem.prev(".lightbox_item").length
    ? activeItem.prev()
    : lightboxItems.last(); // loop to last

  activeItem.removeClass("is--active");
  prevItem.addClass("is--active");
}