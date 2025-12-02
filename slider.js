$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: 3,
        speed: 700,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        followFinger: false,
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 15,

    }
    )});