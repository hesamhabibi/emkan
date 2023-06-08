const Cookies = require('cookies');
const { UserModel } = require('@models');
const ResponseHelper = require('../helpers/ResponseHelper');
const { trans } = require('@helpers/TranslateHelper');

module.exports = async (req, res, next) => {
    // check token and find AuthUser
    let ReqToken;
    let AuthUser;
    try {
        const cookies = new Cookies(req, res);
        ReqToken = cookies.get('token');
        if (!ReqToken) {
            try {
                ReqToken = await req.headers.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
            } catch {
                ReqToken = null;
            }
        }
        if (!ReqToken)
            ReqToken = req.body?.token;
        AuthUser = await UserModel.verifyToken(UserModel, ReqToken);
        AuthUser = AuthUser.user;
    } catch {
        ReqToken = null;
        AuthUser = null;
    }

    req.ReqToken = ReqToken;
    req.AuthUser = AuthUser;

    try {
        req.is_developer = String(AuthUser.access_id) === (process.env.DEVELOPER_ACCESS_ID || ('_'));
    } catch {
        req.is_developer = false;
    }

    if (!AuthUser) {
        next(ResponseHelper.error_res_return(trans('authenticate_error'), null, process.env.ERROR_CODE_AUTHENTICATE));
    }

    return next();
};