module.exports = [
    {
        "_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "name": "کد تخفیف",
        "type": 1,
        "action": "/discount-codes",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-07T07:12:46.391Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T06:43:49.023Z"
        },
        "__v": 0
    },

    {
        "_id": {
            "$oid": "61bef9f207df28242a23f181"
        },
        "name": "همه تخفیف ها",
        "type": 4,
        "key": "discounts_list",
        "action": "getAllDiscounts&&getDiscounts&&getDiscount",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bef9f207df28242a23f182"
        },
        "name": "همه کاربران",
        "type": 4,
        "key": "users_list",
        "action": "getAllUsers&&getUsers&&getUser",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bef9f207df28242a23f183"
        },
        "name": "همه کمپین ها",
        "type": 4,
        "key": "campaigns_list",
        "action": "getAllCampaigns&&getCampaigns&&getCampaign&&getAllCampaignCollections",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bef9f207df28242a23f184"
        },
        "name": "همه دسترسی ها",
        "type": 4,
        "key": "accesses_list",
        "action": "getAllAccesses&&getAccesses&&getAccess",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bef9f207df28242a23f185"
        },
        "name": "همه دسته بندی ها",
        "type": 4,
        "key": "accesses_list",
        "action": "getAllCategories&&getCategories&&getCategory",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bef9f207df28242a23f180"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },
];