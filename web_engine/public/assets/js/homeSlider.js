function homeSlider() {
    var swiper = new Swiper(".HomeSlider", {
        slidesPerView: 1,
        effect: "slide",
        speed: 1000,
        // parallax: true,
        autoplay: {
            delay: 100000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });

    $('.swiper-slide').on('mouseover', function () {
        swiper.autoplay.stop();
    });

    $('.swiper-slide').on('mouseout', function () {
        swiper.autoplay.start();
    });
}

$(homeSlider)