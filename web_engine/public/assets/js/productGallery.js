function productGallery() {

    $('.product_media_gallery').map((index, element) => {
        var swiper = new Swiper(`#${element.id} .ProductSmGallery`, {
            spaceBetween: 10,
            slidesPerView: 1.7,
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".product-swiper-button-next",
                prevEl: ".product-swiper-button-prev",
            },
            breakpoints: {

                576: {
                    slidesPerView: 2.7,
                },
                992: {
                    slidesPerView: 2.3,
                }
            }
        });
        var swiper2 = new Swiper(`#${element.id} .ProductLgGallery`, {
            effect: 'fade',
            allowTouchMove: false,
            thumbs: {
                swiper: swiper,
            },
        });


        $('.product-swiper-button-next').on('click', function () {
            swiper2.slideNext();
            console.log('here');
        });

        $('.product-swiper-button-prev').on('click', function () {
            swiper2.slidePrev();
        });

    })
}

$(productGallery)