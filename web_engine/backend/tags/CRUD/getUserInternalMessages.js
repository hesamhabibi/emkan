const { parse, eval_args } = require('./../helpers');
const { object_to_query, request_query } = require('./graphql_helper');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);

        const keys = Object.keys(args);
        for (let i in keys) {

            const input = args[keys[i]];
            const fields = object_to_query(input.fields || {"data":["id"]});
            let query = '';
            query += `
                query($page: Int, $limit: Int, $filter: CRMFilter, $sort: CRMSort) {
                    result: getUserInternalMessages(page: $page, limit: $limit, filter: $filter, sort: $sort) {
                        ${fields}
                    }
                }
            `;
            const variables = {
                filter: input.filter || {},
                sort: input.sort || {},
                page: input.page || 1,
                limit: input.limit || process.env.DEFAULT_LIMIT || 15,
            };

            const result = await request_query(ctx, query, variables);

            if (result === undefined)
                console.log(`no result for query "getUserInternalMessages" for ${keys[i]}`);

            ctx.bottom()[keys[i]] = result?.data?.result;
        }

        return null;
    }
}