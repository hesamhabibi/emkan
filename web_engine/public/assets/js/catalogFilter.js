function catalogFilter() {
    const filterizr = $('.CatalogFilter').filterizr({
        layout: 'sameWidth',
        // gutterPixels: 16,
        spinner: {
            enabled: true,
        },
    });

    $(document).ready(function () {
        $('.CatalogFilterBtn li').on('click', function () {
            $(this).addClass('active');
            $(this).siblings(".active").removeClass('active');
        });
    })
}

$(catalogFilter)