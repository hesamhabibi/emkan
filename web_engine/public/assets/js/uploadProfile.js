function uploadProfile() {
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginFilePoster,
        FilePondPluginImageCrop,
        FilePondPluginFileValidateSize,
    );

    $('.UpLoadProfile').filepond({
        labelIdle: $('#labelIdle').html(),
        maxFileSize: '1MB',
        styleItemPanelAspectRatio: 1,
        imageCropAspectRatio: 1,
        stylePanelLayout: 'compact',
        credits: false,
        allowProcess: true,
        allowRevert: false,
        styleButtonRemoveItemPosition: 'right right',
        iconRemove: $('#iconRemove').html(),
        storeAsFile: true,
        files: $('.UpLoadProfile').data('value') ? [
            {
                source: $('.UpLoadProfile').data('value'),
                options: {
                    type: 'local',
                },
            }
        ] : null,
        server: {
            load: '/',
            process: {
                url: `${getApiUrl()}/api/profile/upload`,
                headers: {
                    token: getCookie("token"),
                },
            }
        },
    });

    document.addEventListener('FilePond:removefile', async (e) => {
        await restApi('profile/upload', {});
    });
}

$(uploadProfile)