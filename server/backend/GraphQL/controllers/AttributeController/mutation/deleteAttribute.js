module.exports = async (parent, args, { models: { AttributeModel, ProductModel }, error_res, trans }) => {
    // find attribute
    let attribute;
    try {
        attribute = await AttributeModel.findById(args.id);
    } catch (e) {
        attribute = null;
    }
    // check attribute exists
    if (!attribute)
        error_res(trans('not_found', { attr: "attribute" }));

    // find related products
    const products = await ProductModel.find({
        "$or": [
            { 'attribute_groups.attribute_group_id': attribute._id },
            { 'attribute_groups.attributes.attribute_id': attribute._id },
        ]
    });

    // delete attribute from products
    const target_attribute_id = attribute._id;
    if (Array.isArray(products)) {
        products.reduce(async (products, product) => {
            const { attribute_groups } = product;
            if (Array.isArray(attribute_groups)) {
                const new_attribute_groups = attribute_groups.reduce((attribute_groups, attribute_group) => {
                    if (String(attribute_groups.attribute_id) !== target_attribute_id) {
                        const { attributes } = attribute_group;
                        if (Array.isArray(attributes)) {
                            const new_attributes = attributes.reduce((attributes, attribute) => {
                                if (String(attribute.attribute_id) !== target_attribute_id) {
                                    return attributes.push(attribute);
                                }
                                return attributes;
                            });
                            attribute_group.attributes = new_attributes;
                        }
                        return attribute_groups.push(attribute_group);
                    }
                    return attribute_groups;
                });
                await ProductModel.updateOne({ _id: product._id }, { attribute_groups: new_attribute_groups });
            }
            return (await products).push(product);
        }, Promise.resolve([]));
    }


    // delete children attributes
    const attribute_group_id_to_deletes = [];
    if (attribute.deep == AttributeModel.deeps.attribute_variant) {
        const child_attribute_groups = await AttributeModel.find({ parent_id: attribute._id });
        for (let i in child_attribute_groups)
            attribute_group_id_to_deletes.push(child_attribute_groups[i]._id);
    }
    if (attribute.deep == AttributeModel.deeps.attribute_group)
        attribute_group_id_to_deletes.push(attribute._id);

    await AttributeModel.deleteMany({ // delete child attributes
        parent_id: {
            $in: attribute_group_id_to_deletes,
        }
    });

    await AttributeModel.deleteMany({ // delete attribute groups
        _id: {
            $in: attribute_group_id_to_deletes,
        }
    });

    // delete attribute it self
    await attribute.delete();
    return { success: true, message: trans('done') };
};