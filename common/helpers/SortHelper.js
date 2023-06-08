function sort_query(input_sorts = [], defaults = { type: -1, field: "createdAt" }) {
    const sortObject = {};

    for (const input of input_sorts) {
        let sortType = defaults?.type;
        switch (input?.type) {
            case "ASC":
                sortType = 1;
                break;
            case "DESC":
                sortType = -1;
            default:
                sortType = defaults?.type;
        }
        const sortField = input?.field || defaults?.field;
        sortObject[sortField] = sortType;
    }

    if (Object.keys(sortObject).length > 0) {
        return sortObject;
    }

    return { [defaults?.field]: defaults?.type };
}

module.exports = {
    sort_query,
}