const CookieHelper = require('@helpers/CookieHelper');
const models = require('@models');

module.exports = async (req, res, next) => {
    // refresh token
    let new_token;
    try {
        new_token = await models.UserModel.refreshToken(models.UserModel, req.ReqToken);
    } catch (e) {
        console.log('RefreshTokenMiddleware.js:', e);
    }

    res.setHeader('new_token', new_token);

    req.new_token = new_token;
    await CookieHelper.set_token(req, res, new_token);
    // console.log('token refreshed')
    return next();
};