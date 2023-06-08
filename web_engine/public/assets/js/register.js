async function register(form) {

    $(form).find(':submit').attr('disabled', true);
    $(form).find('.loading').removeClass('d-none');

    const query = `
    mutation Register ($input: UserRegisterInput){
        result: register(input: $input){
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
    const name = $(form).find('#name').val();
    const last_name = $(form).find('#last_name').val();
    const mobile = $(form).find('#mobile').val();
    const email = $(form).find('#email').val();
    const username = $(form).find('#username').val();
    const password = $(form).find('#password').val();
    const password_confirmation = $(form).find('#password_confirmation').val();

    const variables = {
        input: {
            mobile,
            username,
            email,
            name,
            last_name,
            password,
            password_confirmation,
        }
    }

    let result = await (await graphqlApi(query, variables)).json();

    $(form).find(':submit').attr('disabled', false);
    $(form).find('.loading').addClass('d-none');

    if (result.errors?.length > 0) {
        hideAllToasts();
        const keys = Object.keys(result.errors[0].errors);
        for (const i in keys) {
            showToast(result.errors[0].errors[keys[i]], 'danger', 30000);
        }
        // const key = Object.keys(result.errors[0].errors)[0]
        // showToast(result.errors[0].errors[key], 'danger');
    } else {
        showToast(result?.data?.result?.message, 'success');
        const AuthUser = JSON.stringify(result?.data?.result.user, (key, value) =>
            typeof value === "string" ? encodeURI(value) : value
        );
        setCookie('AuthUser', AuthUser, 9999);
        setCookie('token', result?.data?.result.token, 9999);
        registerRedirect();
    }
}


function registerRedirect() {
    const p = new URL(window.location);
    let redirectTo_url = p.searchParams.get('redirectTo') || '';
    redirectTo_url = decodeURIComponent(redirectTo_url)
    window.location.href = redirectTo_url || "/"; // todo: change it
}