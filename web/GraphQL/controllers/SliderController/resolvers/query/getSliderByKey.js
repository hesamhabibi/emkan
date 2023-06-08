module.exports = async (parent, args, { models: { SliderModel }, error_res, trans }) => {
    // find slider
    let slider;
    try {
        slider = await SliderModel.findOne({
            key: args.key,
            status: SliderModel.statuses.show,
        });
    } catch (e) {
        slider = null;
    }

    // check slider exists
    if (!slider)
        error_res(trans('not_found', { attr: 'slider' }), null, process.env.ERROR_CODE_NOTFOUND);

    return slider;
};
