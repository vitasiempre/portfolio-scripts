$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: "auto",
        speed: 900,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        freeMode: true,
        spaceBetween: 15,
        momentumBounce: false,
        momentumVelocityRatio: 0.5,
        momentumRatio: 0.5,
    }
    )});