const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent, args, { models: { BrandModel }, error_res, trans }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort?.field || 'createdAt';

    const searchTitle = args.filter?.search_title;
    const showInMenuField = args.filter?.show_in_menu ?? null;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    // show only active brand
    aggregate_query.push(
        {
            $match: {
                active: true,
            }
        },
    );

    // filter by search title
    if (searchTitle && typeof searchTitle == 'string') {
        let langs = await get_setting('web_content_languages');
        langs = langs.value.map(lang => lang.code);

        const title_query = [];
        for (let i in langs) {
            title_query.push({ [`title.${langs[i]}`]: { $regex: searchTitle } });
        }

        aggregate_query.push({
            $match: {
                $or: title_query,
            },
        });
    }

    //show_in_menu
    if (showInMenuField != undefined) {
        aggregate_query.push({
            $match: {
                show_in_menu: showInMenuField
            }
        });
    }

    // add sort to aggregate
    aggregate_query.push({ $sort: { [sortField]: sortOperator == 'asc' ? 1 : -1 }, });

    //paginate options
    const options = {
        page: pageValue,
        limit: limitValue
    };

    try {

        //aggregate Paginate
        const myAggregate = BrandModel.aggregate(aggregate_query);
        const brands = await BrandModel.aggregatePaginate(myAggregate, options);

        return {
            data: brands.docs,
            paginate: {
                total: brands.totalDocs,
                limit: brands.limit,
                page: brands.page,
                pages: brands.totalPages,
                hasPrevPage: brands.hasPrevPage,
                hasNextPage: brands.hasNextPage,
            },
        };

    } catch (err) {
        return error_res(trans('server_error'), err.message);
    }
};
