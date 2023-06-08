import Styles from "../../products.module.scss"
import { Grid } from "@admin/Grid"
import Input from "@admin/Input"
import Section from "../section"
import { useContext } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import { openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import { convert_to_english_variable_name } from "~/app/Helpers/Slug"
import Info from "@admin/Input/Info"

export default function Seo({
  control,
  data,
  setModel,
  setTitle,
  setSize,
  setValue,
  getValues,
  info,
  setInfo,
}) {
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)

  const dispatch = useDispatch()

  function generateLink() {
    const title = getValues().title
    if (title.en) return setValue("seo.url", title.en.replaceAll(" ", "-"))

    const link = Object.values(title).find((item) => item)

    if (!link)
      return fireToast(
        translation(
          "at least one of the title fields are required",
          "products"
        ),
        {
          status: "warning",
        }
      )

    setValue("seo.url", convert_to_english_variable_name(link, "-"))
  }

  return (
    <Section gap="Lg" className={Styles.container}>
      <Grid size={12}>
        <h5 className={`d-flex justify-content-between ${Styles.header}`}>
          {translation("seo and optimization", "products")}
          <div
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </div>
        </h5>
      </Grid>
      <Input
        gridSize={6}
        type="multi-language"
        name="seo.title"
        control={control}
        label={translation("seo_title", "products")}
        info={translation("seo_title_info", "products")}
      />
      <Input
        type="multi-language"
        control={control}
        gridSize={6}
        name="seo.keywords"
        label={translation("keywords", "products")}
        info={translation("keywords_info", "products")}
      />
      <Input
        type="multi-language"
        name="seo.description"
        control={control}
        label={translation("seo_description", "products")}
        info={translation("seo_description_info", "products")}
        gridSize={12}
        component="textarea"
      />
      <Grid size={9}>
        <Input
          direction="ltr"
          group="/product/"
          name="seo.url"
          control={control}
          label={translation("seo_link", "products")}
        />
      </Grid>
      <Grid size={3}>
        <Button
          onClick={generateLink}
          type="primary"
          className={`w-100 ${Styles.button}`}
        >
          <i className="fas fa-link ml-2" />
          {translation("Generate auto url", "products")}
        </Button>
      </Grid>
      <Grid size={12} className={Styles.info}>
        <Info text={translation("seo_link_info", "products")} />
      </Grid>
      <Grid size={9}>
        <Input
          type="select-multiple"
          data={data.result.filter((item) => item.deep === 1)}
          label={translation("tag_ids", "products")}
          control={control}
          name="tag_ids"
        />
      </Grid>
      <Grid size={3}>
        <Button
          type="primary"
          onClick={() => {
            setSize("sm")
            setTitle(translation("create", "tags"))
            setModel("tags")
            dispatch(openModal("create-form"))
          }}
          className={`w-100 ${Styles.button}`}
        >
          <i className="fas fa-plus ml-2" />
          {translation("Add Tag", "products")}
        </Button>
      </Grid>
      <Grid className={Styles.info} size={12}>
        <Info text={translation("tag_info", "products")} />
      </Grid>
      <Grid size={9}>
        <Input
          type="select-searchable"
          data={data.result.filter((item) => item.deep === 2)}
          label={translation("tag_group_id", "products")}
          name="tag_group_id"
          control={control}
        />
      </Grid>
      <Grid size={3}>
        <Button
          type="primary"
          onClick={() => {
            setSize("sm")
            setTitle(translation("create-group", "tags"))
            setModel("tag_groups")
            dispatch(openModal("create-form"))
          }}
          className={`w-100 ${Styles.button}`}
        >
          <i className="fas fa-plus ml-2" />
          {translation("Add Tag Group", "products")}
        </Button>
      </Grid>
      <Grid className={Styles.info} size={12}>
        <Info text={translation("tag_group_info", "products")} />
      </Grid>
      <Grid size={6}>
        <Input
          name="seo.redirect_url_301"
          info={translation("seo_redirect_link_301_info", "products")}
          control={control}
          label={translation("seo.redirect_url_301", "category")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="text"
          info={translation("seo_redirect_link_404_info", "products")}
          name="seo.redirect_url_404"
          control={control}
          label={translation("seo_redirect_link_404", "products")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          name="seo.canonical_url"
          control={control}
          label={translation("seo_canonical_url", "products")}
          info={translation("seo_canonical_url_info", "products")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="select"
          control={control}
          label={translation("seo_robot_status", "products")}
          info={translation("seo_robot_status_info", "products")}
          name="seo.robots_status"
          data={[
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
          ]}
        />
      </Grid>
    </Section>
  )
}
