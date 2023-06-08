const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);

        const { routeNames } = require("@backend");

        const keys = Object.keys(args);
        for (let i in keys) {

            const input = args[keys[i]];
            const routeName = input.routeName;
            let route = routeNames[routeName]?.route;
            if (!route) {
                console.log(`route ${routeName} not found  for var "${keys[i]}"`)
                return "#";
            }

            // prefer multi_lang_route
            if (routeNames[routeName]?.multi_lang_route /* && ((ctx.environments.cookies.web_lang || "fa") != "fa") */) {
                route = routeNames[routeName]?.multi_lang_route;
            }

            const not_used_args = { ...input };
            delete not_used_args.routeName;

            if (route.includes(':')) {
                let route_with_args = '';
                const route_parts = route.split(':');
                route_with_args += route_parts.shift();
                for (let i in route_parts) {
                    let index = route_parts[i].indexOf('/');
                    if (index == -1)
                        index = route_parts[i].length;
                    const param_name = route_parts[i].substr(0, index);
                    let value = args[param_name];
                    if (value === undefined)
                        if (param_name == "lang") {
                            value = ctx.environments.cookies.web_lang || "fa";
                        } else {
                            if (process.env.env = "debug")
                                throw new Error(`route parameter "${param_name}" is missing in "${routeName}".`);
                        }
                    else
                        delete not_used_args[param_name];
                    route_with_args += value + route_parts[i].substr(parseInt(index));
                }
                route = route_with_args;
            }
            if (Object.keys(not_used_args).length > 0) {
                route += "?";
                const keys = Object.keys(not_used_args);
                for (let i in keys) {
                    if (i != 0)
                        route += ',';
                    const value = not_used_args[keys[i]];
                    const encoded_value = encodeURI(value);
                    route += `${keys[i]}=${encoded_value}`;
                }
            }
            ctx.bottom()[keys[i]] = route|| undefined;
        }
        return null;
    }
}