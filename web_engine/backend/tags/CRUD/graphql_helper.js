const axios = require('axios').default;


const object_to_query = (obj) => {
    let result = "";
    if (Array.isArray(obj)) {
        for (let i in obj) {
            result += object_to_query(obj[i]);
        }
    } else if (typeof obj == 'object') {
        const keys = Object.keys(obj);
        for (let i in keys) {
            result += `${keys[i]} {\n`;
            result += object_to_query(obj[keys[i]]);
            result += '}\n';
        }
    } else if (typeof obj == 'string') {
        result += obj + "\n";
    }
    return result;
}

const request_query = async (ctx, query, variables = {}) => {
    const req = ctx.environments.req;
    // Make a request for a user with a given ID
    let result;
    try {

        // >> make cookies <<
        let cookie_header = '';
        try {
            const cookie_keys = Object.keys(ctx.environments.cookies);
            for (let i in cookie_keys) {
                try {
                    const cookie_value = typeof ctx.environments.cookies[cookie_keys[i]] == 'string' ? ctx.environments.cookies[cookie_keys[i]] : JSON.stringify(ctx.environments.cookies[cookie_keys[i]], (key, value) => typeof value === "string" ? encodeURI(value) : value);
                    cookie_header += `${cookie_keys[i]}=${cookie_value};`;
                } catch {/* empty */ }
            }
        } catch {/* empty */ }

        // get and set cookies and headers
        result = await axios.post(`${process.env.API_URL}/${process.env.API_GRAPHQL_PREFIX}`, { query, variables }, {
            headers: {
                // cookie: req?.headers?.cookie || '',
                cookie: cookie_header,
                "user-agent": req?.headers["user-agent"],
            },
        });
        // console.log(result.data.data);
    } catch (e) {
        try {
            if (e.response)
                console.log('error: data received: ', e.response?.data);
        } catch { /* empty */ }
    }

    if ((result?.data?.errors || []).length > 0) {
        for (let i in result?.data?.errors)
            console.error(result?.data?.errors[i]);
            return null;
    }

    return result?.data;
}


module.exports = {
    object_to_query,
    request_query,
}

