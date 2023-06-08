const mongoose = require('mongoose');

const findByKey = async (key, { panel_local = 'fa' } = {}) => {
    const SettingModel = mongoose.models.SettingModel;

    let setting;

    switch (key) {
        case 'all_languages': {
            const all_languages = require('../../constant_data/languages.json');
            setting = {
                "id": null,
                "name": {
                    "fa": "همه زبان ها",
                    "en": "all languages",
                },
                "key": "all_language",
                "description": {
                    "fa": "لیست تمام زبان های دنیا",
                    "en": "list of all languages",
                },
                "format": SettingModel.formats.array,
                "value": all_languages,
            };
        }
            break;
        case 'all_cities': {
            const all_cities = require('../../constant_data/cities.json');
            setting = {
                "id": null,
                "name": {
                    "fa": "همه شهر ها",
                    "en": "all cities",
                },
                "key": "all_cities",
                "description": {
                    "fa": "لیست تمام شهر های ایران",
                    "en": "list of all cities in iran",
                },
                "format": SettingModel.formats.array,
                "value": all_cities.map(city => { return { ...city, name: city.name?.fa || "", name_multi: city.name } }),
            };
        }
            break;
        case 'all_states': {
            const all_states = require('../../constant_data/states.json');
            setting = {
                "id": null,
                "name": {
                    "fa": "همه استان ها",
                    "en": "all states",
                },
                "key": "all_states",
                "description": {
                    "fa": "لیست تمام استان های ایران",
                    "en": "list of all states in iran",
                },
                "format": SettingModel.formats.array,
                "value": all_states.map(state => { return { ...state, name: state.name?.fa || "", name_multi: state.name } }),
            };
        }
            break;
        case 'all_count_units': {
            const { details_count_units } = require('../../models/ProductModel');
            setting = {
                "id": null,
                "name": {
                    "fa": "همه واحد ها",
                    "en": "all units",
                },
                "key": "all_count_units",
                "description": {
                    "fa": "لیست تمام واحد های شمارش",
                    "en": "list of all units",
                },
                "format": SettingModel.formats.array,
                "value": details_count_units,
            };
        }
            break;
        case 'product_condition_fields': {
            const { fields } = require('@helpers/CollectionHelper');
            const { TagModel, CategoryModel, BrandModel } = require('..');

            const new_fields = fields.map(field => {
                return {
                    ...field,
                    title_panel: field.title[panel_local],
                    operators: (field.operators || []).map(operator => {
                        return {
                            // todo: add title and panel_title here
                            ...operator,
                            values: (operator.values || []).map(value => {
                                return {
                                    ...value,
                                    title_panel: value.title[panel_local]
                                }
                            })
                        }
                    })
                }
            });

            const all_tags = await TagModel.find({ deep: TagModel.deeps.tag });
            const all_tag_groups = await TagModel.find({ deep: TagModel.deeps.tag_group });
            const all_categories = await CategoryModel.find({ type: CategoryModel.types.product });
            const all_brands = await BrandModel.find({});
            setting = {
                "id": null,
                "name": {
                    "fa": "فیلد های محصول",
                    "en": "product fields",
                },
                "key": "product_condition_fields",
                "description": {
                    "fa": "لیست تمام فیلد های محصول",
                    "en": "list of all product fields",
                },
                "format": SettingModel.formats.array,
                "value": new_fields,
                "extra_data": {
                    tags: all_tags.map(tag => { return { key: tag._id, title: tag?.title, title_panel: tag?.title?.fa } }),
                    tag_groups: all_tag_groups.map(tag => { return { key: tag._id, title: tag?.title, title_panel: tag?.title?.fa } }),
                    categories: all_categories.map(category => { return { key: category._id, title: category?.title, title_panel: category?.title?.fa } }),
                    brands: all_brands.map(brand => { return { key: brand._id, title: brand?.title, title_panel: brand?.title?.fa } }),
                },
            };
        }
            break;

        case 'all_tutorial_files': {
            setting = {
                "id": null,
                "name": {
                    "fa": "همه فایل های آموزشی",
                    "en": "all Tutorial Files",
                },
                "key": "tutorial_files",
                "description": {
                    "fa": "لیست تمام فایل های آموزشی قابل دانلود",
                    "en": "list of all downloadable tutorial files",
                },
                "format": SettingModel.formats.array,
                "value": [
                    {
                        title: "Carboxy",
                        key: 'Carboxy',
                        path: "/tutorial-files/Carboxy.m4v",
                    },
                    {
                        title: "Enigma.m4v",
                        key: 'Enigma.m4v',
                        path: "/tutorial-files/Enigma.m4v",
                    },
                    {
                        title: "Epn.m4v",
                        key: 'Epn.m4v',
                        path: "/tutorial-files/Epn.m4v",
                    },
                    {
                        title: "Focus Dual.m4v",
                        key: 'Focus Dual.m4v',
                        path: "/tutorial-files/Focus Dual.m4v",
                    },
                    {
                        title: "hermion.m4v",
                        key: 'hermion.m4v',
                        path: "/tutorial-files/hermion.m4v",
                    },
                    {
                        title: "Multishape.m4v",
                        key: 'Multishape.m4v',
                        path: "/tutorial-files/Multishape.m4v",
                    },
                    {
                        title: "plasma BT.m4v",
                        key: 'plasma BT.m4v',
                        path: "/tutorial-files/plasma BT.m4v",
                    },
                ],
            };
        }
            break;
        default: {
            try {
                setting = await SettingModel.findOne({ key }).lean({ virtuals: true, defaults: true });
            } catch (e) {
                console.log(e);
                setting = null;
            }
        }
    }

    return setting;
};

module.exports = findByKey;