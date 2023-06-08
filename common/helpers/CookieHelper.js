const Cookies = require('cookies');

const set_token = async (req, res, token) => {
    const cookies = new Cookies(req, res);
    await cookies.set('token', token, {
        httpOnly: false,
        maxAge: parseInt(process.env.COOKIE_EXPIRE_IN, 10) || 2592000000
    });
};

module.exports = {
    set_token,
};