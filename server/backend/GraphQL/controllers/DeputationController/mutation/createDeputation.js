const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { DeputationModel }, helpers: { ValidationHelper, MediaHelper: { attachMedia, prepareMediaGallery } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'description', 'state_id', 'city_id', 'address', 'postal_code', 'location', 'media_gallery', 'label', 'cellphone']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        description: await multilang_rules(['string'],'web',['string']),
        state_id: ['required', 'integer'],
        city_id: ['required', 'integer'],
        address: await multilang_rules(['string']),
        postal_code: 'digits:10',
        // location: 'json' , // todo: validation location
        'media_gallery.*': {
            media_id: ['exists:MediaModel,_id'],
            sort: 'integer',
            alt: ['string'],
            url: 'string',
        },
        label: await multilang_rules(['string']),
        // cellphone: 'digits:11',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);
    input.address = await multilang_remove_extra_fields(input.address);
    input.label = await multilang_remove_extra_fields(input.label);

    // prepare media_gallery
    const result = await prepareMediaGallery(input.media_gallery);
    input.media_gallery = result.media_gallery;
    input.media = result.main_media;

    // create deputation
    const deputation = await DeputationModel.create(input);
    // update media relation
    if (Array.isArray(input.media_gallery))
        for (let i = 0; i < input.media_gallery.length; i += 1) {
            try {
                await attachMedia(deputation, input.media_gallery[i].media_id);
            } catch {
                console.log('error in update media relation');
            }
        }
    return deputation;
};