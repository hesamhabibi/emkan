const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { ProductModel, BrandModel, MediaModel, AttributeModel, AttributeValueModel, CollectionModel, CategoryModel }, helpers: { ValidationHelper, SEOHelper, PriceHelper, MediaHelper: { attachMedia, prepareMediaGallery } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'summary', 'description', 'strengths', 'weaknesses', 'main_features', 'status', 'publishAt', 'has_rating', 'has_comment', 'is_special', 'only_description', 'show_price', 'type', 'category_id', 'brand_id', 'media_gallery', 'video', 'files', 'tag_ids', 'tag_group_id', 'seo', 'attribute_variant_id', 'attribute_groups', 'has_variant', 'details', 'price', 'variant', 'mix_variant', 'collections', 'services', 'tutorials']).all();
    try { input.collections = collect(input.services).only(['api_config']).all(); } catch { /* empty */ }
    try { input.collections = collect(input.services.api_config).only(['type', 'app_key', 'url', 'mutation']).all(); } catch { /* empty */ }
    try { input.collections = collect(input.collections).only(['related_products']).all(); } catch { /* empty */ }
    try { input.collections.related_products = collect(input.collections.related_products).only(['collection_title', 'collection_type', 'collection_id', 'collection_list']).all(); } catch { /* empty */ }
    try { input.collections.related_products.collection_list = collect(input.collections.related_products.collection_list).only(['product_id', 'has_variant_key', 'mix_variant_keys']).all(); } catch { /* empty */ }
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: await multilang_rules(['string'], 'web', ['required', 'string']),
        summary: await multilang_rules(['string']),
        description: await multilang_rules(['string']),
        'strengths.*': await multilang_rules(['string']),
        'weaknesses.*': await multilang_rules(['string']),
        'main_features.*': await multilang_rules(['string']),
        status: ['required', { in: Object.values(ProductModel.statuses) }],
        publishAt: ['timestamp'],
        has_rating: ['required', 'boolean'],
        has_comment: ['required', 'boolean'],
        is_special: ['required', 'boolean'],
        only_description: ['required', 'boolean'],
        show_price: ['boolean'],
        type: ['required', { in: Object.values(ProductModel.types) }],
        category_id: [`exists:CategoryModel,_id,{"type":${CategoryModel.types.product}}`],
        brand_id: [{ 'exists': { model: BrandModel, field: '_id' } }],
        'media_gallery.*': {
            media_id: ['exists:MediaModel,_id'],
            sort: 'integer',
            alt: ['string'],
            url: 'string',
        },
        video: {
            media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
            alt: ['string'],
            url: 'string',
        },
        'files.*': {
            media_id: ['exists:MediaModel,_id'],
            alt: ['string'],
            url: 'string',
        },
        'tag_ids.*': ['exists:TagModel,_id'],
        tag_group_id: ['exists:TagModel,_id'],
        // seo: ['required'],
        attribute_variant_id: `exists:AttributeModel,_id,{"deep":${AttributeModel.deeps.attribute_variant}}`,
        'attribute_groups.*': {
            attribute_group_id: ['required', /* `exists:AttributeModel,_id,{"deep":${AttributeModel.deeps.attribute_group}}` */],
            'attributes.*': {
                attribute_id: ['required', /* `exists:AttributeModel,_id,{"deep":${AttributeModel.deeps.attribute}}` */],
                // value: ['required'],
            },
        },
        has_variant: ['required', 'boolean'],
        details: {
            product_code: 'string',
            warehouse: 'string',
            use_count: 'boolean',
            count: 'integer',
            count_status: 'integer',
            count_unit: 'integer',
            limit_min: 'integer',
            limit_max: 'integer',
            length: 'integer',
            width: 'integer',
            height: 'integer',
            weight: 'integer',
        },
        // price: PriceHelper.validation_rules,
        'variant.*': input.has_variant ? {
            name: await multilang_rules(['string'], 'web', ['required', 'string']),
            type: ['required', `in:${Object.values(ProductModel.variant_types).join(',')}`],
            'labels.*': {
                key: ['required', 'string'],
                title: await multilang_rules(['string'], 'web', ['required', 'string']),
                // values: '',
            },
        } : {},
        'mix_variant.*': input.has_variant ? {
            keys: ['required', 'array'],
            is_main_price: 'boolean',
            is_active: 'boolean',
            sort: 'integer',
            details: {
                product_code: 'string',
                warehouse: 'string',
                use_count: 'boolean',
                count: 'integer',
                count_status: 'integer',
                count_unit: 'integer',
                limit_min: 'integer',
                limit_max: 'integer',
                length: 'integer',
                width: 'integer',
                height: 'integer',
                weight: 'integer',
            },
            // price: (input.type != ProductModel.types.product) ? { ...PriceHelper.validation_rules, price: ['integer'] } : PriceHelper.validation_rules,
            price: { ...PriceHelper.validation_rules, price: ['integer'] },
            has_media_gallery: ['boolean'],
            'media_gallery.*': {
                media_id: ['exists:MediaModel,_id'],
                sort: 'integer',
                alt: ['string'],
                url: 'string',
            },
        } : {},
        collections: {
            related_products: {
                collection_title: await multilang_rules('string'),
                collection_type: [{ in: Object.values(CollectionModel.types) }],
                collection_id: 'exists:CollectionModel,_id', // todo: validate collection source
                'collection_list.*': {
                    product_id: 'exists:ProductModel,_id',
                    has_variant_key: 'boolean',
                    'mix_variant_keys.*': 'string',
                },
            },
        },
        services: {
            api_config: {
                type: [`required_if:type,${ProductModel.types.service}`, 'integer', `in:${Object.values(ProductModel.services_api_config_types).join(',')}`],
                app_key: [`required_if:type,${ProductModel.types.service}`, 'string'],
                url: [`required_if:type,${ProductModel.types.service}`, 'string'],
                mutation: ['string'],
            }
        },
        'tutorials.*': {
            file_key: ['required', 'string'],
            title: await multilang_rules(['string']),
            'user_access_ids.*': 'exists:UserModel,_id'
        },
    };

    if (!input.has_variant) {
        if (input.type == ProductModel.types.product)
            rules.price = PriceHelper.validation_rules;
    }

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input.seo, { generate_url: input.title, model_name: ProductModel.modelName });

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.summary = await multilang_remove_extra_fields(input.summary);
    input.description = await multilang_remove_extra_fields(input.description);
    if (Array.isArray(input.strengths))
        for (let i = 0; i < input.strengths.length; i += 1)
            input.strengths[i] = await multilang_remove_extra_fields(input.strengths[i]);
    if (Array.isArray(input.weaknesses))
        for (let i = 0; i < input.weaknesses.length; i += 1)
            input.weaknesses[i] = await multilang_remove_extra_fields(input.weaknesses[i]);
    if (Array.isArray(input.main_features))
        for (let i = 0; i < input.main_features.length; i += 1)
            input.main_features[i] = await multilang_remove_extra_fields(input.main_features[i]);
    if (Array.isArray(input.variant))
        for (let i = 0; i < input.variant.length; i += 1) {
            input.variant[i].name = await multilang_remove_extra_fields(input.variant[i].name);
            if (Array.isArray(input.variant[i].labels))
                for (let j = 0; j < input.variant[i].labels.length; j += 1)
                    input.variant[i].labels[j].title = await multilang_remove_extra_fields(input.variant[i].labels[j].title);
        }

    if (Array.isArray(input.tutorials))
        for (let i = 0; i < input.tutorials.length; i += 1)
            input.tutorials[i].title = await multilang_remove_extra_fields(input.tutorials[i].title);

    // add default value for publishAt
    if (!input.publishAt) {
        input.publishAt = Date.now();
    }

    // prepare media_gallery
    const result = await prepareMediaGallery(input.media_gallery);
    input.media_gallery = result.media_gallery;
    input.media = result.main_media;

    // prepare attribute group info
    const attribute_value_ids = []; // save attribute_value_ids to update product_id field of them after product created
    const attribute_groups = [];
    if (Array.isArray(input.attribute_groups)) {
        for (let i = 0; i < input.attribute_groups.length; i += 1) {
            try {
                const group = input.attribute_groups[i];
                const group_attributes = [];
                for (let j = 0; j < group.attributes?.length; j += 1) {
                    const attribute = await AttributeModel.findById(group.attributes[j].attribute_id);
                    const attribute_value = await AttributeValueModel.create({
                        attribute_id: attribute._id,
                        product_id: null, // will fill after that product created
                        value: group.attributes[j].value,
                        user_id: AuthUser._id,
                    });
                    attribute_value_ids.push(attribute_value._id);
                    group_attributes.push({
                        attribute_id: attribute._id,
                        attribute_value_id: attribute_value._id,
                    });
                }
                const attribute_group = await AttributeModel.findById(group.attribute_group_id);
                if (attribute_group) {
                    attribute_groups.push({
                        attribute_group_id: attribute_group._id,
                        attributes: group_attributes,
                    });
                }
            } catch { /* empty */ }
        }
    }

    // set attribute_groups
    input.attribute_groups = attribute_groups;

    let variant = [];
    let mix_variant = [];
    // prepare variant
    if (input.has_variant) {
        if (Array.isArray(input.variant)) {
            for (let i = 0; i < input.variant.length; i += 1) {
                const labels = [];
                for (let j = 0; j < input.variant[i].labels.length; j += 1) {
                    labels.push({
                        key: input.variant[i].labels[j].key,
                        title: input.variant[i].labels[j].title,
                        values: input.variant[i].labels[j].values,
                    });
                }
                variant.push({
                    name: input.variant[i].name,
                    type: input.variant[i].type,
                    labels
                });
            }
        }
        let is_main_price_set = false;
        // prepare mix variant
        if (Array.isArray(input.variant) && Array.isArray(input.mix_variant)) {
            for (let i = 0; i < input.mix_variant.length; i += 1) {
                const keys = [];
                for (let j = 0; j < input.mix_variant[i].keys.length; j += 1) {
                    keys.push(input.mix_variant[i].keys[j]);
                }
                const temp_mix_variant = {
                    has_media_gallery: input.mix_variant[i].has_media_gallery,
                    is_main_price: input.mix_variant[i].is_main_price,
                    is_active: input.mix_variant[i].is_active,
                    sort: input.mix_variant[i].sort,
                    details: input.mix_variant[i].details,
                    keys: keys,
                    price_id: null, // will be filled after that product created
                };
                if (input.mix_variant[i].has_media_gallery) {
                    // prepare mix_variant media_gallery
                    const result = await prepareMediaGallery(input.mix_variant[i].media_gallery);
                    temp_mix_variant.media_gallery = result.media_gallery;
                    temp_mix_variant.media = result.main_media;
                }
                is_main_price_set |= input.mix_variant[i].is_main_price;

                mix_variant.push(temp_mix_variant);
            }
            if (!is_main_price_set) // if is_main_price is false for all mix_variant then set first mix_variant as main price
                try { mix_variant[0].is_main_price = true; } catch { /* empty */ }
        }
    } else {
        variant = [{
            name: { fa: "پیش فرض", en: "default" },
            type: ProductModel.variant_types.text,
            labels: [{
                key: '1-1',
                title: { fa: "پیش فرض", en: "default" },
                values: {},
            }]
        }];
        mix_variant = [{
            keys: ['1-1'],
            is_main_price: true,
            is_active: true,
            sort: 1,
            details: input.details,
            price_id: null,
            has_media_gallery: false,
        }];
    }

    // set variant and mix_variant to input
    input.variant = variant;
    input.mix_variant = mix_variant;


    // prepare collections
    if (input.collections && input.collections.related_products) {
        if (input.collections.related_products.collection_type == CollectionModel.types.static) {
            const list = [];
            if (input.collections.related_products.collection_list) {
                for (let i = 0; i < input.collections.related_products.collection_list.length; i += 1) {
                    const related_product = input.collections.related_product.collection_list[i];
                    list.push({
                        product_id: related_product.product_id,
                        has_variant_key: related_product.has_variant_key,
                        mix_variant_keys: related_product.mix_variant_keys,
                        sort: related_product.sort,
                    });
                }
            }

            const collection = await CollectionModel.create({
                extra_fields: { title: input.collections.related_products.collection_title },
                list,
                source: CollectionModel.sources.related_product,
                type: CollectionModel.types.static,
                user_id: input.user_id,
            });
            input.collections.related_products.collection_list = null;
            input.collections.related_products.collection_id = collection._id;
        }
    }

    // create product
    const product = await ProductModel.create(input);

    // update media relation
    if (Array.isArray(input.media_gallery)) {
        for (let i = 0; i < input.media_gallery.length; i += 1) {
            try {
                await attachMedia(product, input.media_gallery[i].media_id);
            } catch {
                console.log('error in update media relation');
            }
        }
    }
    // update mix_variant media gallery relation
    if (input.has_variant) {
        if (Array.isArray(input.variant) && Array.isArray(input.mix_variant)) {
            for (let i = 0; i < input.mix_variant.length; i += 1) {
                if (input.mix_variant[i].has_media_gallery && Array.isArray(input.mix_variant[i].media_gallery)) {
                    for (let j = 0; j < input.mix_variant[i].media_gallery.length; j += 1) {
                        try {
                            await attachMedia(product, input.mix_variant[i].media_gallery[j].media_id);
                        } catch {
                            console.log('error in update media relation');
                        }
                    }
                }
            }
        }
    }
    if (input?.video?.media_id)
        await attachMedia(product, input.video.media_id);
    if (Array.isArray(input.files))
        for (let i = 0; i < input.files.length; i += 1) {
            try {
                await attachMedia(product, input.files[i].media_id);
            } catch {
                console.log('error in update media relation');
            }
        }

    // update attribute value relation
    await AttributeValueModel.updateMany({ _id: { "$in": attribute_value_ids } }, { product_id: product._id });

    // create variant prices
    if (input.has_variant) {
        if (Array.isArray(product.variant) && Array.isArray(product.mix_variant)) {
            for (let i = 0; i < product.mix_variant.length; i += 1) {
                const result = await PriceHelper.createVariantPrice({ model_id: product._id, model_name: ProductModel.modelName, model_variant_keys: input.mix_variant[i].keys }, args.input.mix_variant[i].price);
                if (result.price) {
                    product.mix_variant[i].price_id = result.price._id;
                }
            }
            await product.save();
        }
    } else {
        const { price } = await PriceHelper.createVariantPrice({ model_id: product._id, model_name: ProductModel.modelName, model_variant_keys: ['1-1'] }, input.price);
        if (price) {
            product.mix_variant[0].price_id = price._id;
            product.price_id = price._id;
        }
        await product.save();
    }

    const seo_result = await SEOHelper.attachSEO(product, { ...input.seo, generate_url: input.title, model_name: ProductModel.modelName });
    // const price_result = await PriceHelper.attachPrice(product, input.price);
    return seo_result.instance || product;
};