module.exports = async (parent, args, { models: { BrandModel, SEOModel }, error_res, trans }) => {
    let seo;
    const slug = args.slug;
    try {
        seo = await SEOModel.findOne({ url: slug });
    } catch (e) {
        seo = null;
    }

    // check seo exists
    if (!seo)
        error_res(trans('not_found', { attr: 'brand' }), null, process.env.ERROR_CODE_NOTFOUND);

    // find brand
    let brand;
    try {
        if (args.type)
            brand = await BrandModel.findOne({ seo_id: seo._id, active: true, type: args.type ?? BrandModel.types.blog });
        else
            brand = await BrandModel.findOne({ seo_id: seo._id, active: true });
    } catch (e) {
        brand = null;
    }

    // check brand exists
    if (!brand)
        error_res(trans('not_found', { attr: 'brand' }), null, process.env.ERROR_CODE_NOTFOUND);

    return brand;
};
