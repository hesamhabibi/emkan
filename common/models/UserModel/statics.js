const JWT = require('jsonwebtoken');

const generate_code = async (l = 4) => {
    const code = Math.floor(Math.random() * (10 ** l));
    return `0000${code}`.slice(-l);
};

const update_user_tokens = async (user, new_tokens) => {
    if (typeof user.tokens === 'object') {
        await user.set({
            tokens: {
                ...user.tokens, // don't clear other tokens
                ...new_tokens, // replace new tokens
            }
        }).save();
    } else {
        await user.set({
            tokens: new_tokens // replace token
        }).save();
    }
};

const generateToken = async (user, field, check_database = true) => {
    try {
        if (!user.is_active) // check user is active
            return null;

        if (!field)
            return null;
        const token = await JWT.sign({ id: user.id, field, generatedAt: Date.now() }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_IN });
        if (token) {
            if (check_database) {
                // update user
                await update_user_tokens(user, { [field]: token, [`${field}_generatedAt`]: Date.now() });
            }
            return token;
        }
        return null;
    } catch {
        return null;
    }
};

const clearToken = async (user, field) => {
    try {
        // update user
        await update_user_tokens(user, { [field]: null });
        return true;
    } catch {
        return false;
    }
};

const verifyToken = async (UserModel, token, check_database = true) => {
    try {
        const payload = await JWT.verify(token, process.env.JWT_KEY);
        const user = await UserModel.findOne({ _id: payload.id });

        if (!user.is_active) // check user is active
            return null;

        if (user.tokens[payload.field] === token)
            return { user, payload };
        else if (!check_database)
            return { user, payload };
        return null;
    } catch {
        return null;
    }
};

const refreshToken = async (UserModel, token) => {
    try {
        const { user, payload } = await verifyToken(UserModel, token);
        if (user[`${payload.field}_generatedAt`] < Date.now() - (parseInt(process.env.REFRESH_TOKEN_IN, 10) || 20000)) {
            const new_token = await generateToken(user, payload.field);
            return new_token;
        }
        return token;
    } catch {
        return null;
    }
};

const generateResetPasswordToken = async (user) => {
    const token = await generate_code(4);

    // update user
    await update_user_tokens(user, {
        password_reset_token: token,
        password_reset_expireAt: Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE_IN, 10)
    });
    return token;
};

const checkResetPasswordToken = async (user, token) => {
    try {
        // check token generated
        if (user.tokens.password_reset_token == null)
            return false;
        // check token if expired
        if (user.tokens.password_reset_expireAt <= Date.now())
            return false;
        // check token is correct
        if (user.tokens.password_reset_token !== token)
            return false;
    } catch {
        return false;
    }
    return true;
};

const clearResetPasswordToken = async (user) => {
    // update user
    await update_user_tokens(user, {
        password_reset_token: null,
        password_reset_expireAt: Date.now() - 1,
    });
    return true;
};

const generateLoginVerifyToken = async (user) => {
    const token = await generate_code(4);

    // update user
    await update_user_tokens(user, {
        login_verify_token: token,
        login_verify_token_expireAt: Date.now() + parseInt(process.env.LOGIN_VERIFY_TOKEN_EXPIRE_IN, 10)
    });
    return token;
};

const checkLoginVerifyToken = async (user, code) => {
    try {
        // check token generated
        if (user.tokens.login_verify_token == null)
            return false;
        // check token if expired
        if (user.tokens.login_verify_token_expireAt <= Date.now())
            return false;
        // check token is correct
        if (user.tokens.login_verify_token !== code)
            return false;
    } catch {
        return false;
    }
    return true;
};

const clearLoginVerifyToken = async (user) => {
    try {
        // update user
        await update_user_tokens(user, {
            login_verify_token: null,
            login_verify_token_expireAt: Date.now() - 1
        });
        return true;
    } catch {
        return false;
    }
};

module.exports = {
    generateToken,
    clearToken,
    verifyToken,
    refreshToken,
    generateResetPasswordToken,
    checkResetPasswordToken,
    clearResetPasswordToken,
    generateLoginVerifyToken,
    checkLoginVerifyToken,
    clearLoginVerifyToken,

};