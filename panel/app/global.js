import { gql } from "@apollo/client"
import Button from "@admin/Button"
import { convert_to_english_variable_name } from "~/app/Helpers/Slug"
import Info from "@admin/Input/Info"
import { useContext } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"

function generateLink(getValues, setValue, fireToast, translation) {
  const title = getValues()?.title || {}
  if (title.en) return setValue("seo.url", title.en.replaceAll(" ", "-"))

  const link = Object.values(title).find((item) => item)

  if (!link)
    return fireToast(
      translation("at least one of the title fields are required", "products"),
      {
        status: "warning",
      }
    )

  setValue("seo.url", convert_to_english_variable_name(link, "-"))
}

const SubmitButton = ({ onClick }) => {
  const translation = useContext(TranslationContext)

  const isDesktop = useContext(DeviceView)

  return (
    <Button
      style={{ marginTop: isDesktop ? "33px" : "-10px" }}
      className={`w-100 ${isDesktop ? "mb-2" : "mb-5"}`}
      type="primary"
      onClick={onClick}
    >
      <i className="fas fa-link ml-2" />
      {translation("Generate auto link")}
    </Button>
  )
}

export const action_types = [
  {
    name: "gql",
    id: 1,
  },
  {
    name: "gql_rel",
    id: 2,
  },
  {
    name: "gql_field",
    id: 3,
  },
]

export const seo = {
  title: "Seo",
  form: (
    getValues,
    setValue,
    fireToast,
    translation,
    prefix,
    cb = null,
    permKey = ""
  ) => [
    {
      // size: 12,
      name: "seo.title",
      type: "multi-language",
      gridSize: 6,
      info: translation("seo_title_info", "products"),
      perm: `${permKey}_seo_title`,
    },
    {
      // size: 12,
      name: "seo.keywords",
      type: "multi-language",
      gridSize: 6,
      info: translation("keywords_info", "products"),
      perm: `${permKey}_seo_keywords`,
    },
    {
      size: 12,
      name: "seo.description",
      type: "multi-language",
      component: "textarea",
      gridSize: 12,
      perm: `${permKey}_seo_description`,
    },
    {
      size: 9,
      name: "seo.url",
      type: "text",
      group: prefix,
      direction: "ltr",
      perm: `${permKey}_seo_url`,
    },
    {
      size: 3,
      name: "Generate auto link",
      render: () => (
        <SubmitButton
          onClick={() =>
            cb
              ? cb(getValues, setValue, fireToast, translation)
              : generateLink(getValues, setValue, fireToast, translation)
          }
        />
      ),
      perm: `${permKey}_seo_url`,
    },
    {
      size: 12,
      render: () => (
        <div style={{ marginTop: "-15px" }}>
          <Info text={translation("seo_link_info", "products")} />
        </div>
      ),
      perm: `${permKey}_seo_url`,
    },
    {
      size: 6,
      name: "seo.redirect_url_301",
      type: "text",
      perm: `${permKey}_seo_redirect_url_301`,
    },
    {
      size: 6,
      name: "seo.redirect_url_404",
      type: "text",
      perm: `${permKey}_seo_redirect_url_404`,
    },
    {
      size: 6,
      name: "seo.canonical_url",
      type: "text",
      perm: `${permKey}_seo_canonical_url`,
    },
    {
      size: 6,
      name: "seo.robots_status",
      extra: {
        valueAsNumber: true,
      },
      perm: `${permKey}_seo_robots_status`,
      type: "select",
      data: [
        {
          name: "index, follow",
          id: 1,
        },
        {
          name: "index, nofollow",
          id: 3,
        },
        {
          name: "noindex, follow",
          id: 2,
        },
        {
          name: "noindex, nofollow",
          id: 4,
        },
      ],
    },
  ],
}

export const seo_input = {
  title: {},
  description: {},
  canonical_url: "",
  keywords: {},
  redirect_url_301: "",
  url: "",
  robots_status: 1,
}

export const getSettingsByKey = gql`
  query ($key: String!) {
    result: getSettingByKey(key: $key) {
      value
    }
    web_language: getSettingByKey(key: "web_default_language") {
      value
    }
  }
`

export const ReactJsonConfigs = {
  theme: "paraiso",
  collapsed: false,
  collapseStringsAfter: 15,
  onAdd: false,
  onEdit: false,
  onDelete: false,
  displayObjectSize: true,
  enableClipboard: false,
  indentWidth: 4,
  displayDataTypes: true,
  iconStyle: "triangle",
  style: {
    borderRadius: "10px",
    padding: "15px",
  },
}

export const notificationData = (translation) => [
  {
    id: 0,
    name: translation("No notification"),
  },
  {
    id: 2,
    name: translation("Email"),
  },
  {
    id: 1,
    name: translation("SMS"),
  },
]

export const int2Comma = (integer) => {
  return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
