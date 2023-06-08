const typeDefs = require('./typeDefs.gql');

const getUser = require('./query/getUser');
const getUsers = require('./query/getUsers');
const getAllUsers = require('./query/getAllUsers');

const createUser = require('./mutation/createUser');
const updateUser = require('./mutation/updateUser');
const deleteUser = require('./mutation/deleteUser');
const updateUserInformation = require('./mutation/updateUserInformation');
const changePasswordUser = require('./mutation/changePasswordUser');

const rel_access = require('./relations/access');
const accessControlLists = require('./relations/accessControlLists');
const blogs = require('./relations/blogs');
const products = require('./relations/products');
const brands = require('./relations/brands');
const categories = require('./relations/categories');
const medias = require('./relations/medias');

const user_information = require('./relations/user_information');
const ui_media = require('./relations/user_information/media');
const ui_addresses = require('./relations/user_information/addresses');

const resolvers = {
    Query: {
        getUser,
        getUsers,
        getAllUsers,
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser,
        updateUserInformation,
        changePasswordUser,
    },
    User: {
        access: rel_access,
        accessControlLists,
        blogs,
        products,
        brands,
        categories,
        medias,
        user_information,
    },
    UserInformation: {
        media: ui_media,
        addresses: ui_addresses,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getUser: access,
        getUsers: access,
        getAllUsers: access,
    },
    Mutation: {
        createUser: access,
        updateUser: access,
        deleteUser: access,
        updateUserInformation: access,
        changePasswordUser: access,
    },
    User: {
        // eslint-disable-next-line object-shorthand
        access: access,
        accessControlLists: access,
        blogs: access,
        products: access,
        brands: access,
        categories: access,
        medias: access,
    },
    // UserInformation: {
    //     media: access,
    //     addresses: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };