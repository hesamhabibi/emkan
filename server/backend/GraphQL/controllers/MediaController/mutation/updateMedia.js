const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { MediaModel }, helpers: { ValidationHelper, MediaHelper: { updateMedia } }, error_res, trans }) => {
    // find media
    let media;
    try {
        media = await MediaModel.findById(args.id);
    } catch (e) {
        media = null;
    }
    // check media exists
    if (!media)
        error_res(trans('not_found', { attr: "media" }));

    // get input
    const input = collect(args.input).only(['sort', 'main', 'alt']).all();

    // validate input :
    const rules = {
        sort: 'integer',
        main: 'boolean',
        alt: ['string'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update media
    return await updateMedia(media, input.file, input);
};