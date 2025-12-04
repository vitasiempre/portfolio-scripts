const smoother = ScrollSmoother.get();
const smoothContent = document.querySelector("#smooth-content");
console.log(smoothContent, ' smoothContent ', smoother, ' smoother ');


const lightbox = document.querySelector(".is--lightbox");
let scrollY;
let rememberedTransform = '';


$(".lightbox-wrapper").each(function () {
  let wrapper = $(this);
  let lightbox = wrapper.find(".is--lightbox");
  let lightboxItems = wrapper.find(".lightbox_item");
  let galleryItems = wrapper.find(".gallery-collection-item.is--cms-item");
  let header = document.querySelector(".header-z-index");

  console.log("loaded");

  // Open lightbox
  galleryItems.on("click", function () {
    let index = $(this).index();
    lightboxItems.removeClass("is--active");
    lightboxItems.eq(index).addClass("is--active");
    lightbox.css("display", "block");
    
    // Disable scroll
    disableScroll();
		// document.body.style.top = `-${window.scrollY}px`;
    // console.log(`-${window.scrollY}px`);
    // document.body.style.position = 'fixed';
    
    // Dim header
    header.style.opacity = 0.03;
    header.style.pointerEvents = 'none';

    // Store the active lightbox wrapper
    $(".lightbox-wrapper").removeClass("is--active");
    wrapper.addClass("is--active");
  });

  // Close lightbox
  wrapper.find(".close-button").on("click", function () {
    lightbox.css("display", "none");
    wrapper.removeClass("is--active"); // Remove active state when closed
    
    // Enable scroll back
    enableScroll();
    
    // Undim header
    header.style.opacity = 1;
    header.style.pointerEvents = 'auto';
  });
  
  // Close lightbox on ESC
  document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    lightbox.css("display", "none");
    wrapper.removeClass("is--active"); // Remove active state when closed
    
    // Enable scroll back
    enableScroll();
    
    // Undim header
    header.style.opacity = 1;
    header.style.pointerEvents = 'auto';
  }
});

  // Next Arrow
  wrapper.find(".scroll-button.is--right").on("click", function () {
    nextImage(wrapper, lightboxItems);
  });

  // Prev Arrow
  wrapper.find(".scroll-button.is--left").on("click", function () {
    prevImage(wrapper, lightboxItems);
  });
});

// Global keydown event (but only works when a lightbox is visible)
document.addEventListener("keydown", function (event) {
  let activeWrapper = $(".lightbox-wrapper.is--active"); // Select only the open lightbox
  if (!activeWrapper.length) return; // Do nothing if no active lightbox
  
  let lightboxItems = activeWrapper.find(".lightbox_item");

  if (event.key === "ArrowLeft") {
    prevImage(activeWrapper, lightboxItems);
  } else if (event.key === "ArrowRight") {
    nextImage(activeWrapper, lightboxItems);
  }
});

// Global functions
function nextImage(wrapper, lightboxItems) {
    let activeItem = wrapper.find(".lightbox_item.is--active");
    let nextItem = activeItem.next(".lightbox_item").length
      ? activeItem.next()
      : lightboxItems.first(); // Loop to the first item if at the end
    activeItem.removeClass("is--active");
    nextItem.addClass("is--active");
  }

  function prevImage(wrapper, lightboxItems) {
    let activeItem = wrapper.find(".lightbox_item.is--active");
    let prevItem = activeItem.prev(".lightbox_item").length
      ? activeItem.prev()
      : lightboxItems.last(); // Loop to the last item if at the beginning
    activeItem.removeClass("is--active");
    prevItem.addClass("is--active");
  }

  function disableScroll() {
    getCoordinates();
    rememberedTransform = smoothContent.style.transform;
    smoother.paused(true);
    gsap.globalTimeline.pause();
    console.log(lightbox, ' lightbox ');
    
    lightbox.style.transform = `translateY(${ -getCoordinates() }px)`;
    
    // smoothContent.style.overflow = 'hidden';  
  }

  function enableScroll() {
    smoothContent.style.transform = rememberedTransform;
    smoother.paused(false);
    gsap.globalTimeline.resume();
    lightbox.style.transform = 'none';



    // const scrollY = document.body.style.top;
    // document.body.style.position = '';
    // document.body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function getCoordinates() {
    const style = window.getComputedStyle(smoothContent);
    const matrix = style.transform;
    console.log(matrix, ' matrix');
    

    if (!matrix || matrix === "none") return 0;
    
    const values = matrix.match(/matrix3d\((.+)\)/)[0]
    .split(',')
    .map(v => parseFloat(v.trim()));

    console.log(' values ', values);
    

    // return values[13];
  }
