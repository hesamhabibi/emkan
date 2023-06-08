module.exports = async (parent, args, { models: { CRMModel }, AuthUser }) => {
    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator || 'desc';
    let sortField = args.sort?.field || 'seen';

    const seenFilter = args.filter?.seen ?? null;

    let aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    aggregate_query.push(
        {
            $match: {
                date: {
                    $lt: new Date()
                }
            }
        }
    );

    aggregate_query.push(
        {
            $addFields: {
                filtered_send_to: {
                    $filter: {
                        input: '$send_to',
                        as: 'obj',
                        cond: {
                            $eq: ['$$obj.receiver_user_id', AuthUser._id]
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                filtered_send_to: {
                    $arrayElemAt: ['$filtered_send_to', 0]
                }
            }
        }
    );

    aggregate_query.push({
        $match: {
            type: CRMModel.types.internal_message,
            'filtered_send_to.receiver_user_id': AuthUser._id,
        }
    });

    if (seenFilter != undefined) {
        aggregate_query.push({
            $match: {
                type: CRMModel.types.internal_message,
                'filtered_send_to.seen': seenFilter,
            }
        });
    }

    if (sortField == 'seen')
        sortField = 'filtered_send_to.seen';
    // add sort to aggregate
    aggregate_query.push({ $sort: { [sortField]: sortOperator == 'asc' ? 1 : -1 }, });

    //paginate options
    const options = {
        page: pageValue,
        limit: limitValue
    };

    //aggregate Paginate
    const myAggregate = CRMModel.aggregate(aggregate_query);
    const internal_message = await CRMModel.aggregatePaginate(myAggregate, options);

    return {
        data: internal_message.docs,
        paginate: {
            total: internal_message.totalDocs,
            limit: internal_message.limit,
            page: internal_message.page,
            pages: internal_message.totalPages,
            hasPrevPage: internal_message.hasPrevPage,
            hasNextPage: internal_message.hasNextPage,
        },
    };
};