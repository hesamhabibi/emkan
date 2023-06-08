import { Grid, GridContainer } from "@admin/Grid"
import { useApolloClient } from "~/app/Hooks/Api"
import { useContext, Fragment } from "react"
import { TranslationContext } from "~/app/Context"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { toggle } from "~/app/State/collapse"
import Sortable from "@admin/Table/sortable"
import Filter from "@admin/Filter"
import Fields from "../fields"
import Styles from "./manual.module.scss"
import queries from "../queries"
import Checkbox from "@admin/Input/CheckBox"
import Collapse from "@admin/Collapse"
import _ from "lodash"
import Input from "@admin/Input"

const Manual = ({
  data,
  setVal,
  Watch,
  getVal,
  variants,
  setVariants,
  control,
}) => {
  const translation = useContext(TranslationContext)

  const router = useRouter()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.collapse.value)

  const { getPage } = useApolloClient()

  const setValue = setVal
  const getValues = getVal
  const watch = Watch

  const getValue = async (fields) => {
    const res = await getPage({
      fields,
      query: queries.relatedProducts,
    })
    setVariants(res.result)
  }

  const variantLabels = (product_id) =>
    variants
      .filter((item) => item.id === product_id)
      .map((item) => item.variant.map((item) => item.labels))
      .flat(2)

  function toggleProduct({ id, mix_variant_keys }) {
    const values = getValues("list")

    const index = values.findIndex((item) => item.product_id === id)

    if (index !== -1) values.splice(index, 1)
    else if (mix_variant_keys.length)
      mix_variant_keys.forEach((item) => {
        if (
          values.findIndex(
            (val) =>
              _.isEqual(val.mix_variant_keys, [item]) && val.product_id === id
          ) !== -1
        )
          return

        values.push({
          sort: 1,
          product_id: id,
          mix_variant_keys: [item],
        })
      })
    else
      values.push({
        sort: 1,
        product_id: id,
        has_variant_key: true,
        mix_variant_keys: [],
      })

    setValue("list", [...values])
  }

  function toggleChildren({ id, mix_variant_keys }) {
    const values = getValues("list")

    const index = values.findIndex(
      (item) =>
        item.product_id === id &&
        _.isEqual([mix_variant_keys], item.mix_variant_keys)
    )

    if (index !== -1) {
      values.splice(index, 1)
    } else
      values.push({
        product_id: id,
        mix_variant_keys: [mix_variant_keys],
        sort: 1,
      })
    setValue("list", values)
  }

  function getData(values) {
    const res = []

    values.forEach((item) => {
      const value = variants.find((variant) => variant.id === item.product_id)
      if (item.mix_variant_keys.length) {
        item.mix_variant_keys.forEach((key) => {
          const variant = value.mix_variant.find((mix) =>
            _.includes(item.mix_variant_keys, mix.keys)
          )
          res.push({
            key,
            id: item.product_id,
            title_panel: `${value.title_panel} - ${
              variantLabels(item.product_id).find((item) =>
                key.includes(item.key)
              ).title_panel
            }`,
            sort: item.sort,
            product_code: variant?.details?.product_code || value.product_id,
          })
        })
      } else {
        res.push({
          id: item.product_id,
          title_panel: value.title_panel,
          sort: item.sort,
          product_code: value?.details?.product_code || value.product_id,
        })
      }
    })
    return res
  }

  function deleteItem(row) {
    const values = getValues("list")
    if (row.key) {
      const val = values.findIndex((item) => item.product_id === row.id)
      if (values[val].mix_variant_keys.length > 1) {
        values[val].mix_variant_keys.splice(
          values[val].mix_variant_keys.findIndex((item) =>
            _.isEqual(item, row.key)
          ),
          1
        )
      } else {
        values.splice(val, 1)
      }
      setValue("list", values)
      return
    }
    values.splice(
      values.findIndex((item) => item.product_id === row.id),
      1
    )
    setValue("list", values)
  }

  return (
    <GridContainer gap="Lg">
      <Grid size={6}>
        <div className={Styles.filter}>
          <Filter
            section="products"
            callback={getValue}
            inputs={Fields.filterFields(data)}
            id="filters"
          />
        </div>
        <div className={Styles.table}>
          {variants.length ? (
            watch("list") | true &&
            variants.map((item, key) => (
              <Fragment key={key}>
                <div
                  onClick={dispatch.bind(null, toggle(`manual-${item.id}`))}
                  className={`${Styles.row} ${
                    item.mix_variant.length ? Styles.children : ""
                  }`}
                >
                  <Checkbox
                    field={{
                      onChange: toggleProduct.bind(this, {
                        id: item.id,
                        mix_variant_keys: item.mix_variant.map(
                          (item) => item.keys
                        ),
                      }),
                      value:
                        getValues("list").filter(
                          (it) => it?.product_id === item.id
                        ).length ===
                        (item.mix_variant.length
                          ? item.mix_variant
                          : [{ keys: [""] }]
                        )
                          .map((item) => item.keys)
                          .flat(2).length,
                    }}
                  />
                  <img
                    alt={item.title_panel}
                    className="mr-3"
                    src={item.media.url || "/images/not-found.png"}
                  />
                  <span className="mr-3">
                    {item.details?.product_code || "--"}
                  </span>
                  <p>{item.title_panel}</p>
                  {!!item.mix_variant.length && (
                    <span className="mr-auto">
                      <small className="ml-3">
                        (
                        {`${item.mix_variant.length} ${translation(
                          "variant",
                          "products"
                        )}`}
                        )
                      </small>
                      <i
                        className={`far fa-angle-down ${
                          selector[`manual-${item.id}`] ? "fa-rotate-180" : ""
                        } ml-2`}
                      />
                    </span>
                  )}
                </div>
                {!!item.mix_variant.length && (
                  <Collapse id={`manual-${item.id}`}>
                    <div className={Styles.childRow}>
                      {item.mix_variant.map((mix_variant, index) => (
                        <div
                          key={index}
                          className={`${Styles.row} ${Styles.variant}`}
                        >
                          <Checkbox
                            field={{
                              onChange: toggleChildren.bind(this, {
                                id: item.id,
                                key,
                                index,
                                mix_variant_keys: mix_variant.keys,
                              }),
                              value: getValues("list").find((it) =>
                                it?.mix_variant_keys.includes(mix_variant.keys)
                              ),
                            }}
                          />
                          <span className="mr-3">
                            {mix_variant.product_code || "--"}
                          </span>
                          <p>
                            {variantLabels(item.id)
                              .filter((variant) =>
                                mix_variant.keys.includes(variant.key)
                              )
                              .map((item) => item.title[router.locale])
                              .join(" - ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                )}
              </Fragment>
            ))
          ) : (
            <p className="text-center my-5">{translation("no record found")}</p>
          )}
        </div>
      </Grid>
      <Grid size={6}>
        {watch("list") && (
          <Sortable
            setData={(data) => {
              const values = getValues("list")

              data.forEach((item, index) => {
                if (!item.key?.length)
                  values.find((value) => item.id === value.product_id).sort =
                    index
                else
                  values.find(
                    (value) =>
                      item.id === value.product_id &&
                      _.includes(value.mix_variant_keys, item.key)
                  ).sort = index
              })
              setValue("list", values)
            }}
            section="products"
            data={_.orderBy(getData(getValues("list")), "sort")}
            fields={[
              { title: "product_code" },
              { title: "title_panel" },
              {
                title: "",
                td: (row) => {
                  const index = getValues("list").findIndex(
                    (item) => item.id === row.id
                  )

                  return (
                    <span className="d-flex justify-content-around align-items-center">
                      <Input
                        type="date-time-icon"
                        control={control}
                        name={`list.${index}.expireAt`}
                      />
                      <span className="mr-4">
                        <Input
                          size="sm"
                          type="switch-toggle"
                          control={control}
                          name={`list.${index}.show`}
                        />
                      </span>
                    </span>
                  )
                },
              },
            ]}
            actions={[{ icon: "fa-trash-alt", onClick: deleteItem }]}
          />
        )}
      </Grid>
    </GridContainer>
  )
}

export default Manual
