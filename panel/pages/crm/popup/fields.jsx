import Tag from "@admin/Tag"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import Button from "@admin/Button"
import Table from "@admin/Table"
import { useContext } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"

const Component = ({
  control,
  setValue,
  getValues,
  users,
  fields,
  clearErrors,
}) => {
  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)

  /**
   * Deletes an item from fields state
   * @param item
   */
  const deleteItem = (item) => {
    clearErrors("send_to")

    setValue(
      "send_to",
      getValues("send_to")?.filter(
        (field) => field.receiver_value !== item.mobile
      )
    )
  }

  return fields.length ? (
    <GridContainer gap="Lg">
      <Grid className="d-flex align-items-end" size={12}>
        {translation("users", "sms")}
      </Grid>
      <Grid size={isDesktop ? 9 : 12}>
        <Input
          type="select-multiple-label"
          addable={false}
          placeholder={translation("user", "sms")}
          control={control}
          name="send_to"
          data={fields.map((item) => ({
            name: item.full_name,
            id: {
              receiver_user_id: item.id,
            },
          }))}
        />
      </Grid>
      <Grid size={isDesktop ? 3 : 12}>
        <Button
          disabled={users && getValues("send_to").length === fields.length}
          type="white"
          className="w-100"
          onClick={() =>
            setValue(
              "send_to",
              fields.map((item) => ({
                receiver_user_id: item.id,
                receiver_value: item.mobile,
                // full_name: item.full_name,
              }))
            )
          }
        >
          <i className="fas fa-users-class ml-1" />
          {translation("Choose All Users", "sms")}
        </Button>
      </Grid>
      <Grid size={12}>
        {users && getValues("send_to").length >= fields.length ? (
          <p className="p-4 text-center">
            {translation("All users are chosen", "sms")}

            <i
              className="fas fa-trash-alt mr-2"
              style={{ cursor: "pointer" }}
              onClick={() => setValue("send_to", [])}
            />
          </p>
        ) : getValues("send_to")?.length ? (
          <Table
            fields={[
              {
                title: "title",
              },
            ]}
            actions={[
              {
                onClick: deleteItem,
                icon: "far fa-trash-alt",
              },
            ]}
            section="sms"
            data={getValues("send_to").map((item) => {
              return {
                mobile: item.receiver_value,
                title: fields.find(
                  (field) => field.id === item.receiver_user_id
                )?.full_name,
              }
            })}
          />
        ) : (
          <p className="p-4 text-center">{translation("Choose User", "sms")}</p>
        )}
      </Grid>
    </GridContainer>
  ) : (
    <Grid size={12} className="mt-5 text-center">
      <Tag type="primary">{translation("No Mobile Available", "sms")}</Tag>
    </Grid>
  )
}

const Fields = {
  allowed: ["title", "message", "send_to", "data"],

  tableActions: (actions) => [
    {
      onClick: (rows) => actions.view(rows),
      icon: "fa-eye",
      perm: "crm_popup_message_view_record_action",
      tooltip: "view",
      dir: "right",
    },
    {
      onClick: (rows) => actions.sms(rows),
      icon: "fa-redo fa-sm",
      perm: "crm_popup_message_redo_action",
      tooltip: "repeat",
      dir: "right",
    },
  ],
  tableFields: (translation) => [
    { title: "title", perm: "crm_popup_status_column" },
    {
      title: "status",
      td: (item) =>
        item.status === 1 ? (
          <Tag type="info">{translation("Pending", "sms")}</Tag>
        ) : item.status === 2 ? (
          <Tag type="success">{translation("Success", "sms")}</Tag>
        ) : (
          <Tag type="error">{translation("Reject", "sms")}</Tag>
        ),
      perm: "crm_popup_status_column",
    },
    {
      title: "date",
      td: (row) => new Date(parseInt(row.date, 10)).toLocaleString("fa-IR"),
      perm: "crm_popup_date_column",
    },
  ],
  filterFields: (translation) => [
    [
      {
        perm: "crm_popup_status_column",
        size: 6,
        type: "toggle",
        name: "status",
        data: [
          {
            name: translation("any"),
            status: true,
            color: "#ffb115",
            id: "",
          },
          {
            name: translation("Pending", "sms"),
            status: false,
            color: "#6B7B93FF",
            id: 1,
          },
          {
            name: translation("Success", "sms"),
            status: false,
            color: "#3ECF8EFF",
            id: 2,
          },
          {
            name: translation("Reject", "sms"),
            status: false,
            color: "#EC6060FF",
            id: 3,
          },
        ],
      },
      {
        perm: "crm_popup_date_column",
        size: 6,
        type: "date",
        data: { dateTime: true },
        name: "date",
      },
    ],
  ],
  form: (translation, getValues, setValue, users, fields, clearErrors) => [
    [
      {
        size: 6,
        type: "text",
        name: "title",
        rules: { required: true },
        placeholder: translation("title", "sms"),
        perm: "crm_popup_title_field",
      },
      {
        size: 6,
        name: "date",
        type: "date",
        info: translation("if no date selected", "sms"),
        perm: "crm_popup_date_field",
      },
      {
        size: 6,
        type: "number",
        name: "view_count",
        label: translation("view_count"),
        perm: "crm_popup_view_count_field",
      },
      {
        label: translation("Link"),
        name: "link",
        size: 6,
        direction: "ltr",
        perm: "crm_popup_link_field",
      },
      {
        rules: { required: true },
        name: "message",
        type: "text-editor",
        size: 12,
        placeholder: translation("Enter Message to send", "sms"),
        perm: "crm_popup_message_field",
      },
      {
        size: 12,
        render: ({ control }) => (
          <Component
            fields={fields}
            control={control}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            users={users}
          />
        ),
        perm: "crm_popup_send_to_field",
      },
    ],
  ],
}

export default Fields
