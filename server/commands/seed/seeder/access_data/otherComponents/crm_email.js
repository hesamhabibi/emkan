module.exports = [
    {
        "_id": {
            "$oid": "61bf04d5a184d33badeccd32"
        },
        "name": "ایمیل (email)",
        "type": 1,
        "key": "crm_email",
        "action": "/crm/email",
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
            "$oid": "61bf04d5a184d33badeccd33"
        },
        "name": "گرفتن لیست پیام ها",
        "type": 4,
        "key": "crm_email_list",
        "action": "getAllCRMs&&getCRMs&&getCRM",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bf04d5a184d33badeccd32"
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
            "$oid": "61bf04d5a184d33badeccd34"
        },
        "name": "گرفتن لیست کاربر ها",
        "type": 4,
        "key": "crm_email_users_list",
        "action": "getAllUsers&&getUsers&&getUser",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bf04d5a184d33badeccd32"
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