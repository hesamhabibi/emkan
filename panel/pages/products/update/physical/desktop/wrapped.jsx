import queries from "../../digital/queries"
import {Grid, GridContainer} from "@admin/Grid"
import {useForm} from "react-hook-form"
import {useContext, useEffect, useReducer, useRef, useState} from "react"
import {
    InfoContext,
    LoadingContext,
    ToastContext,
    TranslationContext,
} from "~/app/Context"
import {CSSTransition, Transition} from "react-transition-group"
import {useRouter} from "next/router"
import {useDispatch} from "react-redux"
import {open} from "~/app/State/collapse"
import {HandleApiError} from "~/app/Helpers/MutationHandler"
import {deepCopyObject} from "~/app/Helpers/ObjectHelper"
import {setErrors} from "~/app/Hooks/Api"
import CreateModel from "../../../desktop/components/create"
import Sidebar from "../../../desktop/components/sidebar"
import Styles from "../../../desktop/products.module.scss"
import moment from "jalali-moment"
import client from "~/app/apollo-client"
import General from "../../../desktop/components/tabs/general"
import dynamic from "next/dynamic"
import _ from "lodash"
import Tutorials from "~/pages/products/desktop/components/tabs/tutorials"
import HasPerm from "~/app/perm"

const Attributes = dynamic(
    () => import("../../../desktop/components/tabs/attributes"),
    {ssr: false}
)

const Variants = dynamic(
    () => import("../../../desktop/components/tabs/variants"),
    {ssr: false}
)

const Extra = dynamic(() => import("../../../desktop/components/tabs/extra"), {
    ssr: false,
})

const RelatedProducts = dynamic(
    () => import("../../../desktop/components/tabs/related-products"),
    {ssr: false}
)

const Gallery = dynamic(
    () => import("../../../desktop/components/tabs/gallery"),
    {ssr: false}
)
const Seo = dynamic(() => import("../../../desktop/components/tabs/seo"), {
    ssr: false,
})

const transitionStyles = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
}

const duration = 300

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const toInt = (field) => (field ? parseInt(field, 10) : null)

const price2Int = (fieldset) => {
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
    // fieldset.weight = toInt(fieldset)
    fields.forEach((item) => {
        fieldset[item] = toInt(fieldset[item])
    })

    return fieldset
}

const reducer = (state, action) => {
    switch (action.type) {
        case 1:
            return General
        case 2:
            return Seo

        case 3:
            return Gallery

        case 6:
            return Attributes

        case 4:
            return Variants

        case 5:
            return Extra

        case 7:
            return RelatedProducts
    }
}

const statusFields = [
    "title",
    "category_id",
    "brand_id",
    "summary",
    "main_features",
    "strengths",
    "weaknesses",
    "description",
]

const galleryFields = ["media_gallery", "video", "files"]

const extraFields = ["has_comment", "is_special", "has_rating", "only_description", "show_price"]

const variantFields = ["variant", "mix_variant", "price", "details"]

const TabComponents = [
    {
        Tab: General,
        permission: "products_main_tab",
        title: "product status",
        errors: statusFields,
    },
    {
        Tab: Seo,
        permission: "products_seo_tab",
        title: "seo and optimization",
        errors: ["seo"],
    },
    {
        Tab: Gallery,
        permission: "products_images_tab",
        title: "product images",
        errors: galleryFields,
    },
    {
        Tab: Attributes,
        permission: "products_table_tab",
        title: "product table",
        errors: ["attribute_groups"],
    },
    {
        Tab: Variants,
        permission: "products_price_tab",
        title: "product attributes",
        errors: variantFields,
    },
    {
        Tab: Extra,
        permission: "products_advanced_tab",
        title: "advanced",
        errors: extraFields,
    },
    {
        Tab: RelatedProducts,
        permission: "products_related_tab",
        title: "related products",
        errors: ["collections"],
    },
    {
        Tab: Tutorials,
        permission: "products_tutorial_tab",
        title: "Tutorial",
        errors: ["tutorials"],
    },
]

const defaultValues = {
    collections: {
        related_products: {
            collection_type: 1,
            collection_list: [],
        },
    },
    status: 2,
    type: 2,
    details: {
        count_status: 1,
        count_unit: 1,
        use_count: true,
        limit_max: 1,
        limit_min: 1,
        count: 1,
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
    },
    price: {
        offer_price: 0,
    },
    mix_variant: [],
    seo: {
        title: {
            fa: "",
            en: "",
        },
        description: {
            fa: "",
            en: "",
        },
        keywords: {
            fa: "",
            en: "",
        },
        url: "",
        robots_status: 1,
        tag_ids: [],
        tag_group_id: [],
    },
    is_special: false,
    only_description: false,
    show_price: false,
    has_variant: false,
    has_rating: true,
    has_comment: true,
    publishAt: moment(),
}

export default function Wrapped() {
    const [Tab, setTab] = useReducer(reducer, General)
    const [section, setSection] = useState(1)
    const [toggle, setToggle] = useState(true)
    const [data, setData] = useState({})
    const [model, setModel] = useState("")
    const [showInfo, setShowInfo] = useState(false)
    const [title, setTitle] = useState("")
    const [size, setSize] = useState("Lg")
    const [alertInfo, setAlertInfo] = useState(true)

    const pageRef = useRef(null)

    const setLoading = useContext(LoadingContext)
    const fireToast = useContext(ToastContext)
    const dispatch = useDispatch()
    const router = useRouter()

    const {id} = router.query

    const translation = useContext(TranslationContext)
    const {
        control,
        setValue,
        watch,
        setError,
        getValues,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onChange",
        defaultValues,
    })

    const getData = async () => {
        setLoading(true)
        try {
            return await client.query({
                query: queries.getData,
                variables: {
                    id,
                },
            })
        } catch (e) {
            await HandleApiError(e, fireToast, router, translation)
        }
        return {}
    }

    useEffect(() => {
        dispatch(open("products-variant"))
        let isMounted = true

        getData().then((res) => {
            if (!isMounted) return
            setData({...res.data, product: null})
            console.log('res.data.product', _.merge(deepCopyObject(defaultValues), res.data.product));
            reset(_.merge(deepCopyObject(defaultValues), res.data.product))
            // reset(_.merge(res.data.product, defaultValues))
            setLoading(false)
        })

        const handler = () => {
            return "asdasdsad"
        }

        window.onbeforeunload = handler
        router.events.on("routeChangeStart", handler)

        return () => {
            window.onbeforeunload = null
            router.events.off("routeChangeStart", handler)
            isMounted = false
        }
    }, [])

    const autoSeo = () => {
        const values = getValues()
        router.locales.forEach((item) => {
            if ((!values.seo.title || !values.seo.title[item]) && values.title) {
                if (!values.seo.title) values.seo.title = {}
                values.seo.title[item] = values.title[item]
            }
            if (!values.seo.keywords || !values.seo.keywords[item]) {
                if (!values.seo.keywords) values.seo.keywords = {}
                values.seo.keywords[item] = `${
                    values.brand_id
                        ? data.brands.find((item) => item.id === values.brand_id)?.name +
                        ", "
                        : ""
                }${data.categories
                    .filter((item) => (values.category_id || []).includes(item.id))
                    .map((category) => category.title[item])
                    .join(", ")}`
            }
            if (!values.summary) return
            if (!(values.seo.description || {})[item]) {
                values.seo.description = {...(values.seo.description || {})}
                values.seo.description[item] = values.summary[item]
            }
        })
        setValue("seo", values.seo)
    }

    useEffect(() => {
        setToggle(false)
        pageRef.current.scrollIntoView({top: 0, behavior: "smooth"})
        const timeout = setTimeout(() => {
            setTab({type: section})
            setToggle(true)
        }, 400)
        if (!Object.keys(data).length) {
            return () => {
                clearTimeout(timeout)
            }
        }

        if (Object.keys(data).length) autoSeo()

        return () => {
            clearTimeout(timeout)
        }
    }, [section])

    useEffect(() => {
        if (data?.tags)
            setData((prevState) => {
                prevState.result = prevState.tags
                delete prevState.tags
                return {...prevState}
            })
        if (data?.tag_groups)
            setData((prevState) => {
                prevState.result = prevState.tag_groups
                delete prevState.tag_groups
                return {...prevState}
            })
    }, [data])

    const createProduct = async (data) => {
        setLoading(true)

        // change date formats for offer_startAt and offer_expireAt
        if (data.price.offer_startAt && data.price.offer_startAt.unix)
            data.price.offer_startAt = `${data.price.offer_startAt.unix()}000`
        if (data.price.offer_expireAt && data.price.offer_expireAt.unix)
            data.price.offer_expireAt = `${data.price.offer_expireAt.unix()}000`

        console.log(data.mix_variant, data.mix_variant.length, "mix_variant");
        for (let index = 0; index < data.mix_variant.length; ++index) {
            delete data.mix_variant[index].title // todo: for debug
            console.log(data?.mix_variant[index]?.price?.offer_startAt, "offer_startAt");
            if (data.mix_variant[index].price.offer_startAt && data.mix_variant[index].price.offer_startAt.unix)
                data.mix_variant[index].price.offer_startAt = `${data.mix_variant[index].price.offer_startAt.unix()}000`;
            if (data.mix_variant[index].price.offer_expireAt && data.mix_variant[index].price.offer_expireAt.unix)
                data.mix_variant[index].price.offer_expireAt = `${data.mix_variant[index].price.offer_expireAt.unix()}000`;

            if (data.mix_variant[index]?.media_gallery && data.mix_variant[index]?.media_gallery?.length > 0) {
                data.mix_variant[index].has_media_gallery = true
            } else {
                data.mix_variant[index].has_media_gallery = false
            }
        }

        if (data.price) data.price = price2Int(data.price)
        if (data.details) data.details = details2Int(data.details)

        data.mix_variant?.forEach((item) => {
            if (item.price) item.price = price2Int(item.price)
            if (item.details) item.details = details2Int(item.details)
        })

        delete data.null

        try {
            const res = await client.mutate({
                mutation: queries.update,
                variables: {
                    input: {
                        ...data,
                        type: 1,
                        publishAt: typeof data.publishAt == 'string' ? data.publishAt : `${data.publishAt.unix() * 1000}`,
                        // publishAt: `${data.publishAt.unix() * 1000}`,
                    },
                    id,
                },
            })
            setLoading(false)
            await router.push("/products")
        } catch (e) {
            if (e.graphQLErrors) setErrors(e.graphQLErrors[0], setError)
        }

        setLoading(false)
    }

    let Section = TabComponents.filter((item) =>
        HasPerm({id: item.permission, router, route: "/products"})
    )[section - 1]

    if (!Section) Section = {Tab: () => <h4>دسترسی ندارید</h4>}

    return (
        <div ref={pageRef}>
            <div className={Styles.tab}/>
            <GridContainer gap="Lg" className={Styles.container}>
                <Grid size={3} className={Styles.sidebar}>
                    <Sidebar
                        route="/products"
                        menuItems={TabComponents}
                        setSection={setSection}
                        section={section}
                        control={control}
                        callback={handleSubmit(createProduct)}
                        errors={errors}
                    />
                </Grid>

                <Grid size={9} className={Styles.content}>
                    <CSSTransition
                        onExit={(element) => element.classList.add(Styles.exiting)}
                        timeout={200}
                        unmountOnExit
                        in={alertInfo}
                        appear={alertInfo}
                    >
                        <div className={Styles.alert}>
                            <i
                                onClick={setAlertInfo.bind(null, false)}
                                className="far fa-times"
                            />
                            {translation("product info", "products")}
                        </div>
                    </CSSTransition>
                    <InfoContext.Provider value={showInfo}>
                        <Transition in={toggle} appear={true} timeout={duration}>
                            {(state) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                    }}
                                >
                                    <Section.Tab
                                        setInfo={setShowInfo}
                                        info={showInfo}
                                        setSize={setSize}
                                        control={control}
                                        getValues={getValues}
                                        watch={watch}
                                        setModel={setModel}
                                        data={data}
                                        scroll={pageRef}
                                        setData={setData}
                                        reset={reset}
                                        setValue={setValue}
                                        setTitle={setTitle}
                                        errors={errors}
                                        setError={setError}
                                    />
                                </div>
                            )}
                        </Transition>
                    </InfoContext.Provider>
                </Grid>
            </GridContainer>
            <CreateModel
                model={model}
                setValue={setValue}
                size={size}
                setData={setData}
                data={data}
                getValues={getValues}
                title={title}
            />
        </div>
    )
}
