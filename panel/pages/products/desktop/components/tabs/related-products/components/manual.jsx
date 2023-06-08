import {Grid, GridContainer} from "@admin/Grid"
import {useApolloClient} from "~/app/Hooks/Api"
import {useContext, useState, Fragment, useEffect} from "react"
import {useForm} from "react-hook-form"
import {TranslationContext} from "~/app/Context"
import {useRouter} from "next/router"
import {useDispatch, useSelector} from "react-redux"
import {toggle} from "~/app/State/collapse"
import Sortable from "@admin/Table/sortable"
import Filter from "@admin/Filter"
import Fields from "../fields"
import Styles from "./manual.module.scss"
import queries from "../queries"
import Checkbox from "@admin/Input/CheckBox"
import Collapse from "@admin/Collapse"
import _ from "lodash"
import {closeModal} from "~/app/State/modal"

export default function Manual({data, setVal, Watch, getVal, setCallback}) {
    const translation = useContext(TranslationContext)
    const [variants, setVariants] = useState([])

    const router = useRouter()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.collapse.value)

    const {getPage} = useApolloClient()

    const {watch, getValues, setValue} = useForm({
        defaultValues: {
            collections: {
                related_products: {
                    collection_list: getVal("collections.related_products.collection_list") || [],
                },
            },
        },
    })

    const submitValues = () => {
        setVal(
            "collections.related_products.collection_list",
            getVal("collections.related_products.collection_list")
        )
        dispatch(closeModal("related-products"))
    }

    useEffect(() => {
        setCallback(() => submitValues)
    }, [])

    // useEffect(() => {
    //   const values = getVal("collections.related_products.collection_list")
    //   if (!values) return
    //   setValue("collections.related_products.collection_list", values)
    // }, [Watch("collections.related_products.collection_list")])

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

    function toggleProduct({id, keys}) {
        const values = getValues("collections.related_products.collection_list")

        const index = values.findIndex(item => item.product_id === id)

        if (index !== -1)
            values.splice(index, 1)

        else if (keys.length)
            keys.forEach(item => {
                if (values.findIndex(val => _.isEqual(val.keys, [item]) && val.product_id === id) !== -1)
                    return

                values.push({
                    sort: 1,
                    product_id: id,
                    keys: [item]
                })
            })

        else
            values.push({
                sort: 1,
                product_id: id,
                has_variant_key: true,
                keys: []
            })

        setValue("collections.related_products.collection_list", [...values])
    }

    function toggleChildren({id, keys}) {
        const values = getValues("collections.related_products.collection_list")

        const index = values.findIndex((item) => item.product_id === id && _.isEqual([keys], item.keys))

        if (index !== -1) {
            values.splice(
                index,
                1
            )
        } else values.push({product_id: id, keys: [keys], sort: 1})
        setValue("collections.related_products.collection_list", values)
    }

    function getData(values) {
        const res = []

        values.forEach((item) => {
            const value = variants.find((variant) => variant.id === item.product_id)
            if (item.keys.length) {
                item.keys.forEach((key) => {
                    const variant = value.mix_variant.find((mix) =>
                        _.includes(item.keys, mix.keys)
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
                        product_code: variant.details?.product_code || value.product_id,
                    })
                })
            } else {
                res.push({
                    id: item.product_id,
                    title_panel: value.title_panel,
                    sort: item.sort,
                    product_code: value.details?.product_code || value.product_id,
                })
            }
        })
        return res
    }

    function deleteItem(row) {
        const values = getValues("collections.related_products.collection_list")
        if (row.key) {
            const val = values.findIndex((item) => item.product_id === row.id)
            if (values[val].keys.length > 1) {
                values[val].keys.splice(
                    values[val].keys.findIndex((item) => _.isEqual(item, row.key)),
                    1
                )
            } else {
                values.splice(val, 1)
            }
            setValue("collections.related_products.collection_list", values)
            return
        }
        values.splice(
            values.findIndex((item) => item.product_id === row.id),
            1
        )
        setValue("collections.related_products.collection_list", values)
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
                        watch("collections.related_products.collection_list") | true &&
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
                                                keys: item.mix_variant.map((item) => item.keys),
                                            }),
                                            value: getValues(
                                                    "collections.related_products.collection_list"
                                                ).filter((it) => it?.product_id === item.id)
                                                    .length ===
                                                (item.mix_variant.length ? item.mix_variant : [{keys: [""]}])
                                                    .map((item) => item.keys).flat(2)
                                                    .length,
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
                                                                keys: mix_variant.keys,
                                                            }),
                                                            value: getValues(
                                                                "collections.related_products.collection_list"
                                                            ).find((it) =>
                                                                it?.keys.includes(mix_variant.keys)
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
                {watch("collections.related_products.collection_list") && (
                    <Sortable
                        setData={(data) => {
                            const values = getValues("collections.related_products.collection_list")

                            data.forEach((item, index) => {
                                if (!item.key?.length)
                                    values.find(value => item.id === value.product_id).sort = index
                                else
                                    values.find(value => item.id === value.product_id
                                        && _.includes(value.keys, item.key)
                                    ).sort = index
                            })

                            setValue("collections.related_products.collection_list", values)
                        }}
                        section="products"
                        data={_.orderBy(getData(
                            getValues("collections.related_products.collection_list")
                        ), "sort")}
                        fields={[{title: "product_code"}, {title: "title_panel"}]}
                        actions={[{icon: "fa-trash-alt", onClick: deleteItem}]}
                    />
                )}
            </Grid>
        </GridContainer>
    )
}
