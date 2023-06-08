function commentSlider() {
    var swiper = new Swiper(".CommentSlider", {
        direction: "vertical",
        autoHeight: true,
        slidesPerView: 2.4,
        spaceBetween: 16,
        // autoplay: {
        //     delay: 5000,
        // },
        navigation: {
            nextEl: '.swiper-button-prev',
            prevEl: '.swiper-button-next',
        },
    });

    // $('.swiper-slide').on('mouseover', function () {
    //     swiper.autoplay.stop();
    // });

    // $('.swiper-slide').on('mouseout', function () {
    //     swiper.autoplay.start();
    // });
}

$(commentSlider);