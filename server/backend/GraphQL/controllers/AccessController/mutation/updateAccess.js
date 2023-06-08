const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AccessModel, AccessControlListModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find access
    let access;
    try {
        access = await AccessModel.findById(args.id);
    } catch (e) {
        access = null;
    }
    // check access exists
    if (!access)
        error_res(trans('not_found', { attr: "access_model" }));

    // get input
    const input = collect(args.input).only(['name', /* 'type', */ 'description']).all();

    // validate input :
    const rules = {
        name: 'required',
        // type: [{ in: Object.values(AccessModel.types) }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update access
    await access.set(input).save();

    try { // update ACL
        await AccessControlListModel.updateMany({ access_id: access.id }, {
            access_type: access.type,
        });
    } catch (e) {
        console.log('in update access component:', e);
    }

    return access;
};