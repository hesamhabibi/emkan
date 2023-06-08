import globals from "./globals"
import auth from "~/pages/auth/trans/fa"
import time from "@admin/Input/Time/lang/fa"
import date from "@admin/Input/Date/lang/fa"
import settings from "~/pages/settings/lang/fa"
import user from "~/pages/users/lang/fa"
import products from "~/pages/products/lang/fa"

export default {
  ...globals,
  auth,
  settings,
  user,
  products,
  date_component: date,
  time_component: time,
  menuItems: {
    "Generate auto link": "تولید لینک خودکار",
    badge_key: "کلید بدج",
    "delete-actions": "حذف اکشن",
    "delete-warning": "آیا از حذف مورد اطمینان دارید؟",
    create: "اضافه کردن کامپوننت منو آیتم",
    edit: "ویرایش کامپوننت منو آیتم",
    delete: "حذف کامپوننت منو آیتم",
    "Internal Link": "لینک داخلی",
    "External Link": "لینک خارجی",
    "create-component": "اضافه کردن کامپوننت",
    "edit-component": "ویرایش کامپوننت",
    "edit-action": "ویرایش دسترسی",
    "delete-action": "حذف دسترسی",
    "create-action": "اضافه کردن دسترسی",
    "create-tree-component": "اضافه کردن کامپوننت",
    "edit-tree-component": "ویرایش کامپوننت",
    "delete-tree-component": "حذف کامپوننت",
    "create-column": "اضافه کردن ستون",
    "edit-column": "ویرایش ستون",
    "delete-column": "حذف ستون",
    "Action Fields": "فیلد های بک",
    action_type: "نوع فیلد",
    name: "نام",
    action: "اکشن",
    link: "لینک",
    key: "کلید",
    key_action: "کلید اکشن",
    actions: "مدیریت دسترسی ها",
    description: "توضیحات",
    is_completed: "وضعیت",
    status: "وضعیت",
    field: "فیلد",
    "Not Completed": "کامل نشده",
    completed: "کامل شده",
    title: "عنوان",
    access_component_id: "دسترسی کامپوننت",

    Icon: "آیکون",
    "Key Column": "کلید ستون",
    "Key Action": "کلید لینک",
    "Action Type": "نوع اکشن",
    "Edit Column": "ویرایش ستون",
    "Key Access": "کلید دسترسی",
    Description: "توضیحات",
    Visibility: "نمایش داده شود",
    Hide: "پنهان",
    Show: "نمایش",
    show_in_menu: "نمایش در منو",
  },
  access: {
    name: "نام",
    description: "توضیحات",
    create: "اضافه کردن دسترسی",
    edit: "ویرایش دسترسی",
    delete: "حذف دسترسی",
  },
  tags: {
    "edit group": "ویرایش گروه تگ",
    "add group": "اضافه کردن گروه تگ",
    tag_ids: "برچسب ها",
    create: "اضافه کردن برچسب",
    edit: "ویرایش برچسب",
    delete: "حذف برچسب",
    "delete-group": "حذف گروه برچسب",
    Title: "عنوان",
    "create-group": "اضافه کردن گروه برچسب",
    "edit-group": "ویرایش گروه برچسب",
    "delete-warning": "آیا از حذف مورد اطمینان دارید؟",
    title: "عنوان",
    tag_group_id: "گروه برچسب",
    key: "کلید",
  },
  reports: {
    front: "فرانت",
    createdAt: "تاریخ",
    action: "عمل",
    action_type: "نوع عمل",
    status: "وضعیت",
    Any: "هردو",
    Done: "انجام شده",
    Active: "فعال",
    Unknown: "نا مشخص",
    Mutation: "ثبت رکورد",
    Query: "گرفتن دیتا",
    confirmation: "تایید رفع مشکل",
    "reports-set": "آیا مطمئن هستید مشکل رفع شده است؟",
    show: "مشاهده گزارش",
    "status-1": "فعال",
    "status-2": "انجام شده",
    "status-unknown": "نامشخص",
    done: "حل شده",
    checking: "چک شود",
  },
  discount: {
    title_panel: "عنوان",
    code: "کد تخفیف",
    status: "وضعیت",
    create: "ساخت کد تخفیف",
    edit: "ویرایش کد تخفیف",
    delete: "حذف کد تخفیف",
    // access_type : "نوع دسترسی"
  },
  category: {
    status: "وضعیت",
    "create blog": "ساخت دسته بندی بلاگ",
    "edit blog": "ویرایش دسته بندی بلاگ",
    "create catalogue": "ساخت دسته بندی کاتالوگ",
    "edit catalogue": "ویرایش دسته بندی کاتالوگ",
    "edit page": "ویرایش دسته بندی صفحه",
    "create page": "ساخت دسته بندی صفحه",
    "edit product": "ویرایش دسته بندی محصول",
    "create product": "ساخت دسته بندی محصول",
    title_panel: "عنوان",
    edit: "ویرایش دسته بندی",
    create: "ساخت دسته بندی",
    delete: "حذف دسته بندی",
    visit: "مشاهده فرم دسته بندی",
    Tree: "ساختار درختی",
    Folder: "ساختار پوشه ای",
    Blog: "بلاگ",
    parent_id: "والد گروه",
    Page: "صفحه",
    Product: "محصول",
    title: "عنوان",
    active: "وضعیت",
    "be active": "فعال",
    inactive: "غیر فعال",
    show_in_menu: "نمایش در منو",
    True: "بله",
    False: "خیر",
    form_id: "فرم دسته بندی",
    description: "توضیحات",
    media: "تصویر",
    "seo.title": "عنوان",
    "no Form": "بدون فرم",
    "seo.url": "لینک",
    "seo.canonical_url": "لینک canonical",
    "seo.keywords": "کلیدواژه ها",
    "seo.redirect_url_301": "لینک ریدایرکت 301",
    "seo.robots_status": "وضعیت ربات ها",
    "seo.description": "توضیحات",
    "seo.redirect_url_404": "لینک ریدایرکت ۴۰۴",
    Seo: "سئو",
    "edit Tree": "ویرایش دسته بندی",
    "create Tree": "اضافه کردن دسته بندی",
    tag_group_ids: "گروه های برچسب",
    tag_ids: "برچسب ها",
    access_user_ids: "کاربران دارای دسترس",
  },
  brands: {
    "Generate auto link": "تولید لینک",
    create: "اضافه کردن برند",
    title_panel: "عنوان",
    show_in_menu: "نمایش در منو",
    active: "فعال",
    status: "وضعیت",
    title: "عنوان",
    "seo.title": "عنوان",
    "seo.url": "لینک",
    "seo.canonical_url": "لینک canonical",
    "seo.redirect_url_404": "لینک ریدایرکت 404",
    "seo.keywords": "کلیدواژه ها",
    "seo.redirect_url_301": "لینک ریدایرکت 301",
    "seo.robots_status": "وضعیت ربات ها",
    "seo.description": "توضیحات",
    media: "عکس",
    delete: "حذف برند",
    edit: "ویرایش برند",
  },
  blog: {
    view_count: "تعداد بازدید",
    document: "داکیومنت",
    "seo.redirect_url_404": "لینک ریدایرکت 404",
    publishAt: "تاریخ انتشار",
    title: "عنوان",
    summary: "خلاصه",
    visit_count: "تعداد بازدید",
    title_panel: "عنوان",
    media_gallery: "گالری تصاویر",
    tag_group_id: "گروه برچسب",
    "Add Blog": "اضافه کردن بلاگ",
    has_comment: "قابلیت نظردهی",
    has_rating: "قابلیت امتیاز دهی",
    Blog: "بلاگ",
    Page: "صفحه",
    draft: "پیش نویس",
    show: "نمایش",
    inactive: "پنهان شود",
    create: "اضافه کردن بلاگ",
    tag_ids: "برچسب ها",
    tag_group_ids: "گروه برچسب ها",
    status: "وضعیت",
    category_id: "دسته بندی",
    description: "توضیحات",
    "seo.title": "عنوان",
    "seo.url": "لینک",
    "seo.canonical_url": "لینک canonical",
    "seo.keywords": "کلیدواژه ها",
    "seo.redirect_url_301": "لینک ریدایرکت 301",
    "seo.robots_status": "وضعیت ربات ها",
    "seo.description": "توضیحات",
    edit: "ویرایش بلاگ",
    summary_panel: "خلاصه کار",
    "Generate auto link": "تولید لینک خودکار",
  },
  attribute: {
    title: "عنوان",
    attribute_ids: "ویژگی ها",
    create_group: "اضافه کردن گروه ویژگی",
    edit_group: "ویرایش گروه ویژگی",
    create: "اضافه کردن ویژگی",
    default_value: "مقدار پیش فرض",
    placeholder: "placeholder",
    edit: "ویرایش ویژگی",
    type: "نوع ویژگی",
    Attribute: "ویژگی",
    "Attribute Groups": "گروه های ویژگی",
    "Variant Attributes": "نوع ویژگی ها",
    title_panel: "عنوان",
    delete: "حذف آیتم",
    values: "مقدار های ویژگی",
    "add attribute group": "اضافه کردن نوع ویژگی",
    "add attribute": "اضافه کردن گروه ویژگی",
    "add variant": "اضافه کردن ویژگی",

    "edit attribute group": "ویرایش نوع ویژگی",
    "edit attribute": "ویرایش گروه ویژگی",
    "edit variant": "ویرایش ویژگی",
    "big_text": "متن بلند",
    "two_answer_question": "بله و خیر",
  },
  form_validation: {
    title: "عنوان",
    type: "نوع",
    field_validation_ids: "اعتبار سنجی",
    has_data: "اطلاعات اضافی دارد",
    True: "بله",
    False: "خیر",
    createdAt: "درست شده در",
    validation_rule: "قانون اعتبار سنجی",
    create: "اضافه کردن اعتبار سنجی",
    edit: "ویرایش اعتبار سنجی",
    delete: "حذف اعتبار سنجی",
    user: "کاربر",
  },
  field_type: {
    title: "عنوان",
    type: "نوع",
    has_data: "اطالاعات اضافی",
    field_validation_ids: "اعتبار سنجی ها",
    True: "بله",
    False: "خیر",
    createdAt: "درست شده در",
    validation_rule: "قانون اعتبار سنجی",
    create: "اضافه کردن نوع فیلد",
    edit: "ویرایش نوع فیلد",
    delete: "حذف نوع فیلد",
  },
  forms: {
    edit: "ویرایش فرم",
    create: "اضافه کردن فرم",
    delete: "حذف فرم",
    visit: "مشاهده فرم",
    name: "نام",
    size: "سایز ورودی",
    field_type_id: "نوع فیلد",
    field_validation_ids: "اعتبار سنجی",
    key: "کلید",
    "Add Value": "اضافه کردن مقدار",
    value: "مقدار",
    label: "برچسب",
    title: "عنوان",
    "Add Field": "اضافه کردن فیلد",
    Fields: "فیلد ها",
    values: "رکورد های فرم",
    half_screen: "نیم صفحه",
    full_screen: "تمام صفحه",
  },
  emails: {
    Reject: "رد شده",
    "You need to select at least 1 record": "باید حداقل یک ایمیل وارد کنید",
    Success: "موفق",
    Pending: "در حال انجام",
    view: "مشاهده گزارش",
    repeat: "ارسال دوباره",
    date: "زمان ارسال",
    "No Emails Available": "هیچ ایمیلی پیدا نشد",
    "Choose All Users": "انتخاب همه",
    "New User": "انتخاب کاربر جدید",
    id: "ایمیل",
    name: "نام",
    "All users are chosen": "همه کاربران انتخاب شده اند",
    user: "گیرنده",
    emails: "ایمیل ها",
    title: "عنوان",
    message: "پیام",
    "Enter Message to send": "متن پیام",
    Records: "آرشیو",
    "Send Message": "ارسال پیام",
    status: "وضعیت",
    response: "پیغام بازگشتی",
    email: "ایمیل",
    "Choose User": "هیچ کاربری انتخاب نشده",
  },
  sms: {
    full_name: "نام کاربر",
    email: "ایمیل",
    "if no date selected":
      "اگر هیچ زمانی انتخاب نشده باشد بصورت عانی ارسال می شود.",
    "You need to select at least 1 record":
      "باید حداقل یک شماره برای ارسال وارد کنید",
    view: "مشاهده گزارش",
    repeat: "ارسال دوباره",
    Reject: "رد شده",
    Success: "موفق",
    Pending: "در حال انجام",
    "No Mobile Available": "هیچ شماره ای پیدا نشد",
    "Choose All Users": "انتخاب همه",
    "New User": "انتخاب کاربر جدید",
    id: "شماره تلفن",
    mobiles: "شماره ها",
    name: "نام",
    "All users are chosen": "همه کاربران انتخاب شده اند",
    user: "گیرنده",
    users: "فرستنده / گیرنده",
    title: "عنوان",
    message: "پیام",
    "Enter Message to send": "متن پیام",
    Records: "آرشیو",
    "Send Message": "ارسال پیام",
    status: "وضعیت",
    response: "پیغام بازگشتی",
    date: "تاریخ ارسال",
    mobile: "تلفن",
    "Choose User": "هیچ کاربری انتخاب نشده",
  },
  crm: {
    view: "مشاهده گزارش",
    repeat: "ارسال دوباره",
    Reject: "رد شده",
    Success: "موفق",
    Pending: "در حال انجام",
    "No Mobile Available": "هیچ شماره ای پیدا نشد",
    "Choose All Users": "انتخاب همه کاربران",
    "New User": "انتخاب کاربر جدید",
    id: "شماره تلفن",
    mobiles: "شماره ها",
    name: "نام",
    "All users are chosen": "همه کاربران انتخاب شده اند",
    user: "گیرنده / فرستنده",
    title: "عنوان",
    message: "پیام",
    "Enter Message to send": "متن پیام",
    Records: "آرشیو",
    "Send Message": "ارسال پیام",
    status: "وضعیت",
    response: "پیغام بازگشتی",
    date: "تاریخ ارسال",
    mobile: "تلفن",
    "Choose User": "هیچ کاربری انتخاب نشده",
  },
  calendar: {
    access_user_ids: "کاربران شامل دسترسی",
    can_edit: "قابل ویرایش باشد",
    "for better experience scroll horizontally":
      "برای مشاهده بهتر پیمایش افقی کنید",
    start_date: "تاریخ شروع",
    end_date: "تاریخ پایان",
    description: "توضیحات",
    title: "عنوان",
    edit: "ویرایش رویداد",
    create: "ساخت رویداد",
  },
  slider: {
    name: "نام",
    key: "کلید",
    status: "وضعیت",
    images: "عکس ها",
    description: "توضیحات",
    name_panel: "نام",
    create: "اضافه کردن اسلایدر",
    edit: "ویرایش اسلایدر",
  },
  campaigns: {
    "extra_fields.show": "وضعیت نمایش",
    create: "اضافه کردن کمپین",
    edit: "ویرایش کمپین",
    "seo.title": "عنوان",
    "seo.url": "لینک",
    "seo.canonical_url": "لینک canonical",
    "seo.keywords": "کلیدواژه ها",
    "seo.redirect_url_301": "لینک ریدایرکت 301",
    "seo.robots_status": "وضعیت ربات ها",
    "seo.description": "توضیحات",
    "seo.redirect_url_404": "لینک ریدایرکت ۴۰۴",
    "extra_fields.title": "عنوان",
    "extra_fields.description": "توضیحات",
    "extra_fields.score": "نمره",
    "extra_fields.media": "تصویر",
    "extra_fields.has_timer": "تایمر داشته باشد",
    "extra_fields.cover_position": "منطقه کاور عکس",
    "extra_fields.cover": "کاور عکس",
    startAt: "شروع در",
    expireAt: "انقضا در",
  },
  gifts: {
    create: "اضافه کردن هدیه",
    edit: "ویرایش هدیه",
  },
  order: {
    not_set: "تایین نشده",
    reject: "رد شده",
    complete: "بسته شده",
    pending: "در صف برسی",
    packing: "پردازش در انبار",
    sending: "آماده ارسال",
    sent: "ارسال شده",
  },
  gateways: {
    sandBox: "Sand Box",
    terminalId: "Terminal ID",
    userName: "User Name",
    userPassword: "User Password",
  },
}
