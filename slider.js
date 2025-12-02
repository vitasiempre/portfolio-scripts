$('.swiper').each(function index() {
    this.classList.add('added');
    let swiper = new Swiper(this, {
        slidesPerView: 'auto',
        speed: 600,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: true,
        freeMode: true
    }
    )});