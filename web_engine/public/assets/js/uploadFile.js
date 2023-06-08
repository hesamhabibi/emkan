function uploadFile() {
    $.fn.filepond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageCrop,
        // FilePondPluginImageTransform,
        FilePondPluginFileValidateSize,
    );

    $('.SelectFiles').filepond({
        labelIdle: $('#labelIdle').html(),
        allowMultiple: false,
        maxFiles: 1,
        maxFileSize: '2MB',
        credits: false,
        styleItemPanelAspectRatio: 0.7,
        imageCropAspectRatio: 0.7,
        allowReorder: true,
    });
}

$(uploadFile)