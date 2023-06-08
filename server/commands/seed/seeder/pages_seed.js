/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const { BlogModel, SEOModel } = require('@models');
const pages = require('@common/constant_data/asantamin_web_pages');

module.exports = async (type = null) => {
    if (type == 'very_hard') {
        // delete all pages
        await BlogModel.deleteMany({ type: BlogModel.types.page });
        await SEOModel.deleteMany({ unique_key: BlogModel.types.page });
    }

    const page_keys = Object.keys(pages);
    for (let i in page_keys) {
        try {
            let page_exists = await BlogModel.aggregate([
                {
                    $match: {
                        type: BlogModel.types.page
                    }
                },
                {
                    $lookup: {
                        from: SEOModel.collection.name,
                        localField: 'seo_id',
                        foreignField: '_id',
                        as: 'seo'
                    }
                },
                {
                    $unwind: {
                        path: '$seo'
                    }
                },
                {
                    $match: {
                        "seo.url": `${page_keys[i]}`
                    }
                }
            ]);
            page_exists = page_exists[0];

            if (type == 'hard' && page_exists) {
                await SEOModel.deleteMany({ _id: page_exists.seo._id });
                await BlogModel.deleteMany({ _id: page_exists._id });
                page_exists = false;
            }

            if (!page_exists) {
                const page = pages[page_keys[i]];
                const blog_id = mongoose.Types.ObjectId();
                const seo_input = {
                    title: {},
                    description: {},
                    keywords: {},
                    url: page_keys[i],
                    url_status: 1,
                    canonical_url: null,
                    redirect_url_301: null,
                    redirect_url_404: null,
                    robots_status: null,

                    unique_key: BlogModel.types.page,
                    model_name: BlogModel.modelName,
                    model_id: blog_id,
                };
                const seo = await SEOModel.create(seo_input);
                const blog_input = {
                    title: {
                        fa: typeof page.title == 'object' ? page.title.fa : page.title,
                        en: typeof page.title == 'object' ? page.title.en : page.title,
                    },
                    summary: null,
                    description: {
                        fa: typeof page.description == 'object' ? page.description.fa : page.description,
                        en: typeof page.description == 'object' ? page.description.en : page.description,
                    },
                    status: BlogModel.statuses.show,
                    publishAt: new Date(),
                    has_rating: false,
                    has_comment: false,
                    type: BlogModel.types.page,
                    category_id: null,
                    media: null,
                    media_gallery: [],
                    document: null,
                    seo_id: seo._id,
                    tag_ids: [],
                    tag_group_id: null,
                    user_id: null,
                };
                await BlogModel.create(blog_input);
            }
        } catch (e) {
            console.log(e);
        }
    }
};