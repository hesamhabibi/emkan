const update_env = require('../helpers/update_env');
const { env_keys, local_env_keys_replace } = require('./data');


module.exports = async (create_env = true, create_env_local = true) => {

    if (create_env)
        await update_env(env_keys, '.env');
    if (create_env_local)
        await update_env({ ...env_keys, ...local_env_keys_replace }, '.env.local');

    return true;
};