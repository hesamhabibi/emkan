const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statics = require('./statics');

const genders = {
    'male': 1,
    'female': 2,
    'unknown': 3,
};

const token_fields = {
    desktop: 'desktop_token',
    mobile: 'mobile_token',
    desktop_web: 'desktop_web_token',
    mobile_web: 'mobile_web_token',

    default: 'desktop_token',
};

const push_notification_drivers = {
    google: 'google',
}

const schema = new Schema(
    {
        name: String,
        last_name: String,
        username: String,
        email: String,
        mobile: String,
        password: String,
        is_active: Boolean,

        tokens: Object,
        push_notifications: [
            {
                driver: String, // ex: google , pusher , pushe
                key: String, // driver keys
            },
        ],
        access_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessModel',
        },
        user_information: {
            media: {
                media_id: {
                    type: Schema.Types.ObjectId,
                    ref: "MediaModel"
                },
                alt: String,
                url: String,
            },
            address_ids: [{
                type: Schema.Types.ObjectId,
                ref: "AddressModel"
            }],
            phone: String,
            gender: Number,
        }
    },
    { collection: 'users', timestamps: true }
);

schema.virtual('full_name').get(function () { return `${this.name ? `${this.name} ` : null || ''}${this.last_name || ''}`; });

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

schema.statics.genders = genders;
schema.statics.token_fields = token_fields;
schema.statics.push_notification_drivers = push_notification_drivers;

schema.statics.generateToken = statics.generateToken;
schema.statics.verifyToken = statics.verifyToken;
schema.statics.clearToken = statics.clearToken;
schema.statics.refreshToken = statics.refreshToken;
schema.statics.generateResetPasswordToken = statics.generateResetPasswordToken;
schema.statics.checkResetPasswordToken = statics.checkResetPasswordToken;
schema.statics.clearResetPasswordToken = statics.clearResetPasswordToken;
schema.statics.clearLoginVerifyToken = statics.clearLoginVerifyToken;
schema.statics.generateLoginVerifyToken = statics.generateLoginVerifyToken;
schema.statics.checkLoginVerifyToken = statics.checkLoginVerifyToken;

const UserModel =
    mongoose.models.UserModel || mongoose.model('UserModel', schema);

module.exports = {
    genders,
    token_fields,
    push_notification_drivers,
    UserModel
};