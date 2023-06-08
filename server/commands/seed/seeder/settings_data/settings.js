const { SettingModel } = require("@models");
const all_languages = require("@common/constant_data/languages.json");
let fa_language;
let en_language;
for (let i = 0; i < all_languages.length; i += 1) {
  if (all_languages[i].code == "fa") {
    fa_language = all_languages[i];
  }
  if (all_languages[i].code == "en") {
    en_language = all_languages[i];
  }
}

const all_cities = require("@common/constant_data/cities.json");
const all_states = require("@common/constant_data/states.json");
const available_payment_gateways = require("@common/constant_data/available_payment_gateways.json");

const shiraz = all_cities.find((city) => {
  return (city.name = "شیراز");
});
const fars = all_states.find((state) => {
  return (state.name = "فارس");
});

const settings = [
  {
    name: {
      fa: "زبان پنل",
      en: "panel language",
    },
    key: "panel_default_language",
    description: {
      fa: "زبان پنل",
      en: "panel language",
    },
    format: SettingModel.formats.object,
    is_main: true,
    value: fa_language,
  },
  {
    name: {
      fa: "زبان پیش فرض وب",
      en: "web default language",
    },
    key: "web_default_language",
    description: {
      fa: "زبان پیش فرض وب",
      en: "web default language",
    },
    format: SettingModel.formats.object,
    is_main: true,
    value: fa_language,
  },
  {
    name: {
      fa: "زبان های وب",
      en: "web languages",
    },
    key: "web_content_languages",
    description: "زبان های وب",
    format: SettingModel.formats.array,
    is_main: true,
    value: [fa_language],
  },
  {
    name: {
      fa: "زبان های پنل",
      en: "panel languages",
    },
    key: "panel_content_languages",
    description: "زبان های پنل",
    format: SettingModel.formats.array,
    is_main: true,
    value: [fa_language],
  },
  {
    name: {
      fa: "لوگو پنل",
      en: "panel logo image",
    },
    key: "panel_logo_image",
    description: {
      fa: "لوگو استفاده شده در پنل",
      en: "logo of app in panel",
    },
    format: SettingModel.formats.media,
    is_main: true,
    value: {
      media_id: "617fcef1b2d7c97a8db93e6c",
      alt: "logo",
      url: "/default-images/logo.png"
    },
  },
  {
    name: {
      fa: "لوگو وبسایت",
      en: "web logo image",
    },
    key: "web_logo_image",
    description: {
      fa: "لوگو استفاده شده در وب سایت",
      en: "logo of app in web",
    },
    format: SettingModel.formats.media,
    is_main: true,
    value: {
      media_id: "617fcef1b2d7c97a8db93e6c",
      alt: "logo",
      url: "/default-images/logo.png"
    },
  },
  {
    name: {
      fa: "ارسال ریپورت ها بوسیله ایمیل یا پیامک",
      en: "send reports via",
    },
    key: "reports_send_via",
    description: {
      fa: "مشخص میکند که ریپرت ها تولید شده توسط خطاها چگونه به دست توسعه دهندگان برسد.",
      en: "how error reports send to developers",
    },
    format: SettingModel.formats.integer,
    is_main: true,
    value: 1,
  },
  {
    name: {
      fa: "نام فروشگاه",
      en: "shop name",
    },
    key: "shop_name",
    description: {
      fa: "نام فرشگاه.",
      en: "shop name.",
    },
    format: SettingModel.formats.multilang,
    is_main: true,
    value: {
      fa: "نام فروشگاه(در تنظیمات تغییر دهید)",
      en: "shop name(change shop name in setting)"
    },
  },
  {
    name: {
      fa: "شهر فروشگاه",
      en: "shop city",
    },
    key: "shop_city",
    description: {
      fa: "شهری که فروشگاه در آن قرار دارد. از این مقدار برای محاسبه هزینه پست استفاده می شود.",
      en: "city of shop. this setting use for calculate post prices.",
    },
    format: SettingModel.formats.integer,
    is_main: true,
    value: shiraz.id,
  },
  {
    name: {
      fa: "استان های همجوار",
      en: "Neighboring states",
    },
    key: "neighboring_states",
    description: {
      fa: "از این مقدار برای محاسبه هزینه پست استفاده می شود.",
      en: "this setting use for calculate post prices.",
    },
    format: SettingModel.formats.array,
    is_main: true,
    value: [fars.id],
  },
  {
    name: {
      fa: "تایید کردن نظر ها",
      en: "comment confirmation",
    },
    key: "comments_need_confirmation",
    description: {
      fa: "مشخص میکند که نظر کاربران قبل از نمایش در صفحه های محصولات، بلاگ ها و ... نیاز به تایید شدن توسط ادمین دارد؟",
      en: "indicates comment must be confirmed to show in products, blogs and ... pages?",
    },
    format: SettingModel.formats.bool,
    is_main: true,
    value: true,
  },
  {
    name: {
      fa: "لیست درگاه های پرداخت در دسترس",
      en: "list of available payment gateways",
    },
    key: "available_payment_gateways",
    description: {
      fa: "لیست درگاه های پرداخت در دسترس",
      en: "list of available payment gateways",
    },
    format: SettingModel.formats.array,
    is_main: true,
    value: available_payment_gateways,
  },
  {
    // used in PaymentGatewayController
    name: {
      fa: "تنطیم درگاه های پرداخت فروشگاه",
      en: "payment gateways settings",
    },
    key: "payment_gateways",
    description: {
      fa: "تنطیم درگاه های پرداخت فروشگاه",
      en: "payment gateways settings",
    },
    format: SettingModel.formats.array,
    is_main: true,
    value: [],
  },
  {
    // used in ShippingMethodController
    name: {
      fa: "روش های ارسال",
      en: "shipping methods",
    },
    key: "shipping_methods",
    description: {
      fa: "روش های ارسال",
      en: "shipping methods",
    },
    format: SettingModel.formats.array,
    is_main: true,
    value: [
      {
        shipping_method_id: "610e55992c453230cdcacfeb",
        attributes: [
          {
            attribute_id: "610e55992c453230cdcacfeb",
            same_city: {
              type: "free", // 'free' or 'after_delivery' or 'price' or 'inactive'
              price_type: "amount", // amount or percent
              price: 0,
            },
            same_state: {
              type: "free", // 'free' or 'after_delivery' or 'price' or 'inactive'
              price_type: "amount", // amount or percent
              price: 0,
            },
            neighboring_state: {
              type: "free", // 'free' or 'after_delivery' or 'price' or 'inactive'
              price_type: "amount", // amount or percent
              price: 0,
            },
            not_neighboring_state: {
              type: "free", // 'free' or 'after_delivery' or 'price' or 'inactive'
              price_type: "amount", // amount or percent
              price: 0,
            },
          },
        ],
      },
    ],
  },
];

const asantamin_web_setting_seed = require('@common/constant_data/asantamin_web_setting_seed');
const asantamin_web_setting_seed_keys = Object.keys(asantamin_web_setting_seed);
for (let i in asantamin_web_setting_seed_keys) {
  const group_key = asantamin_web_setting_seed_keys[i];
  const group = asantamin_web_setting_seed[group_key];

  for (let j in group) {
    const value = group[j]?.value;
    if (value) {
      let format = group[j]?.format;
      if (!format) {
        if (typeof value == 'string') {
          if (value.includes('</'))
            format = SettingModel.formats.text_editor;
          else if (value.includes('\n'))
            format = SettingModel.formats.big_text;
          else
            format = SettingModel.formats.string;
        } else if (typeof value == 'object') {
          try {
            if (value?.fa || typeof value?.fa == 'string') {
              if (value?.fa?.includes('</'))
                format = SettingModel.formats.text_editor_multilang;
              else if (value?.fa?.includes('\n'))
                format = SettingModel.formats.textarea_multilang;
              else
                format = SettingModel.formats.multilang;
            } else if (value?.url || typeof value?.url == 'string') {
              format = SettingModel.formats.media;
            }
          } catch { /* empty */ }
        }
      }
      if (!format) {
        format = SettingModel.formats.string;
      }

      settings.push({
        name: {
          fa: group[j]?.title?.fa || group[j]?.key,
          en: group[j]?.title?.en || group[j]?.key,
        },
        group: group_key,
        key: `web_${group_key}_${group[j]?.key}`,
        description: {
          fa: group[j]?.title?.fa || group[j]?.key,
          en: group[j]?.title?.fa || group[j]?.key,
        },
        format: format,
        is_main: group[j]?.main ?? true,
        value: group[j]?.value,
      });
    }
  }

}

module.exports = settings;