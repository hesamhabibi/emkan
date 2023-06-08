module.exports = [
    {
        "_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "__v": 0,
        "action": "/reports",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.977Z"
        },
        "description": "توضیحات...123",
        "field": null,
        "key": null,
        "kind_status": 1,
        "name": "گزارش ها",
        "parent_id": null,
        "sort": null,
        "type": 1,
        "updatedAt": {
            "$date": "2021-09-23T06:44:58.862Z"
        }
    }, {
        "_id": {
            "$oid": "609945a7795fac23006bf65b"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.978Z"
        },
        "description": "...",
        "field": null,
        "key": "reports_set_status_action",
        "kind_status": 1,
        "name": "دکمه تعین وضعیت",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.615Z"
        }
    }, {
        "_id": {
            "$oid": "609945f0795fac23006bf661"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.979Z"
        },
        "description": "...",
        "field": "action",
        "key": "reports_action_column",
        "kind_status": 1,
        "name": "اکشن",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.616Z"
        }
    }, {
        "_id": {
            "$oid": "6099460d795fac23006bf664"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.979Z"
        },
        "description": "...",
        "field": "action_type ",
        "key": "reports_action_type_column",
        "kind_status": 1,
        "name": "نوع اکشن",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.617Z"
        }
    }, {
        "_id": {
            "$oid": "60994639795fac23006bf667"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.980Z"
        },
        "description": "....",
        "field": "status",
        "key": "reports_status_column",
        "kind_status": 1,
        "name": "وضعیت",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.618Z"
        }
    }, {
        "_id": {
            "$oid": "609946b7795fac23006bf672"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.981Z"
        },
        "description": "...",
        "field": "createdAt",
        "key": "reports_createdAt_column",
        "kind_status": 1,
        "name": "تاریخ",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.618Z"
        }
    }, {
        "_id": {
            "$oid": "609be5e0b234b73a0834b79b"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.982Z"
        },
        "description": "...",
        "field": null,
        "key": "reports_show_action",
        "kind_status": 1,
        "name": "دکمه نشان دادن گزارش",
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
        },
        "sort": null,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.619Z"
        }
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bd096e26"
        },
        "name": "گرفتن لیست گزارش ها",
        "type": 4,
        "key": "reports_list",
        "action": "getAllReports&&getReports&&getReport",
        "sort": 999999,
        "parent_id": {
            "$oid": "60993d5e795fac23006bf606"
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