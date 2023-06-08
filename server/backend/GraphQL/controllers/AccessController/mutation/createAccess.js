const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AccessModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['name', /* 'type', */ 'description',]).all();

    // validate input :
    const rules = {
        name: 'required',
        // type: ['required', { in: Object.values(AccessModel.types) }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // create access
    const access = await AccessModel.create(input);
    return access;
};