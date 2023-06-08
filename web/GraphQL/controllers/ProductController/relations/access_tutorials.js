module.exports = async (parent, args, { AuthUser }) => {
    try {
        return parent.tutorials.filter(tutorial => {
            if (tutorial.user_access_ids.find((user_id) => {
                return String(user_id) == String(AuthUser._id);
            }))
                return true;
            else
                return false;
        });
    } catch (e) {
        return [];
    }
};