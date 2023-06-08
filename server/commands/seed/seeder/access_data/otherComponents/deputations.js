module.exports = [
    {
        "_id": {
            "$oid": "61bb038366b74154f653bbf5"
        },
        "name": "مدیریت نمایندگی ها",
        "type": 1,
        "action": "/deputations",
        "description": "",
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T06:49:06.182Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T09:05:20.032Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bb038366b74154f653bbf6"
        },
        "name": "گرفتن لیست نمایندگی ها",
        "type": 4,
        "key": "deputations_list",
        "action": "getAllDeputations&&getDeputations&&getDeputation",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bb038366b74154f653bbf5"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }
];