module.exports = [
    {
        "_id": {
            "$oid": "6194a63919891920a97a6b90"
        },
        "name": "مدیریت آدرس ها",
        "type": 1,
        "action": "/user",
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
            "$oid": "6194a63919891920a97a6b94"
        },
        "name": "گرفتن آدرس ها",
        "type": 4,
        "key": "addresses_list",
        "action": "getAddress&&getAddresses&&getAllAddresses",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97a6b90"
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
            "$oid": "6194a63919891920a97a6b91"
        },
        "name": "اضافه کردن آدرس",
        "type": 5,
        "key": "addresses_create_address_action",
        "action": "createUserAddress",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97a6b90"
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
            "$oid": "6194a63919891920a97a6b92"
        },
        "name": "ویرایش آدرس",
        "type": 5,
        "key": "addresses_update_address_action",
        "action": "updateAddress",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97a6b90"
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
            "$oid": "6194a63919891920a97a6b93"
        },
        "name": "حذف آدرس",
        "type": 5,
        "key": "addresses_delete_address_action",
        "action": "deleteAddress",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891920a97a6b90"
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