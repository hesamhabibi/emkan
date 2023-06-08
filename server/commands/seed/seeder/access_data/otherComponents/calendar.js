module.exports = [
    {
        "_id": {
            "$oid": "61beffec81f69a2d9a25c3f0"
        },
        "name": "تقویم",
        "type": 1,
        "action": "/calendar",
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
            "$oid": "61beffec81f69a2d9a25c3f1"
        },
        "name": "گرفتن یادآور ها",
        "type": 4,
        "key": "reminders_list",
        "action": "getReminder&&getReminders&&getAllReminders&&getAllSelfReminders&&getRangeSelfReminders",
        "sort": 999999,
        "parent_id": {
            "$oid": "61beffec81f69a2d9a25c3f0"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:53.869Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:21.559Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61beffec81f69a2d9a25c3f2"
        },
        "name": "گرفتن رویداد ها",
        "type": 4,
        "key": "events_list",
        "action": "getRangeCalenderEvents",
        "sort": 999999,
        "parent_id": {
            "$oid": "61beffec81f69a2d9a25c3f0"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:53.869Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:21.559Z"
        },
        "__v": 0
    },
];