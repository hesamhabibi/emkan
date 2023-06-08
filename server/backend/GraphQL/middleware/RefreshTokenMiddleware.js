module.exports = async (resolve, parent, args, context, info) => {
    if (parent === undefined) { // once per request
        // refresh token
        let new_token;
        try {
            new_token = await context.models.UserModel.refreshToken(context.models.UserModel, context.ReqToken);
            if (new_token)
                console.log('token refreshed in path:', info.fieldName);
        } catch (e) {
            console.log('RefreshTokenMiddleware.js:', e);
        }

        context.new_token = new_token;
        await context.helpers.CookieHelper.set_token(context.req, context.res, new_token);
    }

    return resolve(parent, args, context, info);
};