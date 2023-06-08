function medalsSlider() {
    var swiper = new Swiper(".MedalsSlider", {
        slidesPerView: 2,
        effect: "fade",
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },


        breakpoints: {
            992: {
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
            }
        },
    });

    $('.swiper-slide').on('mouseover', function () {
        swiper.autoplay.stop();
    });

    $('.swiper-slide').on('mouseout', function () {
        swiper.autoplay.start();
    });
}

$(medalsSlider)