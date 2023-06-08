module.exports = async (resolve, parent, args, context, info) => {
    info.path.fieldName = info.fieldName;
    return resolve(parent, args, context, info);
};