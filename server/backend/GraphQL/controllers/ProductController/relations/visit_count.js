const { blog_visit_count } = require('@helpers/ReportHelper');

module.exports = async (parent, args, { models: { SEOModel } }) => {
    try {
        const seo = await SEOModel.findOne({ _id: parent.seo_id });
        if (seo)
            return await blog_visit_count(seo.url);
        return 0;
    } catch (e) {
        return -1;
    }
};