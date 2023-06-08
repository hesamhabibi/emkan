const { parse, eval_args } = require('./helpers');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        console.log(...positional_args);
        return null;
    }
}