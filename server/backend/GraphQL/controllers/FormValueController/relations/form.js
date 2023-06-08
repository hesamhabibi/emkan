module.exports = async (parent, args, { models: { FormModel } }) => {
    try {
        return await FormModel.findOne({ _id: parent.form_id });
    } catch (e) {
        return null;
    }
};