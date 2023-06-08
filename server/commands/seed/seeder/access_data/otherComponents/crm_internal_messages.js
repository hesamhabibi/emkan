module.exports = [
    {
        "_id": {
            "$oid": "612891ee75328c1a6a765bf8"
        },
        "name": "پیام های داخلی",
        "type": 1,
        "key": "crm_internal_messages",
        "action": "/crm/internal-message",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:19:10.078Z"
        },
        "updatedAt": {
            "$date": "2021-10-30T12:36:02.672Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "619216215900abf606a46f2b"
        },
        "name": "گرفتن لیست پیام ها",
        "type": 4,
        "key": "crm_internal_messages_list",
        "action": "getAllCRMs&&getCRMs&&getCRM",
        "sort": 999999,
        "parent_id": {
            "$oid": "612891ee75328c1a6a765bf8"
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
            "$oid": "619216215900abf606a46f2c"
        },
        "name": "گرفتن لیست کاربر ها",
        "type": 4,
        "key": "crm_internal_messages_users_list",
        "action": "getAllUsers&&getUsers&&getUser",
        "sort": 999999,
        "parent_id": {
            "$oid": "612891ee75328c1a6a765bf8"
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