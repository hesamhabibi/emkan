module.exports = async (parent, args, { models: { CRMModel }, AuthUser }) => {

    let aggregate_query = [];

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
            $match: {
                type: CRMModel.types.popup,
                send_to: {
                    $elemMatch: {
                        receiver_user_id: AuthUser._id,
                        seen: { $gt: 0 }
                    }
                }
            }
        }
    );

    return CRMModel.aggregate(aggregate_query);
};