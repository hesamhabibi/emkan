import Tag from "@admin/Tag"
import { seo } from "~/app/global"
import { generateLink } from "~/components/Campaign"
import Manual from "~/components/Campaign/components/manual"

export default {
  allowedFields: ["type", "list", "extra_fields"],
  filterFields: (translation) => [
    [
      {
        name: "extra_fields.show",
        type: "toggle",
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
  tableFields: [
    {
      title: "title",
      td: (row) => row.extra_fields.title_panel,
    },
    {
      title: "show",
      td: (row) =>
        row.extra_fields.show ? (
          <Tag type="success">
            <i className="fas fa-check-circle" />
          </Tag>
        ) : (
          <Tag type="orange">
            <i className="fas fa-times-circle" />
          </Tag>
        ),
    },
    {
      title: "startAt",
      td: (row) =>
        new Date(parseInt(row.extra_fields.startAt, 10)).toLocaleDateString(
          "fa-IR"
        ),
    },
    {
      title: "expireAt",
      td: (row) =>
        new Date(parseInt(row.extra_fields.expireAt, 10)).toLocaleDateString(
          "fa-IR"
        ),
    },
  ],
  tableActions: (actions) => [
    {
      icon: "fa-edit",
      onClick: actions.edit,
    },
    {
      icon: "fa-trash-alt",
      onClick: actions.delete,
    },
  ],
  fields: (
    translation,
    getValues,
    setValue,
    fireToast,
    setVariants,
    watch,
    extra,
    variants
  ) => [
    {
      title: translation("General"),
      form: [
        {
          // size: 12,
          gridSize: 6,
          type: "multi-language",
          name: "extra_fields.title",
        },
        {
          size: 12,
          type: "multi-language",
          name: "extra_fields.description",
          component: "textarea",
        },
        {
          size: 6,
          type: "toggle",
          name: "extra_fields.show",
          data: [
            {
              color: "#3ECF8E",
              name: translation("True"),
              id: true,
            },
            {
              color: "#EC6060",
              name: translation("False"),
              id: false,
            },
          ],
        },
        {
          size: 6,
          type: "number",
          name: "extra_fields.score",
        },
        {
          size: 12,
          type: "image",
          name: "extra_fields.media",
          url: `${process.env.apiHost}api/media/upload-image`,
        },
        {
          size: 12,
          type: "image",
          name: "extra_fields.cover",
          url: `${process.env.apiHost}api/media/upload-image`,
        },
        {
          size: 6,
          type: "toggle",
          name: "extra_fields.has_timer",
          data: [
            {
              color: "#3ECF8E",
              name: translation("True"),
              id: true,
            },
            {
              color: "#EC6060",
              name: translation("False"),
              id: false,
            },
          ],
        },
        {
          name: "extra_fields.cover_position",
          type: "select-searchable",
          size: 6,
          data: [
            { id: 1, name: translation("up") },
            { id: 2, name: translation("up-right") },
            { id: 3, name: translation("right") },
            { id: 4, name: translation("down-right") },
            { id: 5, name: translation("down") },
            { id: 6, name: translation("down-left") },
            { id: 7, name: translation("left") },
            { id: 8, name: translation("up-left") },
          ],
        },
        {
          name: "startAt",
          type: "date-time-icon",
          size: 6,
        },
        {
          name: "expireAt",
          type: "date-time-icon",
          size: 6,
        },
      ],
    },
    {
      title: translation("collection values", "products"),
      form: [
        {
          size: 12,
          render: ({ control }) => (
            <Manual
              setVariants={setVariants}
              variants={variants}
              data={extra}
              getVal={getValues}
              setVal={setValue}
              Watch={watch}
              control={control}
            />
          ),
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
        "?search?gift=",
        generateLink
      ),
    },
  ],
}
