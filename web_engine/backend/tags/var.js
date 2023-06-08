const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        const keys = Object.keys(args);
        for (let i in keys)
            ctx.bottom()[keys[i]] = args[keys[i]]; // set variables for current scope(bottom)
        return null;
    }
}