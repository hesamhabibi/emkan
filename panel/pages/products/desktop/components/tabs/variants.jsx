import Styles from "./variants.module.scss"
import Section from "../section"
import {Grid, GridContainer} from "@admin/Grid"
import {useContext, useEffect, useState} from "react"
import {TranslationContext} from "~/app/Context"
import Collapse from "@admin/Collapse"
import Price from "./price"
import {useDispatch} from "react-redux"
import {open, toggle} from "~/app/State/collapse"
import Button from "@admin/Button"
import {closePopup, openPopup} from "~/app/State/popups"
import {useForm} from "react-hook-form"
import Popup from "@admin/Popup"
import Input from "@admin/Input"
import Fields from "../variant/fields"
import {close} from "~/app/State/collapse"
import Tag from "@admin/Tag"
import {useRouter} from "next/router"
import {ReactSortable} from "react-sortablejs"
import DetailsStatuses from "./details_count_statuses.json"
import _ from "lodash"
import Prepend from "@admin/Input/Prepend"
import DetailsStatusesUnit from "./details_count_units.json"
import Alert from "@admin/Alert"
import PastVariants from "../variant/pastVariants"
import Info from "@admin/Input/Info"
import {key} from "../../../../../../common/lang/fa";

const sortableOptions = {
    group: "treeData",
    animation: "200",
    swapThreshold: "0.5",
    forceFallback: true,
    handle: ".fa-grip-vertical",
    ghostClass: Styles.tableMove,
}

const cartesianProduct = (a) => {

    a = a.filter(item => item?.length > 0)

    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0, 1)[0]; // the first array of a
    a = cartesianProduct(a);
    for (i = 0, l = a1?.length; i < l; i++) {
        if (a && a.length)
            for (j = 0, m = a.length; j < m; j++)
                o.push([a1[i]].concat(a[j]));
        else
            o.push([a1[i]]);
    }
    return o;

}

const equal_array = (arr1, arr2) => arr1 && arr2 && arr1?.sort().toString() === arr2?.sort().toString()

const compare = (a, b) => {
    if (a.sort < b.sort) {
        return -1;
    }
    if (a.sort > b.sort) {
        return 1;
    }
    return 0;
}

const pluck = (array, key) => array.map(item => item[key])


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
                                     errors,
                                     setError,
                                 }) {
    const translation = useContext(TranslationContext)
    const dispatch = useDispatch()

    const locale = useRouter().locale

    const [formInputs, setFormInputs] = useState((arg) => () => [])
    const [title, setTitle] = useState("")
    const [scrolled, setScrolled] = useState(false)
    const [mixins, setMixins] = useState([])
    const [callback, setCallback] = useState(() => {
    })
    const [collapses, setCollapses] = useState({})
    const [name, setName] = useState(null)

    const watchVariants = watch("variant")

    const form = useForm()

    const createMixins = (variants) => {

        if (!variants?.length) {
            setValue('has_variant', false)
            dispatch(open('products-variant'))
            setValue("mix_variant", [])
            return setMixins([])
        }

        dispatch(close('products-variant'))
        let _mix_variants = []
        variants?.forEach((item, index) => {
            if (item.labels?.length > 0) _mix_variants[index] = item.labels
        })

        setValue('has_variant', true)

        _mix_variants = cartesianProduct(_mix_variants)

        const _price = getValues("price")
        const _details = getValues("details")

        let mix_variant_item_flat = {
            keys: [],
            title: {},
            sort: 0,

            is_main_price: false,
            is_active: false,
            has_media_gallery: false,
            media_gallery: null,
            details: {
                product_code: "",
                warehouse: "",
                use_count: true,
                count: 1,
                count_status: 1,
                count_unit: 1,
                limit_max: 0,
                limit_min: 0,
                weight: _details ? _details.weight : null,
                height: _details ? _details.height : null,
                width: _details ? _details.width : null,
                length: _details ? _details.length : null,
            },
            price: {
                price: _price ? _price.price : 0,
                offer_price: _price ? _price.offer_price : null,
                discount_percent: _price ? _price.discount_percent : null,
                offer_startAt: _price ? _price.offer_startAt : null,
                offer_expireAt: _price ? _price.offer_expireAt : null,
            },

        }

        let _old_mix_variants = getValues("mix_variant") || []
        _old_mix_variants = _old_mix_variants.sort(compare)
        let _new_mix_variants = []
        console.log('createMixins', variants, _mix_variants)
        _mix_variants.forEach((item, index) => {
            let variant_keys = pluck(item, 'key')
            console.log(variant_keys, 'variant_keys');
            let index_old_mix_variants = _old_mix_variants?.findIndex(item => equal_array(item.keys, variant_keys))
            if (index_old_mix_variants > -1) {
                if (!_old_mix_variants[index_old_mix_variants].price) {
                    _old_mix_variants[index_old_mix_variants].price = mix_variant_item_flat.price
                }
                _new_mix_variants.push({
                    ..._old_mix_variants[index_old_mix_variants],
                    title: item.map(item => item?.title[locale])
                })
            } else {
                _new_mix_variants.push({
                    ...mix_variant_item_flat,
                    keys: variant_keys,
                    title: item.map(item => item?.title[locale]),
                    sort: index,
                })
            }
        })

        console.log(_new_mix_variants, "_new_mix_variants");


        reset({...getValues(), mix_variant: _new_mix_variants}, {keepErrors: true})

        console.log(getValues("mix_variant"), "_getValues_new_mix_variants");


        setMixins(_new_mix_variants)
    }

    useEffect(() => {
        createMixins(getValues("variant"))
    }, [])

    const collapse = (id, e) => {
        dispatch(toggle(id))
        setCollapses((prevState) => {
            prevState[id] = prevState[id] !== undefined ? !prevState[id] : true
            return {...prevState}
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
        const items = [...(getValues("variant") || []), {...data, labels: []}]
        setValue("variant", items)
        console.log('storeVariant', items, getValues("variant"));
        dispatch(closePopup("add-variant"))
        dispatch(close("products-variant"))
        createMixins(items)
        setScrolled(true)
    }

    const addVariant = () => {
        setTitle(translation("Add Variant", "products"))
        setFormInputs(() => Fields.variant)
        setCallback(() => storeVariant)
        form.reset({type: 1})
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

    const updateVariantType = ({key, index}, data) => {
        const items = getValues("variant")
        items[key].labels[index] = data
        setValue("variant", items)
        console.log('updateVariantType', data, getValues("variant"), items, 22)
        dispatch(closePopup("add-variant"))
        createMixins(items)
    }

    const editVariantType = (key, index) => {
        console.log('editVariantType');
        const values = getValues()
        form.reset(values.variant[key].labels[index])
        setCallback(() => updateVariantType.bind(this, {key, index}))
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
            key: `${data.key + 1}-${items[data.key].labels.length + 1}`,
        })

        setValue("variant", items)
        console.log('storeVariantType', data, getValues("variant"), items)
        dispatch(closePopup("add-variant"))
        createMixins(items)
    }

    const addVariantType = ({item, key}) => {
        console.log('addVariantType');
        form.reset({key})
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

    const destroyVariantType = ({key, index}) => {
        const items = getValues("variant") || []
        items[key].labels.splice(index, 1)
        reset({
            ...getValues(),
            variant: items,
        })
        console.log('destroyVariantType', {key, index}, getValues("variant"), items);
        createMixins(items)
    }

    const updateVariant = (id, data) => {
        const items = getValues("variant")
        items[id] = {...data, labels: items[id].labels}
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

    const editVariant = ({item, key}) => {
        setCallback(() => updateVariant.bind(this, key))
        setFormInputs(() => Fields.variant)
        form.reset(item)
        setTitle(translation("Edit Variant", "products"))
        dispatch(openPopup("add-variant"))
    }

    useEffect(() => {
        if (!getValues("variant")?.length) return
        if (!scrolled) {
            scroll.current.scrollIntoView({top: 0, behavior: "smooth"})
            setScrolled(true)
        }
    }, [scrolled, watchVariants])

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

    function mixinImages({key, item}, e) {
        e.stopPropagation()
        setName(item.sort)
        dispatch(openPopup("variants-gallery"))
        setCallback(() => dispatch.bind(this, closePopup("variants-gallery")))
    }

    function collapseDeactive(sort, id) {
        const value = getValues().mix_variant[sort].is_active
        if (!value)
            dispatch(close(id))
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
                        {item.type === "multi-language" ? (
                            <GridContainer gap="Lg">
                                <Input
                                    control={form.control}
                                    {...item}
                                    label={translation(item.name, "products")}
                                />
                            </GridContainer>
                        ) : (
                            <Input
                                control={form.control}
                                {...item}
                                label={translation(item.name, "products")}
                            />
                        )}
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
                    {
                        mixins?.length > 0 &&
                        mixins.map(item =>
                            item.sort === name &&
                            (
                                <Input
                                    type="image-gallery"
                                    name={`mix_variant.${item.sort}.media_gallery`}
                                    control={control}
                                    url={`${process.env.apiHost}api/media/upload-media-product`}
                                    label={translation("images", "products")}
                                    info={translation("image info", "products")}
                                />
                            )
                        )

                    }

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
                    <h5 className={`d-flex justify-content-between ${Styles.header}`}>
                        {translation("product attributes", "products")}
                        <div
                            onClick={setInfo.bind(null, !info)}
                            className={`mr-2 ${!info ? Styles.active : ""}`}
                        >
                            <i className="fad fa-question-circle fa-lg"/>
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
                                <i className="fas fa-plus-circle ml-1"/>
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
                            <div className={Styles.cardHeader}>
                  <span className="d-flex align-items-center">
                    {item.name[locale]}
                  </span>
                                <div className="d-flex align-items-center">
                                    <Button
                                        onClick={addVariantType.bind(this, {item, key})}
                                        type="primary"
                                        className="ml-3"
                                    >
                                        <i className="fas fa-plus-circle ml-1"/>
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
                        <i className="fas fa-palette"/>
                      </span>
                                    )}
                                    <span
                                        data-tooltip={translation("edit variant", "products")}
                                        className="ml-3 d-flex align-items-center"
                                    >
                      <i
                          onClick={editVariant.bind(this, {item, key})}
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
                                    {item.labels?.length ? <hr className="mx-1 w-100"/> : null}
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
                                    getValues(`mix_variant.${key}.is_active`) === true
                                        ? ""
                                        : Styles.disabled
                                }`}
                                key={key}
                            >
                                <div
                                    onClick={
                                        getValues(`mix_variant.${key}.is_active`) === true
                                            ? collapse.bind(this, `variant-${key}`)
                                            : null
                                    }
                                    className={Styles.cardHeader}
                                >
                    <span>
                      <i className={`fas fa-grip-vertical fa-lg ml-2`}/>
                      <span>{translation("Price Variant", "products")}</span>
                      <Tag className="mr-2" type="primary">
                        {item.title.join(" - ")}
                      </Tag>

                      <i
                          onClickCapture={mixinImages.bind(this, {item, key})}
                          className={`fad fa-images mr-3 ${Styles.imageIcon}`}
                      />
                    </span>
                                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center">
                        <small className="ml-2">
                          {getValues(`mix_variant.${key}.is_active`) === true
                              ? translation("activate")
                              : translation("deactivate")}
                        </small>
                        <Input
                            control={control}
                            type="switch-toggle"
                            name={`mix_variant.${key}.is_active`}
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
                                            <Grid size={6}>
                                                <Input
                                                    name={`mix_variant.${item.sort}.price.price`}
                                                    group={translation("Toman", "products")}
                                                    rules={{validateAsNumber: true}}
                                                    control={control}
                                                    type="number"
                                                    label={translation("Price", "products")}
                                                />
                                            </Grid>
                                            <Grid size={6}>
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
                                            {info && (
                                                <Grid className={Styles.info} size={12}>
                                                    <Info
                                                        text={translation("count info", "products")}
                                                    />
                                                </Grid>
                                            )}
                                            <Grid size={12}>
                                                <Collapse id={`advanced-price-${key}`}>
                                                    <GridContainer gap="Lg">
                                                        <Grid size={6}>
                                                            <Input
                                                                name={`mix_variant.${item.sort}.price.offer_price`}
                                                                group={translation("Toman", "products")}
                                                                rules={{validateAsNumber: true}}
                                                                info={translation(
                                                                    "offer_price_info",
                                                                    "products"
                                                                )}
                                                                control={control}
                                                                type="number"
                                                                label={translation("Offer Price", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <Input
                                                                group={translation("percent")}
                                                                rules={{validateAsNumber: true}}
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
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
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
                                                        <Grid size={6}>
                                                            <Input
                                                                name={`mix_variant.${item.sort}.price.offer_expireAt`}
                                                                control={control}
                                                                type="date"
                                                                label={translation(
                                                                    "Offer Expire At",
                                                                    "products"
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid className={Styles.info} size={12}>
                                                            <Info
                                                                text={translation(
                                                                    "info_start_end_at",
                                                                    "products"
                                                                )}
                                                            />
                                                        </Grid>
                                                    </GridContainer>
                                                </Collapse>
                                                <hr className={`${info ? "mt-4" : "mt-2"} mb-2`}/>
                                            </Grid>
                                            <Grid size={6}>
                                                <Input
                                                    control={control}
                                                    name={`mix_variant.${item.sort}.details.product_code`}
                                                    info={translation("product_code_info", "products")}
                                                    label={translation("Product Code", "products")}
                                                />
                                            </Grid>
                                            <Grid size={6}>
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
                                            <Grid size={6}>
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
                                            <Grid size={6}>
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
                                            </Grid>
                                            <Grid size={12} className={Styles.info}>
                                                <Info text={translation("count_info", "products")}/>
                                            </Grid>
                                            <Grid size={12}>
                                                <Collapse id={`advanced-details-${key}`}>
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
                                                                name={`mix_variant.${item.sort}.details.use_count`}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}/>
                                                        <Grid size={12} className={Styles.info}>
                                                            <Info
                                                                text={translation(
                                                                    "use_count_info",
                                                                    "products"
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <Input
                                                                control={control}
                                                                type="number"
                                                                name={`mix_variant.${item.sort}.details.limit_min`}
                                                                label={translation("limit min", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <Input
                                                                control={control}
                                                                type="number"
                                                                name={`mix_variant.${item.sort}.details.limit_max`}
                                                                label={translation("limit max", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={12} className={Styles.info}>
                                                            <Info
                                                                text={translation("min_max_info", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={3}>
                                                            <Input
                                                                group={translation("cm", "products")}
                                                                control={control}
                                                                rules={{validateAsNumber: true}}
                                                                type="number"
                                                                name={`mix_variant.${item.sort}.details.width`}
                                                                label={translation("width", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={3}>
                                                            <Input
                                                                group={translation("cm", "products")}
                                                                control={control}
                                                                rules={{validateAsNumber: true}}
                                                                name={`mix_variant.${item.sort}.details.length`}
                                                                type="number"
                                                                label={translation("length", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={3}>
                                                            <Input
                                                                group={translation("cm", "products")}
                                                                control={control}
                                                                name={`mix_variant.${item.sort}.details.height`}
                                                                type="number"
                                                                rules={{validateAsNumber: true}}
                                                                label={translation("height", "products")}
                                                            />
                                                        </Grid>
                                                        <Grid size={3}>
                                                            <Input
                                                                group={translation("grams", "products")}
                                                                control={control}
                                                                type="number"
                                                                name={`mix_variant.${item.sort}.details.weight`}
                                                                rules={{validateAsNumber: true}}
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
