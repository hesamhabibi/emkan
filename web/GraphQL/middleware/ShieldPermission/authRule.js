const { rule } = require('graphql-shield');
// description: check user logged in

module.exports = rule({ cache: 'contextual' })(
    async (parent, args, { helpers: { ErrorHelper: { error_res_return } }, AuthUser, trans }) => {
        try {
            if (AuthUser.id != null)
                return true;
        } catch {
            return error_res_return(trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);
        }
        return error_res_return(trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);
    },
);
