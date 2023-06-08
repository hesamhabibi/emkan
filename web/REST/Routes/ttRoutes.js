const router = require('express').Router();
const multer = require('multer');

// const soap = require('soap');
const moment = require('moment');

const ResponseHelper = require('../helpers/ResponseHelper');
const upload = multer();

// const { OrderModel } = require("@models");

const create_transaction = require('@helpers/PaymentHelper/Melat/create_transaction');
const verify_callback = require('@helpers/PaymentHelper/Melat/verify_callback');

// const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.use('/tt', upload.any());
// router.use('/tt', AuthMiddleware);
router.post('/tt', async (req, res) => {
    console.log(req.files);
    return ResponseHelper.api_res_data(res, req.body);
});

module.exports = router;
