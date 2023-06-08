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
                query ($key: String) {
                    result: getSettingByKey(key: $key){
                        ${fields}
                    }
                }
            `;

            const variables = {
                key: input.key,
            };

            const result = await request_query(ctx, query, variables);

            if (result === undefined)
                console.log(`no result for query "getSettingByKey" for ${keys[i]}`);

            ctx.bottom()[keys[i]] = result?.data?.result || undefined;
        }

        return null;
    }
}