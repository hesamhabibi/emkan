function projectSlider() {
    var swiper = new Swiper(".ProjectSlider", {
        slidesPerView: 1.6,
        spaceBetween: 16,
        autoplay: {
            delay: 2000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            425: {
                slidesPerView: 2.5,
            },
            650: {
                slidesPerView: 3.5,
            },
            992: {
                slidesPerView: 4.2,
            },
            1540: {
                slidesPerView: 4.2,
            },
        },
    });

    $('.swiper-slide').on('mouseover', function () {
        swiper.autoplay.stop();
    });

    $('.swiper-slide').on('mouseout', function () {
        swiper.autoplay.start();
    });
}

$(projectSlider)