module.exports = async (parent, args, { models: { CollectionModel }, error_res, trans }) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findOne({ _id: args.id, source: CollectionModel.sources.related_product }).lean({ virtuals: true, defaults: true });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        error_res(trans('not_found', { attr: "related_product_collection" }));
    return collection;
};