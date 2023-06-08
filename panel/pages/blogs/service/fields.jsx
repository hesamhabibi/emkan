import { seo, seo_input } from "~/app/global"
import Tag from "@admin/Tag"
import moment from "jalali-moment"
import { Grid } from "@admin/Grid"
import Button from "@admin/Button"
import { openModal } from "~/app/State/modal"

const statuses = {
  1: "inactive",
  2: "show",
  3: "draft",
}

export default {
  allowed: [
    "title",
    "summary",
    "description",
    "seo",
    "status",
    "category_id",
    "tag_ids",
    "tag_group_id",
    "media_gallery",
    "document",
    "has_comment",
    "has_rating",
    "publishAt",
  ],
  fields: ({
    categories,
    tags,
    getValues,
    setValue,
    fireToast,
    translation,
    setModalData,
    dispatch,
  }) => [
    {
      perm: "blogs_service_main_tab",
      title: translation("Blog"),
      form: [
        {
          gridSize: 6,
          name: "title",
          type: "multi-language",
          perm: "blogs_service_title_field",
        },
        {
          gridSize: 12,
          name: "summary",
          type: "multi-language",
          component: "textarea",
          perm: "blogs_service_summary_field",
        },
        {
          size: 6,
          name: "document",
          type: "file",
          perm: "blogs_service_file_field",
        },
        {
          size: 6,
          name: "status",
          type: "toggle",
          data: [
            {
              id: 1,
              name: translation("inactive", "blog"),
            },
            {
              id: 2,
              name: translation("show", "blog"),
            },
            {
              id: 3,
              name: translation("draft", "blog"),
            },
          ],
          perm: "blogs_service_status_field",
        },
        {
          perm: "blogs_service_has_rate_field",
          size: 6,
          type: "toggle",
          name: "has_rating",
          data: [
            {
              name: translation("True"),
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
          perm: "blogs_service_has_comment_field",
          size: 6,
          type: "toggle",
          name: "has_comment",
          data: [
            {
              name: translation("True"),
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
          perm: "blogs_service_publish_at_field",
          name: "publishAt",
          type: "date-time-icon",
          size: 6,
        },
        {
          name: "category_id",
          data: categories,
          type: "select-searchable",
          size: 9,
          perm: "blogs_service_category_id_field",
        },
        {
          perm: "blogs_service_category_id_field",
          render: () => (
            <Grid className="align-self-end mb-3" size={3}>
              <Button
                onClick={() => {
                  setModalData((prev) => ({
                    ...prev,
                    size: "md",
                    title: translation("create", "category"),
                    model: "categories",
                  }))
                  dispatch(openModal("create-form"))
                }}
                type="primary"
                className="w-100"
              >
                <i className="fas fa-plus ml-2" />
                {translation("Add Category", "products")}
              </Button>
            </Grid>
          ),
        },
        {
          name: "tag_ids",
          data: tags.filter((item) => item.deep === 1),
          type: "select-multiple",
          size: 9,
          perm: "blogs_service_tag_ids_field",
        },
        {
          perm: "blogs_service_tag_ids_field",
          render: () => (
            <Grid className="align-self-end" size={3}>
              <Button
                onClick={() => {
                  setModalData((prev) => ({
                    ...prev,
                    size: "sm",
                    title: translation("create", "tags"),
                    model: "tags",
                  }))
                  dispatch(openModal("create-form"))
                }}
                type="primary"
                className="w-100"
              >
                <i className="fas fa-plus ml-2" />
                {translation("Add Tag", "products")}
              </Button>
            </Grid>
          ),
        },
        {
          name: "tag_group_id",
          data: tags.filter((item) => item.deep === 2),
          type: "select-searchable",
          size: 9,
          perm: "blogs_service_tag_group_id_field",
        },
        {
          render: () => (
            <Grid className="align-self-end" size={3}>
              <Button
                onClick={() => {
                  setModalData((prev) => ({
                    ...prev,
                    size: "sm",
                    title: translation("create-group", "tags"),
                    model: "tag_groups",
                  }))
                  dispatch(openModal("create-form"))
                }}
                type="primary"
                className="w-100 mb-3"
              >
                <i className="fas fa-plus ml-2" />
                {translation("Add Tag Group", "products")}
              </Button>
            </Grid>
          ),
          perm: "blogs_service_tag_group_id_field",
        },
        {
          size: 12,
          name: "media_gallery",
          type: "image-gallery",
          url: `${process.env.apiHost}api/media/upload-media-blog`,
          perm: "blogs_service_media_gallery_field",
        },
        {
          gridSize: 12,
          name: "description",
          type: "multi-language",
          component: "text-editor",
          perm: "blogs_service_description_field",
        },
      ],
    },
    {
      perm: "blogs_service_seo_tab",
      title: translation("seo"),
      form: seo.form(
        getValues,
        setValue,
        fireToast,
        translation,
        "/search?blog=",
        null,
        "blogs_service"
      ),
    },
  ],
  defaultValues: {
    title: {},
    summary: {},
    type: "",
    description: {},
    status: 2,
    category_id: "",
    seo: seo_input,
    has_comment: true,
    has_rating: true,
    publishAt: moment(),
  },
  filterFields: [
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
        perm: "blogs_service_title_column",
      },
    ],
  ],
  tableFields: (translation) => [
    { title: "title_panel", perm: "blogs_service_title_column" },
    {
      title: "status",
      perm: "blogs_service_status_column",
      td: (item) => (
        <Tag
          type={
            item.status === 3
              ? "info"
              : item.status === 2
              ? "success"
              : "orange"
          }
        >
          {translation(statuses[item.status])}
        </Tag>
      ),
    },
    {
      title: "visit_count",
      td: (row) => row.visit_count.toString(),
      perm: "blogs_service_view_count_column",
    },
  ],
  tableActions: (actions) => [
    {
      onClick: (row) => actions.comments(row),
      icon: "fa-comments",
      perm: "blogs_service_comments_action",
    },
    {
      onClick: (rows) => actions.edit(rows),
      icon: "fa-edit",
      perm: "blogs_service_edit_action",
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "fa-trash-alt",
      perm: "blogs_service_delete_action",
    },
  ],
}
