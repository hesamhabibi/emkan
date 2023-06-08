const { parse, eval_args } = require('./../helpers');
const { object_to_query, request_query } = require('./graphql_helper');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);

        const keys = Object.keys(args);
        for (let i in keys) {

            const input = args[keys[i]];
            const fields = object_to_query(input.fields || "id");
            let query = `
                query ($keys: [String]) {
                    result: getSettingByKeys(keys: $keys){
                        ${fields}
                        key
                    }
                }
            `;

            const variables = {
                keys: input.keys,
            };

            const result = await request_query(ctx, query, variables);

            if (result === undefined)
                console.log(`no result for query "getSettingByKeys" for ${keys[i]}`);

            const parsed_result = {};
            (result?.data?.result || []).map((setting) => {
                try { parsed_result[setting.key] = setting; } catch {/* empty */ }
            })

            ctx.bottom()[keys[i]] = parsed_result;
        }

        return null;
    }
}