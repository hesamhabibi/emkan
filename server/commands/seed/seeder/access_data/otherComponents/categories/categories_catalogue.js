module.exports = [
    {
        "_id": {
            "$oid": "6194b2072634f9437612af30"
        },
        "name": "دسته بندی های کاتالوگ",
        "type": 1,
        "action": "/categories/catalogue",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:13:42.221Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T06:46:29.462Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "6194b2072634f9437612af31"
        },
        "name": "گرفتن لیست دسته بندی ها",
        "type": 4,
        "key": "categories_catalogue_list",
        "action": "getAllCategories&&getCategories&&getCategory",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af30"
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
            "$oid": "6194b2072634f9437612af32"
        },
        "name": "مرتب سازی دسته بندی ها",
        "type": 5,
        "key": "categories_sort_action",
        "action": "sortCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af30"
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