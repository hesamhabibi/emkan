const mongoose = require('mongoose');
const parsed_value = function () {
    const formats = mongoose.models.SettingModel.formats;
    const format = this.format;
    switch (format) {
        case formats.object: // object
            return this.value;
        case formats.array: // array
            return this.value;
        case formats.string: // string
            return this.value;
        case formats.integer: // integer
            return this.value;
        case formats.bool: // bool
            return this.value;
        case formats.float: // float
            return this.value;
        case formats.media: // media
            return this.value;
        default: // default
            return this.value;
    }
};

module.exports = parsed_value;