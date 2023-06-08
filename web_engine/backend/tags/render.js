const { parse, eval_args } = require('./helpers');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        if (typeof positional_args[0] == 'string' && positional_args[0] != '') {
            return await this.liquid.renderFile(positional_args[0], { ...(ctx.environments || {}), ...(args || {}) });
        }
        else {
            let temp;
            try {
                temp = Object.keys(args)[0];
            } catch {
                temp = null;
            }
            let error_str = '';

            if (temp) {
                error_str += `{% render "${Object.keys(args)[0]}" %}\n`;
            }

            error_str += JSON.stringify({ args, positional_args });

            throw Error(error_str);
        }
    }
}