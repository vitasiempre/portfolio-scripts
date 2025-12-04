$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: "auto",
        speed: 500,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        freeMode: true,
        spaceBetween: 15,
        breakpoints: {
        // when window width is >= 320px
        400: {
        enabled: false,
        momentumBounce: false,
        momentum: false,
        },
        }
    }
    )});