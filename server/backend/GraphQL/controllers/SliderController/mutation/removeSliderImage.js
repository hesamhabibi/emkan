module.exports = async (parent, args, { models: { SliderModel }, helpers: { MediaHelper }, error_res, trans }) => {
    // find slider
    let slider;
    try {
        slider = await SliderModel.findById(args.id);
    } catch (e) {
        slider = null;
    }
    // check slider exists
    if (!slider)
        error_res(trans('not_found', { attr: "slider" }));

    // delete slider image
    slider.images = (slider.images || []).filter((image) => {
        try {
            return String(image._id) !== String(args.image_id);
        } catch {
            return false;
        }
    });

    const new_images = [];
    for (let i in slider.images) {
        try {
            if (String(slider.images[i]._id) !== String(args.image_id)) {
                new_images.push(slider.images[i]);
            } else {
                await MediaHelper.detachMedia(slider, slider.images[i].media_id);
            }
        } catch {/* empty */ }
    }

    await slider.save();

    return { success: true, message: trans('done') };
};