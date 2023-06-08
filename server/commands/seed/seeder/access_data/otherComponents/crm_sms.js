module.exports = [
    {
        "_id": {
            "$oid": "61bf04c839eca73b69c1d862"
        },
        "name": "پیامک (SMS)",
        "type": 1,
        "key": "crm_sms",
        "action": "/crm/sms",
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
            "$oid": "61bf04c839eca73b69c1d863"
        },
        "name": "گرفتن لیست پیام ها",
        "type": 4,
        "key": "crm_sms_list",
        "action": "getAllCRMs&&getCRMs&&getCRM",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bf04c839eca73b69c1d862"
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
            "$oid": "61bf04c839eca73b69c1d864"
        },
        "name": "گرفتن لیست کاربر ها",
        "type": 4,
        "key": "crm_sms_users_list",
        "action": "getAllUsers&&getUsers&&getUser",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bf04c839eca73b69c1d862"
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