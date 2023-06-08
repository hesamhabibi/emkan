async function send_comment(type, form, model_id) {

    console.log ('here');
    let query_name = 'createBlogComment';
    if (type == '2')
        query_name = 'createProductComment';

    const query = `
        mutation ${query_name} ($input: CreateCommentInput){
            result: ${query_name}(input: $input){
                id
            }
        }`;

    const title = $(form).find("[name='title']").val();
    const text = $(form).find("[name='text']").val();

    if (!text)
        return showToast(trans("required", "comment_text"), 'danger');

    const variables = {
        input: {
            title: title,
            text: text,
            model_id: model_id,
        }
    }

    const submit_button = $(form).find(":submit");
    submit_button.attr("disabled", true);
    $(form).find('.loading').removeClass('d-none');

    let result;
    try {
        result = await (await graphqlApi(query, variables)).json();
    } catch (e) {
        console.log(e);
    }

    submit_button.attr("disabled", false);
    $(form).find('.loading').addClass('d-none');

    if (result?.errors?.length > 0) {
        console.log(result?.errors);
        hideAllToasts();
        if (String(result?.errors[0]?.code) == "401")
            showToast(trans('login_error'), 'danger', 5000);
        else {
            const keys = Object.keys(result?.errors);
            for (const i in keys) {
                showToast(result.errors[keys[i]], 30000);
            }
        }
    } else {
        showToast(trans('done', 'success'));
        // $(form).find("[name='title']").val('');
        $(form).find("[name='text']").val('');
        window.location.reload(false);
    }
    return null;
}