module.exports = [
    {
        "_id": {
            "$oid": "618545e051de1937f0788590"
        },
        "name": "مدیریت اسلایدر",
        "type": 1,
        "action": "/sliders",
        "description": "...",
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-11-05T14:55:28.328Z"
        },
        "updatedAt": {
            "$date": "2021-11-05T14:55:28.328Z"
        },
        "__v": 0
    },

    {
        "_id": {
            "$oid": "619250778c0a6acfa653eeb8"
        },
        "name": "گرفتن لیست اسلایدر ها",
        "type": 4,
        "key": "sliders_list",
        "action": "getAllSliders&&getSliders&&getSlider",
        "sort": 999999,
        "parent_id": {
            "$oid": "618545e051de1937f0788590"
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