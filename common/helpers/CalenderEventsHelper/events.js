const all_titles = {
    1: { "fa": "تاریخ افغانستان", "en": "Afghanistan" },
    2: { "fa": "تقویم ایران", "en": "Iran" },
    3: { "fa": "تاریخ ایران", "en": "Ancient Iran" },
    4: { "fa": "تقویم اسلامی ایران", "en": "Islamic Iran" },
    5: { "fa": "تقویم اسلامی افغانستان", "en": "Islamic Afghanistan" },
    6: { "fa": "تقویم میلادی", "en": "Gregorian Calendar" },
};

const PersianCalendar = [
    {
        "holiday": true, "month": 1, "day": 1, "type": 1,
        "title": "جشن نوروز"
    },

    {
        "holiday": true, "month": 1, "day": 2, "type": 1,
        "title": "جشن دهقان"
    },

    {
        "holiday": false, "month": 2, "day": 5, "type": 1,
        "title": "روز مطبوعات"
    },

    {
        "holiday": false, "month": 2, "day": 7, "type": 1,
        "title": "کودتای کمونیستی (سال ۱۳۵۷)"
    },

    {
        "holiday": true, "month": 2, "day": 8, "type": 1,
        "title": "پیروزی جهاد مقدس افغانستان"
    },

    {
        "holiday": false, "month": 2, "day": 16, "type": 1,
        "title": "روز قلم"
    },

    {
        "holiday": false, "month": 4, "day": 26, "type": 1,
        "title": "کودتای سردار محمد داود خان"
    },

    {
        "holiday": true, "month": 5, "day": 28, "type": 1,
        "title": "روز استرداد و استقلال افغانستان"
    },

    {
        "holiday": true, "month": 6, "day": 18, "type": 1,
        "title": "روز شهادت قهرمان ملی افغانستان"
    },

    {
        "holiday": false, "month": 7, "day": 16, "type": 1,
        "title": "روز هنر"
    },

    {
        "holiday": false, "month": 7, "day": 26, "type": 1,
        "title": "روز ترانسپورت و ترانزیت"
    },

    {
        "holiday": false, "month": 8, "day": 25, "type": 1,
        "title": "مطابق با (۱۶ نومبر) روز جهانی محصلان"
    },

    {
        "holiday": false, "month": 9, "day": 30, "type": 1,
        "title": "شب یلدا"
    },

    {
        "holiday": false, "month": 10, "day": 6, "type": 1,
        "title": "روز تجاوز قشون سرخ به افغانستان (سال ۱۳۵۸)"
    },

    {
        "holiday": false, "month": 10, "day": 14, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 15, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 16, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 17, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 18, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 19, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 10, "day": 20, "type": 1,
        "title": "هفته تجلیل از قانون اساسی"
    },

    {
        "holiday": false, "month": 11, "day": 1, "type": 1,
        "title": "مطابق با (۲۱ جنوری) روز بین‌المللی مبارزه با آلات انفجاری تعبیه‌شده"
    },

    {
        "holiday": false, "month": 11, "day": 10, "type": 1,
        "title": "روز متعاقدین"
    },

    {
        "holiday": true, "month": 11, "day": 26, "type": 1,
        "title": "روز شکست و خروج ارتش اتحاد جماهیر شوروی سوسیالیستی سابق از افغانستان"
    },

    {
        "holiday": false, "month": 12, "day": 3, "type": 1,
        "title": "روز تکبیر و قیام مردم کابل در برابر قشون سرخ"
    },

    {
        "holiday": false, "month": 12, "day": 9, "type": 1,
        "title": "روز سرباز"
    },

    {
        "holiday": false, "month": 12, "day": 20, "type": 1,
        "title": "روز حفاظت از میراث‌های فرهنگی کشور"
    },

    {
        "holiday": false, "month": 12, "day": 22, "type": 1,
        "title": "روز شهید وحدت ملی (۱۳۷۳)"
    },

    {
        "holiday": false, "month": 12, "day": 24, "type": 1,
        "title": "روز قیام مردم هرات در برابر حکومت خلقی و پرچمی"
    },

    // Iran

    {
        "holiday": true, "month": 1, "day": 1, "type": 2,
        "title": "آغاز عید نوروز"
    },

    {
        "holiday": true, "month": 1, "day": 2, "type": 2,
        "title": "عید نوروز"
    },

    {
        "holiday": false, "month": 1, "day": 2, "type": 2,
        "title": "هجوم به مدرسهٔ فیضیهٔ قم (۱۳۴۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 2, "type": 2,
        "title": "آغاز عملیات فتح‌المبین (۱۳۶۱ ه‍.ش)"
    },

    {
        "holiday": true, "month": 1, "day": 3, "type": 2,
        "title": "عید نوروز"
    },

    {
        "holiday": true, "month": 1, "day": 4, "type": 2,
        "title": "عید نوروز"
    },

    {
        "holiday": false, "month": 1, "day": 7, "type": 2,
        "title": "روز هنرهای نمایشی"
    },

    {
        "holiday": true, "month": 1, "day": 12, "type": 2,
        "title": "روز جمهوری اسلامی ایران"
    },

    {
        "holiday": true, "month": 1, "day": 13, "type": 2,
        "title": "روز طبیعت"
    },

    {
        "holiday": false, "month": 1, "day": 18, "type": 2,
        "title": "روز سلامتی"
    },

    {
        "holiday": false, "month": 1, "day": 20, "type": 2,
        "title": "روز ملی فناوری هسته‌ای"
    },

    {
        "holiday": false, "month": 1, "day": 20, "type": 2,
        "title": "روز هنر انقلاب اسلامی"
    },

    {
        "holiday": false, "month": 1, "day": 20, "type": 2,
        "title": "شهادت سید مرتضی آوینی (۱۳۷۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 21, "type": 2,
        "title": "شهادت امیر سپهبد علی صیاد شیرازی (۱۳۷۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 21, "type": 2,
        "title": "سالروز افتتاح حساب شمارهٔ ۱۰۰ و تأسیس بنیاد مسکن انقلاب اسلامی (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 25, "type": 2,
        "title": "روز بزرگداشت عطار نیشابوری"
    },

    {
        "holiday": false, "month": 1, "day": 29, "type": 2,
        "title": "روز ارتش جمهوری اسلامی و نیروی زمینی"
    },

    {
        "holiday": false, "month": 2, "day": 1, "type": 2,
        "title": "روز بزرگداشت سعدی"
    },

    {
        "holiday": false, "month": 2, "day": 2, "type": 2,
        "title": "تأسیس سپاه پاسداران انقلاب اسلامی (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 2, "type": 2,
        "title": "اعلام انقلاب فرهنگی (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 3, "type": 2,
        "title": "روز بزرگداشت شیخ بهایی"
    },

    {
        "holiday": false, "month": 2, "day": 5, "type": 2,
        "title": "شکست حملهٔ نظامی آمریکا به ایران در طبس (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 9, "type": 2,
        "title": "روز شوراها"
    },

    {
        "holiday": false, "month": 2, "day": 10, "type": 2,
        "title": "روز ملی خلیج فارس"
    },

    {
        "holiday": false, "month": 2, "day": 12, "type": 2,
        "title": "شهادت استاد مرتضی مطهری (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 12, "type": 2,
        "title": "روز معلم"
    },

    {
        "holiday": false, "month": 2, "day": 15, "type": 2,
        "title": "روز بزرگداشت شیخ صدوق"
    },

    {
        "holiday": false, "month": 2, "day": 18, "type": 2,
        "title": "روز بیماری‌های خاص و صعب‌العلاج"
    },

    {
        "holiday": false, "month": 2, "day": 19, "type": 2,
        "title": "روز بزرگداشت شیخ کلینی"
    },

    {
        "holiday": false, "month": 2, "day": 24, "type": 2,
        "title": "لغو امتیاز تنباکو به فتوای آیت‌الله میرزا حسن شیرازی (۱۲۷۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 25, "type": 2,
        "title": "روز پاسداشت زبان فارسی و بزرگداشت حکیم ابوالقاسم فردوسی"
    },

    {
        "holiday": false, "month": 2, "day": 28, "type": 2,
        "title": "روز بزرگداشت حکیم عمر خیام"
    },

    {
        "holiday": false, "month": 2, "day": 30, "type": 2,
        "title": "روز ملی جمعیت"
    },

    {
        "holiday": false, "month": 2, "day": 31, "type": 2,
        "title": "روز اهدای عضو، اهدای زندگی"
    },

    {
        "holiday": false, "month": 3, "day": 1, "type": 2,
        "title": "روز بهره‌وری و بهینه‌سازی مصرف"
    },

    {
        "holiday": false, "month": 3, "day": 1, "type": 2,
        "title": "روز بزرگداشت ملاصدرا (صدرالمتألهین)"
    },

    {
        "holiday": false, "month": 3, "day": 3, "type": 2,
        "title": "فتح خرمشهر در عملیات بیت‌المقدس (۱۳۶۱ ه‍.ش) و روز مقاومت، ایثار و پیروزی"
    },

    {
        "holiday": false, "month": 3, "day": 4, "type": 2,
        "title": "روز دزفول"
    },

    {
        "holiday": false, "month": 3, "day": 4, "type": 2,
        "title": " روز مقاومت و پایداری"
    },

    {
        "holiday": true, "month": 3, "day": 14, "type": 2,
        "title": "رحلت امام خمینی رهبر انقلاب اسلامی (۱۳۶۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 14, "type": 2,
        "title": "انتخاب آیت‌الله خامنه‌ای به رهبری (۱۳۶۸ ه‍.ش)"
    },

    {
        "holiday": true, "month": 3, "day": 15, "type": 2,
        "title": "قیام خونین ۱۵ خرداد (۱۳۴۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 26, "type": 2,
        "title": "شهادت بخارایی، امانی، صفار هرندی و نیک‌نژاد از اعضای فدائیان اسلام (۱۳۴۴ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 27, "type": 2,
        "title": "روز جهاد کشاورزی (تشکیل جهاد سازندگی، ۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 29, "type": 2,
        "title": "درگذشت دکتر علی شریعتی (۱۳۵۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 31, "type": 2,
        "title": "شهادت دکتر مصطفی چمران (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 31, "type": 2,
        "title": "روز بسیج استادان"
    },

    {
        "holiday": false, "month": 4, "day": 1, "type": 2,
        "title": "روز تبلیغ و اطلاع‌رسانی دینی (تأسیس سازمان تبلیغات اسلامی ۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 1, "type": 2,
        "title": "روز اصناف"
    },

    {
        "holiday": false, "month": 4, "day": 7, "type": 2,
        "title": "شهادت آیت‌الله دکتر بهشتی و ۷۲ تن از یاران (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 7, "type": 2,
        "title": "روز قوهٔ قضاییه"
    },

    {
        "holiday": false, "month": 4, "day": 8, "type": 2,
        "title": "روز مبارزه با سلاح‌های شیمیایی و میکروبی"
    },

    {
        "holiday": false, "month": 4, "day": 10, "type": 2,
        "title": "روز صنعت و معدن"
    },

    {
        "holiday": false, "month": 4, "day": 11, "type": 2,
        "title": "شهادت آیت‌الله صدوقی (۱۳۶۱ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 12, "type": 2,
        "title": "حملهٔ ناوگان آمریکا به هواپیمای مسافربری ایران (۱۳۶۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 12, "type": 2,
        "title": "روز افشای حقوق بشر آمریکایی"
    },

    {
        "holiday": false, "month": 4, "day": 14, "type": 2,
        "title": "روز شهرداری و دهیاری"
    },

    {
        "holiday": false, "month": 4, "day": 14, "type": 2,
        "title": "روز قلم"
    },

    {
        "holiday": false, "month": 4, "day": 18, "type": 2,
        "title": "روز ادبیات کودکان و نوجوانان"
    },

    {
        "holiday": false, "month": 4, "day": 21, "type": 2,
        "title": "روز عفاف و حجاب"
    },

    {
        "holiday": false, "month": 4, "day": 23, "type": 2,
        "title": "روز گفت‌وگو و تعامل سازنده با جهان"
    },

    {
        "holiday": false, "month": 4, "day": 25, "type": 2,
        "title": "روز بهزیستی و تامین اجتماعی"
    },

    {
        "holiday": false, "month": 4, "day": 26, "type": 2,
        "title": "سالروز تأسیس نهاد شورای نگهبان"
    },

    {
        "holiday": false, "month": 5, "day": 5, "type": 2,
        "title": "سالروز عملیات مرصاد (۱۳۶۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 9, "type": 2,
        "title": "روز اهدای خون"
    },

    {
        "holiday": false, "month": 5, "day": 14, "type": 2,
        "title": "صدور فرمان مشروطیت (۱۲۸۵ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 14, "type": 2,
        "title": "روز حقوق بشر اسلامی و کرامت انسانی"
    },

    {
        "holiday": false, "month": 5, "day": 16, "type": 2,
        "title": "تشکیل جهاد دانشگاهی (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 17, "type": 2,
        "title": "روز خبرنگار"
    },

    {
        "holiday": false, "month": 5, "day": 21, "type": 2,
        "title": "روز حمایت از صنایع کوچک"
    },

    {
        "holiday": false, "month": 5, "day": 22, "type": 2,
        "title": "روز تشکل‌ها و مشارکت‌های اجتماعی"
    },

    {
        "holiday": false, "month": 5, "day": 23, "type": 2,
        "title": "روز مقاومت اسلامی"
    },

    {
        "holiday": false, "month": 5, "day": 26, "type": 2,
        "title": "آغاز بازگشت آزادگان به ایران (۱۳۶۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 28, "type": 2,
        "title": "کودتای ۲۸ مرداد (۱۳۳۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 28, "type": 2,
        "title": "آتش‌سوزی سینما رکس آبادان (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 30, "type": 2,
        "title": "روز بزرگداشت علامه مجلسی"
    },

    {
        "holiday": false, "month": 6, "day": 1, "type": 2,
        "title": "روز بزرگداشت ابوعلی سینا"
    },

    {
        "holiday": false, "month": 6, "day": 1, "type": 2,
        "title": "روز پزشک"
    },

    {
        "holiday": false, "month": 6, "day": 2, "type": 2,
        "title": "آغاز هفتهٔ دولت"
    },

    {
        "holiday": false, "month": 6, "day": 2, "type": 2,
        "title": "شهادت سید علی اندرزگو (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 4, "type": 2,
        "title": "روز کارمند"
    },

    {
        "holiday": false, "month": 6, "day": 5, "type": 2,
        "title": "روز بزرگداشت محمد بن زکریای رازی"
    },

    {
        "holiday": false, "month": 6, "day": 5, "type": 2,
        "title": "روز داروسازی"
    },

    {
        "holiday": false, "month": 6, "day": 5, "type": 2,
        "title": "روز کشتی"
    },

    {
        "holiday": false, "month": 6, "day": 8, "type": 2,
        "title": "روز مبارزه با تروریسم (انفجار دفتر نخست‌وزیری و شهادت رجایی و باهنر - ۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 12, "type": 2,
        "title": "روز مبارزه با استعمار انگلیس (سالروز شهادت رئیس‌علی دلواری)"
    },

    {
        "holiday": false, "month": 6, "day": 13, "type": 2,
        "title": "روز تعاون"
    },

    {
        "holiday": false, "month": 6, "day": 13, "type": 2,
        "title": "روز بزرگداشت ابوریحان بیرونی"
    },

    {
        "holiday": false, "month": 6, "day": 14, "type": 2,
        "title": "شهادت آیت‌الله قدوسی و سرتیپ وحید دستجردی (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 17, "type": 2,
        "title": "قیام ۱۷ شهریور و کشتار جمعی از مردم به دست مأموران پهلوی (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 19, "type": 2,
        "title": "وفات آیت‌الله سید محمود طالقانی اولین امام جمعهٔ تهران (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 20, "type": 2,
        "title": "شهادت آیت‌الله مدنی (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 21, "type": 2,
        "title": "روز سینما"
    },

    {
        "holiday": false, "month": 6, "day": 27, "type": 2,
        "title": "روز شعر و ادب فارسی"
    },

    {
        "holiday": false, "month": 6, "day": 27, "type": 2,
        "title": "روز بزرگداشت استاد سید محمدحسین شهریار"
    },

    {
        "holiday": false, "month": 6, "day": 31, "type": 2,
        "title": "آغاز جنگ تحمیلی (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 31, "type": 2,
        "title": "آغاز هفتهٔ دفاع مقدس"
    },

    {
        "holiday": false, "month": 7, "day": 5, "type": 2,
        "title": "شکست حصر آبادان در عملیات ثامن‌الأئمه (ع) (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 7, "day": 7, "type": 2,
        "title": "روز بزرگداشت فرماندهان شهید دفاع مقدس"
    },

    {
        "holiday": false, "month": 7, "day": 7, "type": 2,
        "title": "شهادت فلاحی، فکوری، نامجو، کلاهدوز و جهان‌آرا از فرماندهان ارتش و سپاه (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 7, "day": 7, "type": 2,
        "title": "روز آتش‌نشانی و ایمنی"
    },

    {
        "holiday": false, "month": 7, "day": 7, "type": 2,
        "title": "روز بزرگداشت شمس"
    },

    {
        "holiday": false, "month": 7, "day": 8, "type": 2,
        "title": "روز بزرگداشت مولوی"
    },

    {
        "holiday": false, "month": 7, "day": 9, "type": 2,
        "title": "روز همبستگی و همدردی با کودکان و نوجوانان فلسطینی"
    },

    {
        "holiday": false, "month": 7, "day": 13, "type": 2,
        "title": "هجرت امام خمینی از عراق به پاریس (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 7, "day": 13, "type": 2,
        "title": "روز نیروی انتظامی"
    },

    {
        "holiday": false, "month": 7, "day": 14, "type": 2,
        "title": "روز دامپزشکی"
    },

    {
        "holiday": false, "month": 7, "day": 15, "type": 2,
        "title": "روز روستا و عشایر"
    },

    {
        "holiday": false, "month": 7, "day": 20, "type": 2,
        "title": "روز بزرگداشت حافظ"
    },

    {
        "holiday": false, "month": 7, "day": 23, "type": 2,
        "title": "شهادت آیت‌الله اشرفی اصفهانی (۱۳۶۱ ه‍.ش)"
    },

    {
        "holiday": false, "month": 7, "day": 24, "type": 2,
        "title": "روز ملی پارالمپیک"
    },

    {
        "holiday": false, "month": 7, "day": 26, "type": 2,
        "title": "روز تربیت بدنی و ورزش"
    },

    {
        "holiday": false, "month": 8, "day": 4, "type": 2,
        "title": "اعتراض امام خمینی علیه پذیرش کاپیتولاسیون (۱۳۴۳ ه‍.ش)"
    },

    {
        "holiday": false, "month": 8, "day": 8, "type": 2,
        "title": "شهادت محمد حسین فهمیده (بسیجی ۱۳ ساله)"
    },

    {
        "holiday": false, "month": 8, "day": 8, "type": 2,
        "title": "روز نوجوان و بسیج دانش‌آموزی"
    },

    {
        "holiday": false, "month": 8, "day": 10, "type": 2,
        "title": "شهادت آیت‌الله قاضی طباطبایی (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 8, "day": 13, "type": 2,
        "title": "تسخیر سفارت آمریکا (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 8, "day": 13, "type": 2,
        "title": "روز ملی مبارزه با استکبار جهانی"
    },

    {
        "holiday": false, "month": 8, "day": 13, "type": 2,
        "title": "روز دانش‌آموز"
    },

    {
        "holiday": false, "month": 8, "day": 14, "type": 2,
        "title": "روز فرهنگ عمومی"
    },

    {
        "holiday": false, "month": 8, "day": 24, "type": 2,
        "title": "روز کتاب، کتابخوانی و کتابدار"
    },

    {
        "holiday": false, "month": 8, "day": 24, "type": 2,
        "title": "روز بزرگداشت آیت‌الله علامه سید محمد حسین طباطبایی (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 5, "type": 2,
        "title": "سالروز قیام مردم گرگان (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 5, "type": 2,
        "title": "تشکیل بسیج مستضعفان (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 7, "type": 2,
        "title": "روز نیروی دریایی"
    },

    {
        "holiday": false, "month": 9, "day": 9, "type": 2,
        "title": "روز بزرگداشت شیخ مفید"
    },

    {
        "holiday": false, "month": 9, "day": 10, "type": 2,
        "title": "شهادت آیت‌الله سید حسن مدرس (۱۳۱۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 10, "type": 2,
        "title": "روز مجلس"
    },

    {
        "holiday": false, "month": 9, "day": 12, "type": 2,
        "title": "روز قانون اساسی جمهوری اسلامی ایران (تصویب قانون اساسی جمهوری اسلامی ایران - ۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 16, "type": 2,
        "title": "روز دانشجو"
    },

    {
        "holiday": false, "month": 9, "day": 19, "type": 2,
        "title": "تشکیل شورای عالی انقلاب فرهنگی (۱۳۶۳ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 20, "type": 2,
        "title": "شهادت آیت‌الله دستغیب (۱۳۶۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 25, "type": 2,
        "title": "روز پژوهش"
    },

    {
        "holiday": false, "month": 9, "day": 27, "type": 2,
        "title": "شهادت آیت‌الله دکتر محمد مفتح (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 27, "type": 2,
        "title": "روز وحدت حوزه و دانشگاه"
    },

    {
        "holiday": false, "month": 9, "day": 30, "type": 2,
        "title": "شب یلدا (چله)"
    },

    {
        "holiday": false, "month": 10, "day": 5, "type": 2,
        "title": "روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی"
    },

    {
        "holiday": false, "month": 10, "day": 7, "type": 2,
        "title": "تشکیل نهضت سوادآموزی (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 19, "type": 2,
        "title": "قیام خونین مردم قم (۱۳۵۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 20, "type": 2,
        "title": "شهادت میرزاتقی‌خان امیرکبیر (۱۲۳۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 22, "type": 2,
        "title": "تشکیل شورای انقلاب (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 26, "type": 2,
        "title": "خروج شاه از ایران (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 27, "type": 2,
        "title": "شهادت نواب صفوی، طهماسبی، برادران واحدی و ذوالقدر از اعضای فداییان اسلام (۱۳۳۴ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 29, "type": 2,
        "title": "روز غزه"
    },

    {
        "holiday": false, "month": 11, "day": 6, "type": 2,
        "title": "سالروز حماسهٔ مردم آمل"
    },

    {
        "holiday": false, "month": 11, "day": 12, "type": 2,
        "title": "بازگشت امام خمینی به ایران (۱۳۵۷ ه‍.ش) و آغاز دههٔ فجر انقلاب اسلامی"
    },

    {
        "holiday": false, "month": 11, "day": 14, "type": 2,
        "title": "روز فناوری فضایی"
    },

    {
        "holiday": false, "month": 11, "day": 19, "type": 2,
        "title": "روز نیروی هوایی"
    },

    {
        "holiday": true, "month": 11, "day": 22, "type": 2,
        "title": "پیروزی انقلاب اسلامی ایران و سقوط نظام شاهنشاهی (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 11, "day": 29, "type": 2,
        "title": "قیام مردم تبریز به مناسبت چهلمین روز شهادت شهدای قم (۱۳۵۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 11, "day": 29, "type": 2,
        "title": "روز اقتصاد مقاومتی و کارآفرینی"
    },

    {
        "holiday": false, "month": 12, "day": 5, "type": 2,
        "title": "روز بزرگداشت خواجه نصیرالدین طوسی"
    },

    {
        "holiday": false, "month": 12, "day": 5, "type": 2,
        "title": "روز مهندسی"
    },

    {
        "holiday": false, "month": 12, "day": 14, "type": 2,
        "title": "روز احسان و نیکوکاری"
    },

    {
        "holiday": false, "month": 12, "day": 15, "type": 2,
        "title": "روز درختکاری"
    },

    {
        "holiday": false, "month": 12, "day": 18, "type": 2,
        "title": "روز بزرگداشت سید جمال‌الدین اسدآبادی"
    },

    {
        "holiday": false, "month": 12, "day": 18, "type": 2,
        "title": "سالروز تأسیس کانون‌های فرهنگی و هنری مساجد کشور"
    },

    {
        "holiday": false, "month": 12, "day": 20, "type": 2,
        "title": "روز راهیان نور"
    },

    {
        "holiday": false, "month": 12, "day": 21, "type": 2,
        "title": "روز بزرگداشت نظامی گنجوی"
    },

    {
        "holiday": false, "month": 12, "day": 22, "type": 2,
        "title": "روز بزرگداشت شهدا (تأسیس بنیاد شهید انقلاب اسلامی - ۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 12, "day": 25, "type": 2,
        "title": "روز بزرگداشت پروین اعتصامی"
    },

    {
        "holiday": true, "month": 12, "day": 29, "type": 2,
        "title": "روز ملی شدن صنعت نفت ایران (۱۳۲۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 10, "type": 2,
        "title": "همه‌پرسی تغییر نظام شاهنشاهی به جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 15, "type": 2,
        "title": "روز ذخایر ژنتیکی و زیستی"
    },

    {
        "holiday": false, "month": 1, "day": 19, "type": 2,
        "title": "شهادت آیت‌الله سید محمد باقر صدر و خواهرشان بنت‌الهدی (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 20, "type": 2,
        "title": "قطع مناسبات سیاسی ایران و آمریکا (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 2, "type": 2,
        "title": "روز زمین پاک"
    },

    {
        "holiday": false, "month": 2, "day": 7, "type": 2,
        "title": "روز ایمنی حمل‌ونقل"
    },

    {
        "holiday": false, "month": 2, "day": 10, "type": 2,
        "title": "آغاز عملیات بیت المقدس (۱۳۶۱ ه‍.ش)"
    },

    {
        "holiday": false, "month": 2, "day": 11, "type": 2,
        "title": "روز جهانی کارگر (۱ مه)"
    },

    {
        "holiday": false, "month": 2, "day": 19, "type": 2,
        "title": "روز اسناد ملی و میراث مکتوب"
    },

    {
        "holiday": false, "month": 3, "day": 5, "type": 2,
        "title": "روز نسیم مهر (روز حمایت از خانوادهٔ زندانیان)"
    },

    {
        "holiday": false, "month": 3, "day": 7, "type": 2,
        "title": "افتتاح اولین دورهٔ مجلس شورای اسلامی (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 15, "type": 2,
        "title": "زندانی شدن امام خمینی (۱۳۴۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 20, "type": 2,
        "title": "شهادت آیت‌الله سعیدی (۱۳۴۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 3, "day": 25, "type": 2,
        "title": "روز گل و گیاه"
    },

    {
        "holiday": false, "month": 3, "day": 30, "type": 2,
        "title": "شهادت زائران حرم رضوی (ع) (عاشورای ۱۳۷۳ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 10, "type": 2,
        "title": "روز آزادسازی شهر مهران"
    },

    {
        "holiday": false, "month": 4, "day": 12, "type": 2,
        "title": "روز بزرگداشت علامه امینی (۱۳۴۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 16, "type": 2,
        "title": "روز مالیات"
    },

    {
        "holiday": false, "month": 4, "day": 21, "type": 2,
        "title": "کشف توطئهٔ کودتا در پایگاه هوایی شهید نوژه (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 18, "type": 2,
        "title": "کشف کودتای نوژه (۱۳۵۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 21, "type": 2,
        "title": "حمله به مسجد گوهرشاد و کشتار مردم (۱۳۱۴ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 23, "type": 2,
        "title": "گشایش نخستین مجلس خبرگان رهبری (۱۳۶۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 27, "type": 2,
        "title": "اعلام پذیرش قطعنامهٔ ۵۹۸ شورای امنیت از سوی ایران (۱۳۶۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 4, "day": 30, "type": 2,
        "title": "روز بزرگداشت آیت‌الله سیدابوالقاسم کاشانی"
    },

    {
        "holiday": false, "month": 5, "day": 6, "type": 2,
        "title": "روز کارآفرینی و آموزش‌های فنی و حرفه‌ای"
    },

    {
        "holiday": false, "month": 5, "day": 8, "type": 2,
        "title": "روز بزرگداشت شیخ شهاب‌الدین سهروردی (شیخ اشراق)"
    },

    {
        "holiday": false, "month": 5, "day": 11, "type": 2,
        "title": "شهادت آیت‌الله شیخ فضل‌الله نوری (۱۲۸۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 28, "type": 2,
        "title": "گشایش مجلس خبرگان برای بررسی نهایی قانون اساسی جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 5, "day": 31, "type": 2,
        "title": "روز صنعت دفاعی"
    },

    {
        "holiday": false, "month": 6, "day": 3, "type": 2,
        "title": "اشغال ایران به دست متفقین (۱۳۲۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 10, "type": 2,
        "title": "تصویب قانون عملیات بانکی بدون ربا (۱۳۶۲ ه‍.ش)"
    },

    {
        "holiday": false, "month": 6, "day": 10, "type": 2,
        "title": "روز بانکداری اسلامی"
    },

    {
        "holiday": false, "month": 6, "day": 11, "type": 2,
        "title": "روز صنعت چاپ"
    },

    {
        "holiday": false, "month": 6, "day": 12, "type": 2,
        "title": "روز بهورز"
    },

    {
        "holiday": false, "month": 6, "day": 13, "type": 2,
        "title": "روز مردم‌شناسی"
    },

    {
        "holiday": false, "month": 6, "day": 30, "type": 2,
        "title": "روز گفت‌وگوی تمدن‌ها"
    },

    {
        "holiday": false, "month": 7, "day": 20, "type": 2,
        "title": "روز اسکان معلولان و سالمندان"
    },

    {
        "holiday": false, "month": 7, "day": 24, "type": 2,
        "title": "روز پیوند اولیا و مربیان"
    },

    {
        "holiday": false, "month": 7, "day": 24, "type": 2,
        "title": "به آتش کشیده‌شدن مسجد جامع شهر کرمان (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 7, "day": 29, "type": 2,
        "title": "روز صادرات"
    },

    {
        "holiday": false, "month": 8, "day": 1, "type": 2,
        "title": "شهادت آیت‌الله حاج سید مصطفی خمینی (۱۳۵۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 8, "day": 1, "type": 2,
        "title": "روز آمار و برنامه‌ریزی"
    },

    {
        "holiday": false, "month": 8, "day": 8, "type": 2,
        "title": "روز پدافند غیرعامل"
    },

    {
        "holiday": false, "month": 8, "day": 13, "type": 2,
        "title": "تبعید امام خمینی از ایران به ترکیه (۱۳۴۳ ه‍.ش)"
    },

    {
        "holiday": false, "month": 8, "day": 18, "type": 2,
        "title": "روز کیفیت"
    },

    {
        "holiday": false, "month": 8, "day": 26, "type": 2,
        "title": "آزادسازی سوسنگرد"
    },

    {
        "holiday": false, "month": 9, "day": 11, "type": 2,
        "title": "شهادت میرزا کوچک خان جنگلی (۱۳۰۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 13, "type": 2,
        "title": "روز بیمه"
    },

    {
        "holiday": false, "month": 9, "day": 18, "type": 2,
        "title": "معرفی عراق به عنوان مسئول و آغازگر جنگ از سوی سازمان ملل (۱۳۷۰ ه‍.ش)"
    },

    {
        "holiday": false, "month": 9, "day": 26, "type": 2,
        "title": "روز حمل و نقل و رانندگان"
    },

    {
        "holiday": false, "month": 9, "day": 29, "type": 2,
        "title": "روز تجلیل از شهید تندگویان"
    },

    {
        "holiday": false, "month": 10, "day": 3, "type": 2,
        "title": "روز ثبت احوال"
    },

    {
        "holiday": false, "month": 10, "day": 7, "type": 2,
        "title": "شهادت آیت‌الله حسین غفاری (۱۳۵۳ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 8, "type": 2,
        "title": "روز صنعت پتروشیمی"
    },

    {
        "holiday": false, "month": 10, "day": 9, "type": 2,
        "title": "۹ دی"
    },

    {
        "holiday": false, "month": 10, "day": 13, "type": 2,
        "title": "ابلاغ پیام تاریخی امام خمینی به گورباچف رهبر شوروی سابق (۱۳۶۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 10, "day": 17, "type": 2,
        "title": "اجرای طرح حذف حجاب (۱۳۱۴ ه‍.ش)"
    },

    {
        "holiday": false, "month": 11, "day": 5, "type": 2,
        "title": "انتخابات اولین دورهٔ ریاست جمهوری (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 11, "day": 21, "type": 2,
        "title": "شکسته شدن حکومت نظامی به فرمان امام خمینی (۱۳۵۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 11, "day": 25, "type": 2,
        "title": "صدور حکم امام خمینی مبنی بر ارتداد سلمان رشدی (۱۳۶۷ ه‍.ش)"
    },

    {
        "holiday": false, "month": 12, "day": 3, "type": 2,
        "title": "کودتای رضاخان (۱۲۹۹ ه‍.ش)"
    },

    {
        "holiday": false, "month": 12, "day": 8, "type": 2,
        "title": "روز امور تربیتی و تربیت اسلامی"
    },

    {
        "holiday": false, "month": 12, "day": 9, "type": 2,
        "title": "روز ملی حمایت از حقوق مصرف‌کنندگان"
    },

    {
        "holiday": false, "month": 12, "day": 24, "type": 2,
        "title": "برگزاری انتخابات اولین دورهٔ مجلس شورای اسلامی (۱۳۵۸ ه‍.ش)"
    },

    {
        "holiday": false, "month": 12, "day": 25, "type": 2,
        "title": "بمباران شیمیایی حلبچه توسط ارتش بعث عراق (۱۳۶۶ ه‍.ش)"
    },

    {
        "holiday": false, "month": 1, "day": 6, "type": 3,
        "title": "روز امید، روز شادباش‌نویسی"
    },

    {
        "holiday": false, "month": 1, "day": 10, "type": 3,
        "title": "جشن آبانگاه"
    },

    {
        "holiday": false, "month": 1, "day": 13, "type": 3,
        "title": "جشن سیزده‌بدر"
    },

    {
        "holiday": false, "month": 1, "day": 17, "type": 3,
        "title": "سروش‌روز، جشن سروشگان"
    },

    {
        "holiday": false, "month": 1, "day": 19, "type": 3,
        "title": "فرورین‌روز، جشن فروردینگان"
    },

    {
        "holiday": false, "month": 2, "day": 2, "type": 3,
        "title": "جشن گیاه‌آوری"
    },

    {
        "holiday": false, "month": 2, "day": 3, "type": 3,
        "title": "اردیبهشت‌روز، جشن اردیبهشتگان"
    },

    {
        "holiday": false, "month": 2, "day": 10, "type": 3,
        "title": "جشن چهلم نوروز"
    },

    {
        "holiday": false, "month": 2, "day": 15, "type": 3,
        "title": "گاهنبار میدیوزَرِم، جشن میانهٔ بهار، جشن بهاربُد / روز پیام‌آوری زرتشت"
    },

    {
        "holiday": false, "month": 3, "day": 1, "type": 3,
        "title": "ارغاسوان، جشن گرما"
    },

    {
        "holiday": false, "month": 3, "day": 6, "type": 3,
        "title": "خردادروز، جشن خردادگان"
    },

    {
        "holiday": false, "month": 4, "day": 1, "type": 3,
        "title": "جشن آب‌پاشونک، جشن آغاز تابستان / سال نو در گاهشماری گاهنباری / دیدار طلوع خورشید در تقویم آفتابی چارتاقی نیاسر"
    },

    {
        "holiday": false, "month": 4, "day": 6, "type": 3,
        "title": "جشن نیلوفر"
    },

    {
        "holiday": false, "month": 4, "day": 13, "type": 3,
        "title": "تیرروز، جشن تیرگان"
    },

    {
        "holiday": false, "month": 4, "day": 15, "type": 3,
        "title": "جشن خام‌خواری"
    },

    {
        "holiday": false, "month": 5, "day": 7, "type": 3,
        "title": "مردادروز، جشن مردادگان"
    },

    {
        "holiday": false, "month": 5, "day": 10, "type": 3,
        "title": "جشن چلهٔ تابستان"
    },

    {
        "holiday": false, "month": 5, "day": 15, "type": 3,
        "title": "گاهنبار میدیوشِم، جشن میانهٔ تابستان"
    },

    {
        "holiday": false, "month": 5, "day": 18, "type": 3,
        "title": "جشن مَی‌خواره"
    },

    {
        "holiday": false, "month": 6, "day": 1, "type": 3,
        "title": "فغدیه، جشن خنکی هوا"
    },

    {
        "holiday": false, "month": 6, "day": 3, "type": 3,
        "title": "جشن کشمین"
    },

    {
        "holiday": false, "month": 6, "day": 4, "type": 3,
        "title": "شهریورروز، جشن شهریورگان / زادروز داراب (کوروش) / عروج مانی"
    },

    {
        "holiday": false, "month": 6, "day": 8, "type": 3,
        "title": "خزان‌جشن"
    },

    {
        "holiday": false, "month": 6, "day": 15, "type": 3,
        "title": "بازارجشن"
    },

    {
        "holiday": false, "month": 6, "day": 31, "type": 3,
        "title": "گاهنبار پَتیَه‌شَهیم، جشن پایان تابستان"
    },

    {
        "holiday": false, "month": 7, "day": 1, "type": 3,
        "title": "جشن میتراکانا / سال نو هخامنشی"
    },

    {
        "holiday": false, "month": 7, "day": 12, "type": 3,
        "title": "آیین قالیشویان اردهال، بازماندی از تیرگان"
    },

    {
        "holiday": false, "month": 7, "day": 13, "type": 3,
        "title": "تیرروز، جشن تیرروزی"
    },

    {
        "holiday": false, "month": 7, "day": 16, "type": 3,
        "title": "مهرروز، جشن مهرگان"
    },

    {
        "holiday": false, "month": 7, "day": 21, "type": 3,
        "title": "رام‌روز، جشن رام‌روزی / جشن پیروزی کاوه و فریدون"
    },

    {
        "holiday": false, "month": 8, "day": 7, "type": 3,
        "title": " روز کوروش بزرگ"
    },

    {
        "holiday": false, "month": 8, "day": 10, "type": 3,
        "title": "آبان‌روز، جشن آبانگان"
    },

    {
        "holiday": false, "month": 8, "day": 15, "type": 3,
        "title": "گاهنبار اَیاثرَم، جشن میانهٔ پاییز"
    },

    {
        "holiday": false, "month": 9, "day": 1, "type": 3,
        "title": "آذرجشن"
    },

    {
        "holiday": false, "month": 9, "day": 9, "type": 3,
        "title": "آذرروز، جشن آذرگان"
    },

    {
        "holiday": false, "month": 9, "day": 30, "type": 3,
        "title": "گاهنبار میدیارِم، جشن میانهٔ سال گاهنباری (از مبدأ آغاز تابستان)"
    },

    {
        "holiday": false, "month": 10, "day": 1, "type": 3,
        "title": "روز میلاد خورشید، جشن خرم‌روز / نخستین جشن دیگان / دیدار طلوع خورشید در تقویم آفتابی چارتاقی نیاسر"
    },

    {
        "holiday": false, "month": 10, "day": 5, "type": 3,
        "title": "بازارجشن"
    },

    {
        "holiday": false, "month": 10, "day": 8, "type": 3,
        "title": "دی‌به‌آذرروز، دومین جشن دیگان"
    },

    {
        "holiday": false, "month": 10, "day": 14, "type": 3,
        "title": "سیرسور، جشن گیاه‌خواری"
    },

    {
        "holiday": false, "month": 10, "day": 15, "type": 3,
        "title": "جشن پیکرتراشی / دی‌به‌مهرروز، سومین جشن دیگان"
    },

    {
        "holiday": false, "month": 10, "day": 16, "type": 3,
        "title": "جشن درامزینان، جشن درفش‌ها"
    },

    {
        "holiday": false, "month": 10, "day": 23, "type": 3,
        "title": "دی‌به‌دین‌روز، چهارمین جشن دیگان"
    },

    {
        "holiday": false, "month": 11, "day": 1, "type": 3,
        "title": "زادروز فردوسی"
    },

    {
        "holiday": false, "month": 11, "day": 2, "type": 3,
        "title": "بهمن‌روز، جشن بهمنگان"
    },

    {
        "holiday": false, "month": 11, "day": 4, "type": 3,
        "title": "شهریورروز، آغاز پادشاهی داراب (کوروش)"
    },

    {
        "holiday": false, "month": 11, "day": 5, "type": 3,
        "title": "جشن نوسَره"
    },

    {
        "holiday": false, "month": 11, "day": 10, "type": 3,
        "title": "آبان‌روز، جشن سَدَه، آتش‌افروزی بر بام‌ها / نمایش‌بازی همگانی"
    },

    {
        "holiday": false, "month": 11, "day": 15, "type": 3,
        "title": "جشن میانهٔ زمستان"
    },

    {
        "holiday": false, "month": 11, "day": 22, "type": 3,
        "title": "بادروز، جشن بادروزی"
    },

    {
        "holiday": false, "month": 12, "day": 1, "type": 3,
        "title": "جشن اسفندی / جشن آبسالان، بهارجشن / نمایش‌بازی همگانی"
    },

    {
        "holiday": false, "month": 12, "day": 5, "type": 3,
        "title": "اسفندروز، جشن اسفندگان، گرامیداشت زمین و بانوان / جشن برزگران"
    },

    {
        "holiday": false, "month": 12, "day": 10, "type": 3,
        "title": "جشن وخشنکام"
    },

    {
        "holiday": false, "month": 12, "day": 19, "type": 3,
        "title": "جشن نوروز رودها"
    },

    {
        "holiday": false, "month": 12, "day": 20, "type": 3,
        "title": "جشن گلدان"
    },

    {
        "holiday": false, "month": 12, "day": 25, "type": 3,
        "title": "هزارهٔ شاهنامه، هزارمین سالگرد پایان سرایش شاهنامهٔ فردوسی"
    },

    {
        "holiday": false, "month": 12, "day": 26, "type": 3,
        "title": "فروردگان"
    },

    {
        "holiday": false, "month": 12, "day": 29, "type": 3,
        "title": "گاهنبار هَمَسپَتمَدَم، جشن پایان زمستان (در آخرین روز سال) / جشن اوشیدر (نجات‌بخش ایرانی) در دریاچهٔ هامون و کوه خواجه / آتش‌افروزی بر بام‌ها در استقبال از نوروز"
    },

    {
        "holiday": false, "month": 1, "day": 6, "type": 3,
        "title": "روز تولد زرتشت"
    },

    {
        "holiday": false, "month": 10, "day": 5, "type": 3,
        "title": "روز درگذشت زرتشت"
    },

    {
        "holiday": false, "year": 1397, "month": 3, "day": 18, "type": 4,
        "title": "روز جهانی قدس (آخرین جمعهٔ ماه رمضان)"
    },

    {
        "holiday": false, "year": 1398, "month": 3, "day": 10, "type": 4,
        "title": "روز جهانی قدس (آخرین جمعهٔ ماه رمضان)"
    },

    //

    {
        "holiday": false, "month": 1, "day": 1, "type": 5,
        "title": "مطابق با اول محرم روز شهادت حضرت عمر فاروق (رض)"
    },
    {
        "holiday": true, "month": 1, "day": 10, "type": 5,
        "title": "روز شهادت امام حسین (رض) و قیام عاشورا"
    },
    {
        "holiday": true, "month": 3, "day": 12, "type": 5,
        "title": "ولادت حضرت رسول اکرم (ص)"
    },
    {
        "holiday": false, "month": 9, "day": 21, "type": 5,
        "title": "شهادت حضرت علی (رض)"
    },
    {
        "holiday": false, "month": 9, "day": 27, "type": 5,
        "title": "روز بزرگداشت از نزول قرآن عظیم‌الشأن"
    },
    {
        "holiday": true, "month": 10, "day": 1, "type": 5,
        "title": "عید سعید فطر"
    },
    {
        "holiday": true, "month": 10, "day": 2, "type": 5,
        "title": "عید سعید فطر، روز دوم"
    },
    {
        "holiday": true, "month": 10, "day": 3, "type": 5,
        "title": "عید سعید فطر، روز سوم"
    },
    {
        "holiday": true, "month": 12, "day": 9, "type": 5,
        "title": "روز عرفه (روز نیایش)"
    },
    {
        "holiday": true, "month": 12, "day": 10, "type": 5,
        "title": "عید الاضحی (قربان)"
    },
    {
        "holiday": true, "month": 12, "day": 11, "type": 5,
        "title": "عید الاضحی (قربان)، روز دوم"
    },
    {
        "holiday": true, "month": 12, "day": 12, "type": 5,
        "title": "عید الاضحی (قربان)، روز سوم"
    },

    //

    {
        "holiday": false, "month": 1, "day": 1, "type": 4,
        "title": "آغاز سال هجری قمری"
    },
    {
        "holiday": true, "month": 1, "day": 9, "type": 4,
        "title": "تاسوعای حسینی"
    },
    {
        "holiday": true, "month": 1, "day": 10, "type": 4,
        "title": "عاشورای حسینی"
    },
    {
        "holiday": false, "month": 1, "day": 11, "type": 4,
        "title": "روز تجلیل از اسرا و مفقودان"
    },
    {
        "holiday": false, "month": 1, "day": 12, "type": 4,
        "title": "شهادت امام زین‌العابدین (ع) (۹۵ ه‍.ق)"
    },
    {
        "holiday": false, "month": 1, "day": 25, "type": 4,
        "title": "شهادت امام زین‌العابدین (ع) (۹۵ ه‍.ق) به روایتی"
    },
    {
        "holiday": false, "month": 2, "day": 7, "type": 4,
        "title": "شهادت امام حسن مجتبی (ع) (۵۰ ه‍.ق) (به روایتی)"
    },
    {
        "holiday": false, "month": 2, "day": 7, "type": 4,
        "title": "روز بزرگداشت سلمان فارسی"
    },
    {
        "holiday": true, "month": 2, "day": 20, "type": 4,
        "title": "اربعین حسینی"
    },
    {
        "holiday": false, "month": 2, "day": 27, "type": 4,
        "title": "روز وقف"
    },
    {
        "holiday": true, "month": 2, "day": 28, "type": 4,
        "title": "رحلت حضرت رسول اکرم (ص) (۱۱ ه‍.ق) – شهادت امام حسن مجتبی (ع) (۵۰ ه‍.ق)"
    },
    {
        "holiday": true, "month": 2, "day": 30, "type": 4,
        "title": "شهادت امام رضا (ع) (۲۰۳ ه‍.ق)"
    },
    {
        "holiday": false, "month": 3, "day": 1, "type": 4,
        "title": "هجرت رسول اکرم (ص) از مکه به مدینه"
    },
    {
        "holiday": true, "month": 3, "day": 8, "type": 4,
        "title": "شهادت امام حسن عسکری (ع) (۲۶۰ ه‍.ق) و آغاز امامت حضرت ولی عصر (عج)"
    },
    {
        "holiday": false, "month": 3, "day": 12, "type": 4,
        "title": "ولادت حضرت رسول اکرم (ص) به روایت اهل سنت (۵۳ سال قبل از هجرت) - آغاز هفتهٔ وحدت"
    },
    {
        "holiday": true, "month": 3, "day": 17, "type": 4,
        "title": "ولادت حضرت رسول اکرم (ص) (۵۳ سال قبل از هجرت) و روز اخلاق و مهرورزی"
    },
    {
        "holiday": true, "month": 3, "day": 17, "type": 4,
        "title": "ولادت امام جعفر صادق (ع) مؤسس مذهب جعفری (۸۳ ه‍.ق)"
    },
    {
        "holiday": false, "month": 4, "day": 8, "type": 4,
        "title": "ولادت امام حسن عسگری (ع) (۲۳۲ ه‍.ق)"
    },
    {
        "holiday": false, "month": 4, "day": 10, "type": 4,
        "title": "وفات حضرت معصومه (س) (۲۰۱ ه‍.ق)"
    },
    {
        "holiday": false, "month": 5, "day": 5, "type": 4,
        "title": "ولادت حضرت زینب (س) (۵ ه‍.ق) و روز پرستار"
    },
    {
        "holiday": false, "month": 5, "day": 13, "type": 4,
        "title": "شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق) به روایتی"
    },
    {
        "holiday": true, "month": 6, "day": 3, "type": 4,
        "title": "شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق)"
    },
    {
        "holiday": false, "month": 6, "day": 13, "type": 4,
        "title": "سالروز وفات حضرت ام‌البنین (س) - روز تکریم مادران و همسران شهدا"
    },
    {
        "holiday": false, "month": 6, "day": 20, "type": 4,
        "title": "روز زن و مادر و ولادت حضرت فاطمهٔ زهرا (س) (سال هشتم قبل از هجرت)"
    },
    {
        "holiday": false, "month": 6, "day": 20, "type": 4,
        "title": "تولد امام خمینی (ره) رهبر کبیر انقلاب اسلامی (۱۳۲۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 7, "day": 1, "type": 4,
        "title": "ولادت امام محمد باقر (ع) (۵۷ ه‍.ق)"
    },
    {
        "holiday": false, "month": 7, "day": 3, "type": 4,
        "title": "شهادت امام علی النقی الهادی (ع) (۲۵۴ ه‍.ق)"
    },
    {
        "holiday": false, "month": 7, "day": 10, "type": 4,
        "title": "ولادت امام محمد تقی (ع) (۱۹۵ ه‍.ق)"
    },
    {
        "holiday": true, "month": 7, "day": 13, "type": 4,
        "title": "روز پدر و مرد و ولادت امام علی (ع) (۲۳ سال قبل از هجرت) – آغاز ایام‌البیض (اعتکاف)"
    },
    {
        "holiday": false, "month": 7, "day": 15, "type": 4,
        "title": "وفات حضرت زینب (س) (۶۲ ه‍.ق)"
    },
    {
        "holiday": false, "month": 7, "day": 15, "type": 4,
        "title": "تغییر قبلهٔ مسلمین از بیت‌المقدس به مکهٔ معظمه (۲ ه‍.ق)"
    },
    {
        "holiday": false, "month": 7, "day": 25, "type": 4,
        "title": "شهادت امام موسی کاظم (ع) (۱۸۳ ه‍.ق)"
    },
    {
        "holiday": true, "month": 7, "day": 27, "type": 4,
        "title": "مبعث حضرت رسول اکرم (ص) (۱۳ سال قبل از هجرت)"
    },
    {
        "holiday": false, "month": 8, "day": 3, "type": 4,
        "title": "ولادت امام حسین (ع) (۴ ه‍.ق) و روز پاسدار"
    },
    {
        "holiday": false, "month": 8, "day": 4, "type": 4,
        "title": "ولادت حضرت ابوالفضل العباس (ع) (۲۶ ه‍.ق) و روز جانباز"
    },
    {
        "holiday": false, "month": 8, "day": 5, "type": 4,
        "title": "ولادت امام زین‌العابدین (ع) (۳۸ ه‍.ق)"
    },
    {
        "holiday": false, "month": 8, "day": 11, "type": 4,
        "title": "ولادت حضرت علی اکبر (ع) (۳۳ ه‍.ق) و روز جوان"
    },
    {
        "holiday": true, "month": 8, "day": 15, "type": 4,
        "title": "ولادت حضرت قائم (عج) (۲۵۵ ه‍.ق) و روز جهانی مستضعفان"
    },
    {
        "holiday": false, "month": 9, "day": 10, "type": 4,
        "title": "وفات حضرت خدیجه (س) (۳ سال قبل از هجرت)"
    },
    {
        "holiday": false, "month": 9, "day": 15, "type": 4,
        "title": "ولادت امام حسن مجتبی (ع) (۳ ه‍.ق) و روز اکرام"
    },
    {
        "holiday": false, "month": 9, "day": 18, "type": 4,
        "title": "شب قدر"
    },
    {
        "holiday": false, "month": 9, "day": 19, "type": 4,
        "title": "ضربت خوردن امام علی (ع) (۴۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 9, "day": 20, "type": 4,
        "title": "شب قدر"
    },
    {
        "holiday": true, "month": 9, "day": 21, "type": 4,
        "title": "شهادت امام علی (ع) (۴۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 9, "day": 22, "type": 4,
        "title": "شب قدر"
    },
    {
        "holiday": true, "month": 10, "day": 1, "type": 4,
        "title": "عید سعید فطر"
    },
    {
        "holiday": true, "month": 10, "day": 2, "type": 4,
        "title": "تعطیل به مناسبت عید سعید فطر"
    },
    {
        "holiday": false, "month": 10, "day": 17, "type": 4,
        "title": "روز فرهنگ پهلوانی و ورزش زورخانه‌ای"
    },
    {
        "holiday": true, "month": 10, "day": 25, "type": 4,
        "title": "شهادت امام جعفر صادق (ع) (۱۴۸ ه‍.ق)"
    },
    {
        "holiday": false, "month": 11, "day": 1, "type": 4,
        "title": "ولادت حضرت معصومه (س) (۱۷۳ ه‍.ق) و روز دختر"
    },
    {
        "holiday": false, "month": 11, "day": 5, "type": 4,
        "title": "روز تجلیل از امام‌زادگان و بقاع متبرکه"
    },
    {
        "holiday": false, "month": 11, "day": 6, "type": 4,
        "title": "روز بزرگداشت حضرت احمدبن‌موسی شاهچراغ (ع)"
    },
    {
        "holiday": false, "month": 11, "day": 11, "type": 4,
        "title": "ولادت امام رضا (ع) (۱۴۸ ه‍.ق)"
    },
    {
        "holiday": false, "month": 11, "day": 30, "type": 4,
        "title": "شهادت امام محمد تقی (ع) (۲۲۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 1, "type": 4,
        "title": "سالروز ازدواج امام علی (ع) و حضرت فاطمه (س) (۲ ه‍.ق) – روز ازدواج"
    },
    {
        "holiday": false, "month": 12, "day": 6, "type": 4,
        "title": "شهادت زائران خانهٔ خدا به دست مأموران آل سعود (۱۳۶۶ ه‍.ش برابر با ۶ ذی‌الحجه ۱۴۰۷ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 7, "type": 4,
        "title": "شهادت امام محمد باقر (ع) (۱۱۴ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 9, "type": 4,
        "title": "روز عرفه (روز نیایش)"
    },
    {
        "holiday": true, "month": 12, "day": 10, "type": 4,
        "title": "عید سعید قربان (عید الاضحی)"
    },
    {
        "holiday": false, "month": 12, "day": 15, "type": 4,
        "title": "ولادت امام علی النقی الهادی (ع) (۲۱۲ ه‍.ق)"
    },
    {
        "holiday": true, "month": 12, "day": 18, "type": 4,
        "title": "عید سعید غدیر خم (۱۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 20, "type": 4,
        "title": "ولادت امام موسی کاظم (ع) (۱۲۸ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 24, "type": 4,
        "title": "روز مباهلهٔ پیامبر اسلام (ص) (۱۰ ه‍.ق)"
    },
    {
        "holiday": false, "month": 12, "day": 25, "type": 4,
        "title": "روز خانواده و تکریم بازنشستگان"
    },

    {
        "holiday": false, "month": 2, "day": 3, "type": 4,
        "title": "ولادت امام محمد باقر (ع) (۵۷ ﻫ.ق) به روایتی"
    },
    {
        "holiday": false, "month": 3, "day": 12, "type": 4,
        "title": "آغاز واجب شدن نماز، ورود پیامبر به مدینه"
    },
    {
        "holiday": false, "month": 3, "day": 15, "type": 4,
        "title": "بنای مسجد قبا (اولین مسجد در اسلام)"
    },
    {
        "holiday": false, "month": 3, "day": 16, "type": 4,
        "title": "ورود اهل بیت امام حسین (ع) به شام"
    },
    {
        "holiday": false, "month": 3, "day": 17, "type": 4,
        "title": "بنای مسجدالنبی در مدینه"
    },
    {
        "holiday": false, "month": 3, "day": 23, "type": 4,
        "title": "ورود حضرت معصومه (س) به قم"
    },
    {
        "holiday": false, "month": 3, "day": 26, "type": 4,
        "title": "صلح امام حسن (ع)"
    },
    {
        "holiday": false, "month": 4, "day": 3, "type": 4,
        "title": "سفر امام حسن (ع) به جرجان"
    },
    {
        "holiday": false, "month": 4, "day": 4, "type": 4,
        "title": "ولادت شاه عبدالعظیم حسنی (ع)"
    },
    {
        "holiday": false, "month": 4, "day": 8, "type": 4,
        "title": "شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ﻫ.ق) به روایتی"
    },
    {
        "holiday": false, "month": 5, "day": 10, "type": 4,
        "title": "وقوع جنگ جمل بین سپاهیان امام علی (ع) و ناکثین"
    },
    {
        "holiday": false, "month": 5, "day": 27, "type": 4,
        "title": "وفات حضرت عبدالمطلب (ع)"
    },
    {
        "holiday": false, "month": 6, "day": 12, "type": 4,
        "title": "حرکت پیامبر به سمت خیبر"
    },
    {
        "holiday": false, "month": 6, "day": 19, "type": 4,
        "title": "ازدواج حضرت عبداللّه (ع) و آمنه (س)"
    },
    {
        "holiday": false, "month": 6, "day": 21, "type": 4,
        "title": "ولادت حضرت ام‌کلثوم (س)"
    },
    {
        "holiday": false, "month": 7, "day": 9, "type": 4,
        "title": "ولادت حضرت علی اصغر (ع)"
    },
    {
        "holiday": false, "month": 7, "day": 16, "type": 4,
        "title": "خروج فاطمه بنت اسد از کعبه"
    },
    {
        "holiday": false, "month": 7, "day": 23, "type": 4,
        "title": "مجروح شدن امام حسن مجتبی (ع) در ساباط مدائن"
    },
    {
        "holiday": false, "month": 7, "day": 23, "type": 4,
        "title": "مسموم شدن امام موسی کاظم (ع) به دستور مأمون"
    },
    {
        "holiday": false, "month": 7, "day": 24, "type": 4,
        "title": "فتح قلعهٔ خیبر توسط امام علی (ع)، بازگشت جعفر بن ابی‌طالب از حبشه"
    },
    {
        "holiday": false, "month": 7, "day": 26, "type": 4,
        "title": "وفات حضرت ابوطالب (ع)"
    },
    {
        "holiday": false, "month": 7, "day": 28, "type": 4,
        "title": "حرکت امام حسین (ع) از مدینه به مکه"
    },
    {
        "holiday": false, "month": 7, "day": 30, "type": 4,
        "title": "هجرت مسلمانان به حبشه، غزوهٔ نخله"
    },
    {
        "holiday": false, "month": 8, "day": 15, "type": 4,
        "title": "روز سربازان گمنام امام زمان (عج)"
    },
    {
        "holiday": false, "month": 10, "day": 21, "type": 4,
        "title": "فتح اندلس به دست مسلمانان (۹۲ ه‍.ق)"
    },
    {
        "holiday": false, "month": 11, "day": 5, "type": 4,
        "title": "روز بزرگداشت حضرت صالح بن موسی کاظم (ع)"
    }
];

const GregorianCalendar = [
    { "month": 1, "day": 1, "title": "آغاز سال میلادی", "type": 6, },
    { "month": 1, "day": 2, "title": "روز جهانی گمرک", "type": 6, },
    { "month": 2, "day": 4, "title": "روز جهانی سرطان", "type": 6, },
    { "month": 2, "day": 6, "title": "روز جهانی مبارزه با ناقص‌سازی زنان", "type": 6, },
    { "month": 2, "day": 20, "title": "روز جهانی عدالت اجتماعی", "type": 6, },
    { "month": 2, "day": 21, "title": "روز جهانی زبان مادری", "type": 6, },
    { "month": 3, "day": 8, "title": "روز جهانی زنان", "type": 6, },
    { "month": 3, "day": 22, "title": "روز جهانی آب", "type": 6, },
    { "month": 3, "day": 23, "title": "روز جهانی هواشناسی", "type": 6, },
    { "month": 3, "day": 24, "title": "روز جهانی سل", "type": 6, },
    { "month": 4, "day": 7, "title": "روز جهانی سلامت", "type": 6, },
    { "month": 4, "day": 22, "title": "روز جهانی زمین پاک", "type": 6, },
    { "month": 4, "day": 23, "title": "روز جهانی کتاب و حق مؤلف", "type": 6, },
    { "month": 4, "day": 25, "title": "روز جهانی مالاریا", "type": 6, },
    { "month": 4, "day": 27, "title": "روز جهانی گرافیک", "type": 6, },
    { "month": 5, "day": 1, "title": "روز جهانی کارگر", "type": 6, },
    { "month": 5, "day": 3, "title": "روز جهانی آزادی مطبوعات", "type": 6, },
    { "month": 5, "day": 5, "title": "روز جهانی ماما", "type": 6, },
    { "month": 5, "day": 8, "title": "روز جهانی صلیب سرخ و هلال احمر", "type": 6, },
    { "month": 5, "day": 15, "title": "روز جهانی خانواده", "type": 6, },
    { "month": 5, "day": 17, "title": "روز جهانی ارتباطات و روابط عمومی", "type": 6, },
    { "month": 5, "day": 18, "title": "روز جهانی موزه و میراث فرهنگی", "type": 6, },
    { "month": 5, "day": 29, "title": "روز جهانی حافظان صلح ملل متحد", "type": 6, },
    { "month": 5, "day": 31, "title": "روز جهانی بدون دخانیات", "type": 6, },
    { "month": 6, "day": 1, "title": "روز جهانی والدین", "type": 6, },
    { "month": 6, "day": 5, "title": "روز جهانی محیط زیست", "type": 6, },
    { "month": 6, "day": 10, "title": "روز جهانی صنایع دستی", "type": 6, },
    { "month": 6, "day": 12, "title": "روز جهانی منع کار کودکان", "type": 6, },
    { "month": 6, "day": 14, "title": "روز جهانی اهدا خون", "type": 6, },
    { "month": 6, "day": 14, "title": "روز جهانی مادر", "type": 6, },
    { "month": 6, "day": 17, "title": "روز جهانی بیابان‌زدایی", "type": 6, },
    { "month": 6, "day": 20, "title": "روز جهانی پناهندگان", "type": 6, },
    { "month": 6, "day": 26, "title": "روز جهانی مبارزه با مواد مخدر", "type": 6, },
    { "month": 6, "day": 26, "title": "روز جهانی قربانیان خشونت", "type": 6, },
    { "month": 6, "day": 26, "title": "روز جهانی جمعیت", "type": 6, },
    { "month": 8, "day": 1, "title": "روز جهانی شیر مادر", "type": 6, },
    { "month": 8, "day": 6, "title": "انفجار بمب اتمی آمریکا در هیروشیما با بیش از ۱۶۰ هزار کشته و مجروح (۱۹۴۵ میلادی)", "type": 6, },
    { "month": 8, "day": 12, "title": "روز جهانی جوانان", "type": 6, },
    { "month": 8, "day": 13, "title": "روز جهانی چپ دستان", "type": 6, },
    { "month": 8, "day": 19, "title": "روز جهانی انسان دوستی", "type": 6, },
    { "month": 8, "day": 19, "title": "روز جهانی عکاسی", "type": 6, },
    { "month": 8, "day": 21, "title": "روز جهانی مسجد", "type": 6, },
    { "month": 9, "day": 1, "title": "روز جهانی صلح", "type": 6, },
    { "month": 9, "day": 8, "title": "روز جهانی با سوادی", "type": 6, },
    { "month": 9, "day": 10, "title": "روز جهانی جلوگیری از خودکشی", "type": 6, },
    { "month": 9, "day": 21, "title": "روز جهانی باسوادی و روز جهانی آلزایمر", "type": 6, },
    { "month": 9, "day": 27, "title": "روز جهانی جهانگردی", "type": 6, },
    { "month": 9, "day": 30, "title": "روز جهانی ناشنوایان", "type": 6, },
    { "month": 9, "day": 30, "title": "روز جهانی دریانوردی", "type": 6, },
    { "month": 10, "day": 1, "title": "روز جهانی سالمندان", "type": 6, },
    { "month": 10, "day": 5, "title": "روز جهانی جلوگیری از خودکشی", "type": 6, },
    { "month": 10, "day": 8, "title": "روز جهانی کودک", "type": 6, },
    { "month": 10, "day": 9, "title": "روز جهانی پست", "type": 6, },
    { "month": 10, "day": 14, "title": "روز جهانی استاندارد", "type": 6, },
    { "month": 10, "day": 15, "title": "روز جهانی نابینایان (عصای سفید)", "type": 6, },
    { "month": 10, "day": 16, "title": "روز جهانی غذا", "type": 6, },
    { "month": 10, "day": 24, "title": "روز ملل متحد و روز جهانی توسعه اطلاعات", "type": 6, },
    { "month": 10, "day": 27, "title": "روز جهانی میراث سمعی و بصری", "type": 6, },
    { "month": 10, "day": 31, "title": "روز جهانی شهرها", "type": 6, },
    { "month": 10, "day": 31, "title": "جشن هالووین", "type": 6, },
    { "month": 11, "day": 6, "title": "روز بین‌المللی پیشگیری از سوء استفاده از محیط زیست در جنگ و مناقشات مسلحانه", "type": 6, },
    { "month": 11, "day": 10, "title": "روز جهانی علم در خدمت صلح و توسعه", "type": 6, },
    { "month": 11, "day": 14, "title": "روز جهانی دیابت", "type": 6, },
    { "month": 11, "day": 21, "title": "روز جهانی تلویزیون", "type": 6, },
    { "month": 11, "day": 25, "title": "روز جهانی مبارزه با خشونت علیه زنان", "type": 6, },
    { "month": 11, "day": 29, "title": "روز جهانی همبستگی با مردم فلسطین", "type": 6, },
    { "month": 12, "day": 1, "title": "روز جهانی مبارزه با ایدز", "type": 6, },
    { "month": 12, "day": 2, "title": "روز جهانی لغو برده‌داری", "type": 6, },
    { "month": 12, "day": 3, "title": "روز جهانی معلولین", "type": 6, },
    { "month": 12, "day": 7, "title": "روز جهانی هواپیمایی", "type": 6, },
    { "month": 12, "day": 10, "title": "روز جهانی حقوق بشر", "type": 6, },
    { "month": 12, "day": 11, "title": "روز جهانی کوهستان", "type": 6, },
    { "month": 12, "day": 18, "title": "روز جهانی عاری از خشونت و افراطی‌گری", "type": 6, },
    { "month": 12, "day": 18, "title": "روز جهانی مهاجران", "type": 6, },
    { "month": 12, "day": 25, "title": "ولادت حضرت عیسی مسیح (ع)", "type": 6, },
];

module.exports = {
    all_titles,
    PersianCalendar,
    GregorianCalendar,
};