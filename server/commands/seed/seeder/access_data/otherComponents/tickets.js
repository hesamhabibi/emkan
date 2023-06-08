module.exports = [
    {
        "_id": {
            "$oid": "61bb038366b74154f653bbf0"
        },
        "name": "مدیریت تیکت ها",
        "type": 1,
        "action": "/tickets",
        "description": "...",
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-11-05T14:55:28.328Z"
        },
        "updatedAt": {
            "$date": "2021-11-05T14:55:28.328Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "61bb038366b74154f653bbf1"
        },
        "name": "گرفتن لیست تیکت ها",
        "type": 4,
        "key": "tickets_list",
        "action": "getAllTickets&&getTickets&&getTicket",
        "sort": 999999,
        "parent_id": {
            "$oid": "61bb038366b74154f653bbf0"
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