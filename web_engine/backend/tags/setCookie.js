const { parse, eval_args } = require('./helpers');
/* example:
{%-setCookie cookie_name="cookie_value;cookie_options"-%}
*/

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        const keys = Object.keys(args);
        for (let i in keys) {
            let value = args[keys[i]];
            value = value.valueOf() || '';
            ctx.environments.storage.cookies.push(`${keys[i]}=${value}`);
            if (typeof value == 'string' && value.includes(';')) {
                value = value.slice(0, value.indexOf(';'));
            }
            ctx.environments.cookies[keys[i]] = value;
        }
        return null;
    }
}