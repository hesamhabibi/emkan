module.exports = async (resolve, parent, args, context, info) => {
    if (parent === undefined) {
        const go_deeper = (obj) => {
            try {
                if (typeof obj === 'object') {
                    const keys = Object.keys(obj);
                    for (let i = 0; i < keys.length; i += 1)
                        obj[keys[i]] = go_deeper(obj[keys[i]]);
                    return obj;
                }
                if (obj === '')
                    return null;
                return obj;
            } catch {
                return obj;
            }
        };
        return resolve(parent, go_deeper(args), context, info);
    }
    return resolve(parent, args, context, info);
};