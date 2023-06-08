module.exports = async (parent, args, { AuthUser }) => {
    try {
        const result = parent.send_to.find((el) => {
            return String(el.receiver_user_id) == String(AuthUser._id);
        });
        return result.seen;
    } catch {
        return null;
    }
};