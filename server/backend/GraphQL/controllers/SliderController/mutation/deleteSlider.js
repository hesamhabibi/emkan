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
    // delete slider
    for (let i in slider.images) {
        await MediaHelper.detachMedia(slider, slider.images[i].media_id);
    }
    await slider.delete();
    return { success: true, message: trans('done') };
};