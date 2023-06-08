const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { RateModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args.input).only(['model_id', 'rate']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        rate: ['required'],
        model_id: ['required', 'string'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const userRate = await RateModel.findOne(
        {
            user_id: AuthUser._id,
            model_id: input.model_id
        });


    if (!userRate) {
        await RateModel.create(input);
    }

    else {
        await RateModel.findOneAndUpdate(
            {
                user_id: AuthUser._id,
                model_id: input.model_id
            },
            {
                $set: { rate: input.rate }
            },
            {
                new: true
            }
        );
    }

    return { average_rate: await RateModel.average(input.model_id), user_rate: input.rate };
};