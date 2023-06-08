module.exports = [
    {
        "_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "__v": 0,
        "action": "/brands",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.994Z"
        },
        "description": null,
        "field": null,
        "key": null,
        "kind_status": 1,
        "name": "مدیریت برند",
        "parent_id": null,
        "sort": null,
        "type": 1,
        "updatedAt": {
            "$date": "2021-09-23T06:44:15.065Z"
        }
    }, {
        "_id": {
            "$oid": "60b0b73648ffef27bcaab18b"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.994Z"
        },
        "description": null,
        "field": null,
        "key": "brands_active_column",
        "kind_status": 1,
        "name": "وضعیت برند",
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.633Z"
        }
    }, {
        "_id": {
            "$oid": "60b0b74748ffef27bcaab18e"
        },
        "__v": 0,
        "action": null,
        "createdAt": {
            "$date": "2021-07-29T12:26:10.995Z"
        },
        "description": null,
        "field": null,
        "key": "brands_title_column",
        "kind_status": 1,
        "name": "عنوان",
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "sort": null,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.633Z"
        }
    }, {
        "_id": {
            "$oid": "60b0b76348ffef27bcaab193"
        },
        "__v": 0,
        "action": "createBrand",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.996Z"
        },
        "description": null,
        "field": null,
        "key": "brands_create_action",
        "kind_status": 1,
        "name": "دکمه اضافه کردن برند",
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "sort": null,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.634Z"
        }
    }, {
        "_id": {
            "$oid": "60b0b77248ffef27bcaab196"
        },
        "__v": 0,
        "action": "updateBrand",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.997Z"
        },
        "description": null,
        "field": null,
        "key": "brands_edit_action",
        "kind_status": 1,
        "name": "دکمه ویرایش برند",
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "sort": null,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.635Z"
        }
    }, {
        "_id": {
            "$oid": "60b0b78748ffef27bcaab199"
        },
        "__v": 0,
        "action": "deleteBrand",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.998Z"
        },
        "description": null,
        "field": null,
        "key": "brands_delete_action",
        "kind_status": 1,
        "name": "دکمه حذف برند",
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
        },
        "sort": null,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.636Z"
        }
    },
    {
        "_id": {
            "$oid": "619216215900abf606a46f2d"
        },
        "name": "گرفتن لیست برند ها",
        "type": 4,
        "key": "brands_list",
        "action": "getAllBrands&&getBrands&&getBrand",
        "sort": 999999,
        "parent_id": {
            "$oid": "60b0b60248ffef27bcaab183"
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