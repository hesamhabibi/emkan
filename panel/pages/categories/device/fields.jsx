import { seo, seo_input } from "~/app/global"
import Tag from "@admin/Tag"

export default {
  allowed: [
    "title",
    "active",
    "show_in_menu",
    "media",
    "description",
    "parent_id",
    "seo",
  ],
  tableFields: (translation) => [
    { title: "title_panel", perm: "categories_device_title_column" },
    {
      title: "status",
      td: (item) => translation(item.show_in_menu ? "Active" : "inactive"),
      perm: "categories_device_status_column",
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
      perm: "categories_device_show_in_menu_column",
    },
  ],

  fields: (getValues, setValue, fireToast, translation) => [
    {
      perm: "categories_device_main_tab",
      title: translation("Categories"),
      form: [
        {
          // size: 12,
          name: "title",
          type: "multi-language",
          gridSize: 6,
          perm: "categories_device_title_field",
        },
        {
          perm: "categories_device_active_field",
          size: 6,
          name: "active",
          type: "toggle",
          section: "category",
          data: [
            {
              name: translation("active"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("inactive"),
              color: "#EC6060",
              id: false,
            },
          ],
        },
        {
          perm: "categories_device_show_in_menu_field",
          size: 6,
          name: "show_in_menu",
          type: "toggle",
          section: "category",
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
          perm: "categories_device_image_field",
          type: "image",
          name: "media",
          size: 12,
          url: `${process.env.apiHost}api/media/upload-media-category`,
        },
        {
          name: "description",
          gridSize: 12,
          component: "textarea",
          type: "multi-language",
          perm: "categories_device_description_field",
        },
      ],
    },
    {
      perm: "categories_device_seo_tab",
      title: translation("seo"),
      form: seo.form(
        getValues,
        setValue,
        fireToast,
        translation,
        "/search?blog=",
        null,
        "categories_device"
      ),
    },
  ],
  defaultValues: {
    active: true,
    show_in_menu: true,
    seo: seo_input,
  },
  tableActions: (actions, translation) => [
    (item) => ({
      onClick: actions.create.bind(this, item),
      icon: "far fa-plus",
      tooltip: translation("create", "category"),
      dir: "right",
    }),
    (item) => ({
      onClick: actions.edit.bind(this, item),
      icon: "far fa-edit",
      tooltip: translation("edit", "category"),
      dir: "right",
    }),
    (item) => ({
      onClick: actions.delete.bind(this, item),
      icon: "far fa-trash-alt",
      tooltip: translation("delete", "category"),
      dir: "right",
    }),
  ],
}
