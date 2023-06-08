messages = {
    "done": {
        fa: "انجام شد.",
        en: "done.",
        ar: "أتقنه.",
    },
    "wait": {
        fa: "لطفا صبر کنید.",
        en: "please wait.",
        ar: "أرجو الإنتظار.",
    },
    "error": {
        fa: "خطا!",
        en: "error!",
        ar: "خطأ!",
    },
    "copied": {
        fa: "کپی شد",
        en: "copied",
        ar: "نسخ",
    },
    "not_correct": {
        fa: ":attr صحیح نیست!",
        en: ":attr is not correct",
        ar: ":attr غير صحيح",
    },
    "login_error": {
        fa: "لطفا ابتدا وارد شوید!",
        en: "please login first!",
        ar: "الرجاء تسجيل الدخول أولا!",
    },
    "required": {
        fa: ":attr الزامی است.",
        en: ":attr is required.",
        ar: ":attr مطلوب.",
    },


    //attrs:
    "comment_title": {
        fa: "نام کاربری",
        en: "username",
        ar: "اسم االمستخدم",
    },
    "comment_text": {
        fa: "متن نظر",
        en: "comment text",
        ar: "نص التعليق",
    },
    "email": {
        fa: "ایمیل",
        en: "emails",
        ar: "البريد الإلكتروني",
    },
    "code": {
        fa: "کد ارسالی",
        en: "Received Code",
        ar: "تلقى كود",
    }
}

function trans(message, attr) {
    try {
        const new_message = messages[message][getCookie("web_lang") || 'fa'];
        if (new_message.includes(":attr")) {
            return new_message.replace(":attr", trans(attr)) || message;
        } else {
            return new_message || message;
        }
    } catch {
        return message;
    }
}

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setLang(lang) {
    setCookie('web_lang', lang);
    let new_url = String(window.location.href) || '/';
    new_url = String(new_url).replace('\/fa\/', `/${lang}/`);
    new_url = String(new_url).replace('\/en\/', `/${lang}/`);
    new_url = String(new_url).replace('\/ar\/', `/${lang}/`);
    if (window.location.href == new_url)
        window.location.reload();
    else
        window.location.href = new_url;
}

function getQuery(key) {
    var p = new URL(window.location);
    return p.searchParams.get(key);
}

function addToQuery(key, value, reload = false) {
    var p = new URL(window.location);
    if (value === null || value === '')
        p.searchParams.delete(key);
    else
        p.searchParams.set(key, value);
    // window.location.href = p.href;
    window.history.replaceState({}, '', p.href);
    if (reload)
        window.location.reload();
}
function addInputToQuery(query) {
    const element = document.querySelector(query);
    if (element.nodeName == 'TEXTAREA') {
        addToQuery(element.name, element.innerText);
    } else {
        addToQuery(element.name, element.value);
    }
}

const getApiUrl = () => {
    if (window.location.hostname.includes('asantakmil'))
        return `${window.location.protocol}//api.asantakmil.com`;
    else
        return `${window.location.protocol}//${window.location.hostname}:3002`;
}

async function graphqlApi(query, variables) {
    return await fetch(`${getApiUrl()}/api/graphql`, {
        method: "POST",
        body: JSON.stringify({
            query,
            variables
        }),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "token": getCookie("token"),
            "web_lang": getCookie("web_lang"),
        }
    })
}

async function restApi(route, data) {
    return await fetch(`${getApiUrl()}/api/${route}`, {
        method: "POST",
        body: data,
        headers: {
            "token": getCookie("token"),
            "web_lang": getCookie("web_lang"),
        }
    });
}

// toast
const hideAllToasts = () => {
    $('#toast-container').find('#toast-template:not(.template)').remove();
}

var toast_counter = 0;
// example: showToast("done");showToast("be careful","warning"); showToast({title:"error!",message:"some error ocurred",type:"danger",timeout:5000});
const showToast = (...args) => {
    let title, message, timeout, type;
    if (args.length == 0) {
        message = trans('done');
        type = 'success';
    } else if (args.length == 1) {
        if (typeof args[0] == 'string') {
            message = args[0];
            type = 'success';
        } else if (typeof args[0] == 'object') {
            title = args[0].title;
            message = args[0].message || trans('done');
            timeout = args[0].timeout;
            type = args[0].type || 'success';
        }
    } else if (args.length == 2) {
        message = args[0];
        type = args[1] || 'success';
    } else if (args.length == 3) {
        message = args[0];
        type = args[1] || 'success';
        timeout = args[2];
    }
    toast_counter += 1;

    if (!title) {
        if (type == 'danger')
            title = trans('error')
        else
            title = '';
    }

    console.log({ type, title, message });

    const new_toast = $('#toast-template').clone(true);
    new_toast.appendTo('#toast-container');
    new_toast.removeClass('template');
    new_toast.removeClass('d-none');
    new_toast.addClass(`bg-${type}`);
    new_toast.find('#toast-title').text(title);
    new_toast.find('#toast-message').text(message);

    if (timeout)
        setTimeout(function () { try { new_toast.remove(); } catch {/* empty */ } }, timeout);
}

async function logout() {
    setCookie('token', '', 0.1);
    setCookie('AuthUser', '', 0.1);
    window.location.reload();
}

async function submit_form(form, route, loading_query, redirect_url) {
    if (typeof form == 'string')
        form = document.getElementById(form);
    $form = $(form);
    const data = new FormData(form);
    if (loading_query) {
        $form.find(loading_query).removeClass('d-none');
        $form.find(':submit').attr('disabled', true);
    }
    let result = await (await restApi(route, data)).json();
    if (loading_query) {
        $form.find(loading_query).addClass('d-none');
        $form.find(':submit').attr('disabled', false);
    }
    if (!result.success) {
        hideAllToasts();
        const keys = Object.keys(result.errors);
        for (const i in keys) {
            showToast(result.errors[keys[i]], 'danger', 30000);
        }
    } else {
        form.reset();
        showToast(trans('done'), 'success', 5000);
        setCookie('form_submit_success', 'yes', 9999);
        if (redirect_url)
            setTimeout(() => { window.location.href = redirect_url }, 10);
        else
            setTimeout(() => { window.location.reload(true); }, 10);
    }
}

function redirectToLogin(query = '') {
    window.location.href = `/login?redirectTo=${encodeURIComponent(window.location.pathname + window.location.search + query)}`;
}

function numberSeparator(value, separator = ',', chunk = 3) {
    try {
        if (value) {
            const number = String(value);
            let new_number = "";
            let counter = 0;
            for (let i = number.length - 1; i >= 0; i -= 1) {
                if (counter >= chunk) {
                    new_number = separator + new_number;
                    counter = 0;
                }
                counter += 1;
                new_number = number[i] + new_number;
            }
            return new_number;
        } else {
            return 0;
        }
    } catch (e) {
        return value;
    }
}

function copyText(text) {
    // navigator.clipboard.writeText(text);
    copy_text(text);
    showToast(trans('copied'),'success',1000);
}

function copy_text(text) {
    const txt = document.createElement('textarea');
    document.body.appendChild(txt);
    txt.value = text;
    txt.textContent = text;
    var sel = getSelection();
    var range = document.createRange();
    range.selectNode(txt);
    sel.removeAllRanges();
    sel.addRange(range);
    if (document.execCommand('copy')) {
    }
    document.body.removeChild(txt);
}


$(function () {
    if (window.location.hash) {
        document.querySelector(window.location.hash).scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
});

function scrollToTop() {
    window.scrollTo(0, 0);
}