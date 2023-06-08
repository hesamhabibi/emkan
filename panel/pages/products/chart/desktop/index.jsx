import Modal from "@admin/Modal"
import { useContext, useEffect, useState } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Chart from "@admin/Chart"
import Input from "@admin/Input"
import { useForm } from "react-hook-form"
import _ from "lodash"
import Button from "@admin/Button"
import Table from "@admin/Table"
import moment from "jalali-moment"
import queries from "../../queries"
import { setErrors } from "~/app/Hooks/Api"
import client from "~/app/apollo-client"
import { useDispatch } from "react-redux"
import { closeModal } from "~/app/State/modal"

export const toInt = (field) => (field ? parseInt(field, 10) : null)

const price2Int = (fieldset) => {
  if (!fieldset) return null

  fieldset.price = toInt(fieldset.price)
  fieldset.offer_price = toInt(fieldset.offer_price)
  fieldset.discount_percent = toInt(fieldset.discount_percent)

  return fieldset
}

const fields = [
  "count",
  "height",
  "length",
  "limit_min",
  "limit_max",
  "weight",
  "width",
]

const details2Int = (fieldset) => {
  if (!fieldset) return

  // fieldset.weight = toInt(fieldset)
  fields.forEach((item) => {
    fieldset[item] = toInt(fieldset[item])
  })
  return fieldset
}

const ChartPage = ({ data, getPage }) => {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const fireToast = useContext(ToastContext)

  const [limited, setLimited] = useState(true)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")

  const { control, watch, getValues, setError, setValue, handleSubmit, reset } =
    useForm({
      defaultValues: { ...data },
    })

  useEffect(() => {
    let defaultName = ""

    if (data?.mix_variant?.length) defaultName = "mix_variant.0."

    setName(defaultName)

    reset({
      ...data,
      mix_variant_focus: defaultName.length ? data.mix_variant[0].keys : null,
    })
  }, [data])

  const statuses = [
    {
      name: translation("show"),
      id: 2,
    },
    {
      name: translation("draft"),
      id: 3,
    },
    {
      name: translation("inactive"),
      id: 1,
    },
  ]

  const labels = data.variant?.map((item) => item.labels).flat()

  const updateProduct = async (data) => {
    const mixVariants = []

    // data.price = price2Int(data.price)
    // data.details = details2Int(data.details)

    if (data.mix_variant) {
      data.mix_variant.forEach((item) => {
        if (!item.price) return
        item.price = price2Int(item.price)
        item.details = details2Int(item.details)
        mixVariants.push({
          is_active: item.is_active,
          product_id: data.id,
          keys: item.keys,
          details: item.details,
          price: item.price,
        })
      })
    }

    setLoading(true)
    try {
      const res = await client.query({
        query: queries.updateMixVariant,
        variables: { input: mixVariants, id: data.id },
      })
      getPage(1)
      dispatch(closeModal("price-action"))
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
    } catch (e) {
      if (e.graphQLErrors) setErrors(e.graphQLErrors[0], setError)
    }
    setLoading(false)
  }

  const actions = [
    {
      name: translation("Cancel"),
      disabled: false,
      onClick: (close) => close(),
    },
    {
      name: translation("Submit"),
      disabled: loading,
      onClick: handleSubmit(updateProduct),
    },
  ]

  useEffect(() => {
    if (!data.mix_variant) return

    const value = getValues("mix_variant_focus")
    if ("1-1" in (value?.key || ["1-1"])) {
      setName("")
    } else {
      setName(
        `mix_variant.${data.mix_variant?.findIndex((item) =>
          _.isEqual(item.keys, value)
        )}.`
      )
    }
  }, [watch("mix_variant_focus")])

  return (
    <Modal
      full_screen
      actions={actions}
      title={`${translation("price action", "products")} ${data.title_panel}`}
      id="price-action"
    >
      <GridContainer gap="Lg" className="p-3 text-right">
        <Grid size={7}>
          {!!data?.mix_variant?.length && (
            <Input
              label={translation("select mix variant", "products")}
              control={control}
              name="mix_variant_focus"
              type="select-searchable"
              data={
                data.mix_variant?.map((mix) => {
                  const res = labels.filter((label) =>
                    _.includes(label.key, mix.keys)
                  )

                  return {
                    id: mix.keys,
                    name: res.map((item) => item.title_panel).join(" - "),
                  }
                }) || []
              }
              key={name}
            />
          )}
          <GridContainer gap="Md" className="mt-4">
            <Grid size={4}>
              <Input
                type="number"
                name={`${name}price.price`}
                control={control}
                label={translation("price")}
                key={name}
                group={translation("toman")}
              />
            </Grid>

            <Grid size={4}>
              <Input
                type="number"
                name={`${name}price.offer_price`}
                control={control}
                label={translation("offer_price", "products")}
                key={name}
                group={translation("toman")}
              />
            </Grid>

            <Grid size={4}>
              <Input
                type="number"
                name={`${name}price.discount_percent`}
                control={control}
                label={translation("Discount Percent", "products")}
                key={name}
                group={translation("percent")}
              />
            </Grid>

            <Grid size={6}>
              <Input
                type="date"
                name={`${name}price.offer_startAt`}
                control={control}
                label={translation("Offer Start At", "products")}
                key={name}
              />
            </Grid>

            <Grid size={6}>
              <Input
                type="date"
                name="offer_endAt"
                control={control}
                label={translation("Offer Expire At", "products")}
                key={name}
              />
            </Grid>
            <Grid size={12}>
              <hr className="my-3" />
            </Grid>
            <Grid size={6}>
              <Input
                type="number"
                control={control}
                name={`${name}details.count`}
                label={translation("count", "products")}
                key={name}
              />
            </Grid>
            <Grid size={6}>
              <Input
                rtl
                type="select"
                name="status"
                data={statuses}
                control={control}
                label={translation("product-status", "products")}
                key={name}
              />
            </Grid>
            <Grid size={6}>
              <Input
                control={control}
                name={`${name}details.limit_min`}
                type="number"
                label={translation("limit min", "products")}
                key={name}
              />
            </Grid>
            <Grid size={6}>
              <Input
                control={control}
                name={`${name}details.limit_max`}
                label={translation("limit max", "products")}
                type="number"
                key={name}
              />
            </Grid>
          </GridContainer>
        </Grid>
        <Grid size={5}>
          <Chart
            data={getValues(`${name}price_history`)?.sort(
              (a, b) => a.createdAt - b.createdAt
            )}
          />
          {!!watch(`${name}price_history`) && (
            <>
              <Table
                data={(limited
                  ? getValues(`${name}price_history`).slice(0, 3)
                  : getValues(`${name}price_history`)
                ).sort((a, b) => b.createdAt - a.createdAt)}
                fields={[
                  {
                    title: "date",
                    td: (row) =>
                      moment(parseInt(row.createdAt, 10)).format("YYYY/MM/DD"),
                  },
                  { title: "price" },
                ]}
                actions={[]}
              />
              {getValues(`${name}price_history`)?.length > 3 && limited && (
                <Button
                  onClick={() => setLimited(false)}
                  type="white"
                  className="w-100 mt-3"
                >
                  {translation("more")}
                </Button>
              )}
            </>
          )}
        </Grid>
      </GridContainer>
    </Modal>
  )
}

export default ChartPage
