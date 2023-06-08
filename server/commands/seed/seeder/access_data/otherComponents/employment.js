module.exports = [
    {
        "_id": {
            "$oid": "61bf06229e5aad3df7dbcf92"
        },
        "name": "فرم های استخدام",
        "type": 1,
        "key": "employment",
        "action": "/employment",
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
            "$oid": "61bf06229e5aad3df7dbcf93"
        },
        "name": "گرفتن لیست فرم های استخدام",
        "type": 4,
        "key": "employment_list",
        "action": "getCareerForms",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bf06229e5aad3df7dbcf92"
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