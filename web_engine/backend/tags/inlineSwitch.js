const { parse, eval_args } = require('./helpers');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        try {
            return positional_args[1][positional_args[0]];
        } catch {
            return null;
        }
    }
}