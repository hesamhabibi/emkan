module.exports = async (parent, args, { models: { DeputationModel } }) => {
    const deputations = await DeputationModel.find({}).lean({ virtuals: true, defaults: true })
        .sort({ [args.sort?.field || 'createdAt']: (args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR) == 'asc' ? 1 : -1 });
    return deputations;
};