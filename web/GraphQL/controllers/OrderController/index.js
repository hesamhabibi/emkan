//schema
const schema = require('./schema/index.gql');

//resolvers
const getOrderHistory = require('./resolvers/query/getOrderHistory');
const getCartDetails = require('./resolvers/query/getCartDetails');
const getOrderDetails = require('./resolvers/query/getOrderDetails');

const addToCart = require('./resolvers/mutation/addToCart');
const setCartCount = require('./resolvers/mutation/setCartCount');
const removeFromCart = require('./resolvers/mutation/removeFromCart');
const applyDiscount = require('./resolvers/mutation/applyDiscount');
const closeCart = require('./resolvers/mutation/closeCart');

//relations
const total_prices = require('./relations/total_prices');
const discount = require('./relations/discount');
const transaction = require('./relations/transaction');

const orderProduct_product = require('./relations/orderProduct/product');
const orderProduct_price = require('./relations/orderProduct/price');

const resolvers = {
    Query: {
        getOrderHistory,
        getCartDetails,
        getOrderDetails,
    },
    Mutation: {
        addToCart,
        setCartCount,
        removeFromCart,
        applyDiscount,
        closeCart,
    },
    Order: {
        total_prices,
        discount,
        transaction,
    },
    orderProduct: {
        product: orderProduct_product,
        price: orderProduct_price,
    },
};

const { rules: { auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getOrderHistory: auth,
        getOrderDetails: auth,
        getCartDetails: auth,
    },
    Mutation: {
        applyDiscount: auth,
        addToCart: auth,
        setCartCount: auth,
        removeFromCart: auth,
        closeCart: auth,
    },
};

module.exports = { schema, resolvers, permissions };