module.exports = [
    {
        "_id": {
            "$oid": "6194a63919891921a97b7b94"
        },
        "name": "مدیریت استعلام قیمت ها",
        "type": 1,
        "action": "/inquiries",
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
            "$oid": "6194a63919891921a97b7b95"
        },
        "name": "گرفتن استعلام قیمت ها",
        "type": 4,
        "key": "inquiries_list",
        "action": "getInquiry&&getInquiries&&getAllInquiries",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891921a97b7b94"
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
            "$oid": "6194a63919891921a97b7b96"
        },
        "name": "اضافه کردن استعلام قیمت",
        "type": 5,
        "key": "inquiries_create_inquiry_action",
        "action": "createUserInquiry",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891921a97b7b94"
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
            "$oid": "6194a63919891921a97b7b97"
        },
        "name": "ویرایش استعلام قیمت",
        "type": 5,
        "key": "inquiries_update_inquiry_action",
        "action": "updateInquiry",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891921a97b7b94"
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
            "$oid": "6194a63919891921a97b7b98"
        },
        "name": "حذف استعلام قیمت",
        "type": 5,
        "key": "inquiries_delete_inquiry_action",
        "action": "deleteInquiry",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194a63919891921a97b7b94"
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