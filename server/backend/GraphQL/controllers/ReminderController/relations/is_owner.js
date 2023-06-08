module.exports = async (parent, args, { AuthUser }) => {
    try {
        return String(parent.user_id) === String(AuthUser._id);
    } catch (e) {
        return false;
    }
};