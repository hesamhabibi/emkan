const split_args = (input, delimiter, limit_count = null) => {
    // "key:"value,",key2:value2"

    const splitted_args = [];
    let last_str = '';
    let is_in_single_quote = false;
    let is_in_double_quote = false;
    let is_in_array_indent = 0;
    let is_in_object_indent = 0;
    let is_in_filter_indent = false;
    let dont_split = false;

    for (let i in input) {
        i = parseInt(i);
        dont_split = false;

        if (!is_in_single_quote)
            if (input[i] == '"' && input[i - 1] !== '\\')
                is_in_double_quote = !is_in_double_quote;
        if (!is_in_double_quote)
            if (input[i] == "'" && input[i - 1] !== '\\')
                is_in_single_quote = !is_in_single_quote;

        if (is_in_double_quote || is_in_single_quote)
            dont_split = true;

        if (!dont_split) {
            if (input[i] == "[")
                is_in_array_indent += 1;
            if (input[i] == "]")
                is_in_array_indent -= 1;
            if (input[i] == "{")
                is_in_object_indent += 1;
            if (input[i] == "}")
                is_in_object_indent -= 1;
        }

        if (is_in_array_indent != 0 || is_in_object_indent != 0)
            dont_split = true;

        if (!dont_split) {
            if (input[i] == '|')
                is_in_filter_indent = true;
            if (input[i] == delimiter)
                is_in_filter_indent = false;
        }

        if (is_in_filter_indent)
            dont_split = true;


        // console.log(input[i], dont_split, is_in_double_quote, is_in_single_quote, is_in_filter_quote, last_str);

        if (delimiter.includes(input[i]) && !dont_split) {
            splitted_args.push(last_str);
            last_str = '';
        } else {
            last_str += input[i];
        }

        if (limit_count)
            if (splitted_args.length >= limit_count - 1) {
                last_str += input.substr(i + 1, input.length - i);
                break;
            }
    }
    if (last_str != '')
        splitted_args.push(last_str);

    return splitted_args;
};

const parse_args = (input) => {
    let args = {};
    let positional_args = [];
    try {
        input = split_args(input, ',');

        for (let i in input) {
            try {
                let pair = split_args(input[i].trim(), [':', '='], 2);
                if (pair.length == 0) {
                    positional_args.push(null);
                }
                if (pair.length == 1) {
                    positional_args.push(pair[0].trim() || null);
                }
                if (pair.length == 2) {
                    const key = pair[0].trim().replace(/["'`:]/gi, '');
                    const value = pair[1].trim();
                    args[key] = value;
                }
            } catch {
                continue;
            }
        }
    } catch (e) {
        console.log(e)
    }

    return {
        positional_args,
        args,
    }
};

const eval_value = async (_this, ctx, value) => {
    if (typeof value == 'string') {
        value = value.trim();
        if (value.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1, -1);
            const values = await split_args(value, ',');
            for (let i in values) {
                values[i] = await eval_value(_this, ctx, (values[i] || "").trim());
            }
            return values;
        } else if (value.startsWith("{") && value.endsWith("}")) {
            value = value.slice(1, -1);
            const values = await split_args(value, ',');
            const object = {};
            for (let i in values) {
                const pair = split_args(values[i] || "", [":", "="], 2);
                const raw_key = (pair[0] || "").trim();
                let key;
                if (raw_key.startsWith("[") && raw_key.endsWith("]")) {
                    key = (await eval_value(_this, ctx, raw_key.slice(1, -1))).valueOf();
                } else if (raw_key.startsWith('"') && raw_key.endsWith('"')) {
                    key = await eval_value(_this, ctx, raw_key);
                } else {
                    key = raw_key;
                }

                let new_value = await eval_value(_this, ctx, (pair[1] || "").trim());
                try {
                    new_value = new_value.valueOf();
                } catch {/* empty */ }
                if (key)
                    object[key] = new_value;
            }
            return object;
        } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) { // todo: bug: ("first string" + "second string") is not string value
            // return value.slice(1, -1);
        } else if (false/* startWith digit and contains just digit and just one dot(.) */) {
            return parseFloat(value);
        } else {

            // todo: it is arithmetic 

        }
    }
    return await _this.liquid.evalValue(value, ctx);

};

const eval_args = async function (_this, ctx, args = null, positional_args = null) {

    const new_positional_args = [];
    for (let i in positional_args || []) {
        new_positional_args.push(await eval_value(_this, ctx, positional_args[i]));
    }
    const keys = Object.keys(args);
    const newArgs = {};
    for (let i in keys) {
        const value = await eval_value(_this, ctx, args[keys[i]]);
        newArgs[keys[i]] = value;
    }
    return {
        args: newArgs,
        positional_args: new_positional_args,
    }
};

const parse = function (token) {
    const result = parse_args(token.args);
    this.positional_args = result.positional_args;
    this.args = result.args;
};

module.exports = {
    parse,
    parse_args,
    eval_args,
    split_args,
}