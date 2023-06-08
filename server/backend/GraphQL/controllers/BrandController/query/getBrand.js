module.exports = async (parent, args, { models: { BrandModel }, error_res, trans }) => {
    // find brand
    let brand;
    try {
        brand = await BrandModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        brand = null;
    }
    // check brand exists
    if (!brand)
        error_res(trans('not_found', { attr: "brand" }));
    return brand;
};