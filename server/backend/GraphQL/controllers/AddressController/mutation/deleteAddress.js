module.exports = async (parent, args, { models: { AddressModel, UserModel }, error_res, trans }) => {
    // find address
    let address;
    try {
        address = await AddressModel.findById(args.id);
    } catch (e) {
        address = null;
    }
    // check address exists
    if (!address)
        error_res(trans('not_found', { attr: "address" }));


    if (address.model_name == UserModel.modelName) {
        // find user
        let user_address_ids;
        try {
            user_address_ids = (await UserModel.findById(address.model_id)).user_information.address_ids;
            user_address_ids = user_address_ids.filter((id) => { return String(id) !== String(address._id); });
        } catch (e) {
            console.log(e);
            user_address_ids = [];
        }

        await UserModel.findOneAndUpdate(
            { _id: address.model_id },
            { user_information: { address_ids: user_address_ids } }
        );
    }

    // delete address
    await address.delete();
    return { success: true, message: trans('done') };
};