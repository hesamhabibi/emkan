const { ObjectId } = require('mongoose').Types;

module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        const products_tutorials = await ProductModel.aggregate([
            {
                $match: {
                    "tutorials.user_access": ObjectId(parent._id)
                }
            },
            {
                $unwind: {
                    path: "$tutorials"
                }
            },
            {
                $match: {
                    "tutorials.user_access": ObjectId(parent._id)
                }
            }
        ]);

        const tutorials = [];
        for (let i in (products_tutorials || [])) {
            tutorials.push(
                {
                    ...products_tutorials[i].tutorials,
                    product: products_tutorials[i]
                }
            );
        }

        return tutorials;
    } catch (e) {
        return null;
    }
};