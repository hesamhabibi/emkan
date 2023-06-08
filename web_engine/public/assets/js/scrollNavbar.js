function scrollNavbar() {
    var nav = $('#NavBar');
    var top = 50;

    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= top) {
            nav.addClass('Scroll');
        } else {
            nav.removeClass('Scroll');
        }
    });

    if ($(window).scrollTop() >= top) {
        nav.addClass('Scroll');
    } else {
        nav.removeClass('Scroll');
    }
}

$(scrollNavbar)