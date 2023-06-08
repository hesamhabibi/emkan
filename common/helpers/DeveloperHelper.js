const is_developer = (access_id) => {
    try {
        return String(access_id) === (process.env.DEVELOPER_ACCESS_ID || ('_'));
    } catch {
        return false;
    }
};

module.exports = {
    is_developer,
};