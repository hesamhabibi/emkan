module.exports = async (parent, args, { models: { CollectionModel }, error_res, trans }) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        error_res(trans('not_found', { attr: "collection" }));
    return collection;
};