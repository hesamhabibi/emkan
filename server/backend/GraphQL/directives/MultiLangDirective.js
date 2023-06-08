const typeDefs = `
directive @multilang(field: String,type:String,default:String) on QUERY | FIELD_DEFINITION
`;

const helper_get_value = (value, local, default_local) => {

    if (Object.keys(value).includes(local) || !default_local)
        return value[local];
    else
        return value[default_local];
};

const multilang = async (next, parent, args, context) => {
    try {
        if (typeof parent[args.field] == 'string')
            return parent[args.field];
        let local;
        if (args.type == 'panel') {
            local = context.panel_local || 'fa';
        } else {
            local = context.web_local || 'fa';
        }
        if (Array.isArray(parent[args.field])) {
            const new_array = [];
            for (let i = 0; i < parent[args.field].length; i += 1) {
                try {
                    new_array.push(helper_get_value(parent[args.field][i], local, args.default));
                } catch {
                    new_array.push(null);
                }
            }
            return new_array;
        }
        return helper_get_value(parent[args.field], local, args.default);
    } catch (e) {
        return null;
    }
};

module.exports = {
    typeDefs,
    multilang,
};