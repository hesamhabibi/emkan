module.exports = [
    {
        "_id": {
            "$oid": "61befba9e1679d2734f7eb27"
        },
        "name": "مدیریت روش های پرداخت",
        "type": 1,
        "action": "/payment-gateways",
        "description": "",
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
            "$oid": "61befba9e1679d2734f7eb28"
        },
        "name": "گرفتن روش های پرداخت",
        "type": 4,
        "key": "payment_gateways_list",
        "action": "getPaymentGateway&&getPaymentGateways&&getAllPaymentGateways",
        "sort": 999999,
        "parent_id": {
            "$oid": "61befba9e1679d2734f7eb27"
        },
        "kind_status": 1,
        "createdAt": {
            "$date": "2021-08-09T07:07:53.869Z"
        },
        "updatedAt": {
            "$date": "2021-08-09T07:08:21.559Z"
        },
        "__v": 0
    },
];