const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CRMModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    const validation = new Validatorjs(
        { popup_id: args.popup_id },
        { popup_id: [{ 'exists': { model: CRMModel, field: '_id' } }] }
    );

    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }


    const userPopup = await CRMModel.findById(args.popup_id);
    let userPopupCount = userPopup.send_to.find(send_to => String(send_to.receiver_user_id) == String(AuthUser._id))?.seen || 0;

    if (userPopupCount > 0)
        userPopupCount -= 1;

    await CRMModel.updateOne(
        {
            _id: args.popup_id,
            send_to: {
                $elemMatch: {
                    receiver_user_id: AuthUser._id,
                }
            },
        },
        {
            $set: { 'send_to.$.seen': userPopupCount }

        }
    );

    return { success: true, message: trans('done') };

};