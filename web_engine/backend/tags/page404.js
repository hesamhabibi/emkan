const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        
        // codes here:
        if (positional_args[0]) {
            const err = new Error('404 not found');
            err.is_custom = true;
            err.interruptCode = interruptCodes.page404;
            throw err;
        } else {
            return null;
        }
    }
}