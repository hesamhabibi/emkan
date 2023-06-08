module.exports = async (parent, args, { models: { CollectionModel }, helpers: { SEOHelper }, error_res, trans }) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findOne({ _id: args.id, source: CollectionModel.sources.campaign });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        error_res(trans('not_found', { attr: "campaign_collection" }));
    // delete collection
    if (collection?.extra_fields?.seo_id)
        await SEOHelper.deleteSEO(collection?.extra_fields?.seo_id);
    await collection.delete();
    return { success: true, message: trans('done') };
};