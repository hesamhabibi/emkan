import Tag from "@admin/Tag"
import { seo, seo_input } from "~/app/global"

export default {
  tableFields: (translation) => [
    {
      title: "title_panel",
      perm: "brands_title_column",
    },
    {
      title: "status",
      td: (item) => translation(item.show_in_menu ? "Active" : "inactive"),
      perm: "brands_status_column",
    },
    {
      title: "show_in_menu",
      td: (item) =>
        item.show_in_menu ? (
          <Tag type="success">
            <i className="fas fa-check-circle" />
          </Tag>
        ) : (
          <Tag type="orange">
            <i className="fas fa-times-circle" />
          </Tag>
        ),
      perm: "brands_show_in_menu_column",
    },
  ],
  tableActions: (actions) => [
    {
      onClick: (rows) => actions.change(rows),
      icon: "fa-edit",
      tooltip: "edit",
      perm: "brands_edit_action",
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "fa-trash-alt",
      tooltip: "delete",
      perm: "brands_delete_action",
    },
  ],
  allowed: ["title", "active", "show_in_menu", "seo", "media"],
  form: (getValues, setValue, fireToast, translation) => [
    {
      perm: "brands_main_tab",
      title: translation("Brand"),
      form: [
        {
          name: "title",
          type: "multi-language",
          gridSize: 6,
          perm: "brands_title_field",
        },
        {
          name: "active",
          type: "toggle",
          size: 6,
          data: [
            {
              name: translation("active", "user"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("inactive", "user"),
              color: "#EC6060",
              id: false,
            },
          ],
          perm: "brands_status_field",
        },
        {
          perm: "brands_show_in_menu_field",
          name: "show_in_menu",
          type: "toggle",
          size: 6,
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
        },
        {
          name: "media",
          size: 12,
          type: "image",
          url: `${process.env.apiHost}api/media/upload-media-brand`,
          perm: "brands_media_field",
        },
      ],
    },
    {
      perm: "brands_seo_tab",
      title: translation("seo"),
      form: seo.form(
        getValues,
        setValue,
        fireToast,
        translation,
        "/search?brands=",
        null,
        "brands"
      ),
    },
  ],
  defaultValues: {
    active: true,
    show_in_menu: true,
    seo: seo_input,
  },
  filterFields: (translation) => [
    [
      {
        size: 6,
        name: "title",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
      },
      {
        size: 6,
        type: "toggle",
        name: "active",
        data: [
          {
            name: translation("any"),
            status: true,
            color: "#ffb115",
            id: "",
          },
          {
            name: translation("active", "user"),
            status: false,
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive", "user"),
            status: false,
            color: "#EC6060",
            id: false,
          },
        ],
      },
      {
        size: 6,
        type: "toggle",
        name: "show_in_menu",
        data: [
          {
            name: translation("any"),
            status: true,
            color: "#ffb115",
            id: "",
          },
          {
            name: translation("True"),
            status: false,
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("False"),
            status: false,
            color: "#EC6060",
            id: false,
          },
        ],
      },
    ],
  ],
}
