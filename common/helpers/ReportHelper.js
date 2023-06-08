const { ReportModel } = require('../models');

const visit_count = async (route, query) => {
    try {
        if (query)
            return await ReportModel.countDocuments({ "$and": [{ department: ReportModel.departments.backend, status_code: 200, action: route }, query] }) || 0;
        return await ReportModel.countDocuments({ department: ReportModel.departments.backend, status_code: 200, action: route }) || 0;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

const blog_visit_count = async (slug) => {
    return await visit_count('getBlogBySlug', { 'parameters.slug': String(slug) });
};

const product_visit_count = async (slug) => {
    return await visit_count('getProductBySlug', { 'parameters.slug': String(slug) });
};

module.exports = {
    visit_count,
    blog_visit_count,
    product_visit_count,
};