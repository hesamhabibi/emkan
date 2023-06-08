module.exports = [
    {
        "_id": {
            "$oid": "6194b2072634f9437612af00"
        },
        "name": "دسته بندی های رویداد ها",
        "type": 1,
        "action": "/categories/event",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:13:21.701Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T09:05:34.522Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "6194b2072634f9437612af01"
        },
        "name": "گرفتن لیست دسته بندی ها",
        "type": 4,
        "key": "categories_event_list",
        "action": "getAllCategories&&getCategories&&getCategory",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af00"
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
    {
        "_id": {
            "$oid": "6194b2072634f9437612af02"
        },
        "name": "مرتب سازی دسته بندی ها",
        "type": 5,
        "key": "categories_sort_action",
        "action": "sortCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af00"
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