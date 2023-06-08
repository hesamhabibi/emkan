const Cookies = require('cookies');

module.exports = async (resolve, parent, args, context, info) => {
    if (parent === undefined) { // once per request
        // check token and find AuthUser
        let ReqToken;
        let AuthUser;
        try {
            const cookies = new Cookies(context.req, context.res);
            ReqToken = cookies.get('token');
            if (!ReqToken) {
                try {
                    ReqToken = await context.req.headers.token || (context.req.headers.authorization && context.req.headers.authorization.replace('Bearer ', ''));
                } catch {
                    ReqToken = null;
                }
            }
            AuthUser = await context.models.UserModel.verifyToken(context.models.UserModel, ReqToken);
            AuthUser = AuthUser.user;
        } catch {
            ReqToken = null;
            AuthUser = null;
        }

        context.ReqToken = ReqToken;
        context.AuthUser = AuthUser;

        try {
            context.is_developer = String(AuthUser.access_id) === (process.env.DEVELOPER_ACCESS_ID || ('_'));
        } catch {
            context.is_developer = false;
        }

    }

    return resolve(parent, args, context, info);
};