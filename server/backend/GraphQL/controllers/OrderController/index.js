const typeDefs = require('./typeDefs.gql');

const getOrder = require('./query/getOrder');
const getOrders = require('./query/getOrders');
const getAllOrders = require('./query/getAllOrders');

const setPostTrackCodeOrder = require('./mutation/setPostTrackCodeOrder');
const setStatusOrder = require('./mutation/setStatusOrder');
const sendCommentOrder = require('./mutation/sendCommentOrder');

const address = require('./relations/address');
const discount = require('./relations/discount');
const transaction = require('./relations/transaction');
const all_transactions = require('./relations/all_transactions');
const user = require('./relations/user');
const total_prices = require('./relations/total_prices');
const payment_gateway = require('./relations/payment_gateway');
const shipping_method = require('./relations/shipping_method');
const OrderProduct_product = require('./relations/OrderProduct/product');
const OrderProduct_price = require('./relations/OrderProduct/price');

const resolvers = {
    Query: {
        getOrder,
        getOrders,
        getAllOrders,
    },
    Mutation: {
        setPostTrackCodeOrder,
        setStatusOrder,
        sendCommentOrder,
    },
    Order: {
        address,
        discount,
        transaction,
        all_transactions,
        user,
        total_prices,
        payment_gateway,
        shipping_method,
    },
    OrderProduct: {
        product: OrderProduct_product,
        price: OrderProduct_price,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getOrder: access,
        getOrders: access,
        getAllOrders: access,
    },
    Mutation: {
        setPostTrackCodeOrder: access,
        setStatusOrder: access,
        sendCommentOrder: access,
    },
    // Order: {
    //     address: access,
    //     discount: access,
    //     transaction: access,
    //     all_transactions: access,
    //     user: access,
    //     total_prices: access,
    //     payment_gateway: access,
    //     shipping_method: access,
    // },
    // OrderProduct: {
    //     product: access,
    //     price: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };