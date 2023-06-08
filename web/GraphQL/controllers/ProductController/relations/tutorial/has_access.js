module.exports = async (parent, args, { models: { SettingModel },AuthUser }) => {
    try {
        if (parent.user_access_ids.find((user_id) => {
            return String(user_id) == String(AuthUser._id);
        }))
            return true;
        else
            return false;
    } catch (e) {
        return null;
    }
};