function hide_next_button() {
    $('#NextBtn').addClass('d-none');
    $('#LoginBtn').removeClass('d-none');
    $('#username').attr('disabled', true);
}
function show_next_button() {
    $('#NextBtn').removeClass('d-none');
    $('#LoginBtn').addClass('d-none');
    $('#username').attr('disabled', false);
}
function hide_login_button() {
    $('#NextBtn').removeClass('d-none');
    $('#LoginBtn').addClass('d-none');
    $('#username').attr('disabled', false);
}
function show_login_button() {
    $('#NextBtn').addClass('d-none');
    $('#LoginBtn').removeClass('d-none');
    $('#username').attr('disabled', true);
}
function hide_error() {
    $('#UserError').addClass('d-none');
}
function show_error() {
    $('#UserError').removeClass('d-none');
    $('#username').attr('disabled', false);
}
function disable_next_button() {
    $('#NextBtn').addClass('disabled');
    $('#NextBtn').attr('disabled', true);
}
function enable_next_button() {
    $('#NextBtn').removeClass('disabled');
    $('#NextBtn').attr('disabled', false);
}
function disable_login_button() {
    $('#LoginBtn').addClass('disabled');
    $('#LoginBtn').attr('disabled', true);
    $('#LoginBtn').find('.loading').removeClass('d-none');
}
function enable_login_button() {
    $('#LoginBtn').removeClass('disabled');
    $('#LoginBtn').attr('disabled', false);
    $('#LoginBtn').find('.loading').addClass('d-none');
}

async function send_login_code(mobile) {
    const query = `
    mutation LoginSendSMS ($mobile: String){
        loginSendSMS(mobile: $mobile){
            success
            message
            }
        }
    `;
    const result = await (await graphqlApi(query, { mobile })).json();
    if (result.errors?.length > 0) {
        const key = Object.keys(result.errors[0].errors)[0]
        showToast(result.errors[0].errors[key], 'danger');
        return false;
    } else {
        showToast(result?.data?.loginSendSMS?.message, 'success');
        return true;
    }
}

async function loginNext() {
    const username = ($('#username').val() || '').trim();
    disable_next_button();
    try {
        if (username) {
            // if (/^09\d{9}$/g.test(username)) {
            //     if (await send_login_code(username)) {
            //         $('#UserKey').removeClass('d-none');
            //         hide_next_button();
            //         show_login_button();
            //         hide_error();
            //     }
            //     else {
            //         show_error();
            //     }
            // } else {
                $('#UserPassword').removeClass('d-none');
                hide_next_button();
                show_login_button();
                hide_error();
            // }
        }
    } catch (e) { /* empty */ }
    enable_next_button();
}

async function login_with_mobile(mobile, code) {
    const query = `
    mutation ($mobile: String , $token: String){
            result: SMSLoginVerifyToken(mobile: $mobile ,token: $token){
                user {
                    id
                    name
                    last_name
                    full_name
                    username
                    email
                    mobile
                    access_name
                    gender
                    media{ url }
                    createdAt
                    updatedAt
                }
                token
            }
        }
    `;

    const variables = {
        token: code,
        mobile,
    };

    const result = await (await graphqlApi(query, variables)).json();
    if (result.errors?.length > 0) {
        showToast(result.errors[0].message);
        return false;
    }
    return result.data.result;
}

async function login_with_password(username, password) {
    const query = `
        mutation ($input: UserLoginInput){
            result: login(input: $input){
                user {
                    id
                    name
                    last_name
                    full_name
                    username
                    email
                    mobile
                    access_name
                    gender
                    media{ url }
                    createdAt
                    updatedAt
                }
                token
            }
        }
    `;

    const variables = {
        input: {
            username,
            password,
        }
    };

    const result = await (await graphqlApi(query, variables)).json();
    if (result.errors?.length > 0) {
        showToast(result.errors[0].message, 'danger');
        return false;
    }
    showToast(trans('done'), 'success');
    return result.data.result;
}

function setLoginCookies(login_result) {
    const AuthUser = JSON.stringify(login_result.user, (key, value) =>
        typeof value === "string" ? encodeURI(value) : value
    );
    setCookie('AuthUser', AuthUser, 9999);
    setCookie('token', login_result.token, 9999);
    return true;
}

function loginRedirect() {
    const p = new URL(window.location);
    let redirectTo_url = p.searchParams.get('redirectTo') || '';
    redirectTo_url = decodeURIComponent(redirectTo_url)
    window.location.href = redirectTo_url || "/"; // todo: change it
}

async function login() {
    const username = ($('#username').val() || '').trim();
    disable_login_button();
    try {
        if (username) {
            // if (/^09\d{9}$/g.test(username)) {
            //     const code = ($('#code').val() || '').trim();
            //     const login_result = await login_with_mobile(username, code);
            //     if (login_result) {
            //         setLoginCookies(login_result);
            //         loginRedirect();
            //     } else {
            //         show_error();
            //     }
            // } else {
                const password = ($('#password').val() || '').trim();
                const login_result = await login_with_password(username, password);
                if (login_result) {
                    setLoginCookies(login_result);
                    loginRedirect();
                } else {
                    show_error();
                }
            // }
        }
    } catch { /* empty */ }
    enable_login_button();
}