function homeSlider() {
    var swiper = new Swiper(".HomeSlider", {
        slidesPerView: 2,
        effect: "fade",
        parallax: true,
        autoplay: {
            delay: 5000,
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