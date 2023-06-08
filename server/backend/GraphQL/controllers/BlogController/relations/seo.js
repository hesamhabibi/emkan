module.exports = async (parent, args, { models: { SEOModel } }) => {
    try {
        return await SEOModel.findOne({ _id: parent.seo_id });
    } catch (e) {
        return null;
    }
};