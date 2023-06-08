import Tag from "@admin/Tag"

export default {
    allowedFields: ["type", "condition", "list", "extra_fields"],
    fields: [[]],
    filterFields: (translation) => [
        [
            {
                name: "extra_fields.show",
                type: "toggle",
                // perm: "campaigns_show_column",
                data: [
                    {
                        name: translation("any"),
                        color: "#ffb115",
                        id: "",
                    },
                    {
                        name: translation("Show"),
                        color: "#3ECF8E",
                        id: true,
                    },
                    {
                        name: translation("Hide"),
                        color: "#EC6060",
                        id: false,
                    },
                ],
            },
        ],
    ],
    tableFields: (translation) => [
        {
            title: translation("title"),
            td: (row) => row.extra_fields.title_panel,
            // perm: "campaigns_title_field",
        },
        {
            title: translation("show"),
            td: (row) =>
                row.extra_fields.show ? (
                    <Tag type="success">
                        <i className="fas fa-check-circle"/>
                    </Tag>
                ) : (
                    <Tag type="orange">
                        <i className="fas fa-times-circle"/>
                    </Tag>
                ),
            // perm: "campaigns_show_column",
        },
        {
            title: translation("startAt"),
            td: (row) => {
                if (!row?.extra_fields?.startAt) {
                    return '-'
                }
                return new Date(parseInt(row.extra_fields.startAt, 10)).toLocaleDateString(
                    "fa-IR"
                )
            }
            // perm: "campaigns_start_at_column",
        },
        {
            title: translation("expireAt"),
            td: (row) => {
                if (!row?.extra_fields?.expireAt) {
                    return '-'
                }
                return new Date(parseInt(row.extra_fields.expireAt, 10)).toLocaleDateString(
                    "fa-IR"
                )
            }
            ,
            // perm: "campaigns_expire_at_column",
        },
    ],
    tableActions: (actions) => [
        {
            icon: "fa-edit",
            onClick: actions.edit,
            // perm: "campaigns_edit_action",
        },
        {
            icon: "fa-trash-alt",
            onClick: actions.delete,
            // perm: "campaigns_delete_action",
        },
    ],
}
