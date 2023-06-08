module.exports = async (parent, args, { models: { CategoryModel }, error_res, trans }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator ?? process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort?.field ?? 'sort';

    const typeField = args.filter?.type ?? CategoryModel.types.blog;
    const showInMenuField = args.filter?.show_in_menu;
    const parentIdField = args.filter?.parent_id;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    // show only active category
    aggregate_query.push(
        {
            $match: {
                active: true,
            }
        },
    );

    //show_in_menu
    if (showInMenuField != undefined) {
        aggregate_query.push({
            $match: {
                show_in_menu: showInMenuField
            }
        });
    }

    // filter type
    if (typeField != undefined) {
        aggregate_query.push(
            {
                $match: {
                    type: typeField
                }
            },
        );
    }

    // filter type
    if (parentIdField !== undefined) {
        aggregate_query.push(
            {
                $match: {
                    parent_id: parentIdField
                }
            },
        );
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
        const myAggregate = CategoryModel.aggregate(aggregate_query);
        const categories = await CategoryModel.aggregatePaginate(myAggregate, options);

        return {
            data: categories.docs,
            paginate: {
                total: categories.totalDocs,
                limit: categories.limit,
                page: categories.page,
                pages: categories.totalPages,
                hasPrevPage: categories.hasPrevPage,
                hasNextPage: categories.hasNextPage,
            },
        };

    } catch (err) {
        return error_res(trans('server_error'), err.message);
    }
};
