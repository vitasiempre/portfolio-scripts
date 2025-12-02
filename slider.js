$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: "auto",
        speed: 50,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        freeMode: true,
        spaceBetween: 15,
        momentumBounceRatio: 0.15,
        momentumVelocityRatio: 0.1,
        momentumRatio: 0.05,
    }
    )});