const { parse, eval_args } = require('./helpers');
const interruptCodes = require('../interruptCodes');

module.exports = {
    parse,
    render: async function (ctx) {
        const { args, positional_args } = await eval_args(this, ctx, this.args, this.positional_args);
        const cartProducts = ctx.environments?.cart?.products || [];
        const inquiryProducts = ctx.environments?.inquiry?.products || [];

        const keys = Object.keys(args);
        for (let i in keys) {
            try {
                const input = args[keys[i]];
                const target_item = (input?.is_inquiry ? inquiryProducts : cartProducts).find((item) => {
                    if ((String(item.product_id) == String(input.product_id)) && (String(item.mix_variant_keys) == String(input.mix_variant_keys))) {
                        return true;
                    }
                    return false;
                });
                count = target_item.count;
            } catch {
                count = null;
            }
            ctx.bottom()[keys[i]] = count || undefined;
        }
        return null;
    }
}