/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { MediaModel }, trans }) => {
    const medias = args.input;
    for (let i = 0; i < medias.length; i += 1) {
        try {
            await MediaModel.findByIdAndUpdate(medias[i].id, {
                sort: medias[i].sort,
                main: medias[i].main,
                alt: medias[i].alt,
            });
        } catch (e) {
            console.log('in sort media: ', e);
        }
    }
    return {
        success: true,
        message: trans('done'),
    };

};