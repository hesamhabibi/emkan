function disable_inputs($input, is_inquiry = false) {
    if (is_inquiry) {
        $input.attr('disables', true);
        $('.inquiry_minus').attr('disabled', true);
        $('.inquiry_plus').attr('disabled', true);
    } else {
        $input.attr('disables', true);
        $('.minus').attr('disabled', true);
        $('.plus').attr('disabled', true);
    }
}
function enable_inputs($input, is_inquiry = false) {
    if (is_inquiry) {
        $input.attr('disables', false);
        $('.inquiry_minus').attr('disabled', false);
        $('.inquiry_plus').attr('disabled', false);
    } else {
        $input.attr('disables', false);
        $('.minus').attr('disabled', false);
        $('.plus').attr('disabled', false);
    }
}

async function removeFromCartOnClick(button) {
    let $this;
    if (button instanceof HTMLElement) {
        $this = $(button);
    } else {
        $this = $(this);
    }

    $this.attr('disabled', true);
    const result = await removeFromCartApi($this.data('product-id'), $this.data('mix-variant-keys'), $this.data('is-inquiry') ?? false);
    if (!result) {
        showToast(trans('error'), 'danger', 3000);
        $this.attr('disabled', false);
    } else
        window.location.reload(true);
}

$(() => { // init onclick's

    const minus_click_function = function () {
        const $input = $(this).parent().find('input');
        const count = $input.val() - 1;
        // $input.val(count);
        $input.trigger('change', count);
    }

    const plus_click_function = function () {
        const $input = $(this).parent().find('input');
        const count = !(parseInt($input.val())) ? 1 : parseInt($input.val()) + 1;
        $input.trigger('change', count);
    }

    const item_count_input_change_function = async function (e, count) {
        const $this = $(this);
        disable_inputs($this, $this.data('is-inquiry'));

        console.log('my log', $this.data('is-inquiry'), Boolean($this.data('is-inquiry')), $this);

        if (!count && count !== 0)
            count = parseInt($this.val());
        if (!count && count !== 0) count = 1;
        if (count <= 0) {
            const result = await removeFromCartApi($this.data('product-id'), $this.data('mix-variant-keys'), $this.data('is-inquiry') ?? false);
            if (!result)
                showToast(trans('error'), 'danger', 3000);
            else {
                const div = $this.parents('.setCount');
                div.addClass('d-none');
                div.siblings('.addToCart').removeClass('d-none');
                $this.val(0);
                try { refresh_header_cart(result) } catch { /* empty */ };
                try { update_total_prices(result) } catch { /* empty */ };
            }
        } else {
            const result = await setCartCountApi($this.data('product-id'), $this.data('mix-variant-keys'), count, $this.data('is-inquiry') ?? false);
            if (!result)
                showToast(trans('error'), 'danger', 3000);
            else {
                let cartProduct = result.products.find(function (cartProduct) {
                    return String(cartProduct.product_id) == String($this.data('product-id')) && String(cartProduct.mix_variant_keys) == String($this.data('mix-variant-keys'));
                });
                $this.val(cartProduct.count);
                try { refresh_header_cart(result) } catch { /* empty */ };
                try { update_total_prices(result) } catch { /* empty */ };
            }
        }

        enable_inputs($this);
    }

    $('.minus').on('click', minus_click_function);
    $('.inquiry_minus').on('click', minus_click_function);

    $('.plus').on('click', plus_click_function);
    $('.inquiry_plus').on('click', plus_click_function);

    $('.remove_from_cart_button').on('click', removeFromCartOnClick);

    $('.item_count_input').on('change', item_count_input_change_function);
});

async function addToCart(button, product_id, mix_variant_keys) {
    $(button).attr('disabled', true);
    $(button).find('.loading').removeClass('d-none');

    const result = await addToCartApi(product_id, mix_variant_keys, 1, $(button).siblings('.setCount').find('.item_count_input').data('is-inquiry') ?? false);
    if (!result)
        showToast(trans('error'), 'danger', 3000);
    else {
        const div = $(button);
        div.addClass('d-none');
        div.siblings('.setCount').removeClass('d-none');
        div.siblings('.setCount').find('.item_count_input').val(1);
        try { refresh_header_cart(result) } catch { /* empty */ };
        try { update_total_prices(result) } catch { /* empty */ };
    }

    $(button).attr('disabled', false);
    $(button).find('.loading').addClass('d-none');
}
