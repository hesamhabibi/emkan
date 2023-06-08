const mongoose = require('mongoose');
module.exports = async (parent, args, { models: { CommentModel } }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator ?? process.env.SORT_DEFAULT_OPERATOR;
    const sortField = args.sort?.field ?? 'createdAt';

    const replyId = args.filter?.reply_to_id ?? null;
    const modelId = args.model_id ?? null;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    // show confirmed comment
    aggregate_query.push({
        $match: {
            confirmed: true
        }
    });

    // show blog comment
    try {
        aggregate_query.push({
            $match: {
                model_id: mongoose.Types.ObjectId(modelId)
            }
        });
    } catch { /* empty */ }

    // reply comment 
    if (replyId != undefined) {
        try {
            aggregate_query.push({
                $match: {
                    reply_to_id: mongoose.Types.ObjectId(replyId)
                }
            });
        } catch { /* empty */ }
    }

    // add sort to aggregate
    aggregate_query.push({ $sort: { [sortField]: sortOperator == 'asc' ? 1 : -1 }, });

    //paginate options
    const options = {
        page: pageValue,
        limit: limitValue
    };

    //aggregate Paginate
    const myAggregate = CommentModel.aggregate(aggregate_query);
    const comments = await CommentModel.aggregatePaginate(myAggregate, options);

    return {
        data: comments.docs,
        paginate: {
            total: comments.totalDocs,
            limit: comments.limit,
            page: comments.page,
            pages: comments.totalPages,
            hasPrevPage: comments.hasPrevPage,
            hasNextPage: comments.hasNextPage,
        },
    };

};