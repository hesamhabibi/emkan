const { parse, eval_args } = require('./helpers');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);

        const keys = Object.keys(args);

        if (keys.length == 1) {
            if (args[keys[0]] != undefined && args[keys[0]].valueOf() != null && args[keys[0]] != false)
                return `addToQuery('${keys[0]}','${args[keys[0]]}')`;
            else
                return `addToQuery('${keys[0]}',null)`;

        } else {
            let js_script = `var p = new URL(window.location);`;
            for (let i in keys) {
                if (args[keys[i]] != undefined && args[keys[i]].valueOf() != null && args[keys[i]] != false)
                    js_script += `p.searchParams.set('${keys[i]}','${args[keys[i]]}');`
                else
                    js_script += `p.searchParams.delete('${keys[i]}');`
            }
            js_script += `window.location.href = p.href;`

            return js_script;
        }
    }
}
