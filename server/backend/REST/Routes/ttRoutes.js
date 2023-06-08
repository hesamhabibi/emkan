const router = require("express").Router();
const multer = require("multer");

// const soap = require('soap');
const moment = require("moment");

const ResponseHelper = require("../helpers/ResponseHelper");
const upload = multer();

// const { OrderModel } = require("@models");

const create_transaction = require("@helpers/PaymentHelper/Melat/create_transaction");
const verify_callback = require("@helpers/PaymentHelper/Melat/verify_callback");

// const AuthMiddleware = require('../middlewares/AuthMiddleware');

var params = {
  terminalId: "1817",
  userName: "user1817",
  userPassword: "60855214",
  orderId: moment().format("YMMDDHHmmSS"),
  amount: "10000",
  localDate: moment().format("YYMMDD"),
  localTime: moment().format("HHmmSS"),
  additionalData: "",
  callBackUrl: "http://localhost:3001/api/ttcallback",
  user_id: null,
  payerId: "0",
};

router.use("/tt", upload.none());
// router.use('/tt', AuthMiddleware);
router.get("/tt", async (req, res) => {
  // const order = await OrderModel.findOne({});

  // const prices = await order.calculate_sum();

  await OrderModel.create({
    products: [
      {
        product_id: "612ba9aa31b05394714835f8",
        mix_variant_keys: ["1-1"],
        count: 2,
      },
      {
        product_id: "612ba9aa31b05394714835f8",
        mix_variant_keys: ["1-2"],
        count: 1,
      },
    ],
  });

  console.log("here");

  // const result = await create_transaction({ terminalId: params.terminalId, userName: params.userName, userPassword: params.userPassword, sandBox: true }, { orderId: null, amount: params.amount, callBackUrl: params.callBackUrl, user_id: params.user_id, description: params.description, payerId: params.payerId });

  console.log("there");

  // const client = await soap.createClientAsync('https://banktest.ir/gateway/mellat/ws?wsdl');
  // var params = {
  //     terminalId: '1817',
  //     userName: 'user1817',
  //     userPassword: '60855214',
  //     orderId: moment().format('YMMDDHHmmSS'),
  //     amount: '10000',
  //     localDate: moment().format('YYMMDD'),
  //     localTime: moment().format('HHmmSS'),
  //     additionalData: '',
  //     callBackUrl: '/test',
  //     payerId: '0'
  // };
  // const result = await client.bpPayRequestAsync(params);

  // let return_data = typeof (result[0].return) === 'string' ? result[0].return : '';
  // return_data = return_data.split(',');
  // if (return_data[0] == '0') {
  //     return ResponseHelper.api_res_data(res, return_data[1]);
  // }

  return ResponseHelper.api_res_data(res, "result");
});

const body_function = async (req, res) => {
  // console.log(req);

  const result = await verify_callback(
    {
      terminalId: params.terminalId,
      userName: params.userName,
      userPassword: params.userPassword,
      sandBox: true,
    },
    req.body
  );

  return ResponseHelper.api_res_data(res, {
    message: "welcome back!",
    body: req.body || null,
    query: req.query,
    result,
  });
};

const bodyParser = require("body-parser");
const { OrderModel } = require("../../../../common/models/OrderModel");

const upload2 = multer();

router.use("/ttcallback", upload2.none());
router.use("/ttcallback", bodyParser.urlencoded({ extended: false }));
// router.get('/ttcallback', body_function);
router.post("/ttcallback", body_function);

module.exports = router;
