const { parse, eval_args } = require('./helpers');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        const keys = Object.keys(args);
        for (let i in keys) {
            let new_obj;
            if (Array.isArray(args[keys[i]][0]))
                new_obj = [];
            else
                new_obj = {};
            for (let j in args[keys[i]])
                try {
                    if (Array.isArray(args[keys[i]][0]))
                        new_obj = [...new_obj, ...(args[keys[i]][j])];
                    else
                        new_obj = { ...new_obj, ...(args[keys[i]][j]) };
                } catch { /* empty */ }
            ctx.bottom()[keys[i]] = new_obj;
        }
        return null;
    }
}