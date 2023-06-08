module.exports = async (parent, args, { models: { CategoryModel }, error_res, trans }) => {

    const sortOperator = args.sort ? args.sort.operator : process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort ? args.sort.field : 'createdAt';

    const typeField = args.filter?.type ?? CategoryModel.types.blog;
    const showInMenuField = args.filter?.show_in_menu ?? null;
    const parentIdField = args.filter?.parent_id ?? null;

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
    if (parentIdField != undefined) {
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

    try {
        const categories = await CategoryModel.aggregate(aggregate_query);

        return categories;

    } catch (err) {
        return error_res(trans('server_error'), err.message);
    }
};
