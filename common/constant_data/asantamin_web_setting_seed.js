const { SettingModel } = require("../models");

module.exports =  {
    settings: [
        {
            key: 'show_prices',
            title: {
                fa: 'نمایش قیمت ها در سایت',
                en: 'show prices in website',
            },
            format: SettingModel.formats.bool,
            value: true,
        },
        {
            key: 'show_cart',
            title: {
                fa: 'نمایش سبد خرید در سایت',
                en: 'show cart in website',
            },
            format: SettingModel.formats.bool,
            value: true,
        },
        {
            key: 'new_orders_to_email',
            title: {
                fa: 'ارسال ایمیل در زمان ثبت سفارش جدید',
                en: 'send email when new order closed',
            },
            format: SettingModel.formats.string,
            value: 'majidshishegar0@gmail.com',
        },
    ],
    footer: [
        {
            key: 'social_media_instagram',
            title: {
                fa: 'لینک اینستاگرام',
                en: 'instagram link',
            },
            value: '#',
        },
        {
            key: 'social_media_telegram',
            title: {
                fa: 'لینک تلگرام',
                en: 'telegram link',
            },
            value: '#',
        },
        {
            key: 'social_media_whatsapp',
            title: {
                fa: 'لینک واتساپ',
                en: 'whatsapp link',
            },
            value: '#',
        },
        // footer links
        {
            key: 'link_1_title',
            title: {
                fa: 'تایتل لینک اول',
                en: 'title of first link',
            },
            value: {
                fa: `خدمات`,
                en: `خدمات`,
            },
        },
        {
            key: 'link_1_url',
            title: {
                fa: 'آدرس لینک اول',
                en: 'url first link',
            },
            value: '#',
        },
        {
            key: 'link_2_title',
            title: {
                fa: 'تایتل لینک دوم',
                en: 'title of second link',
            },
            value: {
                fa: `بلاگ`,
                en: `بلاگ`,
            },
        },
        {
            key: 'link_2_url',
            title: {
                fa: 'آدرس لینک دوم',
                en: 'url second link',
            },
            value: '#',
        },
        {
            key: 'link_3_title',
            title: {
                fa: 'تایتل لینک سوم',
                en: 'title of third link',
            },
            value: {
                fa: `درباره ما`,
                en: `درباره ما`,
            },
        },
        {
            key: 'link_3_url',
            title: {
                fa: 'آدرس لینک سوم',
                en: 'url third link',
            },
            value: '#',
        },
        {
            key: 'link_4_title',
            title: {
                fa: 'تایتل لینک چهارم',
                en: 'title of fourth link',
            },
            value: {
                fa: `تماس با ما`,
                en: `تماس با ما`,
            },
        },
        {
            key: 'link_4_url',
            title: {
                fa: 'آدرس لینک چهارم',
                en: 'url fourth link',
            },
            value: '#',
        },
        {
            key: 'link_5_title',
            title: {
                fa: 'تایتل لینک پنجم',
                en: 'title of fifth link',
            },
            value: {
                fa: `مشتریان`,
                en: `مشتریان`,
            },
        },
        {
            key: 'link_5_url',
            title: {
                fa: 'آدرس لینک پنجم',
                en: 'url fifth link',
            },
            value: '#',
        },
        // footer addresses
        {
            key: 'addresses_phone',
            title: {
                fa: 'شماره تلفن',
                en: 'phone',
            },
            value: {
                fa: `۰۷۱ - ۱۲۳۴۵۶۷۸۹`,
                en: `۰۷۱ - ۱۲۳۴۵۶۷۸۹`,
            },
        },
        {
            key: 'addresses_phone_link',
            title: {
                fa: 'لینک شماره تلفن',
                en: 'link of phone',
            },
            value: {
                fa: `tel:+98123456789`,
                en: `tel:+98123456789`,
            },
        },
        {
            key: 'addresses_email',
            title: {
                fa: 'ایمیل',
                en: 'email',
            },
            value: {
                fa: `info@branchteam.ir`,
                en: `info@branchteam.ir`,
            },
        },
        {
            key: 'addresses_email_link',
            title: {
                fa: 'لینک ایمیل',
                en: 'link of email',
            },
            value: {
                fa: `mailto:@branchteam.ir`,
                en: `mailto:info@branchteam.ir`,
            },
        },
        {
            key: 'addresses_address',
            title: {
                fa: 'آدرس',
                en: 'address',
            },
            value: {
                fa: `شیراز - شیراز`,
                en: `شیراز - شیراز`,
            },
        },
        {
            key: 'addresses_address_link',
            title: {
                fa: 'لینک آدرس',
                en: 'link of address',
            },
            value: {
                fa: `https://www.google.com/maps/place/Saadi+Cinema/@29.621818,52.5145093,15z/data=!4m5!3m4!1s0x3fb2127043f35ef9:0x237b35e008afa618!8m2!3d29.6218183!4d52.5231712`,
                en: `https://www.google.com/maps/place/Saadi+Cinema/@29.621818,52.5145093,15z/data=!4m5!3m4!1s0x3fb2127043f35ef9:0x237b35e008afa618!8m2!3d29.6218183!4d52.5231712`,
            },
        },
        // footer copyrights
        {
            key: 'copyrights',
            title: {
                fa: 'متن حقوق محفوظ',
                en: 'copyrights text',
            },
            value: {
                fa: `تمام حقوق مادی و معنوی این سایت برای برنچ تیم محفوظ است`,
                en: `تمام حقوق مادی و معنوی این سایت برای برنچ تیم محفوظ است`,
            },
        },
    ],
    homePage: [
        {
            key: 'slider_big_image',
            title: {
                fa: 'تصویر برند کنار اسلایدر',
                en: 'media of brand aside slider',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b6",
                alt: "",
                url: "/images/home-topSection-logo.png",
            },
        },
        {
            key: 'shop_feature_1_link',
            title: {
                fa: 'لینک ویژگی شاخص فروشگاه اول',
                en: 'link of first shop feature',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'shop_feature_1',
            title: {
                fa: 'ویژگی شاخص فروشگاه اول',
                en: 'first shop feature',
            },
            value: {
                fa: `
                ۲۴ ساعت روز , ۷ روز هفته`,
                en: `
                ۲۴ ساعت روز , ۷ روز هفته`,
            },
        },
        {
            key: 'shop_feature_1_description',
            title: {
                fa: 'توضیحات ویژگی شاخص فروشگاه اول',
                en: 'first shop feature description',
            },
            value: {
                fa: `
                پشتیبانی و پیگیری در تمام ایام هفته `,
                en: `
                پشتیبانی و پیگیری در تمام ایام هفته `,
            },
        },
        {
            key: 'shop_feature_1_icon',
            title: {
                fa: 'تصویر ویژگی شاخص فروشگاه اول',
                en: 'media of first shop feature',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/feature-1-icon.png",
            },
        },
        {
            key: 'shop_feature_2_link',
            title: {
                fa: 'لینک ویژگی شاخص فروشگاه دوم',
                en: 'link of second shop feature',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'shop_feature_2',
            title: {
                fa: 'ویژگی شاخص فروشگاه دوم',
                en: 'second shop feature',
            },
            value: {
                fa: `
                ارسال سریع به سرار کشور`,
                en: `
                ارسال سریع به سرار کشور`,
            },
        },
        {
            key: 'shop_feature_2_description',
            title: {
                fa: 'توضیحات ویژگی شاخص فروشگاه دوم',
                en: 'second shop feature description',
            },
            value: {
                fa: `
                از نزدیک ترین انبار `,
                en: `
                از نزدیک ترین انبار `,
            },
        },
        {
            key: 'shop_feature_2_icon',
            title: {
                fa: 'تصویر ویژگی شاخص فروشگاه دوم',
                en: 'media of second shop feature',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/feature-2-icon.png",
            },
        },
        {
            key: 'shop_feature_3_link',
            title: {
                fa: 'لینک ویژگی شاخص فروشگاه سوم',
                en: 'link of third shop feature',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'shop_feature_3',
            title: {
                fa: 'ویژگی شاخص فروشگاه سوم',
                en: 'third shop feature',
            },
            value: {
                fa: `
                مدیریت هزینه ساخت و ساز`,
                en: `
                مدیریت هزینه ساخت و ساز`,
            },
        },
        {
            key: 'shop_feature_3_description',
            title: {
                fa: 'توضیحات ویژگی شاخص فروشگاه سوم',
                en: 'third shop feature description',
            },
            value: {
                fa: `
                قیمت تمام شده پایین تر `,
                en: `
                قیمت تمام شده پایین تر `,
            },
        },
        {
            key: 'shop_feature_3_icon',
            title: {
                fa: 'تصویر ویژگی شاخص فروشگاه سوم',
                en: 'media of third shop feature',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/feature-3-icon.png",
            },
        },
        {
            key: 'shop_feature_4_link',
            title: {
                fa: 'لینک ویژگی شاخص فروشگاه چهارم',
                en: 'link of forth shop feature',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'shop_feature_4',
            title: {
                fa: 'ویژگی شاخص فروشگاه چهارم',
                en: 'fourth shop feature',
            },
            value: {
                fa: `
                تامین راحت ۰ تا ۱۰۰ پروژه`,
                en: `
                تامین راحت ۰ تا ۱۰۰ پروژه`,
            },
        },
        {
            key: 'shop_feature_4_description',
            title: {
                fa: 'توضیحات ویژگی شاخص فروشگاه چهارم',
                en: 'fourth shop feature description',
            },
            value: {
                fa: `
                تنوع محصول در تمام مراحل ساخت و ساز `,
                en: `
                تنوع محصول در تمام مراحل ساخت و ساز `,
            },
        },
        {
            key: 'shop_feature_4_icon',
            title: {
                fa: 'تصویر ویژگی شاخص فروشگاه چهارم',
                en: 'media of fourth shop feature',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/feature-4-icon.png",
            },
        },

        {
            key: 'inquiry_image',
            title: {
                fa: 'تصویر استعلام قیمت',
                en: 'picture for inquiry',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/Rectangle.png",
            },
        },
        {
            key: 'inquiry_step_text_1',
            title: {
                fa: 'متن قدم اول استعلام قیمت',
                en: 'first step for inquiry',
            },
            value: {
                fa: `لیست اقلام را از طریق واتساپ ارسال کنید.`,
                en: `لیست اقلام را از طریق واتساپ ارسال کنید.`,
            },
        },
        {
            key: 'inquiry_step_text_2',
            title: {
                fa: 'متن قدم دوم استعلام قیمت',
                en: 'second step for inquiry',
            },
            value: {
                fa: `تیم کارشناسی بررسی کرده و با شما تماس می‌گیرند.`,
                en: `تیم کارشناسی بررسی کرده و با شما تماس می‌گیرند.`,
            },
        },
        {
            key: 'inquiry_step_text_3',
            title: {
                fa: 'متن قدم سوم استعلام قیمت',
                en: 'third step for inquiry',
            },
            value: {
                fa: `درصورت تمایل ثبت سفارش کنید.`,
                en: `درصورت تمایل ثبت سفارش کنید.`,
            },
        },
        {
            key: 'inquiry_phone_number_link',
            title: {
                fa: 'لینک شماره موبایل استعلام قیمت',
                en: 'link of phone number for inquiry',
            },
            value: {
                fa: `tel:09171234567`,
                en: `tel:09171234567`,
            },
        },
        {
            key: 'inquiry_telegram_link',
            title: {
                fa: 'لینک تلگرام استعلام قیمت',
                en: 'link of telegram for inquiry',
            },
            value: {
                fa: `https://t.me/asantakmil`,
                en: `https://t.me/asantakmil`,
            },
        },
        {
            key: 'inquiry_whatsapp_link',
            title: {
                fa: 'لینک واتساپ استعلام قیمت',
                en: 'link of whatsapp for inquiry',
            },
            value: {
                fa: `https://wa.me/989171234567`,
                en: `https://wa.me/989171234567`,
            },
        },
        {
            key: 'inquiry_eitaa_link',
            title: {
                fa: 'لینک ایتا استعلام قیمت',
                en: 'link of eitaa for inquiry',
            },
            value: {
                fa: `https://eitaa.com/asantakmil`,
                en: `https://eitaa.com/asantakmil`,
            },
        },

        {
            key: 'banner_title_1',
            title: {
                fa: 'عنوان بنر اول',
                en: 'first banner title',
            },
            value: {
                fa: `شیرآلات قهرمان`,
                en: `شیرآلات قهرمان`,
            },
        },
        {
            key: 'banner_description_1',
            title: {
                fa: 'توضیحات بنر اول',
                en: 'first banner description',
            },
            value: {
                fa: `
                شیرآلات بهداشتی ایرانی با کیفیت جهانی`,
                en: `
                شیرآلات بهداشتی ایرانی با کیفیت جهانی`,
            },
        },
        {
            key: 'banner_link_1',
            title: {
                fa: 'لینک بنر اول',
                en: 'first banner link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'banner_image_1',
            title: {
                fa: 'تصویر بنر اول',
                en: 'media of first banner',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/banner1.png",
            },
        },
        {
            key: 'banner_title_2',
            title: {
                fa: 'عنوان بنر دوم',
                en: 'second banner title',
            },
            value: {
                fa: `شیرآلات قهرمان`,
                en: `شیرآلات قهرمان`,
            },
        },
        {
            key: 'banner_description_2',
            title: {
                fa: 'توضیحات بنر دوم',
                en: 'second banner description',
            },
            value: {
                fa: `
                شیرآلات بهداشتی ایرانی با کیفیت جهانی`,
                en: `
                شیرآلات بهداشتی ایرانی با کیفیت جهانی`,
            },
        },
        {
            key: 'banner_link_2',
            title: {
                fa: 'لینک بنر دوم',
                en: 'second banner link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'banner_image_2',
            title: {
                fa: 'تصویر بنر دوم',
                en: 'media of second banner',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/banner2.png",
            },
        },

        {
            key: 'categories_title_1',
            title: {
                fa: 'عنوان دسته بندی اول',
                en: 'first category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_1',
            title: {
                fa: 'لینک دسته بندی اول',
                en: 'first category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_1',
            title: {
                fa: 'تصویر دسته بندی اول',
                en: 'media of first category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },
        {
            key: 'categories_title_2',
            title: {
                fa: 'عنوان دسته بندی دوم',
                en: 'second category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_2',
            title: {
                fa: 'لینک دسته بندی دوم',
                en: 'second category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_2',
            title: {
                fa: 'تصویر دسته بندی دوم',
                en: 'media of second category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },
        {
            key: 'categories_title_3',
            title: {
                fa: 'عنوان دسته بندی سوم',
                en: 'third category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_3',
            title: {
                fa: 'لینک دسته بندی سوم',
                en: 'third category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_3',
            title: {
                fa: 'تصویر دسته بندی سوم',
                en: 'media of third category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },
        {
            key: 'categories_title_4',
            title: {
                fa: 'عنوان دسته بندی چهارم',
                en: 'fourth category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_4',
            title: {
                fa: 'لینک دسته بندی چهارم',
                en: 'fourth category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_4',
            title: {
                fa: 'تصویر دسته بندی چهارم',
                en: 'media of fourth category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },
        {
            key: 'categories_title_5',
            title: {
                fa: 'عنوان دسته بندی پنجم',
                en: 'fifth category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_5',
            title: {
                fa: 'لینک دسته بندی پنجم',
                en: 'fifth category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_5',
            title: {
                fa: 'تصویر دسته بندی پنجم',
                en: 'media of fifth category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },
        {
            key: 'categories_title_6',
            title: {
                fa: 'عنوان دسته بندی ششم',
                en: 'sixth category title',
            },
            value: {
                fa: `تجهیزات کارگاه`,
                en: `تجهیزات کارگاه`,
            },
        },
        {
            key: 'categories_link_6',
            title: {
                fa: 'لینک دسته بندی ششم',
                en: 'sixth category link',
            },
            value: {
                fa: `#`,
                en: `#`,
            },
        },
        {
            key: 'categories_image_6',
            title: {
                fa: 'تصویر دسته بندی ششم',
                en: 'media of sixth category',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/home-category.png",
            },
        },

        {
            key: 'second_banner_image',
            title: {
                fa: 'تصویر بنر دوم',
                en: 'media of second banner',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/asantamin-images/home/second-banner.png",
            },
        },
        {
            key: 'second_banner_link',
            title: {
                fa: 'لینک بنر دوم',
                en: 'second banner link',
            },
            value: {
                fa: "#",
                en: "#",
            },
        },
    ],
    loginPage: [
        {
            key: 'rules_text',
            title: {
                fa: 'صفحه لاگین، متن قوانین',
                en: 'login page rules text',
            },
            value: {
                fa: `ورود شما به معنای پذیرش شرایط <a href="#" class="text-blue-c100">دیجی کالا</a> و <a href="#" class="text-blue-c100">قوانین خصوصی</a> است`,
                en: `ورود شما به معنای پذیرش شرایط <a href="#" class="text-blue-c100">دیجی کالا</a> و <a href="#" class="text-blue-c100">قوانین خصوصی</a> است`,
            },
        },
    ],
    productPage: [
        {
            key: 'comments_title',
            title: {
                fa: 'صفحه محصول، عنوان متن کنار نظر',
                en: 'product page comment side text of comment',
            },
            value: {
                fa: `لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:`,
                en: `لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:`,
            },
        },
        {
            key: 'comments_text',
            title: {
                fa: 'صفحه محصول، متن کنار نظر',
                en: 'product page comment side text of comment',
            },
            value: {
                fa: `
                لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                                                از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز کنید.
                                                در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر کاربران در فرآیند انتخاب و خرید یک محصول است.
                                                با توجه به ساختار بخش نظرات، از پرسیدن سوال یا درخواست راهنمایی در این بخش خودداری کرده و سوالات خود را در بخش
                                                <a href="#" class="text-blue-c100">«پرسش و پاسخ»</a> مطرح کنید.
                `,
                en: `
                لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                                                از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز کنید.
                                                در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر کاربران در فرآیند انتخاب و خرید یک محصول است.
                                                با توجه به ساختار بخش نظرات، از پرسیدن سوال یا درخواست راهنمایی در این بخش خودداری کرده و سوالات خود را در بخش
                                                <a href="#" class="text-blue-c100">«پرسش و پاسخ»</a> مطرح کنید.
                `,
            },
        },
        {
            key: 'comments_rules_link',
            title: {
                fa: 'صفحه محصول، لینک صفحه قوانین نظر',
                en: 'product page link of rules page',
            },
            value: {
                fa: `
                ثبت دیدگاه به معنی موافقت با <a href="#" class="text-blue-c100">قوانین انتشار فروشگاه ****</a> است.
                `,
                en: `
                ثبت دیدگاه به معنی موافقت با <a href="#" class="text-blue-c100">قوانین انتشار فروشگاه ****</a> است.
                `,
            },
        },
    ],
    contactUsPage: [
        {
            key: 'page_title',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان صفحه',
                en: 'contact us page title of page',
            },
            value: {
                fa: `ارتباط با آسان تکمیل`,
                en: `ارتباط با آسان تکمیل`,
            },
        },
        {
            key: 'page_note',
            title: {
                fa: 'صفحه ارتباط با ما، متن زیر عنوان',
                en: 'contact us page note of page',
            },
            value: {
                fa: `لطفا قبل از تماس با آسان تکمیل، صفحه راهنما را مشاهده کنید. پاسخ بسیاری از سوالات شما آنجاست.`,
                en: `لطفا قبل از تماس با آسان تکمیل، صفحه راهنما را مشاهده کنید. پاسخ بسیاری از سوالات شما آنجاست.`,
            },
        },
        {
            key: 'from_title',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان فرم',
                en: 'contact us page title of form',
            },
            value: {
                fa: `برای پیگیری سفارش خود و یا طرح سوال، فرم زیر را تکمیل کنید.`,
                en: `برای پیگیری سفارش خود و یا طرح سوال، فرم زیر را تکمیل کنید.`,
            },
        },
        {
            key: 'from_map_iframe',
            title: {
                fa: 'صفحه ارتباط با ما، فریم نقشه',
                en: 'contact us page frame of map',
            },
            value: {
                fa: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500.94335455275!2d52.517523621856874!3d29.625846671057193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb2126c3c5070f3%3A0x6327cf910cfd034e!2sAnahita%20shopping%20center!5e0!3m2!1sen!2s!4v1637744823849!5m2!1sen!2s" style="border:0;" allowfullscreen="" loading="lazy" width="500" height="500"></iframe>`,
                en: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500.94335455275!2d52.517523621856874!3d29.625846671057193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb2126c3c5070f3%3A0x6327cf910cfd034e!2sAnahita%20shopping%20center!5e0!3m2!1sen!2s!4v1637744823849!5m2!1sen!2s" style="border:0;" allowfullscreen="" loading="lazy" width="500" height="500"></iframe>`,
            },
        },

        {
            key: 'cards_title_1',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان کارت اول',
                en: 'contact us page title of first card',
            },
            value: {
                fa: `آدرس ایمیل ما`,
                en: `آدرس ایمیل ما`,
            },
        },
        {
            key: 'cards_value_1',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار کارت اول',
                en: 'contact us page value of first card',
            },
            value: {
                fa: `asan.tamin@gmail.com`,
                en: `asan.tamin@gmail.com`,
            },
        },
        {
            key: 'cards_image_1',
            title: {
                fa: 'صفحه ارتباط با ما، تصویر کارت اول',
                en: 'contact us page image of first card',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/contact-us/card-1.png",
            },
        },
        
        {
            key: 'cards_title_2',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان کارت دوم',
                en: 'contact us page title of second card',
            },
            value: {
                fa: `شماره تماس پشتیبانی مشتریان`,
                en: `شماره تماس پشتیبانی مشتریان`,
            },
        },
        {
            key: 'cards_value_2',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار کارت دوم',
                en: 'contact us page value of second card',
            },
            value: {
                fa: `خریداران: ۷۶۵۴۳۲۱-۰۷۱`,
                en: `خریداران: ۷۶۵۴۳۲۱-۰۷۱`,
            },
        },
        {
            key: 'cards_image_2',
            title: {
                fa: 'صفحه ارتباط با ما، تصویر کارت دوم',
                en: 'contact us page image of second card',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/contact-us/card-2.png",
            },
        },
        
        {
            key: 'cards_title_3',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان کارت سوم',
                en: 'contact us page title of third card',
            },
            value: {
                fa: `آدرس دفتر مرکزی آسان تکمیل`,
                en: `آدرس دفتر مرکزی آسان تکمیل`,
            },
        },
        {
            key: 'cards_value_3',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار کارت سوم',
                en: 'contact us page value of third card',
            },
            value: {
                fa: `شیراز - خیابان ملاصدرا - خیابان حکیمی کوچه۴/۶ - ساختمان نگین طبقه اول - واحد ۳ `,
                en: `شیراز - خیابان ملاصدرا - خیابان حکیمی کوچه۴/۶ - ساختمان نگین طبقه اول - واحد ۳ `,
            },
        },
        {
            key: 'cards_image_3',
            title: {
                fa: 'صفحه ارتباط با ما، تصویر کارت سوم',
                en: 'contact us page image of third card',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/contact-us/card-3.png",
            },
        },
        
        {
            key: 'cards_title_4',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان کارت چهارم',
                en: 'contact us page title of fourth card',
            },
            value: {
                fa: `ساعت کاری`,
                en: `ساعت کاری`,
            },
        },
        {
            key: 'cards_value_4',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار کارت چهارم',
                en: 'contact us page value of fourth card',
            },
            value: {
                fa: `هرروز هفته :۸ صبح تا ۱۲ شب`,
                en: `هرروز هفته :۸ صبح تا ۱۲ شب`,
            },
        },
        {
            key: 'cards_image_4',
            title: {
                fa: 'صفحه ارتباط با ما، تصویر کارت چهارم',
                en: 'contact us page image of fourth card',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/contact-us/card-4.png",
            },
        },
        
        {
            key: 'rows_title_1',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان ردیف اول',
                en: 'contact us page title of first row',
            },
            value: {
                fa: `روزهای تعطیل`,
                en: `روزهای تعطیل`,
            },
        },
        {
            key: 'rows_value_1',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار ردیف اول',
                en: 'contact us page value of first row',
            },
            value: {
                fa: `آسان تکمیل در این روزها تعطیل بوده و پاسخگویی و ارسال سفارش ندارد:`,
                en: `آسان تکمیل در این روزها تعطیل بوده و پاسخگویی و ارسال سفارش ندارد:`,
            },
        },
        {
            key: 'rows_note_1',
            title: {
                fa: 'صفحه ارتباط با ما، متن ردیف اول',
                en: 'contact us page value of first card',
            },
            value: {
                fa: ` و ۱۳ فروردین، ۱۴ خرداد، تاسوعا، عاشورا و اربعین حسینی رحلت رسول اکرم، 22 بهمن `,
                en: ` و ۱۳ فروردین، ۱۴ خرداد، تاسوعا، عاشورا و اربعین حسینی رحلت رسول اکرم، 22 بهمن `,
            },
        },
        
        {
            key: 'rows_title_2',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان ردیف دوم',
                en: 'contact us page title of second row',
            },
            value: {
                fa: `خدمات پس از فروش`,
                en: `خدمات پس از فروش`,
            },
        },
        {
            key: 'rows_value_2',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار ردیف دوم',
                en: 'contact us page value of second row',
            },
            value: {
                fa: `لطفا در صورت درخواست جهت بازگرداندن کالا به واحد خدمات پس از فروش آسان تکمیل ز طریق پست، تنها به صندوق پستی 13185-1595 ارسال کنید `,
                en: `لطفا در صورت درخواست جهت بازگرداندن کالا به واحد خدمات پس از فروش آسان تکمیل ز طریق پست، تنها به صندوق پستی 13185-1595 ارسال کنید `,
            },
        },
        {
            key: 'rows_note_2',
            title: {
                fa: 'صفحه ارتباط با ما، متن ردیف دوم',
                en: 'contact us page value of second card',
            },
            value: {
                fa: ``,
                en: ``,
            },
        },
        
        {
            key: 'rows_title_3',
            title: {
                fa: 'صفحه ارتباط با ما، عنوان ردیف سوم',
                en: 'contact us page title of third row',
            },
            value: {
                fa: `روابط‌ عمومی`,
                en: `روابط‌ عمومی`,
            },
        },
        {
            key: 'rows_value_3',
            title: {
                fa: 'صفحه ارتباط با ما، مقدار ردیف سوم',
                en: 'contact us page value of third row',
            },
            value: {
                fa: `شما می‌توانید با استفاده از ایمیل dcba@support.com با بخش روابط‌ عمومی در تماس باشید. `,
                en: `شما می‌توانید با استفاده از ایمیل dcba@support.com با بخش روابط‌ عمومی در تماس باشید. `,
            },
        },
        {
            key: 'rows_note_3',
            title: {
                fa: 'صفحه ارتباط با ما، متن ردیف سوم',
                en: 'contact us page value of third card',
            },
            value: {
                fa: ``,
                en: ``,
            },
        },

        {
            key: 'rows_image',
            title: {
                fa: 'صفحه ارتباط با ما، تصویر کنار ردیف ها',
                en: 'contact us page image of rows',
            },
            value: {
                media_id: "617fd0edb3e8947fb41cd7b5",
                alt: "",
                url: "/images/contact-us-bottom.png",
            },
        },
    ],
    FAQPage: [
        {
            key: 'page_title',
            title: {
                fa: 'صفحه سوالات متداول، عنوان صفحه',
                en: 'FAQPage title of page',
            },
            value: {
                fa: "موضوع پرسش شما چیست؟",
                en: "موضوع پرسش شما چیست؟",
            },
        },
        {
            key: 'page_description',
            title: {
                fa: 'صفحه سوالات متداول، توضیحات صفحه',
                en: 'FAQPage description of page',
            },
            value: {
                fa: "موضوع موردنظرتان را از دسته‌بندی زیر انتخاب کنید",
                en: "موضوع موردنظرتان را از دسته‌بندی زیر انتخاب کنید",
            },
        },
    ],
    blogsPage: [
        {
            key: 'tags_1',
            title: {
                fa: 'تگ مقالات برتر 1',
                en: 'best blog tags 1',
            },
            value: {
                fa: 'مصالح ساختمانی',
                en: 'مصالح ساختمانی',
            }
        },
        {
            key: 'tags_2',
            title: {
                fa: 'تگ مقالات برتر 2',
                en: 'best blog tags 2',
            },
            value: {
                fa: 'ابزارالات ساختمانی',
                en: 'ابزارالات ساختمانی',
            }
        },
        {
            key: 'tags_3',
            title: {
                fa: 'تگ مقالات برتر 3',
                en: 'best blog tags 3',
            },
            value: {
                fa: 'تاسیسات الکتریکی و هوشمند سازی',
                en: 'تاسیسات الکتریکی و هوشمند سازی',
            }
        },
        {
            key: 'tags_4',
            title: {
                fa: 'تگ مقالات برتر 4',
                en: 'best blog tags 4',
            },
            value: {
                fa: 'تاسیسات مکانیکی و تحویه مطبوع',
                en: 'تاسیسات مکانیکی و تحویه مطبوع',
            }
        },
        {
            key: 'tags_5',
            title: {
                fa: 'تگ مقالات برتر 5',
                en: 'best blog tags 5',
            },
            value: {
                fa: 'تجهیزات آشپزخانه و لوازم بهداشتی',
                en: 'تجهیزات آشپزخانه و لوازم بهداشتی',
            }
        },
        {
            key: 'tags_6',
            title: {
                fa: 'تگ مقالات برتر 6',
                en: 'best blog tags 6',
            },
            value: {
                fa: 'چسب و رنگ ساختمانی',
                en: 'چسب و رنگ ساختمانی',
            }
        },
        {
            key: 'tags_7',
            title: {
                fa: 'تگ مقالات برتر 7',
                en: 'best blog tags 7',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_8',
            title: {
                fa: 'تگ مقالات برتر 8',
                en: 'best blog tags 8',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_9',
            title: {
                fa: 'تگ مقالات برتر 9',
                en: 'best blog tags 9',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_10',
            title: {
                fa: 'تگ مقالات برتر 10',
                en: 'best blog tags 10',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_11',
            title: {
                fa: 'تگ مقالات برتر 11',
                en: 'best blog tags 11',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_12',
            title: {
                fa: 'تگ مقالات برتر 12',
                en: 'best blog tags 12',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_13',
            title: {
                fa: 'تگ مقالات برتر 13',
                en: 'best blog tags 13',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_14',
            title: {
                fa: 'تگ مقالات برتر 14',
                en: 'best blog tags 14',
            },
            value: {
                fa: '',
                en: '',
            },
        },
        {
            key: 'tags_15',
            title: {
                fa: 'تگ مقالات برتر 15',
                en: 'best blog tags 15',
            },
            value: {
                fa: '',
                en: '',
            },
        },
    ],
    blogPage: [
        {
            key: 'comments_title',
            title: {
                fa: 'صفحه بلاگ، عنوان متن کنار نظر',
                en: 'blog page comment side text of comment',
            },
            value: {
                fa: `لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:`,
                en: `لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:`,
            },
        },
        {
            key: 'comments_text',
            title: {
                fa: 'صفحه بلاگ، متن کنار نظر',
                en: 'blog page comment side text of comment',
            },
            value: {
                fa: `
                لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                                                از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز کنید.
                                                در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر کاربران در فرآیند انتخاب و خرید یک محصول است.
                                                با توجه به ساختار بخش نظرات، از پرسیدن سوال یا درخواست راهنمایی در این بخش خودداری کرده و سوالات خود را در بخش
                                                <a href="#" class="text-blue-c100">«پرسش و پاسخ»</a> مطرح کنید.
                `,
                en: `
                لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                                                از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز کنید.
                                                در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر کاربران در فرآیند انتخاب و خرید یک محصول است.
                                                با توجه به ساختار بخش نظرات، از پرسیدن سوال یا درخواست راهنمایی در این بخش خودداری کرده و سوالات خود را در بخش
                                                <a href="#" class="text-blue-c100">«پرسش و پاسخ»</a> مطرح کنید.
                `,
            },
        },
    ]
}