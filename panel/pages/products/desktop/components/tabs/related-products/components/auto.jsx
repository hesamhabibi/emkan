import { Grid, GridContainer } from "@admin/Grid"
import { useForm } from "react-hook-form"
import { Fragment, useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { gql } from "@apollo/client"
import Input from "@admin/Input"
import Styles from "./auto.module.scss"
import client from "~/app/apollo-client"
import { useRouter } from "next/router"
import Button from "@admin/Button"
import queries from "./queries"
import Table from "@admin/Table"
import { setErrors } from "~/app/Hooks/Api"
import Collapse from "@admin/Collapse"
import { useDispatch, useSelector } from "react-redux"
import { close, toggle } from "~/app/State/collapse"

const queryData = gql`
  query ($key: String!) {
    collections: getAllCollections(filter: { source: [{ value: 4 }] }) {
      id
      extra_fields {
        name: title_panel
      }
    }
    result: getSettingByKey(key: $key) {
      id
      name_panel
      key
      description_panel
      format # ["object":1, "array":2, "string":3, "big_text":4, "integer":5, "bool":6, "float":7]
      is_main
      value

      parsed_value
      extra_data
    }
  }
`

const collectionQuery = gql`
  mutation ($input: CollectionInput!) {
    result: createCollection(input: $input) {
      id
      extra_fields {
        name: title_panel
      }
    }
  }
`

const wheres_operators = {
  1: "less_than",
  2: "less_than_or_equal",
  3: "equal",
  4: "not_equal",
  5: "more_than",
  6: "more_than_or_equal",
  7: "in",
  8: "regex",
  10: "includes",
  11: "all",
}

const orders_types = {
  1: "ascending",
  2: "descending",
}

const value_types = {
  1: "text",
  2: ({ data, control }) => {
    // console.log(data, control, 2)
    return null
  },
  3: ({ control, data }, key) => {
    return (
      <Input
        name={`wheres.${key}.where_value`}
        type="prepend"
        input_size={8}
        select_size={4}
        control={control}
        select_placeholder="زبان"
        input_name="value"
        select_name="fields"
      />
    )
  },
  4: ({ data, control }) => {
    // console.log(data, control, 4)

    return null
  },
  5: "number",
  6: ({ data, control }) => {
    // console.log(data, control, 6)

    return null
  },
  7: "date",
  8: "checkbox",
  9: ({ data, control, key }) => {
    // console.log(data, control, 9)

    return (
      <Input
        type="select-searchable"
        control={control}
        name={`wheres.${key}.where_value`}
        data={data}
      />
    )
  },
  10: ({ data, control, key }) => {
    // console.log(data, control, 10)

    return (
      <Input
        type="select-multiple"
        control={control}
        name={`wheres.${key}.where_value`}
        data={data}
      />
    )
  },

  // text: 1,
  // array_text: 2,
  // ml_text: 3,
  // array_ml_text: 4,
  // number: 5,
  // array_number: 6,
  // date: 7,
  // bool: 8,
  // select_box: 9,
  // multi_select_box: 10,
}

export default function Auto({
  control: mainControl,
  setCallback,
  setVal,
  ...props
}) {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const router = useRouter()

  const { control, watch, getValues, setValue, reset, setError, handleSubmit } =
    useForm({
      defaultValues: {
        wheres: [{}],
        orders: [{}],
        logic: 1,
        limit: 15,
      },
    })

  const dispatch = useDispatch()

  const [data, setData] = useState({ value: [] })
  const [collections, setCollections] = useState([])
  const [previewData, setPreviewData] = useState([])

  const selector = useSelector(
    (state) => state.collapse.value["create-collection"]
  )
  const fireToast = useContext(ToastContext)

  /**
   * Get required data from server.
   */
  async function getData() {
    try {
      const res = await client.query({
        query: queryData,
        variables: {
          key: "product_condition_fields",
        },
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function submitData() {}

  useEffect(() => {
    getData().then((res) => {
      fireLoading(false)
      setData(res.result)
      setCollections(res.collections)
    })

    setCallback(submitData)
  }, [])

  /**
   * Renders the third input based on second input value,
   */
  function renderValue(key) {
    const whereField = getValues(`wheres.${key}.where_field`)
    const operation = getValues(`wheres.${key}.operator`)

    const value =
      data.value
        .find((item) => item.key === whereField)
        ?.operators.find((item) => item.operation_type === operation) || {}

    const type = value_types[value.value_type]

    if (typeof type === "function") {
      return (
        <>
          <label>{translation("value")}</label>
          {type({
            key,
            data:
              data.extra_data[value.dynamic_values] ||
              value.values?.map((item) => ({
                name: item.title_panel,
                id: item.key,
              })),
            control,
            getValues,
          })}
        </>
      )
    }

    return (
      <Input
        type={type}
        name={`wheres.${key}.where_value`}
        label={translation("value")}
        control={control}
        data={value.values?.map((item) => ({
          name: item.title_panel,
          id: item.key,
        }))}
        gridSize={6}
      />
    )
  }

  /**
   *
   * @param key Number
   */
  function removeInput(key) {
    const values = getValues("wheres")
    values.splice(key, 1)
    reset({ ...getValues(), wheres: values })
  }

  /**
   * Removes the sort item.
   *
   * @param key Number
   */
  function removeSort(key) {
    const values = getValues("orders")
    values.splice(key, 1)
    reset({ ...getValues(), orders: values })
  }

  /**
   * Renders available wheres
   *
   * @returns {JSX.Element}
   */
  function renderInputs(key) {
    return (
      <Fragment key={key}>
        <Grid size={3}>
          <Input
            type="select-searchable"
            label={translation("field")}
            control={control}
            data={data.value.map((item) => ({
              name: item.title[router.locale],
              id: item.key,
            }))}
            name={`wheres.${key}.where_field`}
          />
        </Grid>
        <Grid size={3}>
          {watch(`wheres.${key}.where_field`) | true && (
            <Input
              type="select-searchable"
              label={translation("operator type")}
              name={`wheres.${key}.operator`}
              control={control}
              data={
                data.value
                  .find(
                    (item) =>
                      item.key === getValues(`wheres.${key}.where_field`)
                  )
                  ?.operators.map((item) => ({
                    id: item.operation_type,
                    name: translation(wheres_operators[item.operation_type]),
                  })) || []
              }
            />
          )}
        </Grid>
        <Grid size={5}>
          {watch(`wheres.${key}.operator`) | true && renderValue(key)}
        </Grid>
        <Grid size={1}>
          <Button
            className="px-3"
            type="error"
            onClick={removeInput.bind(this, key)}
          >
            <i className={`far fa-trash-alt`} />
          </Button>
        </Grid>
      </Fragment>
    )
  }

  /**
   * Renders available orders
   *
   * @returns {JSX.Element}
   */
  function renderSorts(key) {
    return (
      <Fragment key={key}>
        <Grid size={6}>
          <Input
            type="select-searchable"
            label={translation("field")}
            control={control}
            data={data.value.map((item) => ({
              name: item.title[router.locale],
              id: item.key,
            }))}
            name={`orders.${key}.field`}
          />
        </Grid>
        <Grid size={5}>
          <Input
            type="select"
            data={Object.keys(orders_types).map((item) => ({
              id: item,
              name: translation(orders_types[item], "products"),
            }))}
            control={control}
            label={translation("type")}
            name={`orders.${key}.type`}
          />
        </Grid>
        <Grid size={1}>
          <Button
            className="px-3"
            type="error"
            onClick={removeSort.bind(this, key)}
          >
            <i className={`far fa-trash-alt`} />
          </Button>
        </Grid>
      </Fragment>
    )
  }

  /**
   * Adds a row input to the form.
   */
  function addCondition() {
    setValue("wheres", [...getValues("wheres"), { value: undefined }])
  }

  /**
   * Adds a row input to the form.
   */
  function addSort() {
    setValue("orders", [...getValues("orders"), { value: undefined }])
  }

  /**
   * Preview data with the generated form.
   *
   */
  async function preview(data) {
    fireLoading(true)

    if (data.orders)
      data.orders.forEach((item) => {
        item.type = parseInt(item.type, 10)
      })

    try {
      const res = await client.query({
        query: queries.preview,
        variables: {
          condition: {
            model_name: "ProductModel",
            ...data,
          },
        },
      })
      setPreviewData(res.data.result)
    } catch (e) {
      if (e.graphQLErrors) {
        setErrors(e.graphQLErrors[0], setError)
      }
    }
    fireLoading(false)
  }

  async function createCollection(data) {
    fireLoading(true)

    if (data.orders)
      data.orders.forEach((item) => {
        item.type = parseInt(item.type, 10)
      })

    try {
      const res = await client.mutate({
        mutation: collectionQuery,
        variables: {
          input: {
            condition: {
              model_name: "ProductModel",
              ...data,
            },
            source: 4,
            type: 2,
          },
        },
      })
      dispatch(close("create-collection"))
      setCollections((prev) => {
        return [...prev, res.data.result]
      })

      setVal("collections.related_products.collection_id", res.data.result.id)
      fireToast(
        translation("Operation Completed Successfully", { status: "success" })
      )
    } catch (e) {
      if (e.graphQLErrors) {
        setErrors(e.graphQLErrors[0], setError)
      }
    }

    fireLoading(false)
  }

  return (
    <>
      <GridContainer className="text-right" gap="Lg">
        <Grid size={10}>
          <Input
            label={translation("collection", "products")}
            type="select-searchable"
            data={
              collections.map((item) => ({
                id: item.id,
                name: item.extra_fields.name || translation("without name"),
              })) || []
            }
            control={mainControl}
            name="collections.related_products.collection_id"
          />
        </Grid>
      </GridContainer>
    </>
  )
}
