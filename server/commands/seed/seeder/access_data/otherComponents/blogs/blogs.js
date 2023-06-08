module.exports = [
    {
        "_id": {
            "$oid": "6110cfe279874e37bd096c8b"
        },
        "name": "مدیریت بلاگ",
        "type": 1,
        "action": "/blogs",
        "description": "مخصوص بلاگ",
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
            "$oid": "6110d42d79874e37bd096ea9"
        },
        "name": "گرفتن لیست بلاگ ها",
        "type": 4,
        "key": "blogs_list",
        "action": "getAllBlogs&&getBlogs&&getBlog",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d42d79874e37bf096110"
        },
        "name": "گرفتن لیست کامنت ها",
        "type": 4,
        "key": "blogs_comments_list",
        "action": "getComments&&getAllComments&&getComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d42d79874e37bf096110"
        },
        "name": "اضافه کردن کامنت",
        "type": 5,
        "key": "blogs_create_comments_action",
        "action": "createComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d42d79874e37bf096111"
        },
        "name": "ویرایش کامنت",
        "type": 5,
        "key": "blogs_update_comments_action",
        "action": "updateComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d42d79874e37bf096112"
        },
        "name": "حذف کامنت",
        "type": 5,
        "key": "blogs_delete_comments_action",
        "action": "deleteComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d42d79874e37bd096ea7"
        },
        "name": "گرفتن دسته بندی ها",
        "type": 4,
        "key": "blogs_get_categories_field",
        "action": "getAllCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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
            "$oid": "6110d44979874e37bd096eb3"
        },
        "name": "گرفتن تگ ها",
        "type": 4,
        "key": "blogs_get_tags_field",
        "action": "getAllTags",
        "sort": 999999,
        "parent_id": {
            "$oid": "6110cfe279874e37bd096c8b"
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