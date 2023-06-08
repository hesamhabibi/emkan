module.exports = [
    {
        "_id": {
            "$oid": "6128923f75328c1a6a765c98"
        },
        "name": "مدیریت محصولات",
        "type": 1,
        "action": "/products",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:20:31.987Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T09:05:57.980Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "619216215900abf606a46f21"
        },
        "name": "گرفتن لیست محصولات",
        "type": 4,
        "key": "products_list",
        "action": "getAllProducts&&getProducts&&getProduct",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bd096e10"
        },
        "name": "گرفتن لیست کامنت ها",
        "type": 4,
        "key": "products_comments_list",
        "action": "getComments&&getAllComments&&getComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bf096e10"
        },
        "name": "اضافه کردن کامنت",
        "type": 5,
        "key": "products_create_comments_action",
        "action": "createComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bf096e11"
        },
        "name": "ویرایش کامنت",
        "type": 5,
        "key": "products_update_comments_action",
        "action": "updateComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bf096e12"
        },
        "name": "حذف کامنت",
        "type": 5,
        "key": "products_delete_comments_action",
        "action": "deleteComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
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
            "$oid": "619216215900abf606a46fff"
        },
        "name": "گرفتن لیست مشخصات(attributes)",
        "type": 4,
        "key": "brands_list",
        "action": "getAllAttributes&&getAttributes&&getAttribute&&getAttributeValue&&getAllAttributeValues&&getAllColorLabels",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
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
            "$oid": "619216215900abf606a46ffe"
        },
        "name": "گرفتن لیست محصولات مشابه",
        "type": 4,
        "key": "brands_list",
        "action": "getAllRelatedProductBySelection",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
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
            "$oid": "619216215900abf506a46ffe"
        },
        "name": "گرفتن لیست برند ها",
        "type": 4,
        "key": "products_brands_list",
        "action": "getBrands&&getAllBrands&&getBrand",
        "sort": 999999,
        "parent_id": {
            "$oid": "6128923f75328c1a6a765c98"
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