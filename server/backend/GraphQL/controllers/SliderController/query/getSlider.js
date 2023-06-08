module.exports = async (parent, args, { models: { SliderModel }, error_res, trans }) => {
    // find Slider
    let Slider;
    try {
        Slider = await SliderModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        Slider = null;
    }
    // check Slider exists
    if (!Slider)
        error_res(trans('not_found', { attr: "Slider" }));
    return Slider;
};