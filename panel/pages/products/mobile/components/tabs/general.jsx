import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import { Grid } from "@admin/Grid"
import Input from "@admin/Input"
import Section from "../section"
import { Controller } from "react-hook-form"
import Strengths from "../strengths"
import Weaknesses from "../weaknesses"
import Styles from "./attributes.module.scss"
import Button from "@admin/Button"
import { openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import Info from "@admin/Input/Info"
import MainFeatures from "../mainFeatures"

export default function General({
  control,
  data,
  setModel,
  setTitle,
  setSize,
  watch,
  getValues,
  info,
  setInfo,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  return (
    <Section>
      <Grid size={12}>
        <h5
          className={`d-flex justify-content-between align-items-center ${Styles.header}`}
        >
          {translation("product status", "products")}
          <div
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </div>
        </h5>
      </Grid>
      <Grid size={12}>
        <Input
          type="multi-language"
          name="title"
          gridSize={12}
          info={translation("title_info", "products")}
          label={translation("title", "products")}
          control={control}
        />
      </Grid>
      <Grid size={12}>
        <Input
          type="select-sorted"
          data={data.categories}
          label={translation("category_id", "products")}
          name="category_id"
          control={control}
        />
        <Button
          type="primary"
          onClick={() => {
            setSize("Lg")
            setTitle(translation("create category", "products"))
            setModel("categories")
            dispatch(openModal("create-form"))
          }}
          className={`w-100 mt-3 ${Styles.button}`}
        >
          <i className="fas fa-plus ml-2" />
          {translation("Add Category", "products")}
        </Button>
        <Info text={translation("category_info", "products")} />
      </Grid>
      <Grid size={12}>
        <Input
          type="select-searchable"
          data={data.brands || []}
          label={translation("brand_id", "products")}
          control={control}
          name="brand_id"
        />
        <Button
          type="primary"
          onClick={() => {
            setSize("Lg")
            setTitle(translation("create", "brands"))
            setModel("brands")
            dispatch(openModal("create-form"))
          }}
          className={`w-100 ${Styles.button}`}
        >
          <i className="fas fa-plus ml-2" />
          {translation("Add Brand")}
        </Button>
        <Info text={translation("brand_info", "products")} />
      </Grid>
      <Grid size={12}>
        <Input
          type="multi-language"
          name="summary"
          gridSize={12}
          label={translation("summary", "products")}
          control={control}
          component="textarea"
        />
      </Grid>
      <Grid size={12} className={Styles.info}>
        <Info text={translation("summary_info", "products")} />
      </Grid>
      <Grid size={12}>
        <p className="mr-1 mb-0">{translation("main_features", "products")}</p>
        <Controller
          control={control}
          name="main_features"
          render={({ ...props }) => (
            <MainFeatures {...props} watch={watch} values={getValues} />
          )}
        />
        <Info text={translation("main_features_info", "products")} />
      </Grid>
      <Grid size={12}>
        <p className="mr-1 mb-0">{translation("strengths", "products")}</p>
        <Controller
          control={control}
          name="strengths"
          render={({ ...props }) => (
            <Strengths {...props} watch={watch} values={getValues} />
          )}
        />
        <Info text={translation("strength_info", "products")} />
      </Grid>
      <Grid size={12}>
        <p className="mr-1 mb-0">{translation("weaknesses", "products")}</p>
        <Controller
          control={control}
          name="weaknesses"
          render={({ ...props }) => (
            <Weaknesses {...props} watch={watch} values={getValues} />
          )}
        />
        <Info text={translation("weakness_info", "products")} />
      </Grid>
      <Grid size={12}>
        <Input
          type="multi-language"
          label={translation("description", "products")}
          component="text-editor"
          name="description"
          control={control}
          gridSize={12}
        />
      </Grid>
      <Grid className={Styles.info} size={12}>
        <Info text={translation("description_info", "products")} />
      </Grid>
    </Section>
  )
}
