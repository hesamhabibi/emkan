module.exports = [
    {
        "_id": {
            "$oid": "6194b2072634f9437612af50"
        },
        "name": "دسته بندی های پروژه ها",
        "type": 1,
        "action": "/categories/project",
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
            "$oid": "6194b2072634f9437612af51"
        },
        "name": "گرفتن لیست دسته بندی ها",
        "type": 4,
        "key": "categories_project_list",
        "action": "getAllCategories&&getCategories&&getCategory",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af50"
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
            "$oid": "6194b2072634f9437612af52"
        },
        "name": "مرتب سازی دسته بندی ها",
        "type": 5,
        "key": "categories_sort_action",
        "action": "sortCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af50"
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