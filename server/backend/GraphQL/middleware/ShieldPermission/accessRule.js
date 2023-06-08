const { rule } = require('graphql-shield');
const checkRouteAccess = require('./helpers/checkRouteAccess');
const checkRelationAccess = require('./helpers/checkRelationAccess');

// description: check if user logged in and has access to this query or relation field

module.exports = rule({ cache: false })( // todo: maybe work with catch: 'strict'
    async (parent, args, context, info) => {

        if (!context.AuthUser) {
            return context.helpers.ErrorHelper.error_res_return(context.trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);
        }
        // TODO: deactive ACL
        return true;

        if (context.is_developer)
            return true;

        if (!parent) { // if parent is undefined access is type of query
            return checkRouteAccess(parent, args, context, info);
        }
        // else if parent has value then access is type of relation
        return checkRelationAccess(parent, args, context, info);

    },
);
