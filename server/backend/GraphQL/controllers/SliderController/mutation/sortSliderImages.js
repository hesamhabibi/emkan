/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { SliderModel }, error_res, trans }) => {
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

    // update sort field of images
    slider.images = (slider.images || []).map((image) => {
        const sort_input = (args.input || []).find((input) => { return String(input.id) == String(image._id); }) || { sort: 9999 };
        image.sort = sort_input.sort;
        return image;
    });

    // sort slider images
    slider.images = (slider.images || []).sort((image_a, image_b) => {
        return (image_a.sort || 0) - (image_b.sort || 0);
    });

    await slider.save();

    return {
        success: true,
        message: trans('done'),
    };

};