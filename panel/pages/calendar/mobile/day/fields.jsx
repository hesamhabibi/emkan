export default {
  form: (users, translation, isOwner, getValues) =>
    isOwner && getValues().is_owner
      ? [
          [
            {
              size: 12,
              name: "title",
              type: "text",
              perm: "calendar_title_field",
            },
            {
              size: 12,
              type: "textarea",
              name: "description",
              perm: "calendar_description_field",
            },
            {
              size: 12,
              type: "time",
              name: "start_date",
              perm: "calendar_start_date_field",
            },
            {
              size: 12,
              type: "time",
              name: "end_date",
              perm: "calendar_end_date_field",
            },
            {
              size: 12,
              type: "select-multiple",
              name: "access_user_ids",
              data: users,
              perm: "calendar_access_user_ids_field",
            },
            {
              size: 12,
              type: "toggle",
              name: "can_edit",
              data: [
                {
                  name: translation("True"),
                  color: "#3ECF8E",
                  id: true,
                },
                {
                  name: translation("False"),
                  color: "#EC6060",
                  id: false,
                },
              ],
              perm: "calendar_access_user_ids_field",
            },
          ],
        ]
      : [
          [
            {
              size: 12,
              name: "title",
              type: "text",
              perm: "calendar_title_field",
            },
            {
              size: 12,
              type: "textarea",
              name: "description",
              perm: "calendar_description_field",
            },
            {
              size: 12,
              type: "time",
              name: "start_date",
              perm: "calendar_start_date_field",
            },
            {
              size: 12,
              type: "time",
              name: "end_date",
              perm: "calendar_end_date_field",
            },
          ],
        ],
}
