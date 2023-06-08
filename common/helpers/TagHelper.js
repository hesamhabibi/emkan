const { TagModel } = require('../models');

const auto_create_tags = async (tags) => {
    const tag_ids = [];
    for (let i = 0; i < tags.length; i += 1) {
        let tag;
        try {
            tag = await TagModel.findOne({ title: tags[i] }).lean();
        } catch {
            tag = null;
        }

        if (!tag) {
            try {
                tag = await TagModel.create({ title: tags[i] });
            } catch (e) {
                tag = null;
            }
        }

        if (tag)
            tag_ids.push(tag._id);
    }

    return tag_ids;
};

module.exports = {
    auto_create_tags,
};