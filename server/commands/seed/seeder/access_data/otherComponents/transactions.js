module.exports = [
    {
        "_id": {
            "$oid": "6194a8cf476c9c293571b68a"
        },
        "name": "مدیریت تراکنش ها",
        "type": 1,
        "action": "/transactions",
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
            "$oid": "6194a8cf476c9c293571b68b"
        },
        "name": "گرفتن تراکنش ها",
        "type": 4,
        "key": "transactions_list",
        "action": "getTransaction&&getTransactions&&getAllTransactions",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a8cf476c9c293571b68a"
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
            "$oid": "6194a8cf476c9c293571b68c"
        },
        "name": "اضافه کردن تراکنش",
        "type": 5,
        "key": "transactions_create_transaction_action",
        "action": "createUserTransaction",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a8cf476c9c293571b68a"
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
            "$oid": "6194a8cf476c9c293571b68d"
        },
        "name": "ویرایش تراکنش",
        "type": 5,
        "key": "transactions_update_transaction_action",
        "action": "updateTransaction",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a8cf476c9c293571b68a"
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
            "$oid": "6194a8cf476c9c293571b68e"
        },
        "name": "حذف تراکنش",
        "type": 5,
        "key": "transactions_delete_transaction_action",
        "action": "deleteTransaction",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a8cf476c9c293571b68a"
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