const { UserModel } = require('./UserModel');
const { AccessComponentModel } = require("./AccessComponentModel");
const { AccessControlListModel } = require("./AccessControlListModel");
const { AccessModel } = require("./AccessModel");
const { MenuItemModel } = require("./MenuItemModel");
const { MediaModel } = require("./MediaModel");
const { CategoryModel } = require("./CategoryModel");
const { SEOModel } = require('./SEOModel');
const { BlogModel } = require('./BlogModel');
const { TagModel } = require('./TagModel');
const { BrandModel } = require('./BrandModel');
const { PriceModel } = require('./PriceModel');
const { ProductModel } = require('./ProductModel');
const { AttributeModel } = require('./AttributeModel');
const { AttributeValueModel } = require('./AttributeValueModel');
const { ReportModel } = require('./ReportModel');

const { FieldTypeModel } = require('./FieldTypeModel');
const { FieldValidationModel } = require('./FieldValidationModel');
const { FormModel } = require('./FormModel');
const { FormValueModel } = require('./FormValueModel');

const { CRMModel } = require('./CRMModel');
const { TaskModel } = require('./TaskModel');
const { ReminderModel } = require('./ReminderModel');
const { SettingModel } = require('./SettingModel');

const { AddressModel } = require('./AddressModel');
const { CommentModel } = require('./CommentModel');
const { DeputationModel } = require('./DeputationModel');
const { SliderModel } = require('./SliderModel');
const { DiscountModel } = require('./DiscountModel');
const { CollectionModel } = require('./CollectionModel');

const { OrderModel } = require('./OrderModel');
const { TransactionModel } = require('./TransactionModel');
const { ShippingMethodModel } = require('./ShippingMethodModel');
const { RateModel } = require('./RateModel');
const { TicketModel } = require('./TicketModel');
const { CareerFormModel } = require('./CareerFormModel');

const models = {
    UserModel,
    AccessComponentModel,
    AccessControlListModel,
    AccessModel,
    MenuItemModel,
    MediaModel,
    CategoryModel,
    SEOModel,
    BlogModel,
    TagModel,
    BrandModel,
    PriceModel,
    ProductModel,
    AttributeModel,
    AttributeValueModel,
    ReportModel,

    FieldTypeModel,
    FieldValidationModel,
    FormModel,
    FormValueModel,

    CRMModel,
    TaskModel,
    ReminderModel,
    SettingModel,

    AddressModel,
    CommentModel,
    DeputationModel,
    SliderModel,
    DiscountModel,
    CollectionModel,

    OrderModel,
    TransactionModel,
    ShippingMethodModel,
    RateModel,
    TicketModel,
    CareerFormModel,
};

module.exports = models;
