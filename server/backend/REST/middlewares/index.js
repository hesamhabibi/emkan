const DBConnectMiddleware = require('./DBConnectMiddleware');
const TranslateMiddleware = require('./TranslateMiddleware');
const AuthMiddleware = require('./AuthMiddleware');
const RefreshTokenMiddleware = require('./RefreshTokenMiddleware');
const ReportMiddleware = require('./ReportMiddleware');
const ErrorHandlerMiddleware = require('./ErrorHandlerMiddleware');

module.exports = {
    // register before middleware s here:
    global_before_middlewares: [
        DBConnectMiddleware,
        TranslateMiddleware,
        // AuthMiddleware,
        // RefreshTokenMiddleware,
    ],
    // register after middleware s here:
    global_after_middleware: [
        ReportMiddleware,
        ErrorHandlerMiddleware, // error handler !!!this middleware MUST be always last middleware!!!
    ],

    DBConnectMiddleware,
    TranslateMiddleware,
    AuthMiddleware,
    RefreshTokenMiddleware,
    ReportMiddleware,
    ErrorHandlerMiddleware,
};