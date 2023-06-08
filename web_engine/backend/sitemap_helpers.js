
const helper_connect_database = async () => {
    const mongoose = require('mongoose');
    if (!mongoose.connection.readyState) {
        try {
            if (!mongoose.connection.readyState) {
                db = await mongoose.connect(process.env.MONGO_DB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    serverSelectionTimeoutMS: parseInt(process.env.MONGO_DB_CONNECTION_TIMEOUT),
                });
            }
        } catch (e) {
            console.log(e);
            console.error('ReportMiddleware.js:', 'database connection failed');
            return next();
        }
    }
}

const helper_lastmod_aggregate = (type) => {
    return [
        {
            $match:
            {
                type,
            }
        },
        {
            $group: {
                _id: "maxUpdatedAt",
                updatedAt: {
                    $max: "$updatedAt"
                }
            }
        }
    ];
}

const helper_data_aggregate = (query) => {
    return [
        {
            $match: query,
        },
        {
            $lookup: {
                from: 'seos',
                localField: 'seo_id',
                foreignField: '_id',
                as: 'seo'
            }
        },
        {
            $unwind: {
                path: '$seo',
            }
        }
    ]
}

const helper_default_generate_url = (url_prefix, row) => {
    return `${url_prefix}/${encodeURIComponent(row?.seo?.url)}`;
}

const helper_xml_string = (data, url_prefix, langs, custom_generate_url) => {

    const moment = require('moment');

    let result = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    for (let i in data) {
        let lastmod;
        try {
            lastmod = moment(data[i]?.updatedAt).toISOString();
        } catch {
            lastmod = '2021-11-27';
        }
        if (data[i]?.seo?.url || data[i]?.id) {

            for (let l in langs) {

                if (data[i]?.title[langs[l]]) {
                    try {
                        result += `
    <url>
        <loc>${process.env.URL}/${langs[l]}/${custom_generate_url ? custom_generate_url(url_prefix, data[i]) : helper_default_generate_url(url_prefix, data[i])}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>0.5</priority>`;

                        for (let ol in langs) {
                            if (langs[l] == langs[ol])
                                continue;
                            try {
                                if (data[i]?.title[langs[ol]]) {
                                    result += `
        <xhtml:link
            rel="alternate"
            hreflang="${langs[ol]}"
            href="${process.env.URL}/${langs[ol]}/${custom_generate_url ? custom_generate_url(url_prefix, data[i]) : helper_default_generate_url(url_prefix, data[i])}"/>`;
                                }
                            } catch { }
                        }
                    } catch { }
                    result += `
    </url>`;
                }
            }
        }
    }

    result += `
</urlset>\n`;
    return result;
}




const helper_sitemap_list = async ({ url_generator, url_prefix, model, data_aggregate }, langs = ['fa', 'en', 'ar']) => {
    await helper_connect_database();
    const aggregate_result = await model.aggregate(data_aggregate);

    return helper_xml_string(aggregate_result, url_prefix, langs, url_generator);
};


const helper_sitemap_index = async (data) => {

    let result = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    for (let i in data) {
        let lastmod;
        if (data[i]?.lastmod_aggregate) {
            try {
                const lastmod_result = (await data[i].model.aggregate(data[i].lastmod_aggregate))[0];
                lastmod = lastmod_result.updatedAt.toISOString();
            } catch { /* empty */ }
        } else
            lastmod = data[i]?.lastmod;
        if (lastmod) {
            result += `
    <sitemap>
        <loc>${process.env.URL}/sitemap.xml?group=${data[i].group}</loc>
        <lastmod>${lastmod}</lastmod>
    </sitemap>`;
        }
    }
    result += `
</sitemapindex>`;
    return result;
}


module.exports = {
    helper_connect_database,
    helper_lastmod_aggregate,
    helper_data_aggregate,
    helper_sitemap_list,
    helper_sitemap_index,
}