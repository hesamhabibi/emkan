import { Grid, GridContainer } from "@admin/Grid"
import { useContext, useState } from "react"
import { TranslationContext } from "~/app/Context"
import DetailsStatuses from "./details_count_statuses.json"
import DetailsStatusesUnit from "./details_count_units.json"
import Input from "@admin/Input"
import { useRouter } from "next/router"
import Prepend from "@admin/Input/Prepend"
import Styles from "./price.module.scss"
import { useDispatch } from "react-redux"
import Collapse from "@admin/Collapse"
import { toggle } from "~/app/State/collapse"
import Info from "@admin/Input/Info"

export default function Details({ control, watch, getValues }) {
  const translation = useContext(TranslationContext)
  const locale = useRouter().locale

  const [collapse, setCollapse] = useState(false)

  const dispatch = useDispatch()

  const toggleCollapse = () => {
    dispatch(toggle("advanced-details"))
    setCollapse(!collapse)
  }

  const isChanged = watch("details.use_count")

  return (
    <GridContainer gap="Lg">
      <Grid size={6}>
        <Input
          control={control}
          name="details.product_code"
          info={translation("product_code_info", "products")}
          label={translation("Product Code", "products")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          label={translation("Count Status", "products")}
          type="select"
          data={DetailsStatuses.map((item) => ({
            ...item,
            name: translation(item.name, "products"),
          }))}
          info={translation("count_status_info", "products")}
          control={control}
          name="details.count_status"
        />
      </Grid>
      <Grid size={6}>
        {(isChanged || true) && (
          <div
            className={`${Styles.toggle} ${
              !getValues().details.use_count ? Styles.disabled : ""
            }`}
          >
            <Prepend
              label={translation("count", "products")}
              name="details"
              select_name="count_unit"
              input_name="count"
              control={control}
              select_size="3"
              input_size="9"
              select_data={DetailsStatusesUnit.map((item) => ({
                ...item,
                name: item.name[locale],
              }))}
            />
          </div>
        )}
      </Grid>
      <Grid size={6}>
        <p className={Styles.button} onClick={toggleCollapse}>
          {translation("Advanced")}
          <i
            className={`fas fa-angle-down ${
              collapse ? "fa-rotate-180" : ""
            } mr-2`}
          />
        </p>
      </Grid>
      <Grid size={12} className={Styles.info}>
        <Info text={translation("count_info", "products")} />
      </Grid>
      <Grid size={12}>
        <Collapse id="advanced-details">
          <GridContainer gap="Lg">
            <Grid size={6}>
              <Input
                type="toggle"
                data={[
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
                ]}
                label={translation("use_count", "products")}
                control={control}
                name="details.use_count"
              />
            </Grid>
            <Grid size={6} />
            <Grid size={12} className={Styles.info}>
              <Info text={translation("use_count_info", "products")} />
            </Grid>
            <Grid size={6}>
              <Input
                control={control}
                name="details.limit_min"
                type="number"
                label={translation("limit min", "products")}
              />
            </Grid>
            <Grid size={6}>
              <Input
                control={control}
                name="details.limit_max"
                label={translation("limit max", "products")}
                type="number"
              />
            </Grid>
            <Grid size={12} className={Styles.info}>
              <Info text={translation("min_max_info", "products")} />
            </Grid>
            <Grid size={3}>
              <Input
                group={translation("cm", "products")}
                control={control}
                name="details.width"
                type="number"
                label={translation("width", "products")}
              />
            </Grid>
            <Grid size={3}>
              <Input
                group={translation("cm", "products")}
                control={control}
                name="details.length"
                label={translation("length", "products")}
                type="number"
              />
            </Grid>
            <Grid size={3}>
              <Input
                group={translation("cm", "products")}
                control={control}
                name="details.height"
                label={translation("height", "products")}
                type="number"
              />
            </Grid>
            <Grid size={3}>
              <Input
                group={translation("grams", "products")}
                control={control}
                name="details.weight"
                label={translation("weight", "products")}
                type="number"
              />
            </Grid>
            <Grid size={12} className={Styles.info}>
              <Info text={translation("width_height_info", "products")} />
            </Grid>
            <Grid size={12}>
              <Input
                control={control}
                name="details.warehouse"
                type="textarea"
                info={translation("warehouse_info", "products")}
                label={translation("Warehouse", "products")}
              />
            </Grid>
          </GridContainer>
        </Collapse>
      </Grid>
    </GridContainer>
  )
}
