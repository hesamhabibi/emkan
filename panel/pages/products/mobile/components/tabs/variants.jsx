import Styles from "./variants.module.scss"
import Section from "../section"
import { Grid, GridContainer } from "@admin/Grid"
import { useContext, useEffect, useState } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import Collapse from "@admin/Collapse"
import Price from "../tabs/price"
import { useDispatch } from "react-redux"
import { toggle } from "~/app/State/collapse"
import Button from "@admin/Button"
import { closePopup, openPopup } from "~/app/State/popups"
import { useForm } from "react-hook-form"
import Popup from "@admin/Popup"
import Input from "@admin/Input"
import Fields from "../variant/fields"
import { close } from "~/app/State/collapse"
import Tag from "@admin/Tag"
import { useRouter } from "next/router"
import { ReactSortable } from "react-sortablejs"
import DetailsStatuses from "../tabs/details_count_statuses.json"
import _ from "lodash"
import Prepend from "@admin/Input/Prepend"
import DetailsStatusesUnit from "../tabs/details_count_units.json"
import Alert from "@admin/Alert"
import PastVariants from "../variant/pastVariants"
import Info from "@admin/Input/Info"

const sortableOptions = {
  group: "treeData",
  animation: "200",
  swapThreshold: "0.5",
  forceFallback: true,
  handle: ".fa-grip-vertical",
  ghostClass: Styles.tableMove,
}

const getProducts = (arrays, locale) => {
  if (!arrays.length) {
    return [[]]
  }

  let results = []
  let labels = 0
  getProducts(arrays.slice(1), locale).forEach((product) => {
    if (!Array.isArray(product)) {
      product = [product]
    }
    arrays[0].labels.forEach((value) => {
      results.push({
        keys: product.concat(value).map((item) => item.key),
        details: {
          count_status: 1,
          count_unit: 1,
          use_count: true,
          limit_max: 1,
          limit_min: 1,
          count: 1,
          weight: "0",
          height: "0",
          width: "0",
          length: "0",
        },
        price: {
          offer_price: "0",
        },
        // main_price: false,
        is_active: true,
        sort: labels++,
        title: product.concat(value.title[locale]),
        // .map((item) => item.title[locale])
        // .join(" - "),
      })
    })
  })

  return results
}

export default function Variants({
  control,
  getValues,
  watch,
  setValue,
  data,
  setInfo,
  info,
  reset,
  scroll,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const fireToast = useContext(ToastContext)

  const locale = useRouter().locale

  const [formInputs, setFormInputs] = useState((arg) => () => [])
  const [discount, setDiscountPrice] = useState({ name: null, value: null })
  const [title, setTitle] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mixins, setMixins] = useState([])
  const [callback, setCallback] = useState(() => {})
  const [collapses, setCollapses] = useState({})
  const [name, setName] = useState(null)

  const watchVariants = watch("variant")

  const form = useForm()

  const createMixins = (variants) => {
    if (!variants?.length) {
      setValue("mix_variant", [])
      return setMixins([])
    }
    let values = getProducts(
      variants.filter((item) => item.labels?.length),
      locale
    )
    values = values.length === 1 && values[0].length === 0 ? [] : values

    setMixins(_.merge([...values], getValues("mix_variant")))
  }

  // useEffect(() => {
  //   reset(
  //     {
  //       ...getValues(),
  //       mix_variant: [..._.merge(getValues("mix_variant"), [...mixins])],
  //     },
  //     {
  //       keepErrors: true,
  //     }
  //   )
  // }, [mixins])

  useEffect(() => {
    if (!discount.name) return

    setValue(discount.name, discount.value)
  }, [discount])

  useEffect(() => {
    createMixins(getValues("variant"))
  }, [])

  const collapse = (id, e) => {
    dispatch(toggle(id))
    setCollapses((prevState) => {
      prevState[id] = prevState[id] !== undefined ? !prevState[id] : true
      return { ...prevState }
    })
  }

  const storeVariant = (data) => {
    setValue("has_variant", true)
    if (!data.type)
      return form.setError("type", {
        message: translation("required"),
        type: "required",
      })
    if (!Object.keys(data.name || {}).length)
      return form.setError("name", {
        message: translation("required"),
        type: "required",
      })
    const items = [...(getValues("variant") || []), { ...data, labels: [] }]
    setValue("variant", items)
    dispatch(closePopup("add-variant"))
    dispatch(close("products-variant"))
    createMixins(items)
    setScrolled(true)
  }

  const addVariant = () => {
    setTitle(translation("Add Variant", "products"))
    setFormInputs(() => Fields.variant)
    setCallback(() => storeVariant)
    form.reset({ type: 1 })
    dispatch(openPopup("add-variant"))
  }

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("add-variant")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: form.handleSubmit(callback),
    },
  ]

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("delete-variant")),
    },
    {
      background: "#EC6060",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: form.handleSubmit(callback),
    },
  ]

  const updateVariantType = ({ key, index }, data) => {
    const items = getValues("variant")
    items[key].labels[index] = data
    setValue("variant", items)
    dispatch(closePopup("add-variant"))
    createMixins(items)
  }

  const editVariantType = (key, index) => {
    const values = getValues()
    form.reset(values.variant[key].labels[index])
    setCallback(() => updateVariantType.bind(this, { key, index }))
    setFormInputs(() =>
      values.variant[key].type === 1
        ? Fields.variantType
        : values.variant[key].type === 2
        ? Fields.variantColorType
        : Fields.variantImage
    )
    setTitle(translation("Edit Variant Type", "products"))
    dispatch(openPopup("add-variant"))
  }

  const storeVariantType = (data) => {
    const items = getValues("variant")
    if (!items[data.key].labels) items[data.key].labels = []

    items[data.key].labels.push({
      ...data,
      key: `${data.key}-${items[data.key].labels.length}`,
    })
    setValue("variant", items)
    dispatch(closePopup("add-variant"))
    createMixins(items)
  }

  const addVariantType = ({ item, key }) => {
    form.reset({ key })
    setCallback(() => storeVariantType)
    setFormInputs(() =>
      item.type === 1
        ? Fields.variantType
        : item.type === 2
        ? Fields.variantColorType
        : Fields.variantImage
    )

    setTitle(translation("Add Variant Type", "products"))
    dispatch(openPopup("add-variant"))
  }

  const destroyVariantType = ({ key, index }) => {
    const items = getValues("variant")
    items[key].labels.splice(index, 1)
    reset({
      ...getValues(),
      variant: items,
    })

    createMixins(items)
  }

  const updateVariant = (id, data) => {
    const items = getValues("variant")
    items[id] = { ...data, labels: items[id].labels }
    setValue("variant", items)
    dispatch(closePopup("add-variant"))
    createMixins(items)
  }

  function storePastVariantMixins(key, data) {
    const items = getValues("variant")
    items[key] = {
      ...items[key],
      labels: _.uniqBy(
        [...items[key].labels, ...data],
        (data) => data.values.color_value
      ),
    }
    setValue("variant", items)
    dispatch(closePopup("choose-color"))
    createMixins(items)
  }

  const addPastVariantMixins = (key) => {
    setCallback(() => storePastVariantMixins.bind(this, key))
    dispatch(openPopup("choose-color"))
  }

  const editVariant = ({ item, key }) => {
    setCallback(() => updateVariant.bind(this, key))
    setFormInputs(() => Fields.variant)
    form.reset(item)
    setTitle(translation("Edit Variant", "products"))
    dispatch(openPopup("add-variant"))
  }

  const destroyVariant = (key) => {
    const items = getValues("variant")
    items.splice(key, 1)
    reset({
      ...getValues(),
      variant: items,
    })
    if (!items.length) setValue("has_variant", false)
    dispatch(closePopup("delete-variant"))
    createMixins(items)
  }

  const deleteVariant = (key) => {
    setCallback(() => destroyVariant.bind(this, key))
    dispatch(openPopup("delete-variant"))
  }

  function mixinImages({ key, item }, e) {
    e.stopPropagation()
    setName(`mix_variant.${item.sort}.images`)
    dispatch(openPopup("variants-gallery"))
    setCallback(() => dispatch.bind(this, closePopup("variants-gallery")))
  }

  return (
    <>
      <Popup
        id="delete-variant"
        status="error"
        actions={deleteActions}
        title={translation("delete confirmation", "products")}
      >
        {translation("delete variant", "products")}
      </Popup>
      <Popup id="add-variant" status="info" title={title} actions={actions}>
        {formInputs(translation).map((item, key) => (
          <div className="my-2" key={key}>
            <Input
              control={form.control}
              {...item}
              label={translation(item.name, "products")}
            />
          </div>
        ))}
      </Popup>
      <Popup
        id="variants-gallery"
        status="info"
        title={translation("images", "products")}
        actions={[
          {
            background: "#fff",
            title: translation("Cancel"),
            onClick: () => dispatch(closePopup("variants-gallery")),
          },
        ]}
      >
        <div className={Styles.images}>
          <Input
            control={control}
            name={name}
            url={`${process.env.apiHost}api/media/upload-media-product`}
            type="image-gallery"
          />
        </div>
      </Popup>
      {watchVariants && (
        <PastVariants
          keys={(getValues("variant") || []).map((item) => item.labels).flat()}
          callback={callback}
          colors={data.colors}
        />
      )}
      <Section>
        <Grid size={12}>
          <h5
            className={`d-flex justify-content-between align-items-center ${Styles.header}`}
          >
            {translation("product attributes", "products")}
            <div
              onClick={setInfo.bind(null, !info)}
              className={`mr-2 ${!info ? Styles.active : ""}`}
            >
              <i className="fad fa-question-circle fa-lg" />
            </div>
          </h5>
        </Grid>
        {info && (
          <Grid size={12}>
            <Alert className="text-justify" type="info">
              {translation("variant info", "products")}
            </Alert>
          </Grid>
        )}
        <Grid className={Styles.container} size={12}>
          <div
            onClick={collapse.bind(this, "products-variant")}
            className={`${Styles.cardHeader} align-items-center ${
              watchVariants && getValues("variant")?.length
                ? Styles.disabled
                : ""
            }`}
          >
            <span>{translation("Price Section", "products")}</span>
            <small className="mr-auto ml-4">
              {getValues("variant")?.length
                ? translation("deactivate")
                : translation("active")}
            </small>
            <div>
              <i
                className={`far fa-angle-down ${Styles.dropdown} ${
                  collapses["products-variant"] ? "fa-rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <Collapse id="products-variant">
            <div className={Styles.content}>
              <Price
                info={info}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
                control={control}
              />
            </div>
          </Collapse>
        </Grid>

        <Grid size={12}>
          <div className="d-flex align-items-center justify-content-between">
            <h5>{translation("Add Variant")}</h5>
            <div>
              <Button onClick={addVariant} type="primary">
                <i className="fas fa-plus-circle ml-1" />
                {translation("Add Variant", "products")}
              </Button>
            </div>
          </div>
          {watchVariants &&
            (getValues("variant") || []).map((item, key) => (
              <div
                key={key}
                className={`${Styles.container} ${Styles.variant}`}
              >
                <span className="d-flex p-3 align-items-center">
                  {item.name[locale]}
                </span>
                <div className={Styles.cardHeader}>
                  <div className="d-flex align-items-center">
                    <Button
                      onClick={addVariantType.bind(this, { item, key })}
                      type="primary"
                      className="ml-3"
                    >
                      <i className="fas fa-plus-circle ml-1" />
                      {translation("Add Variant Type", "products")}
                    </Button>
                    {item.type === 2 ? (
                      <span
                        data-tooltip={translation(
                          "choose past colors",
                          "products"
                        )}
                        className="ml-3 d-flex align-items-center"
                      >
                        <i
                          onClick={addPastVariantMixins.bind(this, key)}
                          className="fas fa-palette"
                        />
                      </span>
                    ) : (
                      <span className={`ml-3 ${Styles.hidden}`}>
                        <i className="fas fa-palette" />
                      </span>
                    )}
                    <span
                      data-tooltip={translation("edit variant", "products")}
                      className="ml-3 d-flex align-items-center"
                    >
                      <i
                        onClick={editVariant.bind(this, { item, key })}
                        className="far fa-edit"
                      />
                    </span>
                    <span
                      data-tooltip={translation("destroy variant", "products")}
                      className="ml-3 d-flex align-items-center"
                    >
                      <i
                        onClick={deleteVariant.bind(this, key)}
                        className="far fa-trash-alt"
                      />
                    </span>
                  </div>
                </div>
                <div className={`${Styles.content} ${Styles.variants}`}>
                  <>
                    {item.labels?.length ? <hr className="mx-1 w-100" /> : null}
                    {(item.labels || []).map((item, index) => (
                      <div key={index} className={Styles.variantKey}>
                        <Tag
                          className="d-flex align-items-center py-2"
                          type="info"
                        >
                          {!!item.values?.image && (
                            <img
                              width={40}
                              height={40}
                              className="ml-3 rounded-circle"
                              src={`${process.env.apiHost}${item.values.image?.url}`}
                              alt="item image"
                            />
                          )}
                          {!!item.values?.color_value && (
                            <span
                              className={Styles.badge}
                              style={{
                                backgroundColor: item.values.color_value,
                              }}
                            />
                          )}
                          <p className="font-weight-bold m-0">
                            {item.title[locale]}
                          </p>
                          <span
                            data-tooltip={translation(
                              "edit variant type",
                              "products"
                            )}
                            className="mr-3 d-flex align-items-center"
                          >
                            <i
                              className="fas fa-edit"
                              onClickCapture={() => editVariantType(key, index)}
                            />
                          </span>
                          <span
                            data-tooltip={translation(
                              "delete variant type",
                              "products"
                            )}
                            className="d-flex align-items-center"
                          >
                            <i
                              className="fas fa-times fa-lg"
                              onClickCapture={destroyVariantType.bind(this, {
                                key,
                                index,
                              })}
                            />
                          </span>
                        </Tag>
                      </div>
                    ))}
                  </>
                </div>
              </div>
            ))}
        </Grid>
        <Grid size={12}>
          <ReactSortable {...sortableOptions} setList={setMixins} list={mixins}>
            {watch("mix_variant") &&
              mixins.map((item, key) => (
                <div
                  className={`${Styles.container} ${
                    getValues(`mix_variant.${item.sort}.is_active`)
                      ? ""
                      : Styles.disabled
                  }`}
                  key={key}
                >
                  <div
                    onClick={
                      getValues(`mix_variant.${item.sort}.is_active`)
                        ? collapse.bind(this, `variant-${key}`)
                        : null
                    }
                    className={Styles.cardHeader}
                  >
                    <div>
                      <i className={`fas fa-grip-vertical fa-lg ml-2`} />
                      <span>{translation("Price Variant", "products")}</span>
                      <Tag className="mr-2" type="primary">
                        {item.title.join(" - ")}
                      </Tag>

                      <i
                        onClickCapture={mixinImages.bind(this, { item, key })}
                        className={`fad fa-images mr-3 ${Styles.imageIcon}`}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center">
                        <small className="ml-2">
                          {getValues(`mix_variant.${item.sort}.is_active`)
                            ? translation("activate")
                            : translation("deactivate")}
                        </small>
                        <Input
                          control={control}
                          type="switch-toggle"
                          name={`mix_variant.${item.sort}.is_active`}
                        />
                      </span>
                      <i
                        className={`far fa-angle-down mr-4 ${Styles.dropdown} ${
                          collapses[`variant-${key}`] ? "fa-rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <Collapse id={`variant-${key}`}>
                    <div className={`${Styles.content} ${Styles.variants}`}>
                      <GridContainer gap="Lg" className="w-100">
                        <Grid size={12}>
                          <Input
                            name={`mix_variant.${item.sort}.price.price`}
                            group={translation("Toman", "products")}
                            rules={{ validateAsNumber: true }}
                            control={control}
                            type="number"
                            label={translation("Price", "products")}
                          />
                          {info && (
                            <Info
                              text={translation("count info", "products")}
                            />
                          )}
                        </Grid>
                        <Grid size={12}>
                          <p
                            className={Styles.button}
                            onClick={collapse.bind(
                              this,
                              `advanced-price-${key}`
                            )}
                          >
                            {translation("Advanced")}
                            <i
                              className={`fas fa-angle-down ${
                                collapses[`advanced-price-${key}`]
                                  ? "fa-rotate-180"
                                  : ""
                              } mr-2`}
                            />
                          </p>
                        </Grid>

                        <Grid size={12}>
                          <Collapse id={`advanced-price-${key}`}>
                            <GridContainer gap="Lg">
                              <Grid size={12}>
                                <Input
                                  rules={{ validateAsNumber: true }}
                                  name={`mix_variant.${item.sort}.price.offer_price`}
                                  type="number"
                                  group={translation("Toman", "products")}
                                  info={translation("price_info", "products")}
                                  control={control}
                                  label={translation("Offer Price", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  rules={{ validateAsNumber: true }}
                                  type="number"
                                  name={`mix_variant.${item.sort}.price.discount_percent`}
                                  info={translation(
                                    "discount_percent_info",
                                    "products"
                                  )}
                                  control={control}
                                  label={translation(
                                    "Discount Percent",
                                    "products"
                                  )}
                                  group={translation("percent")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  name={`mix_variant.${item.sort}.price.offer_startAt`}
                                  control={control}
                                  type="date"
                                  label={translation(
                                    "Offer Start At",
                                    "products"
                                  )}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  name={`mix_variant.${item.sort}.price.offer_expireAt`}
                                  control={control}
                                  type="date"
                                  label={translation(
                                    "Offer Expire At",
                                    "products"
                                  )}
                                />
                                <Info
                                  text={translation(
                                    "info_start_end_at",
                                    "products"
                                  )}
                                />
                              </Grid>
                            </GridContainer>
                          </Collapse>
                          <hr className={`${info ? "mt-4" : "mt-2"} mb-2`} />
                        </Grid>
                        <Grid size={12}>
                          <Input
                            control={control}
                            name={`mix_variant.${item.sort}.details.product_code`}
                            info={translation("product_code_info", "products")}
                            label={translation("Product Code", "products")}
                          />
                        </Grid>
                        <Grid size={12}>
                          <Input
                            label={translation("Count Status", "products")}
                            type="select"
                            info={translation("count_status_info", "products")}
                            data={DetailsStatuses.map((item) => ({
                              ...item,
                              name: translation(item.name, "products"),
                            }))}
                            control={control}
                            name="details.count_status"
                          />
                        </Grid>
                        <Grid size={12}>
                          <div
                            className={`${Styles.toggle} ${
                              !getValues(`mix_variant.${item.sort}.details`)
                                ?.use_count
                                ? Styles.disabled
                                : ""
                            }`}
                          >
                            <Prepend
                              label={translation("count", "products")}
                              name={`mix_variant.${item.sort}.details`}
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
                        </Grid>
                        <Grid size={12}>
                          <p
                            className={Styles.button}
                            onClick={collapse.bind(
                              this,
                              `advanced-details-${key}`
                            )}
                          >
                            {translation("Advanced")}
                            <i
                              className={`fas fa-angle-down ${
                                collapses[`advanced-details-${key}`]
                                  ? "fa-rotate-180"
                                  : ""
                              } mr-2`}
                            />
                          </p>
                          <Info text={translation("count_info", "products")} />
                        </Grid>
                        <Grid size={12}>
                          <Collapse id={`advanced-details-${key}`}>
                            <GridContainer gap="Lg">
                              <Grid size={12}>
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
                                  name={`mix_variant.${item.sort}.details.use_count`}
                                />
                                <Info
                                  text={translation(
                                    "use_count_info",
                                    "products"
                                  )}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  control={control}
                                  type="number"
                                  name={`mix_variant.${item.sort}.details.limit_min`}
                                  label={translation("limit min", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  control={control}
                                  type="number"
                                  name={`mix_variant.${item.sort}.details.limit_max`}
                                  label={translation("limit max", "products")}
                                />
                                <Info
                                  text={translation("min_max_info", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  group={translation("cm", "products")}
                                  control={control}
                                  rules={{ validateAsNumber: true }}
                                  type="number"
                                  name={`mix_variant.${item.sort}.details.width`}
                                  label={translation("width", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  group={translation("cm", "products")}
                                  control={control}
                                  rules={{ validateAsNumber: true }}
                                  name={`mix_variant.${item.sort}.details.length`}
                                  type="number"
                                  label={translation("length", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  group={translation("cm", "products")}
                                  control={control}
                                  name={`mix_variant.${item.sort}.details.height`}
                                  type="number"
                                  rules={{ validateAsNumber: true }}
                                  label={translation("height", "products")}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  group={translation("grams", "products")}
                                  control={control}
                                  type="number"
                                  name={`mix_variant.${item.sort}.details.weight`}
                                  rules={{ validateAsNumber: true }}
                                  label={translation("weight", "products")}
                                />
                              </Grid>
                              <Grid size={12} className={Styles.info}>
                                <Info
                                  text={translation(
                                    "width_height_info",
                                    "products"
                                  )}
                                />
                              </Grid>
                              <Grid size={12}>
                                <Input
                                  control={control}
                                  name={`mix_variant.${item.sort}.details.warehouse`}
                                  info={translation(
                                    "warehouse_info",
                                    "products"
                                  )}
                                  type="textarea"
                                  label={translation("Warehouse", "products")}
                                />
                              </Grid>
                            </GridContainer>
                          </Collapse>
                        </Grid>
                      </GridContainer>
                    </div>
                  </Collapse>
                </div>
              ))}
          </ReactSortable>
        </Grid>
      </Section>
    </>
  )
}
