import { seo, seo_input } from "~/app/global"
import Tag from "@admin/Tag"

export default {
  allowed: ["title", "active", "show_in_menu", "media", "description"],
  tableFields: [
    { title: "title" },
    {
      title: "show_in_menu",
      td: (item) =>
        item.show_in_menu ? (
          <Tag type="success">
            <i className="fas fa-check-circle" />
          </Tag>
        ) : (
          <Tag type="error">
            <i className="fas fa-times-circle" />
          </Tag>
        ),
    },
  ],

  fields: (getValues, setValue, fireToast, translation, categories) => [
    {
      title: translation("Category"),
      form: [
        {
          gridSize: 6,
          name: "title",
          type: "multi-language",
        },
        {
          size: 6,
          name: "active",
          type: "toggle",
          // section: "category",
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
          size: 6,
          name: "show_in_menu",
          type: "toggle",
          // section: "category",
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
          type: "image",
          name: "media",
          size: 12,
          url: `${process.env.apiHost}api/media/upload-media-category`,
        },
        {
          gridSize: 12,
          name: "description",
          type: "multi-language",
          component: "textarea",
        },
      ],
    },
    {
      title: translation("seo"),
      form: seo.form(
        getValues,
        setValue,
        fireToast,
        translation,
        "/search?categories="
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
