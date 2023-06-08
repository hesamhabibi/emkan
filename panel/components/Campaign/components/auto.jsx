import {Grid, GridContainer} from "@admin/Grid"
import {useForm} from "react-hook-form"
import {Fragment, useContext, useEffect, useState} from "react"
import {LoadingContext, ToastContext, TranslationContext} from "~/app/Context"
import {gql} from "@apollo/client"
import Input from "@admin/Input"
import Styles from "./auto.module.scss"
import client from "~/app/apollo-client"
import {useRouter} from "next/router"
import Button from "@admin/Button"
import queries from "./queries"
import Table from "@admin/Table"
import {setErrors} from "~/app/Hooks/Api"
import Collapse from "@admin/Collapse"
import {useDispatch, useSelector} from "react-redux"
import {close, toggle} from "~/app/State/collapse"

const queryData = gql`
  query ($key: String!) {
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
    2: ({data, control}) => {
        // console.log(data, control, 2)
        return null
    },
    3: ({control, data, Key, setValue}) => {
        useEffect(() => {
            const languages = JSON.parse(localStorage.getItem("web_languages"))

            setValue(`condition.wheres.${Key}.where_value`, {
                fields: languages.map((item) => item.code),
                value: "",
            })
        }, [])

        return (
            <Input
                name={`condition.wheres.${Key}.where_value`}
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
    4: ({data, control}) => {
        // console.log(data, control, 4)

        return null
    },
    5: "number",
    6: ({data, control}) => {
        return null
    },
    7: "date",
    8: "checkbox",
    9: ({data, control, Key}) => {
        return (
            <Input
                type="select-searchable"
                control={control}
                name={`condition.wheres.${Key}.where_value`}
                data={data}
            />
        )
    },
    10: ({data, control, Key}) => {
        // console.log(data, control, 10)

        return (
            <Input
                type="select-multiple"
                control={control}
                name={`condition.wheres.${Key}.where_value`}
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
                                 control,
                                 setVal,
                                 getVal,
                                 Watch,
                                 reset,
                                 handleSubmit,
                                 setError,
                                 ...props
                             }) {
    const translation = useContext(TranslationContext)
    const fireLoading = useContext(LoadingContext)

    const router = useRouter()

    const watch = Watch
    const getValues = getVal
    const setValue = setVal

    const dispatch = useDispatch()

    const [data, setData] = useState({value: []})
    const [previewData, setPreviewData] = useState([])

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

    function submitData() {
    }

    useEffect(() => {
        getData().then((res) => {
            fireLoading(false)
            setData(res.result)
        })
    }, [])

    /**
     * Renders the third input based on second input value,
     */
    function renderValue(key) {
        const whereField = getValues(`condition.wheres.${key}.where_field`)
        const operation = getValues(`condition.wheres.${key}.operator`)

        const value =
            data.value
                .find((item) => item.key === whereField)
                ?.operators.find((item) => item.operation_type === operation) || {}

        const Type = value_types[value.value_type]

        if (typeof Type === "function") {
            return (
                <>
                    <label>{translation("value")}</label>
                    <Type
                        Key={key}
                        data={
                            data.extra_data[value.dynamic_values] ||
                            value.values?.map((item) => ({
                                name: item.title_panel,
                                id: item.key,
                            }))
                        }
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                    />
                </>
            )
        }

        return (
            <Input
                type={Type}
                name={`condition.wheres.${key}.where_value`}
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
        const values = getValues("condition.wheres")
        const defaultValues = getValues()
        values.splice(key, 1)
        reset({
            ...defaultValues,
            condition: {...defaultValues.condition, wheres: [...values]},
        })
    }

    /**
     * Removes the sort item.
     *
     * @param key Number
     */
    function removeSort(key) {
        const defaultValues = getValues()
        const values = getValues("condition.orders")
        values.splice(key, 1)
        reset({
            ...defaultValues,
            condition: {...defaultValues.condition, orders: values},
        })
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
                        name={`condition.wheres.${key}.where_field`}
                    />
                </Grid>
                <Grid size={3}>
                    {watch(`condition.wheres.${key}.where_field`) | true && (
                        <Input
                            type="select-searchable"
                            label={translation("operator type")}
                            name={`condition.wheres.${key}.operator`}
                            control={control}
                            data={
                                data.value
                                    .find(
                                        (item) =>
                                            item.key ===
                                            getValues(`condition.wheres.${key}.where_field`)
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
                    {watch(`condition.wheres.${key}.operator`) | true && renderValue(key)}
                </Grid>
                <Grid size={1}>
                    <Button
                        className="px-3"
                        type="error"
                        onClick={removeInput.bind(this, key)}
                    >
                        <i className={`far fa-trash-alt`}/>
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
                        name={`condition.orders.${key}.field`}
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
                        name={`condition.orders.${key}.type`}
                    />
                </Grid>
                <Grid size={1}>
                    <Button
                        className="px-3"
                        type="error"
                        onClick={removeSort.bind(this, key)}
                    >
                        <i className={`far fa-trash-alt`}/>
                    </Button>
                </Grid>
            </Fragment>
        )
    }

    /**
     * Adds a row input to the form.
     */
    function addCondition() {
        setValue("condition.wheres", [
            ...(getValues("condition.wheres") || []),
            {value: undefined},
        ])
    }

    /**
     * Adds a row input to the form.
     */
    function addSort() {
        setValue("condition.orders", [
            ...(getValues("condition.orders") || []),
            {value: undefined},
        ])
    }

    /**
     * Preview data with the generated form.
     *
     */
    async function preview(data) {
        fireLoading(true)

        if (data.condition.orders)
            data.condition.orders.forEach((item) => {
                item.type = parseInt(item.type, 10)
            })

        try {
            const res = await client.query({
                query: queries.preview,
                variables: {
                    condition: {
                        model_name: "ProductModel",
                        ...data.condition,
                    },
                },
            })
            console.log('res', res);
            setPreviewData(res.data.result)
        } catch (e) {
            if (e.graphQLErrors) {
                setErrors(e.graphQLErrors[0], setError)
            }
        }
        fireLoading(false)
    }

    return (
        <GridContainer className="text-right align-items-end" gap="Lg">
            <Grid size={12}>
                <h4>{translation("Query and logic", "products")}</h4>
            </Grid>
            <Grid size={2}>
                <Input
                    type="number"
                    label={translation("limit")}
                    control={control}
                    name="condition.limit"
                />
            </Grid>
            <Grid size={4}>
                <Input
                    type="toggle"
                    control={control}
                    name="condition.logic"
                    data={[
                        {name: "AND", id: 1},
                        {name: "OR", id: 2},
                    ]}
                    label={translation("query method")}
                />
            </Grid>
            <Grid size={6}>
                <Button
                    type="primary"
                    className="w-100"
                    onClick={handleSubmit(preview)}
                >
                    <i className="fas fa-eye ml-3"/>
                    {translation("preview")}
                </Button>
            </Grid>
            <Grid size={10}/>

            <Grid className={Styles.form} size={6}>
                <h4 className="mb-5">{translation("Query Combos", "products")}</h4>

                <GridContainer className="align-items-end" gap="Lg">
                    {watch("condition.wheres") &&
                    getValues("condition.wheres").map((item, key) => renderInputs(key))}
                    <Grid size={9}/>
                    <Grid size={3} className="text-left">
                        <Button
                            onClick={addCondition}
                            type="success"
                            className="mr-auto mt-4"
                        >
                            <i className="fas fa-plus-circle ml-1"/>
                            {translation("add condition")}
                        </Button>
                    </Grid>
                </GridContainer>
                <hr/>
                <h4 className="mb-5">{translation("sort Combos", "products")}</h4>
                <GridContainer className="align-items-end" gap="Lg">
                    {watch("condition.orders") &&
                    getValues("condition.orders").map((item, key) => renderSorts(key))}
                    <Grid size={8}/>
                    <Grid size={4} className="text-left">
                        <Button onClick={addSort} type="success" className="mr-auto mt-4">
                            <i className="fas fa-plus-circle ml-1"/>
                            {translation("add sort")}
                        </Button>
                    </Grid>
                </GridContainer>
            </Grid>

            <Grid className={`${Styles.result} align-self-start`} size={6}>
                <Table
                    data={previewData}
                    fields={[
                        {
                            title: "image",
                            td: (row) => (
                                <img
                                    width="50"
                                    src={row.media?.url || "/images/not-found.png"}
                                    alt={row.media?.alt}
                                />
                            ),
                        },
                        {
                            title: "product_code",
                            td: (row) => (row.has_variant) ? row.mix_variant[0].details.product_code : row.details.product_code,
                        },
                        {
                            title: "title_panel",
                            td: (row) => {
                                if (!row.has_variant) {
                                    return `${row.title_panel}`
                                }
                                return `${row.title_panel} - ( ${row.variant[0].name_panel})`
                            }
                        },
                    ]}
                    section="products"
                    actions={[]}
                />
            </Grid>
        </GridContainer>
    )
}
