const mongoose = require('mongoose');

module.exports = async (parent, args, { models: { ProductModel }, AuthUser }) => {

    const aggregate_query = [];
    const currentTime = new Date();

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    // publishAt
    aggregate_query.push({
        $match: {
            type: ProductModel.types.preview,
            status: ProductModel.statuses.show,
            publishAt: {
                $lt: currentTime
            }
        }
    });

    aggregate_query.push(
        {
            $match: {
                'tutorials.user_access_ids': mongoose.Types.ObjectId(AuthUser._id),
            }
        }
    );

    return await ProductModel.aggregate(aggregate_query);
};