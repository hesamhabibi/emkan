const typeDefs = require('./typeDefs.gql');

const getSlider = require('./query/getSlider');
const getSliders = require('./query/getSliders');
const getAllSliders = require('./query/getAllSliders');

const createSlider = require('./mutation/createSlider');
const updateSlider = require('./mutation/updateSlider');
const deleteSlider = require('./mutation/deleteSlider');
const setStatusSlider = require('./mutation/setStatusSlider');
const addSliderImage = require('./mutation/addSliderImage');
const updateSliderImage = require('./mutation/updateSliderImage');
const removeSliderImage = require('./mutation/removeSliderImage');
const sortSliderImages = require('./mutation/sortSliderImages');

const images = require('./relations/images');
const user = require('./relations/user');
const SliderImage_media = require('./relations/SliderImage/media');

const resolvers = {
    Query: {
        getSlider,
        getSliders,
        getAllSliders,
    },
    Mutation: {
        createSlider,
        updateSlider,
        deleteSlider,
        setStatusSlider,
        addSliderImage,
        updateSliderImage,
        removeSliderImage,
        sortSliderImages,
    },
    Slider: {
        images,
        user,
    },
    SliderImage: {
        media: SliderImage_media,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getSlider: access,
        getSliders: access,
        getAllSliders: access,
    },
    Mutation: {
        createSlider: access,
        updateSlider: access,
        deleteSlider: access,
        setStatusSlider: access,
        addSliderImage: access,
        updateSliderImage: access,
        removeSliderImage: access,
        sortSliderImages: access,
    },
    // Slider: {
    //     images: access,
    //     user: access,
    // },
    // SliderImage: {
    //     media: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };