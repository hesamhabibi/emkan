
module.exports = async (parent, args, { models: { AddressModel, UserModel }, error_res, trans }) => {

    let address;
    try {
        address = await AddressModel.findById(args.address_id);
    } catch (e) {
        address = null;
    }

    // check address exists
    if (!address)
        error_res(trans('not_found', { attr: 'address' }));

    if (address.model_name == UserModel.modelName) {
        try {
            //set user default addresses to false 
            await AddressModel.find(
                { model_id: address.model_id }
            ).updateMany({ $set: { is_default: false } });

            await AddressModel.findOneAndUpdate(
                { _id: address._id },
                { is_default: true }
            );
        } catch {
            return error_res();
        }
    }

    return { success: true, message: trans('done') };


};