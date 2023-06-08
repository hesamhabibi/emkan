const update_env = require('../helpers/update_env');

const generate_key = (len) => {
    const alpha = 'abcdefghijkmlopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digit = '1234567890';
    const chars = '~!@#%^&*()_+=-';

    const all = alpha + digit + chars;

    let key = '';
    for (let i = 0; i < len; i += 1) {
        const rand = parseInt(Math.random() * all.length, 10);
        const rand_char = all[rand];
        key += rand_char;
    }

    return key;
};
module.exports = async (env = true, env_local = true) => {

    const new_env = {
        SECRET: generate_key(63),
        JWT_KEY: generate_key(63),
    };

    if (env)
        await update_env(new_env, '.env');

    const local_new_env = {
        SECRET: generate_key(63),
        JWT_KEY: generate_key(63),
    };

    if (env_local)
        await update_env(local_new_env, '.env.local');

    return true;
};
