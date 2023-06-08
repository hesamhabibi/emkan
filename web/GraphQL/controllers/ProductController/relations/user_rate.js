module.exports = async (parent, args, { models: { RateModel }, AuthUser }) => {
    try {
        const rate = await RateModel.findOne({ model_id: parent._id, user_id: AuthUser._id });
        return rate.rate || 0;
    } catch (e) {
        return 0;
    }
};