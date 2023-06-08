const mongoose = require('mongoose');

module.exports = async () => {
    return await mongoose.connection.close();
};