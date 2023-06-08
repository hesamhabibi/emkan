const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CRMModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    const validation = new Validatorjs(
        { internal_message_id: args.internal_message_id },
        { internal_message_id: [{ 'exists': { model: CRMModel, field: '_id' } }] }
    );

    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    await CRMModel.updateOne(
        {
            _id: args.internal_message_id,
            send_to: {
                $elemMatch: {
                    receiver_user_id: AuthUser._id,
                }
            },
        },
        {
            $set: { 'send_to.$.seen': 0 }
        }
    );

    return { success: true, message: trans('done') };
};