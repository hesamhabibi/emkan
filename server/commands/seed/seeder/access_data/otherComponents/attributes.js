module.exports = [
    {
        "_id": {
            "$oid": "61be08a1fc39352600bf43e2"
        },
        "__v": 0,
        "action": "/attributes",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.994Z"
        },
        "description": null,
        "field": null,
        "key": null,
        "kind_status": 1,
        "name": "مدیریت مشخصات",
        "parent_id": null,
        "sort": null,
        "type": 1,
        "updatedAt": {
            "$date": "2021-09-23T06:44:15.065Z"
        }
    }, {
        "_id": {
            "$oid": "61be08a1fc39352600bf43e3"
        },
        "name": "گرفتن لیست مشخصات ها",
        "type": 4,
        "key": "attributes_list",
        "action": "getAllAttributes&&getAttributes&&getAttribute",
        "sort": 999999,
        "parent_id": {
            "$oid": "61be08a1fc39352600bf43e2"
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