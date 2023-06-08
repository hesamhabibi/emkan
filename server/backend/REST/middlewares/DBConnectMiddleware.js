const mongoose = require('mongoose');
const { trans } = require('@helpers/TranslateHelper');

module.exports = async (req, res, next) => {
    // connect to database
    let db;
    try {
        if (!mongoose.connection.readyState) {
            db = await mongoose.connect(process.env.MONGO_DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                serverSelectionTimeoutMS: parseInt(process.env.MONGO_DB_CONNECTION_TIMEOUT),
            });
        }
    } catch (e) {
        const err = Error(trans("database_connection_failed"));
        throw err;
    }

    if (!mongoose.connection.readyState) {
        const err = Error('database connection failed');
        throw err;
    }
    req.db = db;
    next();

};