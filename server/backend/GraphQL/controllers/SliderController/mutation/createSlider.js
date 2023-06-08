const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { SliderModel }, helpers: { ValidationHelper, MediaHelper: { attachMedia, prepareSlider } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['name', 'key', 'description', 'status', 'images']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        name: await multilang_rules(['string'], 'web', ['required', 'string']),
        key: ['required', 'string'],
        description: await multilang_rules(['string']),
        status: ['required', { in: Object.values(SliderModel.statuses) }],
        'images.*': {
            media_id: ['exists:MediaModel,_id'],
            sort: 'integer',
            alt: ['string'],
            url: 'string',

            title: await multilang_rules(['string'], 'web', ['required', 'string']),
            link: ['string'],
            description: await multilang_rules(['string'], 'web'),
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.name = await multilang_remove_extra_fields(input.name);
    input.description = await multilang_remove_extra_fields(input.description);
    if (Array.isArray(input.images))
        for (let i = 0; i < input.images.length; i += 1) {
            input.images[i].title = await multilang_remove_extra_fields(input.images[i].title);
            input.images[i].description = await multilang_remove_extra_fields(input.images[i].description);
        }

    // prepare slider
    input.images = await prepareSlider(input.images);

    // create slider
    const slider = await SliderModel.create(input);
    // update media relation
    for (let i = 0; i < input.images.length; i += 1) {
        try {
            await attachMedia(slider, input.images[i].media_id);
        } catch {
            console.log('error in update media relation');
        }
    }

    return slider;
};