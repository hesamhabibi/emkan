const mongoose = require('mongoose');
const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent, args, { models: { BlogModel, TagModel } }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort?.field || 'createdAt';

    const searchText = args.filter?.search_text || null;
    let categoryIds = args.filter?.category_ids || [];
    let tagIds = args.filter?.tag_ids || [];
    const typeField = args.filter?.type ?? BlogModel.types.blog;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    //publishAt
    aggregate_query.push({
        $match: {
            publishAt: {
                $lt: new Date()
            }
        }
    });

    // filter by type of blog
    aggregate_query.push(
        {
            $match: {
                type: typeField,
                status: BlogModel.statuses.show,
            }
        },
    );

    // filter by search text
    if (searchText && typeof searchText == 'string') {
        let langs = await get_setting('web_content_languages');
        langs = langs.value.map(lang => lang.code);

        const title_query = [];
        for (let i in langs) {
            title_query.push({ [`title.${langs[i]}`]: { $regex: searchText } });
        }
        const summary_query = [];
        for (let i in langs) {
            summary_query.push({ [`summary.${langs[i]}`]: { $regex: searchText } });
        }
        const description_query = [];
        for (let i in langs) {
            description_query.push({ [`description.${langs[i]}`]: { $regex: searchText } });
        }

        aggregate_query.push({
            $match: {
                $or: [
                    {
                        $or: title_query,
                    },
                    {
                        $or: summary_query,
                    },
                    {
                        $or: description_query,
                    },
                ]
            }
        });
    }


    // filter by category ids
    categoryIds = categoryIds.filter(value => value); // remove nulls
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
        let objectIds = [];
        for (let i in categoryIds) {
            try {
                objectIds.push(mongoose.Types.ObjectId(categoryIds[i]));
            } catch { /* empty */ }
        }
        aggregate_query.push(
            {
                $match: {
                    category_id: { $in: objectIds },
                }
            },
        );
    }


    // filter by tag ids
    tagIds = tagIds.filter(value => value); // remove nulls
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
        let objectIds = [];
        for (let i in tagIds) {
            try {
                objectIds.push(mongoose.Types.ObjectId(tagIds[i]));
            } catch { /* empty */ }
        }
        aggregate_query.push(
            {
                $lookup: {
                    from: 'tags',
                    localField: 'tag_group_id',
                    foreignField: 'tag_group_ids',
                    as: 'tag_group_tags',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                deep: 1,
                            },
                        },
                    ]
                }
            },
        );
        aggregate_query.push(
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                { tag_ids: { $in: objectIds } },
                                { 'tag_group_tags._id': { $in: objectIds } }
                            ]
                        },
                        { deep: TagModel.deeps.tag }
                    ]
                }
            }
        );
    }

    // add sort to aggregate
    aggregate_query.push({ $sort: { [sortField]: sortOperator == 'asc' ? 1 : -1 }, });

    //paginate options
    const options = {
        page: pageValue,
        limit: limitValue
    };

    //aggregate Paginate
    const myAggregate = BlogModel.aggregate(aggregate_query);
    const blogs = await BlogModel.aggregatePaginate(myAggregate, options);

    return {
        data: blogs.docs,
        paginate: {
            total: blogs.totalDocs,
            limit: blogs.limit,
            page: blogs.page,
            pages: blogs.totalPages,
            hasPrevPage: blogs.hasPrevPage,
            hasNextPage: blogs.hasNextPage,
        },
    };

};
