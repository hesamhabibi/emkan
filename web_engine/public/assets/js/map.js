function map() {
    var listProvince = $('#IranMap').attr('data-province').split(',')
    var provinceCenter = $('#IranMap').attr('data-provinceCenter')

    listProvince.forEach(function (value) {
        $('#IranMap .map #Iran g#' + value + '').addClass('active')
    })

    $('#IranMap .map #Iran g#' + provinceCenter + '').addClass('main active')

    var provincePathActive = $('#IranMap .map #Iran g.active');

    let active_element = $('#IranMap .map #Iran g#' + provinceCenter + '');

    const set_active = function (element, set_active = false, fade = true) {
        if (set_active) {
            const provincePathShow = $('#IranMap .map #Iran g.show')
            provincePathShow.length > 0 ? provincePathShow.removeClass('show') : false;
            $(element).addClass('show')
            active_element = element;
        }

        const provinceId = $(element).attr('id')
        const listActive = $('#IranMap .list li');

        if (fade) {
            listActive.length > 0 ? listActive.fadeOut(0).removeClass('active') : false
            $('#IranMap .list li[data-province="' + provinceId + '"]').fadeIn(300).addClass('active')
        } else {
            listActive.length > 0 ? listActive.hide().removeClass('active') : false
            $('#IranMap .list li[data-province="' + provinceId + '"]').show().addClass('active')
        }
    }

    set_active(active_element);

    provincePathActive.on('click', function () { set_active(this, true) });
    provincePathActive.on('mouseenter', function () { set_active(this) });

    provincePathActive.on('mouseleave', function () {
        set_active(active_element, false, false);
    });
}

$(map)