module.exports = [
    {
        "_id": {
            "$oid": "6194b2072634f9437612af40"
        },
        "name": "دسته بندی محصولات",
        "type": 1,
        "action": "/categories/product",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-09-08T16:18:05.399Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T06:46:13.291Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "6194b2072634f9437612af41"
        },
        "name": "گرفتن لیست دسته بندی ها",
        "type": 4,
        "key": "categories_product_list",
        "action": "getAllCategories&&getCategories&&getCategory",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af40"
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
            "$oid": "6194b2072634f9437612af42"
        },
        "name": "مرتب سازی دسته بندی ها",
        "type": 5,
        "key": "categories_sort_action",
        "action": "sortCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194b2072634f9437612af40"
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