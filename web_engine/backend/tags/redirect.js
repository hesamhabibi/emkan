const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        
        // codes here:
        if (positional_args[0]) {
            const err = new Error('error to interrupt rendering to redirect');
            err.is_custom = true;
            err.interruptCode = interruptCodes.redirect;
            err.redirectTo = positional_args[1];
            err.statusCode = parseInt(positional_args[2]) || undefined;
            throw err;
        } else {
            return null;
        }
    }
}