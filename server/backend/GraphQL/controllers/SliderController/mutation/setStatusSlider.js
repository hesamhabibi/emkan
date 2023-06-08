const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');


module.exports = async (parent, args, { models: { SliderModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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

    // get input
    const input = collect(args.input).only(['status',]).all();

    // validate input :
    const rules = {
        status: ['required', { in: Object.values(SliderModel.statuses) }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update slider
    await slider.set(input).save();

    return slider;
};