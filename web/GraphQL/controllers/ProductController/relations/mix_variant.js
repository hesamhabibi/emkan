module.exports = async (parent) => {
    try {
        let mix_variant = parent.mix_variant;
        if (!Array.isArray(mix_variant)) {
            mix_variant = [mix_variant];
        }

        // sort media gallery
        mix_variant = mix_variant.filter((m => m.is_active)).sort((first, second) => { try { return first.sort - second.sort; } catch { return 0; } });
        if (parent.variant?.length > 1 || parent?.variant[0]?.labels?.length > 1) {
            // add title and parent_id
            mix_variant = mix_variant.map(m => {
                const keys = m.keys;
                const labels = [];
                for (let i in keys) {
                    let label;
                    parent.variant.find(variant => {
                        return variant.labels.find(l => {
                            if (l.key == keys[i]) {
                                label = l.title;
                                return true;
                            }
                        });
                    });
                    if (label)
                        labels.push(label);
                }
                // append title
                const new_title = {};
                for (let i in labels) {
                    const keys = Object.keys(labels[i]);
                    for (let l in keys) {
                        const lang = keys[l];
                        if (new_title[lang])
                            new_title[lang] += `, ${labels[i][lang]}`;
                        else
                            new_title[lang] = labels[i][lang];
                    }
                }
                m.title = new_title;
                m.product_id = parent._id;
                return m;
            });
        } else {
            mix_variant = mix_variant.map((m) => {
                m.product_id = parent._id;
                return m;
            });
        }

        return mix_variant;

    } catch (e) {
        return [];
    }
};