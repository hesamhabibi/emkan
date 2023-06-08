const { getMenuItemsByAccess } = require('@helpers/MenuItemHelper');

module.exports = async (parent, args, { AuthUser }) => {
    const result = await getMenuItemsByAccess(AuthUser);
    return result;
};
