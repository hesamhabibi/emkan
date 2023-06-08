const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { SliderModel, MediaModel }, helpers: { ValidationHelper, MediaHelper: { attachMedia } }, error_res, trans }) => {
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
    const input = collect(args.input).only(['media', 'sort', 'title', 'link', 'description']).all();

    // validate input :
    const rules = {
        media: {
            media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
            alt: ['string'],
            url: 'string',
        },

        sort: 'integer',

        title: await multilang_rules(['string'], 'web', ['required', 'string']),
        link: ['string'],
        description: await multilang_rules(['string'], 'web'),
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.media_id = input.media?.media_id;
    input.alt = input.media?.alt;
    input.url = input.media?.url;

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // prepare slider
    await MediaModel.findByIdAndUpdate(input.media_id, {
        sort: input.sort,
        alt: input.alt,
    });

    let images = (slider.images || []);
    let last_media_id = null;

    images = images.map((image) => {
        try {
            if (String(image._id) == String(args.image_id)) {
                last_media_id = image.media_id;
                return input;
            } else
                return image;
        } catch {
            return image;
        }
    });

    images = images.filter(image => image);

    // update slider
    await slider.set({ images }).save();

    // update media relation
    try {
        await attachMedia(slider, input.media_id, last_media_id);
    } catch {
        console.log('error in update media relation');
    }

    return slider;
};