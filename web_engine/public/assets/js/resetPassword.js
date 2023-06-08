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

async function loginNext() {
    const username = ($('#username').val() || '').trim();
    disable_next_button();
    try {
        if (username) {
            if (/.+@.+\..+/g.test(username)) {
                $('#UserPassword').collapse('show');
            } else {
                showToast(trans('not_correct', 'email'), 'danger',3000);
            }
        }
    } catch { /* empty */ }
    enable_next_button();
}


async function login() {
    const username = ($('#username').val() || '').trim();
    disable_login_button();
    try {
        if (username) {
            if (/.+@.+\..+/g.test(username)) {
                showToast(trans('not_correct', 'code'), 'danger',3000);
            } else {
                showToast(trans('not_correct', 'email'), 'danger',3000);
            }
        }
    } catch { /* empty */ }
    enable_login_button();
}