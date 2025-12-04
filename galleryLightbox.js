// Get ScrollSmoother instance (must be created before this script runs)
const smoother = ScrollSmoother.get();
let savedScrollY = 0;

// Lock scroll & visually fix lightbox to viewport
function disableScroll(lightboxEl) {
  if (!smoother) return;

  // remember where we are
  savedScrollY = smoother.scrollTop();

  // freeze smooth scroll
  smoother.paused(true);

  // prevent native scroll just in case
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // compensate for #smooth-content transform:
  // smooth-content is translated -scrollY,
  // so we translate the lightbox +scrollY to cancel it out
  if (lightboxEl) {
    lightboxEl.style.transform = `translateY(${savedScrollY}px)`;
  }

  console.log("scroll disabled at", savedScrollY);
}

// Unlock scroll & restore position
function enableScroll(lightboxEl) {
  if (!smoother) return;

  // resume smoother
  smoother.paused(false);

  // jump back to where we were
  smoother.scrollTop(savedScrollY);

  // allow native scroll again
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  if (lightboxEl) {
    lightboxEl.style.transform = "";
  }

  console.log("scroll enabled, restored to", savedScrollY);
}

// LIGHTBOX LOGIC //////////////////////////////////////

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
    let lightboxEl = lightbox[0];

    lightboxItems.removeClass("is--active");
    lightboxItems.eq(index).addClass("is--active");

    lightbox.css("display", "block");

    // mark active wrapper
    $(".lightbox-wrapper").removeClass("is--active");
    wrapper.addClass("is--active");

    // Disable scroll using ScrollSmoother + compensate position
    disableScroll(lightboxEl);

    // Dim header
    header.style.opacity = 0.03;
    header.style.pointerEvents = "none";
  });

  // Close lightbox (close button)
  wrapper.find(".close-button").on("click", function () {
    let lightboxEl = lightbox[0];

    lightbox.css("display", "none");
    wrapper.removeClass("is--active");

    enableScroll(lightboxEl);

    header.style.opacity = 1;
    header.style.pointerEvents = "auto";
  });

  // Arrows inside this wrapper
  wrapper.find(".scroll-button.is--right").on("click", function () {
    nextImage(wrapper, lightboxItems);
  });

  wrapper.find(".scroll-button.is--left").on("click", function () {
    prevImage(wrapper, lightboxItems);
  });
});

// Close lightbox on ESC (global)
document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape" && event.key !== "Esc") return;

  let activeWrapper = $(".lightbox-wrapper.is--active");
  if (!activeWrapper.length) return;

  let lightbox = activeWrapper.find(".is--lightbox");
  let lightboxEl = lightbox[0];
  let header = document.querySelector(".header-z-index");

  lightbox.css("display", "none");
  activeWrapper.removeClass("is--active");

  enableScroll(lightboxEl);

  header.style.opacity = 1;
  header.style.pointerEvents = "auto";
});

// Arrow navigation (global, works only on active lightbox)
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

// Image navigation helpers
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