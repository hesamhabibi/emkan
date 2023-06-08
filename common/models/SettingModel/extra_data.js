const mongoose = require('mongoose');

const extra_data = function () {
    switch (this.key) {
        case 'panel_default_language': {
            const all_languages = require('../../constant_data/languages.json');
            let fa_language;
            let en_language;

            for (let i = 0; i < all_languages.length; i += 1) {
                if (all_languages[i].code == 'fa') {
                    fa_language = all_languages[i];
                }
                if (all_languages[i].code == 'en') {
                    en_language = all_languages[i];
                }
            }
            return [fa_language, en_language];
        }
        case 'web_default_language': {
            const all_languages = require('../../constant_data/languages.json');
            let fa_language;
            let en_language;

            for (let i = 0; i < all_languages.length; i += 1) {
                if (all_languages[i].code == 'fa') {
                    fa_language = all_languages[i];
                }
                if (all_languages[i].code == 'en') {
                    en_language = all_languages[i];
                }
            }
            return [fa_language, en_language];
        }
        case 'panel_content_languages': {
            const all_languages = require('../../constant_data/languages.json');
            let fa_language;
            let en_language;

            for (let i = 0; i < all_languages.length; i += 1) {
                if (all_languages[i].code == 'fa') {
                    fa_language = all_languages[i];
                }
                if (all_languages[i].code == 'en') {
                    en_language = all_languages[i];
                }
            }
            return [fa_language, en_language];
        }
        case 'web_content_languages': {
            const all_languages = require('../../constant_data/languages.json');
            return all_languages;
        }
        case 'reports_send_via': {
            return [
                { "name": "ایمیل", "id": 1, "color": "#ffb115" },
                { "name": "پیامک", "id": 2, "color": "#3ecf8e" },
                { "name": "ارسال نکن", "id": 0, "color": "#ec6060" },
            ];
        }
        case 'shop_city': {
            const all_cities = require('../../constant_data/cities.json');
            const all_states = require('../../constant_data/states.json');
            return {
                all_states: all_states.map(city => { return { ...city, name: city.name?.fa || "", name_multi: city.name } }),
                all_cities: all_cities.map(city => { return { ...city, name: city.name?.fa || "", name_multi: city.name } }),
            };
        }
        case 'neighboring_states': {
            const all_states = require('../../constant_data/states.json');
            return all_states.map(city => { return { ...city, name: city.name?.fa || "", name_multi: city.name } });
        }
    }
    return null;
};

module.exports = extra_data;