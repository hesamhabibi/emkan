const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        try {
            return ctx.environments._translator(ctx.environments.lang, positional_args[0]);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}