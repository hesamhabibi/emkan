module.exports = [
    {
        "_id": {
            "$oid": "6128929175328c1a6a765cff"
        },
        "name": "تنظیمات سایت",
        "type": 1,
        "action": "/settings",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:21:53.275Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T06:46:05.378Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "619216215900abf606a45f2d"
        },
        "name": "گرفتن لیست تنظیمات",
        "type": 4,
        "key": "settings_list",
        "action": "getAllSettings&&getSettings&&getSetting",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128929175328c1a6a765cff"
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
            "$oid": "619216215901abf606a46f2d"
        },
        "name": "ویرایش تنظیمات",
        "type": 4,
        "key": "settings_update_action",
        "action": "createSetting&&updateSetting&&updateSettingByKey&&deleteSetting&&getSettingByKey",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128929175328c1a6a765cff"
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