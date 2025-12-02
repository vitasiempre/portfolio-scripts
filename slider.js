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
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 15,

    }
    )});