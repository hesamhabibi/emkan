const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const Validatorjs = require('validatorjs');

const { makeExecutableSchema } = require('graphql-tools');

const { applyMiddleware } = require('graphql-middleware');
const { typeDefs, resolvers, middlewares, directives, models, helpers, initialize } = require('./GraphQL');

const DeveloperHelper = require('@helpers/DeveloperHelper');
const { get_setting, static_keys } = require('@helpers/SettingHelper');

const config = async (app, path = '/api/graphql') => {

    const schema = applyMiddleware(makeExecutableSchema({
        typeDefs, resolvers, directiveResolvers: directives,
    }), ...middlewares);

    // initialize server
    // const connection = {};
    if (initialize)
        initialize();

    const config = {
        schema,
        formatError: helpers.ErrorHelper.formatError,
        formatResponse: (response, requestContext) => {
            try {
                if (requestContext.context.new_token && requestContext.response && requestContext.response.http) {
                    requestContext.response.http.headers.set('new_token', requestContext.context.new_token);
                }
            } catch (e) {
                console.log('formatResponse:', e);
            }
            return response;
        },
        context: async ({ req, res }) => {
            // connect to database
            try {
                if (!mongoose.connection.readyState) {
                    await mongoose.connect(process.env.MONGO_DB_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        serverSelectionTimeoutMS: parseInt(process.env.MONGO_DB_CONNECTION_TIMEOUT),
                    });
                }
            } catch (e) {
                console.log('database connection failed');
                helpers.ErrorHelper.error_res('database connection failed');
            }

            // get cookies
            const cookies = new Cookies(req, res);

            // set local:
            let setting_panel_local;
            try {
                setting_panel_local = (await get_setting(static_keys.panel_default_language)).value.code;
            } catch {
                setting_panel_local = null;
            }
            let setting_web_local;
            try {
                setting_web_local = (await get_setting(static_keys.web_default_language)).value.code;
            } catch {
                setting_web_local = null;
            }
            const panel_local = await cookies.get('panel_lang') || req.headers.panel_lang || req.headers.panel_local || req.headers.local || setting_panel_local || process.env.APP_LOCAL || 'fa';
            const web_local = await cookies.get('web_lang') || req.headers.web_lang || req.headers.web_local || req.headers.local || setting_web_local || process.env.APP_LOCAL || 'fa';

            Validatorjs.useLang(web_local);
            helpers.TranslateHelper.set_local(web_local);
            Validatorjs.setAttributeFormatter((attribute) => {
                return helpers.TranslateHelper.trans(helpers.TranslateHelper.attr_formatter(attribute));
            });

            // check token and find AuthUser
            let ReqToken;
            let AuthUser;
            try {
                ReqToken = await cookies.get('token');
                if (!ReqToken) {
                    try {
                        ReqToken = await req.headers.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
                    } catch {
                        ReqToken = null;
                    }
                }
                AuthUser = await models.UserModel.verifyToken(models.UserModel, ReqToken, false);
                AuthUser = AuthUser.user;
            } catch {
                ReqToken = null;
                AuthUser = null;
            }

            let is_developer;
            try {
                is_developer = DeveloperHelper.is_developer(AuthUser.access_id);
            } catch {
                is_developer = false;
            }

            // context content: 
            return {
                models,
                helpers,

                req,
                res,

                panel_local,
                web_local,

                ReqToken,
                AuthUser,
                is_developer,

                trans: helpers.TranslateHelper.trans, // for quick access
                error_res: helpers.ErrorHelper.error_res, // for quick access
            };
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({}),
        ]
    };
    const server = new ApolloServer(config);
    await server.start();
    server.applyMiddleware({ app, path });
    return server;
};

module.exports = {
    config
};