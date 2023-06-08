
module.exports = async (parent, args, { models: { OrderModel }, AuthUser }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort?.field || 'createdAt';

    const shipping_method = args.filter?.shipping_method || null;
    const payment_method = args.filter?.payment_method || null;
    const status = args.filter?.status || null;
    console.log ({args});
    const is_inquiry = args?.filter?.is_inquiry || 0;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    //publishAt
    aggregate_query.push({
        $match: {
            user_id: AuthUser._id,
            type: OrderModel.types.complete,
        }
    });

    //filters
    if (shipping_method != null) {
        aggregate_query.push({
            $match: {
                shipping_method: shipping_method,
            }
        });
    }

    if (payment_method != null) {
        aggregate_query.push({
            $match: {
                payment_method: payment_method,
            }
        });
    }

    if (status != null) {
        aggregate_query.push({
            $match: {
                status: status,
            }
        });
    }

    console.log({ is_inquiry });

    if (is_inquiry != null) {
        aggregate_query.push({
            $match: {
                is_inquiry: is_inquiry,
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

    //aggregate Paginate
    const myAggregate = OrderModel.aggregate(aggregate_query);
    const orders = await OrderModel.aggregatePaginate(myAggregate, options);

    console.log(orders.items);

    return {
        data: orders.docs,
        paginate: {
            total: orders.totalDocs,
            limit: orders.limit,
            page: orders.page,
            pages: orders.totalPages,
            hasPrevPage: orders.hasPrevPage,
            hasNextPage: orders.hasNextPage,
        },
    };

};
