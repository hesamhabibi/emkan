require('module-alias/register');

const run = async () => {
    const path = require('path');
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');
    const { device_type, device_info } = require('@helpers/DeviceHelper');

    //dotenv
    const dotenv = require('dotenv');
    // add env keys
    dotenv.config({ path: ".env" });
    // replace local env keys
    const local_env = dotenv.config({ path: ".env.local" });
    process.env = { ...process.env, ...local_env.parsed };


    const cookie = require('cookie');

    const { routeNames, interruptCodes, registerTagsAndFilters } = require('@backend');

    //liquidjs
    const { Liquid } = require('liquidjs');
    const engine = new Liquid({
        root: './views',
        extname: '.btml',
        jsTruthy: true,
        catch: true, // todo:
        fs: {
            readFileSync: function (file_path) {
                return fs.readFileSync(file_path, 'utf8') || '';
            },
            readFile: async function (file_path) {
                return fs.readFileSync(file_path, 'utf8') || '';
            },
            existsSync: function (file_path) {
                return fs.existsSync(file_path) || false;
            },
            exists: async function (file_path) {
                return fs.existsSync(file_path) || false;
            },
            resolve: function (root, file, ext) {
                let file_path = path.resolve(path.join(root, file));
                try {
                    if (fs.statSync(file_path).isDirectory()) {
                        file_path = `${file_path}/index`;
                    }
                } catch { /* empty */ }
                if (!file_path.endsWith(ext))
                    return file_path + ext;
                else
                    return file_path;
            }
        },
        globals: {
            default_image_url: "",
            default_card_image_url: "/default-images/card-placeholder.webp",
            default_logo_image_url: "/default-images/logo.png",
            BlogTypes: {
                blog: 1,
                page: 2,
                catalogue: 3,
                project: 4,
                service: 5,
                event: 6,
            },
            ProductTypes: {
                product: 1,
                download: 2,
                service: 3,
                device: 4,
            },
            CategoryTypes: {
                blog: 1,
                page: 2,
                product: 3,
                catalogue: 4,
                device: 5,
                event: 6,
            },
            CommentTypes: {
                blog: 1,
                product: 2,
            },
            url_prefix: process.env.URL,
            SingleSEOFields: [
                "robots_status",
                "title_web",
                "keywords_web",
                "description_web",
                "canonical_url",
            ],
            SingleOGFields: [
                "title_web",
                "summary_web",
                "updatedAt",
                {
                    "media": {
                        "media": [
                            "url",
                            "alt",
                            "information",
                        ]
                    }
                }
            ],
        }

    });

    await registerTagsAndFilters(engine);

    //express
    const app = express();

    //public directory
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(path.resolve(__dirname + '/../server/public')));
    app.use(express.static(path.resolve(__dirname + '/../public')));

    const cors = require("cors");
    app.use(cors({
        credentials: false,
        origin: '*'
    }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json());

    const { sitemap } = require('./backend/sitemap');
    app.get('/sitemap.xml', sitemap);

    const { default: axios } = require('axios');
    async function graphqlApi(query, variables, headers = {}) {
        return await axios.post(`${process.env.API_URL}/${process.env.API_GRAPHQL_PREFIX}`, { query, variables }, { headers: headers });
    }

    // todo: extend functionality
    let messages = {};
    try { messages.fa = require('./lang/fa'); } catch { /* empty */ }
    try { messages.en = require('./lang/en'); } catch { /* empty */ }
    try { messages.ar = require('./lang/ar'); } catch { /* empty */ }

    function translator(lang, message, attrs) {
        try {
            const t = messages[lang][message];
            if (t)
                return t;
        } catch { /* empty */ }
        console.log(`no translation found for "${message}" in "${lang}" language!`);
        return message;
    }

    const handle_params = async (req, res, { routeName_key, extra_params } = {}) => {
        // >> handel cookies <<
        const storage = {
            cookies: [],
        };
        const cookies = cookie.parse(req.headers.cookie || '');

        // >> handle multi language <<
        if (req?.params?.lang) {
            if (!['fa', 'en', 'ar'].includes(req?.params?.lang)) {
                const err = new Error('404 not found');
                err.is_custom = true;
                err.interruptCode = interruptCodes.page404;
                throw err;
            }
            storage.cookies.push(`web_lang=${req?.params?.lang};Path=/;SameSite=Lax`);
            cookies['web_lang'] = req?.params?.lang;
        } else if (!cookies.web_lang) {
            storage.cookies.push("web_lang=fa;Path=/;SameSite=Lax;");
            cookies['web_lang'] = req?.params?.lang || 'fa';
        }

        // >> get some global setting

        let show_prices = false;
        let show_cart = false;
        try {
            const result = await graphqlApi(`query {show_prices: getSettingByKey (key: "web_settings_show_prices"){value} show_cart: getSettingByKey (key: "web_settings_show_cart"){value}}`, {}, { token: cookies.token })
            show_prices = result.data.data?.show_prices?.value || false;
            show_cart = result.data.data?.show_cart?.value || false;
        } catch (e) { /* empty */ }

        // >> handle AuthUser and his/her Cart <<
        let cart = null;
        let inquiry = null;
        cookies.AuthUser = null;
        cookies.CartProductsCount = null;
        cookies.InquiryProductsCount = null;
        try { // try to get AuthUser and his/her cart
            if (cookies.token) {
                try {
                    const result = await graphqlApi(`query {result: getCurrentUser{id,name,last_name,full_name,username,email,mobile,media{url}}}`, {}, { token: cookies.token })
                    cookies.AuthUser = result.data.data?.result;
                    if (cookies.AuthUser) {
                        const result = await graphqlApi(`query {
                            cart_result: getCartDetails(is_inquiry: 0) {discount{title_web},total_prices{sum_product_price_without_offer,sum_product_price,total_price_with_discount,post_price,payment_price,total_count},products{product_id,mix_variant_keys,count,product{id,title_web,is_special,seo{url},media{url,alt},mix_variant{keys,title_web,price{has_offer,offer_price,discount_percent,price,main_price}}}}}
                            inquiry_result: getCartDetails(is_inquiry: 1) {discount{title_web},total_prices{sum_product_price_without_offer,sum_product_price,total_price_with_discount,post_price,payment_price,total_count},products{product_id,mix_variant_keys,count,product{id,title_web,is_special,seo{url},media{url,alt},mix_variant{keys,title_web,price{has_offer,offer_price,discount_percent,price,main_price}}}}}
                        }`, {}, { token: cookies.token })
                        cart = result.data.data?.cart_result;
                        inquiry = result.data.data?.inquiry_result;
                        cookies.CartProductsCount = result.data.data?.cart_result.products.length;
                        cookies.InquiryProductsCount = result.data.data?.inquiry_result.products.length;
                    }
                } catch (e) { /* empty */ }
            }
        } catch {/* empty */ }

        // >> save AuthUser and CartProductsCount <<
        if (cookies.AuthUser) {
            const AuthUser_json = JSON.stringify(cookies.AuthUser, (key, value) => typeof value === "string" ? encodeURI(value) : value)
            storage.cookies.push(`AuthUser=${AuthUser_json};Path=/;SameSite=Lax`);
            storage.cookies.push(`CartProductsCount=${cookies.CartProductsCount};Path=/;SameSite=Lax`);
            storage.cookies.push(`InquiryProductsCount=${cookies.InquiryProductsCount};Path=/;SameSite=Lax`);
        }

        // >> handle params <<
        const device = await device_type(req);
        const deviceInfo = await device_info(req);
        let device_os = 'unknown';
        try {
            device_os = deviceInfo.os.name.toLowerCase();
        } catch {/* empty */ }

        const url = req.url;
        const fullUrl = `${process.env.URL}${url}`;
        const params = {
            lang: cookies.web_lang || 'fa',
            _translator: translator,
            req,
            cookies,
            headers: req.headers,
            params: (extra_params && typeof extra_params == 'object') ? { ...req.params, ...extra_params } : req.params,
            query: req.query,
            device: device,
            deviceInfo: deviceInfo,
            device_os: device_os,
            uri: url,
            url: url,
            fullUrl: fullUrl,
            storage: storage,
            cart: cart,
            inquiry: inquiry,
            AuthUser: cookies.AuthUser,
            routeName: routeName_key,
            
            show_prices: show_prices,
            show_cart: show_cart,
        };
        return params;
    }

    const route_Names_keys = Object.entries(routeNames).sort(item => { item[1].route.includes('*') ? -1 : 0 });
    for (let i in route_Names_keys) {
        const routeName_key = route_Names_keys[i][0];
        if (!routeNames[routeName_key].file)
            continue;

        const controller_function = async function (req, res, next) {
            try {

                const params = await handle_params(req, res, { routeName_key, extra_params: routeNames[routeName_key].extra_params });
                // >> render page <<
                const page = await engine.renderFile(routeNames[routeName_key].file, { ...params });

                // >> return result <<
                params.storage.cookies = params.storage.cookies.map((cookie) => {
                    if (typeof cookie == 'string' && !cookie.includes(';'))
                        return `${cookie};Path=/;SameSite=Lax;`;
                    return cookie;
                });
                if (!res.writableFinished) {
                    if (params.storage.cookies && Array.isArray(params.storage.cookies) && params.storage.cookies.length > 0)
                        res.set("set-cookie", params.storage.cookies);
                    res.send(page);
                    res.end();
                }
                return next();

            } catch (e) {
                next(e);
            }
        };

        if (!routeNames[routeName_key].method || routeNames[routeName_key].method.toLowerCase() == 'get') {
            app.get(routeNames[routeName_key].route, controller_function);
        } else if (routeNames[routeName_key].method.toLowerCase() == 'post') {
            app.post(routeNames[routeName_key].route, controller_function);
        } else if (routeNames[routeName_key].method.toLowerCase() == 'use') {
            app.use(routeNames[routeName_key].route, controller_function);
        }
        if (routeNames[routeName_key].multi_lang_route) {
            if (!routeNames[routeName_key].method || routeNames[routeName_key].method.toLowerCase() == 'get') {
                app.get(routeNames[routeName_key].multi_lang_route, controller_function);
            } else if (routeNames[routeName_key].method.toLowerCase() == 'post') {
                app.post(routeNames[routeName_key].multi_lang_route, controller_function);
            } else if (routeNames[routeName_key].method.toLowerCase() == 'use') {
                app.use(routeNames[routeName_key].multi_lang_route, controller_function);
            }
        }
    }

    const ReportMiddleware = require('@backend/middlewares/ReportMiddleware');
    app.use(ReportMiddleware);

    const page_404_controller = async (req, res) => {

        // check redirect
        let uri = req._parsedUrl.pathname;
        if (uri.endsWith('/'))
            uri = uri.slice(0, -1);
        if (uri.startsWith('/'))
            uri = uri.slice(1);

        const redirects = require('./backend/redirects');

        for (let redirect of redirects) {

            let from = redirect.from;
            if (from.includes('?'))
                from = from.slice(0, from.indexOf('?'))
            if (from.endsWith('/'))
                from = from.slice(0, -1);
            if (from.startsWith('/'))
                from = from.slice(1);

            if (from == uri) {
                return res.status(301).redirect(redirect.to);
            }
        }

        const params = await handle_params(req, res);

        const page = await engine.renderFile('pages/404', { ...params });
        // >> return result <<
        if (!res.writableFinished) {
            if (params.storage.cookies && Array.isArray(params.storage.cookies) && params.storage.cookies.length > 0)
                res.set("set-cookie", params.storage.cookies);
            res.status(404).send(page);
            res.end();
        }
    }

    // error handler
    app.use(async function (err, req, res, next) {
        // todo: report errors
        if (err.originalError)
            err = err.originalError;
        if (err.is_custom) {
            switch (err.interruptCode) {
                case interruptCodes.redirect:
                    return res.redirect(err.statusCode || 302, err.redirectTo || "back");
                case interruptCodes.page404: {
                    await page_404_controller(req, res);
                    return next();
                }
            }
        } else {
            console.log(err);
            console.log('some unknown error occurred.');
        }

        if (process.env.env != "debug")
            res.end('error occurred');
        else
            res.end(err.message);
        return next();
    });

    app.get('*', async (req, res) => {
        if (!res.writableFinished) {
            // console.log('url:', req.url);
            let found = false;
            for (let i in app._router.stack) {
                if (!app._router.stack[i].regexp.fast_star && !app._router.stack[i].regexp.fast_slash) {
                    if (app._router.stack[i].regexp.test(req.url)) {
                        found = true;
                    }
                }
            }
            if (!found) {
                if ((req.headers?.accept || '').includes('text/html')) {
                    return await page_404_controller(req, res);
                } else {
                    return res.status(404).end();
                }
            }
        } else {
            // console.log('url:', req.url);
        }
    });

    await app.listen(3003);
    console.log(`running on http://localhost:3003`);
};

run();