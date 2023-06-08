module.exports = [
    {
        "_id": {
            "$oid": "60964dbdf384c730109d953a"
        },
        "__v": 0,
        "action": "/tags",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.972Z"
        },
        "description": "مدیریت تگ ها",
        "field": null,
        "key": null,
        "kind_status": 1,
        "name": "تگ ها",
        "parent_id": null,
        "sort": 5,
        "type": 1,
        "updatedAt": {
            "$date": "2021-09-23T06:47:12.079Z"
        }
    }, {
        "_id": {
            "$oid": "60964e0cf384c730109d953f"
        },
        "__v": 0,
        "action": "",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.973Z"
        },
        "description": "عنوان تگ ",
        "field": "title",
        "key": "tags_title_column",
        "kind_status": 1,
        "name": "عنوان",
        "parent_id": {
            "$oid": "60964dbdf384c730109d953a"
        },
        "sort": 99,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.610Z"
        }
    }, {
        "_id": {
            "$oid": "60965219f384c730109d9568"
        },
        "__v": 0,
        "action": "createTag",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.974Z"
        },
        "description": "قابلیت ساخت تگ",
        "field": null,
        "key": "tags_create_action",
        "kind_status": 1,
        "name": "دکمه ساخت تگ جدید",
        "parent_id": {
            "$oid": "60964dbdf384c730109d953a"
        },
        "sort": 1,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.611Z"
        }
    }, {
        "_id": {
            "$oid": "6096523df384c730109d956b"
        },
        "__v": 0,
        "action": "updateTag",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.975Z"
        },
        "description": "دکمه ویرایش تگ ها",
        "field": null,
        "key": "tags_edit_action",
        "kind_status": 1,
        "name": "دکمه ویرایش تگ ها",
        "parent_id": {
            "$oid": "60964dbdf384c730109d953a"
        },
        "sort": 2,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.612Z"
        }
    }, {
        "_id": {
            "$oid": "60965260f384c730109d956e"
        },
        "__v": 0,
        "action": "deleteTag",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.976Z"
        },
        "description": "قابلیت حذف تگ",
        "field": null,
        "key": "tags_delete_action",
        "kind_status": 1,
        "name": "دکمه حذف تگ",
        "parent_id": {
            "$oid": "60964dbdf384c730109d953a"
        },
        "sort": 3,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.613Z"
        }
    },{
        "_id": {
            "$oid": "6110d42d79874e37bd096e16"
        },
        "name": "گرفتن لیست تگ ها",
        "type": 4,
        "key": "tags_list",
        "action": "getAllTags&&getTags&&getTag",
        "sort": 999999,
        "parent_id": {
            "$oid": "60964dbdf384c730109d953a"
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