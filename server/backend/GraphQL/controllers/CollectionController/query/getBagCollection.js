module.exports = async (parent, args, { models: { CollectionModel }, error_res, trans }) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findOne({ _id: args.id, source: CollectionModel.sources.bag }).lean({ virtuals: true, defaults: true });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        error_res(trans('not_found', { attr: "bag_collection" }));
    return collection;
};