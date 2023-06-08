module.exports = [
    {
        "_id": {
            "$oid": "61288f9975328c1a6a76596a"
        },
        "name": "مدیریت پروژه ها",
        "type": 1,
        "action": "/blogs/project",
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
            "$oid": "619225ee81ab2c3342402ca3"
        },
        "name": "گرفتن لیست پروژه ها",
        "type": 4,
        "key": "blogs_project_list",
        "action": "getAllBlogs&&getBlogs&&getBlog",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "6110d42d79874e37b6096110"
        },
        "name": "گرفتن لیست کامنت ها",
        "type": 4,
        "key": "blogs_projects_comments_list",
        "action": "getComments&&getAllComments&&getComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "6110d42d79874e37b6096110"
        },
        "name": "اضافه کردن کامنت",
        "type": 5,
        "key": "blogs_projects_create_comments_action",
        "action": "createComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "6110d42d79874e37b6096111"
        },
        "name": "ویرایش کامنت",
        "type": 5,
        "key": "blogs_projects_update_comments_action",
        "action": "updateComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "6110d42d79874e37b6096112"
        },
        "name": "حذف کامنت",
        "type": 5,
        "key": "blogs_projects_delete_comments_action",
        "action": "deleteComment",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "619225ee81ab2c3342402ca5"
        },
        "name": "گرفتن دسته بندی ها",
        "type": 4,
        "key": "blogs_project_get_categories_field",
        "action": "getAllCategories",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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
            "$oid": "619225ee81ab2c3342402ca6"
        },
        "name": "گرفتن تگ ها",
        "type": 4,
        "key": "blogs_project_get_tags_field",
        "action": "getAllTags",
        "sort": 999999,
        "parent_id": {
            "$oid": "61288f9975328c1a6a76596a"
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