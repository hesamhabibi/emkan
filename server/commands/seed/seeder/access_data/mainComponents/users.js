module.exports = [
    {
        "_id": {
            "$oid": "607df336accf750cc894a999"
        },
        "action": "getBadges",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.946Z"
        },
        "description": "بدج ...",
        "field": "name",
        "key": "users_badges",
        "kind_status": 1,
        "name": "بدج های کاربر",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 999999999,
        "type": 4,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.581Z"
        }
    },{
        "_id": {
            "$oid": "607df336accf750cc894a5a9"
        },
        "action": "",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.946Z"
        },
        "description": "توضیحات ...",
        "field": "name",
        "key": "users_name_column",
        "kind_status": 1,
        "name": "ستون نام",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 99,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.581Z"
        }
    }, {
        "_id": {
            "$oid": "607df34aaccf750cc894a5aa"
        },
        "action": "",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.948Z"
        },
        "description": "توضیحات ...",
        "field": "last_name",
        "key": "users_last_name_column",
        "kind_status": 1,
        "name": "ستون نام خانوادگی",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 99,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.582Z"
        }
    }, {
        "_id": {
            "$oid": "607df35baccf750cc894a5ab"
        },
        "action": "",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.949Z"
        },
        "description": "توضیحات ...",
        "field": "username",
        "key": "users_username_column",
        "kind_status": 1,
        "name": "ستون نام کاربری",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 99,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.583Z"
        }
    }, {
        "_id": {
            "$oid": "607df394accf750cc894a5ac"
        },
        "action": "",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.950Z"
        },
        "description": "توضیحات ...",
        "field": "email",
        "key": "users_email_column",
        "kind_status": 1,
        "name": "ستون ایمیل",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 99,
        "type": 2,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.585Z"
        }
    }, {
        "_id": {
            "$oid": "607df3d6accf750cc894a5af"
        },
        "action": "updateUser",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.952Z"
        },
        "description": "توضیحات ...",
        "field": null,
        "key": "users_edit_column",
        "kind_status": 1,
        "name": "دکمه ویرایش",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 2,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.587Z"
        }
    }, {
        "_id": {
            "$oid": "607df3dfaccf750cc894a5b0"
        },
        "action": "changePasswordUser",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.953Z"
        },
        "description": "توضیحات ...",
        "field": null,
        "key": "users_change_password_column",
        "kind_status": 1,
        "name": "دکمه تغییر رمز عبور",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 4,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.588Z"
        }
    }, {
        "_id": {
            "$oid": "607df428accf750cc894a5b1"
        },
        "action": "createUser",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.954Z"
        },
        "description": "توضیحات ...",
        "field": null,
        "key": "users_create_user",
        "kind_status": 1,
        "name": "دکمه ساخت کاربر جدید",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 1,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.589Z"
        }
    }, {
        "_id": {
            "$oid": "60969e88d6fa160d14cd9b91"
        },
        "action": "deleteUser",
        "createdAt": {
            "$date": "2021-07-29T12:26:10.976Z"
        },
        "description": null,
        "field": null,
        "key": "users_delete_user",
        "kind_status": 1,
        "name": "دکمه حذف",
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "sort": 3,
        "type": 5,
        "updatedAt": {
            "$date": "2021-09-07T06:33:09.614Z"
        }
    }, {
        "_id": {
            "$oid": "616584b47df8243eb4e83063"
        },
        "name": "ستون دسترسی",
        "type": 2,
        "key": "users_access_column",
        "description": null,
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-10-12T12:51:00.255Z"
        },
        "updatedAt": {
            "$date": "2021-10-12T12:51:00.255Z"
        }
    }, {
        "_id": {
            "$oid": "6165857e7df8243eb4e830be"
        },
        "name": "دکمه اطلاعات کاربر",
        "type": 5,
        "key": "users_view_info_action",
        "description": null,
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-10-12T12:54:22.330Z"
        },
        "updatedAt": {
            "$date": "2021-10-12T12:54:22.330Z"
        }
    }, {
        "_id": {
            "$oid": "6110d42d79874e37bd096ea6"
        },
        "name": "گرفتن لیست کاربران",
        "type": 4,
        "key": "users_users_list",
        "action": "getAllUsers&&getUsers&&getUser",
        "sort": 999999,
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
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
            "$oid": "6110d42d79874e37bd096ea5"
        },
        "name": "گرفتن لیست دسترسی ها",
        "type": 4,
        "key": "users_accesses_list",
        "action": "getAccessIdsByAccess",
        "sort": 999999,
        "parent_id": {
            "$oid": "607df2c4accf750cc894a5a8"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:25.833Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:17.341Z"
        },
        "__v": 0
    }
];