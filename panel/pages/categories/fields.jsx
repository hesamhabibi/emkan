import { seo, seo_input } from "~/app/global"
import Tag from "@admin/Tag"

export default {
  allowed: ["title", "active", "show_in_menu", "media", "description", "seo"],
  tableFields: (translation) => [
    { title: "title_panel", perm: "categories_blog_title_column" },
    {
      title: "status",
      td: (item) => translation(item.show_in_menu ? "Active" : "inactive"),
      perm: "categories_blog_status_column",
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
      perm: "categories_blog_show_in_menu_column",
    },
  ],

  fields: (getValues, setValue, fireToast, translation) => [
    {
      perm: "categories_blog_main_tab",
      title: translation("Categories"),
      form: [
        {
          // size: 12,
          name: "title",
          type: "multi-language",
          component: "text",
          perm: "categories_blog_title_field",
          gridSize: 6,
        },
        {
          perm: "categories_blog_active_field",
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
          size: 6,
          perm: "categories_blog_show_in_menu_field",
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
          perm: "categories_blog_image_field",
          type: "image",
          name: "media",
          size: 12,
          url: `${process.env.apiHost}api/media/upload-media-category`,
        },
        {
          size: 12,
          name: "description",
          type: "multi-language",
          component: "textarea",
          gridSize: "12",
          perm: "categories_blog_description_field",
        },
      ],
    },
    {
      perm: "categories_blog_seo_tab",
      title: translation("seo"),
      form: seo.form(
        getValues,
        setValue,
        fireToast,
        translation,
        "/search?blog=",
        null,
        "categories_blog"
      ),
    },
  ],
  defaultValues: {
    active: true,
    show_in_menu: true,
    seo: seo_input,
  },
  tableActions: (actions, translation) => [
    {
      onClick: actions.edit,
      icon: "far fa-edit",
      tooltip: translation("edit", "category"),
      dir: "right",
      perm: "categories_blog_edit_action",
    },
    {
      onClick: actions.delete,
      icon: "far fa-trash-alt",
      tooltip: translation("delete", "category"),
      dir: "right",
      perm: "categories_blog_delete_action",
    },
  ],
}
