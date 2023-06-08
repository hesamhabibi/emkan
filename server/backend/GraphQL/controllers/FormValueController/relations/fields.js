module.exports = async (parent) => {
    try {
        const new_fields = {};
        const keys = Object.keys(parent.fields);
        for (let i = 0; i < keys.length; i += 1) {
            try {
                new_fields[keys[i]] = JSON.parse(parent.fields[keys[i]]);
            } catch {
                new_fields[keys[i]] = null;
            }
        }
        return new_fields;
    } catch (e) {
        return null;
    }
};