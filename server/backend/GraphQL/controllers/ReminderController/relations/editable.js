module.exports = async (parent, args, { AuthUser }) => {
    try {
        return String(parent.user_id) === String(AuthUser._id) || (parent.can_edit && (parent.access_user_ids.findIndex(id => {
            return String(id) === String(AuthUser._id);
        }) !== -1));
    } catch (e) {
        return false;
    }
};