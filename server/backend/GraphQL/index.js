const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge');
const { shield } = require('graphql-shield');
const merge = require('lodash.merge');

// helper:
const ErrorHelper = require('./helpers/ErrorHelper');
const FileHelper = require('./helpers/FileHelper');
const MediaHelper = require('@helpers/MediaHelper');
const FilterHelper = require('@helpers/FilterHelper');
const SortHelper = require('@helpers/SortHelper');
const ValidationHelper = require('@helpers/ValidationHelper');
const TranslateHelper = require('@helpers/TranslateHelper');
const SMSHelper = require('@helpers/SMSHelper');
const DeviceHelper = require('@helpers/DeviceHelper');
const CookieHelper = require('@helpers/CookieHelper');
const SEOHelper = require('@helpers/SEOHelper');
const PriceHelper = require('@helpers/PriceHelper');
const ArrayHelper = require('@helpers/ArrayHelper');
const TagHelper = require('@helpers/TagHelper');
const EmailHelper = require('@helpers/EmailHelper');

const helpers = {
    ErrorHelper,
    FileHelper,
    MediaHelper,
    FilterHelper,
    SortHelper,
    ValidationHelper,
    TranslateHelper,
    SMSHelper,
    DeviceHelper,
    CookieHelper,
    SEOHelper,
    PriceHelper,
    ArrayHelper,
    TagHelper,
    EmailHelper,
};

// controllers:
const AccessController = require('./controllers/AccessController');
const AccessComponentController = require('./controllers/AccessComponentController');
const AccessControlListController = require('./controllers/AccessControlListController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const MenuItemController = require('./controllers/MenuItemController');
const MediaController = require('./controllers/MediaController');
const CategoryController = require('./controllers/CategoryController');
const BlogController = require('./controllers/BlogController');
const TagController = require('./controllers/TagController');
const BrandController = require('./controllers/BrandController');
const ProductController = require('./controllers/ProductController');
const AttributeController = require('./controllers/AttributeController');
const AttributeValueController = require('./controllers/AttributeValueController');
const ReportController = require('./controllers/ReportController');

const FieldTyeController = require('./controllers/FieldTypeController');
const FieldValidationController = require('./controllers/FieldValidationController');
const FormController = require('./controllers/FormController');
const FormValueController = require('./controllers/FormValueController');
const FormBuilderController = require('./controllers/FormBuilderController');
const FormValueReportController = require('./controllers/FormValueReportController');
const CRMController = require('./controllers/CRMController');
const ReminderController = require('./controllers/ReminderController');
const CalenderEventController = require('./controllers/CalenderEventController');
const BadgeController = require('./controllers/BadgeController');

const SettingController = require('./controllers/SettingController');
const AddressController = require('./controllers/AddressController');
const CommentController = require('./controllers/CommentController');
const DeputationController = require('./controllers/DeputationController');
const SliderController = require('./controllers/SliderController');
const DiscountController = require('./controllers/DiscountController');
const CollectionController = require('./controllers/CollectionController');

const OrderController = require('./controllers/OrderController');
const TransactionController = require('./controllers/TransactionController');
const ShippingMethodController = require('./controllers/ShippingMethodController');
const PaymentGatewayController = require('./controllers/PaymentGatewayController');
const TicketController = require('./controllers/TicketController');
const CareerFormController = require('./controllers/CareerFormController');

// Utils:
const UtilJSONController = require('./controllers/Utils/JSONController');

// Util typeDefs:
const SEOTypeDefs = require('./controllers/Utils/SEOTypeDefs.gql');
const PriceTypeDefs = require('./controllers/Utils/PriceTypeDefs.gql');
const UtilFilter = require('./controllers/Utils/FiltersTypeDefs.gql');
const UtilSort = require('./controllers/Utils/SortsTypeDefs.gql');
const UtilPaginate = require('./controllers/Utils/PaginateTypeDefs.gql');
const UtilResponse = require('./controllers/Utils/ResponseTypeDefs.gql');


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

// typeDefs
const typeDefs = mergeTypeDefs([
    ...directive_typeDefs,

    AccessController.typeDefs,
    AccessComponentController.typeDefs,
    AccessControlListController.typeDefs,
    UserController.typeDefs,
    AuthController.typeDefs,
    MenuItemController.typeDefs,
    MediaController.typeDefs,
    CategoryController.typeDefs,
    BlogController.typeDefs,
    TagController.typeDefs,
    BrandController.typeDefs,
    ProductController.typeDefs,
    AttributeController.typeDefs,
    AttributeValueController.typeDefs,
    ReportController.typeDefs,

    FieldTyeController.typeDefs,
    FieldValidationController.typeDefs,
    FormController.typeDefs,
    FormValueController.typeDefs,
    FormBuilderController.typeDefs,
    FormValueReportController.typeDefs,
    CRMController.typeDefs,
    ReminderController.typeDefs,
    CalenderEventController.typeDefs,
    BadgeController.typeDefs,

    SettingController.typeDefs,
    AddressController.typeDefs,
    CommentController.typeDefs,
    DeputationController.typeDefs,
    SliderController.typeDefs,
    DiscountController.typeDefs,
    CollectionController.typeDefs,
    OrderController.typeDefs,
    TransactionController.typeDefs,
    ShippingMethodController.typeDefs,
    PaymentGatewayController.typeDefs,
    TicketController.typeDefs,
    CareerFormController.typeDefs,

    UtilJSONController.typeDefs,
    SEOTypeDefs,
    PriceTypeDefs,
    UtilFilter,
    UtilSort,
    UtilPaginate,
    UtilResponse,
]);

// resolvers
const resolvers = mergeResolvers([
    AccessController.resolvers,
    AccessComponentController.resolvers,
    AccessControlListController.resolvers,
    UserController.resolvers,
    AuthController.resolvers,
    MenuItemController.resolvers,
    MediaController.resolvers,
    CategoryController.resolvers,
    BlogController.resolvers,
    TagController.resolvers,
    BrandController.resolvers,
    ProductController.resolvers,
    AttributeController.resolvers,
    AttributeValueController.resolvers,
    ReportController.resolvers,

    FieldTyeController.resolvers,
    FieldValidationController.resolvers,
    FormController.resolvers,
    FormValueController.resolvers,
    FormBuilderController.resolvers,
    FormValueReportController.resolvers,
    CRMController.resolvers,
    ReminderController.resolvers,
    CalenderEventController.resolvers,
    BadgeController.resolvers,

    SettingController.resolvers,
    AddressController.resolvers,
    CommentController.resolvers,
    DeputationController.resolvers,
    SliderController.resolvers,
    DiscountController.resolvers,
    CollectionController.resolvers,
    OrderController.resolvers,
    TransactionController.resolvers,
    ShippingMethodController.resolvers,
    PaymentGatewayController.resolvers,
    TicketController.resolvers,
    CareerFormController.resolvers,

    UtilJSONController.resolvers,
]);

// permissions:
const ShieldPermissions = shield(merge({}, ...[
    AccessController.permissions,
    AccessComponentController.permissions,
    AccessControlListController.permissions,
    UserController.permissions,
    AuthController.permissions,
    MenuItemController.permissions,
    MediaController.permissions,
    CategoryController.permissions,
    BlogController.permissions,
    TagController.permissions,
    BrandController.permissions,
    ProductController.permissions,
    AttributeController.permissions,
    AttributeValueController.permissions,
    ReportController.permissions,

    FieldTyeController.permissions,
    FieldValidationController.permissions,
    FormController.permissions,
    FormValueController.permissions,
    FormBuilderController.permissions,
    FormValueReportController.permissions,
    CRMController.permissions,
    ReminderController.permissions,
    CalenderEventController.permissions,
    BadgeController.permissions,

    SettingController.permissions,
    AddressController.permissions,
    CommentController.permissions,
    DeputationController.permissions,
    SliderController.permissions,
    DiscountController.permissions,
    CollectionController.permissions,
    OrderController.permissions,
    TransactionController.permissions,
    ShippingMethodController.permissions,
    PaymentGatewayController.permissions,
    TicketController.permissions,
    CareerFormController.permissions,
]), {
    allowExternalErrors: true,
    fallbackError: ErrorHelper.error_res_return(TranslateHelper.trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE), // default error when unexpected error ocurred
});

// global middleware:
// const AuthUserMiddleware = require('./middleware/AuthUserMiddleware');
// const RefreshTokenMiddleware = require('./middleware/RefreshTokenMiddleware');
const ExtendInfoPathMiddleware = require('./middleware/ExtendInfoPathMiddleware');
const ReportMiddleware = require('./middleware/ReportMiddleware');
// const PanelFieldAccessControlMiddleware = require('./middleware/PanelFieldAccessControlMiddleware');
const emptyStringToNullMiddleware = require('./middleware/emptyStringToNullMiddleware');

const middlewares = [
    // middlewares that change context here:
    // AuthUserMiddleware,
    // RefreshTokenMiddleware,
    ExtendInfoPathMiddleware,
    emptyStringToNullMiddleware,

    // middlewares with most priority here:
    ReportMiddleware,

    // access check and rejection middleware here:
    ShieldPermissions,
    // PanelFieldAccessControlMiddleware,

    // other middlewares here:

];

// models:
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