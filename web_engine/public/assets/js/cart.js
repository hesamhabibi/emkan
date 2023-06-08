const order_fields = `
id
total_prices {
    sum_product_price_without_offer
    sum_product_price
    total_price_with_discount
    post_price
    payment_price
    total_weight
}
products{
    product_id
    mix_variant_keys
    count

    product {
        title_web
        mix_variant {
            title_web
            price {
                has_offer
                offer_price
                price
            }
        }
        media {
            url
            alt
        }
        seo {
            url
        }
    }
}
`

async function addToCartApi(product_id, mix_variant_keys, count, is_inquiry = false) {
    const query = `
    mutation AddToCart ($product_id: ID,$mix_variant: [String], $count: Int, $is_inquiry: Int){
        result: addToCart(product_id: $product_id,mix_variant: $mix_variant , count: $count, is_inquiry: $is_inquiry ){
            ${order_fields}
        }
    }
    `;

    const variables = {
        product_id,
        mix_variant: typeof mix_variant_keys == 'string' ? mix_variant_keys.split(',') : mix_variant_keys,
        count,
        is_inquiry: + is_inquiry, // convert to number
    }

    let result;
    try {
        result = await (await graphqlApi(query, variables)).json();
    } catch (e) {
        console.log(e);
    }

    if (!(result?.errors?.length > 0)) {
        return result?.data?.result;
    } else {
        if (String(result?.errors[0]?.code) == "401")
            redirectToLogin();
        return null;
    }
}

async function setCartCountApi(product_id, mix_variant_keys, count, is_inquiry = false) {
    const query = `
    mutation ($product_id: ID,$mix_variant: [String], $count: Int, $is_inquiry: Int){
        result: setCartCount(product_id: $product_id,mix_variant: $mix_variant , count: $count, is_inquiry: $is_inquiry ){
            ${order_fields}
        }
    }
    `;

    const variables = {
        product_id,
        mix_variant: typeof mix_variant_keys == 'string' ? mix_variant_keys.split(',') : mix_variant_keys,
        count,
        is_inquiry: + is_inquiry,
    }

    let result;
    try {
        result = await (await graphqlApi(query, variables)).json();
    } catch (e) {
        console.log(e);
    }

    if (!(result?.errors?.length > 0)) {
        return result?.data?.result;
    } else {
        if (String(result?.errors[0]?.code) == "401")
            redirectToLogin();
        return null;
    }
}

async function removeFromCartApi(product_id, mix_variant_keys, is_inquiry = false) {
    const query = `
    mutation removeFromCart ($product_id: ID,$mix_variant: [String], $is_inquiry: Int){
        result: removeFromCart(product_id: $product_id,mix_variant: $mix_variant, is_inquiry: $is_inquiry){
            ${order_fields}
        }
    }
    `;

    const variables = {
        product_id,
        mix_variant: typeof mix_variant_keys == 'string' ? mix_variant_keys.split(',') : mix_variant_keys,
        is_inquiry: + is_inquiry,
    }

    let result;
    try {
        result = await (await graphqlApi(query, variables)).json();
    } catch (e) {
        console.log(e);
    }

    if (!(result?.errors?.length > 0)) {
        return result?.data?.result;
    } else {
        if (String(result?.errors[0]?.code) == "401")
            redirectToLogin();
        return null;
    }
}
