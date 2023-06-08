module.exports = async (parent, args, { models: { SettingModel } }) => {
    const groups = await SettingModel.aggregate([{
        $group: {
            _id: "$group",
            // group: {
            //     $first: "$group"
            // }
        }
    }]);
    return groups.map((group) => { return group._id; });
};