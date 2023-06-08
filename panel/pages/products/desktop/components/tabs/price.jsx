import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import { useContext, useState } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import Styles from "./price.module.scss"
import Collapse from "@admin/Collapse"
import { useDispatch } from "react-redux"
import { toggle } from "~/app/State/collapse"
import Details from "./details"
import Button from "@admin/Button"
import Info from "@admin/Input/Info"

export default function Price({ control, getValues, setValue, watch, info }) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const fireToast = useContext(ToastContext)

  const [collapse, setCollapse] = useState(false)

  const toggleCollapse = () => {
    setCollapse(!collapse)
    dispatch(toggle("advanced-price"))
  }

  const setDiscount = () => {
    const values = getValues()
    if (!values.price.price || !values.price.offer_price)
      return fireToast(
        translation("please enter price and offer price", "products"),
        { status: "error" }
      )
    setValue(
      "price.discount_percent",
      Math.ceil((values.price.offer_price / values.price.price) * 100)
    )
  }

  return (
    <>
      <GridContainer gap="Lg">
        <Grid size={6}>
          <Input
            name="price.price"
            group={translation("Toman", "products")}
            rules={{ validateAsNumber: true }}
            type="number"
            control={control}
            label={translation("Price", "products")}
          />
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
        {info && (
          <Grid className={Styles.info} size={12}>
            <Info text={translation("count info", "products")} />
          </Grid>
        )}
        <Grid size={12}>
          <Collapse id="advanced-price">
            <GridContainer gap="Lg">
              <Grid size={6}>
                <Input
                  rules={{ validateAsNumber: true }}
                  type="number"
                  name="price.offer_price"
                  group={translation("Toman", "products")}
                  info={translation("price_info", "products")}
                  control={control}
                  label={translation("Offer Price", "products")}
                />
              </Grid>
              <Grid size={6}>
                <Input
                  rules={{ validateAsNumber: true }}
                  name="price.discount_percent"
                  type="number"
                  control={control}
                  label={translation("Discount Percent", "products")}
                  info={translation("only for view purpose", "products")}
                  group={
                    <Button
                      type="primary"
                      onClick={setDiscount}
                      className={Styles.buttonGroup}
                    >
                      {translation("calculate")}
                      <i className="fas fa-calculator mr-3" />
                    </Button>
                  }
                />
              </Grid>
              <Grid size={6}>
                <Input
                  name="price.offer_startAt"
                  control={control}
                  type="date"
                  label={translation("Offer Start At", "products")}
                />
              </Grid>
              <Grid size={6}>
                <Input
                  name="price.offer_expireAt"
                  control={control}
                  type="date"
                  label={translation("Offer Expire At", "products")}
                />
              </Grid>
              <Grid className={Styles.info} size={12}>
                <Info text={translation("info_start_end_at", "products")} />
              </Grid>
            </GridContainer>
          </Collapse>
        </Grid>
      </GridContainer>
      <hr className="mt-2 mb-4" />
      <Details getValues={getValues} watch={watch} control={control} />
    </>
  )
}
