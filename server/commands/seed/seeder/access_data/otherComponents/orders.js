module.exports = [
    {
        "_id": {
            "$oid": "6194a63919891920a97b7b94"
        },
        "name": "مدیریت سفارش ها",
        "type": 1,
        "action": "/orders",
        "description": "توضیحات...",
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
            "$oid": "6194a63919891920a97b7b95"
        },
        "name": "گرفتن سفارش ها",
        "type": 4,
        "key": "orders_list",
        "action": "getOrder&&getOrders&&getAllOrders",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97b7b94"
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
            "$oid": "6194a63919891920a97b7b96"
        },
        "name": "اضافه کردن سفارش",
        "type": 5,
        "key": "orders_create_order_action",
        "action": "createUserOrder",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97b7b94"
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
            "$oid": "6194a63919891920a97b7b97"
        },
        "name": "ویرایش سفارش",
        "type": 5,
        "key": "orders_update_order_action",
        "action": "updateOrder",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97b7b94"
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
            "$oid": "6194a63919891920a97b7b98"
        },
        "name": "حذف سفارش",
        "type": 5,
        "key": "orders_delete_order_action",
        "action": "deleteOrder",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97b7b94"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:53.869Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:21.559Z"
        },
        "__v": 0
    }
];