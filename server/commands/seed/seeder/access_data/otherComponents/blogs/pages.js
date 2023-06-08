module.exports = [
    {
        "_id": {
            "$oid": "6194abce10436c2dc4651210"
        },
        "name": "مدیریت صفحه ها",
        "type": 1,
        "action": "/blogs/page",
        "description": null,
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-27T07:09:13.132Z"
        },
        "updatedAt": {
            "$date": "2021-09-23T06:46:53.330Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "6194abce10436c2dc4651217"
        },
        "name": "گرفتن لیست صفحه ها",
        "type": 4,
        "key": "blogs_page_list",
        "action": "getAllBlogs&&getBlogs&&getBlog",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    },   {
        "_id": {
            "$oid": "6110d42d79874e37b5096110"
        },
        "name": "گرفتن لیست کامنت ها",
        "type": 4,
        "key": "blogs_pages_comments_list",
        "action": "getComments&&getAllComments&&getComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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
            "$oid": "6110d42d79874e37b5096110"
        },
        "name": "اضافه کردن کامنت",
        "type": 5,
        "key": "blogs_pages_create_comments_action",
        "action": "createComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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
            "$oid": "6110d42d79874e37b5096111"
        },
        "name": "ویرایش کامنت",
        "type": 5,
        "key": "blogs_pages_update_comments_action",
        "action": "updateComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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
            "$oid": "6110d42d79874e37b5096112"
        },
        "name": "حذف کامنت",
        "type": 5,
        "key": "blogs_pages_delete_comments_action",
        "action": "deleteComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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
            "$oid": "6194abce10436c2dc4651219"
        },
        "name": "گرفتن دسته بندی ها",
        "type": 4,
        "key": "blogs_page_get_categories_field",
        "action": "getAllCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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
            "$oid": "6194abce10436c2dc465121a"
        },
        "name": "گرفتن تگ ها",
        "type": 4,
        "key": "blogs_page_get_tags_field",
        "action": "getAllTags",
        "sort": 999999,
        "parent_id": {
            "$oid": "6194abce10436c2dc4651210"
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