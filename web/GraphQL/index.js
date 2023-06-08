const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { shield } = require('graphql-shield');
const merge = require('lodash.merge');

// helper:
const ErrorHelper = require('./helpers/ErrorHelper');
const ValidationHelper = require('@helpers/ValidationHelper');
const TranslateHelper = require('@helpers/TranslateHelper');
const FilterHelper = require('@helpers/FilterHelper');
const DeviceHelper = require('@helpers/DeviceHelper');
const CookieHelper = require('@helpers/CookieHelper');
const SMSHelper = require('@helpers/SMSHelper');
// const FileHelper = require('./helpers/FileHelper');
// const MediaHelper = require('../Common/helpers/MediaHelper');
// const ArrayHelper = require('../Common/helpers/ArrayHelper');
// const TagHelper = require('../Common/helpers/TagHelper');
// const TagGroupHelper = require('../Common/helpers/TagGroupHelper');
// const EmailHelper = require('../Common/helpers/EmailHelper');

const helpers = {
    ErrorHelper,
    TranslateHelper,
    ValidationHelper,
    FilterHelper,
    DeviceHelper,
    CookieHelper,
    SMSHelper,
    // FileHelper,
    // MediaHelper,
    // ArrayHelper,
    // TagHelper,
    // TagGroupHelper,
    // EmailHelper,
};


// controllers:
const AuthController = require('./controllers/AuthController');
const BlogController = require('./controllers/BlogController');
const UserController = require('./controllers/UserController');
const CRMController = require('./controllers/CRMController');
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');
const AddressController = require('./controllers/AddressController');
const MediaController = require('./controllers/MediaController');
const CommentController = require('./controllers/CommentController');
const SliderController = require('./controllers/SliderController');
const SettingController = require('./controllers/SettingController');
const BrandController = require('./controllers/BrandController');
const OrderController = require('./controllers/OrderController');
const RateController = require('./controllers/RateController');
const OthersController = require('./controllers/OthersController');
const TicketController = require('./controllers/TicketController');
const DeputationController = require('./controllers/DeputationController');

// Util typeDefs:
const UtilFilter = require('./controllers/Utils/Filter.gql');
const UtileSort = require('./controllers/Utils/Sort.gql');
const UtilPaginate = require('./controllers/Utils/Paginate.gql');
const UtilResponse = require('./controllers/Utils/Response.gql');
const UtilSeo = require('./controllers/Utils/Seo.gql');
const UtilPrice = require('./controllers/Utils/Price.gql');

// Utils:
const UtilJSONController = require('./controllers/Utils/JSONController');

// directives:
const MultiLangDirective = require('./directives/MultiLangDirective');
const AccessFieldDirective = require('./directives/AccessFieldDirective');


// directives:
const directives = {
    multilang: MultiLangDirective.multilang,
    access: AccessFieldDirective.access,
};
const directive_typeDefs = [
    MultiLangDirective.typeDefs,
    AccessFieldDirective.typeDefs,
];

// typeDefs or schema
const typeDefs = mergeTypeDefs([
    ...directive_typeDefs,

    AuthController.schema,
    BlogController.schema,
    UserController.schema,
    CRMController.schema,
    ProductController.schema,
    BrandController.schema,
    CategoryController.schema,
    AddressController.schema,
    MediaController.schema,
    CommentController.schema,
    SliderController.schema,
    SettingController.schema,
    SettingController.schema,
    OrderController.schema,
    RateController.schema,
    OthersController.schema,
    TicketController.schema,
    DeputationController.schema,


    UtilJSONController.schema,
    UtilFilter,
    UtileSort,
    UtilPaginate,
    UtilResponse,
    UtilSeo,
    UtilPrice,

]);



// resolvers
const resolvers = mergeResolvers([

    AuthController.resolvers,
    BlogController.resolvers,
    UserController.resolvers,
    CRMController.resolvers,
    ProductController.resolvers,
    BrandController.resolvers,
    CategoryController.resolvers,
    AddressController.resolvers,
    MediaController.resolvers,
    CommentController.resolvers,
    SliderController.resolvers,
    SettingController.resolvers,
    OrderController.resolvers,
    RateController.resolvers,
    OthersController.resolvers,
    TicketController.resolvers,
    DeputationController.resolvers,

    UtilJSONController.resolvers,
]);


// permissions:
const permissions = [
    AddressController.permissions,
    AuthController.permissions,
    BlogController.permissions,
    BrandController.permissions,
    CategoryController.permissions,
    CommentController.permissions,
    CRMController.permissions,
    OrderController.permissions,
    OthersController.permissions,
    TicketController.permissions,
    DeputationController.permissions,
    ProductController.permissions,
    RateController.permissions,
];
const ShieldPermissions = shield(merge({}, ...permissions), {
    allowExternalErrors: true,
    fallbackError: ErrorHelper.error_res_return(TranslateHelper.trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE), // default error when unexpected error ocurred
});


// global middleware:
const emptyStringToNullMiddleware = require('./middleware/emptyStringToNullMiddleware');
const ReportMiddleware = require('./middleware/ReportMiddleware');
const ExtendInfoPathMiddleware = require('./middleware/ExtendInfoPathMiddleware');

const middlewares = [
    // middlewares that change context here:
    emptyStringToNullMiddleware,

    // middlewares with most priority here:
    ReportMiddleware,
    ExtendInfoPathMiddleware, // extend path for access directive

    // access check and rejection middleware here:
    ShieldPermissions,

    // other middlewares here:
];


// models
const models = require('@models');

// initialize
const initialize = require('./initialize');

module.exports = {
    helpers,
    typeDefs,
    resolvers,
    middlewares,
    directives,
    models,
    initialize,
};