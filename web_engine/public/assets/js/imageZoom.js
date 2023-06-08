function ImageZoom () {
    var list = document.querySelectorAll("[data-image]");

    for (var i = 0; i < list.length; i++) {
        var url = list[i].getAttribute('data-image');
        list[i].style.backgroundImage="url('" + url + "')";
    }

    $(".ImageZoom").mousemove(function (e) {
        imageZoom(e)
    })

    function imageZoom(e) {
        var zoomer = e.currentTarget;
        e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
        e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
        x = offsetX / zoomer.offsetWidth * 100
        y = offsetY / zoomer.offsetHeight * 100
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
    }
}

$(ImageZoom)