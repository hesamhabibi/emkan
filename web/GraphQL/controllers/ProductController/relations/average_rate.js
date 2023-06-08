module.exports = async (parent, args, { models: { RateModel } }) => {
    try {
        return await RateModel.average(parent._id);
    } catch (e) {
        return 0;
    }
};