require('module-alias/register');
const create_env = require('./gen_env');
const gen_app_key = require('./gen_app_key');

const run = async (env = true, env_local = true) => {
    await create_env(env, env_local);

    await gen_app_key(env, env_local);
};

run(true, true);