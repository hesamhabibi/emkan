const { SEOModel } = require('../../models');
const { extract_main_title } = require('../MultiLangHelper');

module.exports = async (title, seo_id) => {
    let test_url = title || Date.now();
    let url = test_url;
    // check exists
    let exists = true;
    let counter = 2;
    while (exists) {
        try {
            exists = await SEOModel.exists({ url: test_url, _id: { "$ne": seo_id } });
        } catch (e) {
            exists = false;
        }
        if (exists) {
            const test_title = await extract_main_title(title);
            test_url = `${(test_title || Date.now())}_${counter}`;
            counter += 1;
        } else {
            url = test_url;
        }
        if (counter > 999) {
            url = 'invalid_url';
            break;
        }
    }
    return url;
};