async function addRate(rate, model_id) {
    const query = `
    mutation addRate ($input: CreateRateInput){
        result: addRate(input: $input){
            average_rate
            user_rate
        }
    }
    `;

    if (!(rate > -1)) {
        showToast(trans('error'), 'danger', 1000);
        return null;
    }

    const variables = {
        input: {
            model_id: model_id,
            rate: parseFloat(rate)
        }
    }

    let result;
    try {
        result = await (await graphqlApi(query, variables)).json();
    } catch (e) {
        console.log(e);
    }

    if (result.errors?.length > 0) {
        console.log(result?.errors);
        if (String(result?.errors[0]?.code) == "401") {
            showToast(trans('login_error'), 'danger', 1000);
            redirectToLogin('#RateStar');
        }
        else
            showToast(trans('error'), 'danger', 1000);
        return null;
    } else {
        showToast(trans('done'), 'success', 1000);
        window.location.reload();
        return null;
    }
}