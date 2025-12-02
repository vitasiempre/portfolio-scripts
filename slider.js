$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: "auto",
        speed: 800,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        freeMode: true,
        spaceBetween: 15,
        momentumBounceRatio: 0.5,
        momentumVelocityRatio: 0.15,
        momentumRatio: 0.1,
    }
    )});