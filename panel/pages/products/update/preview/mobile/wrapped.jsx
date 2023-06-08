import queries from "../../digital/queries"
import {Grid, GridContainer} from "@admin/Grid"
import {useForm} from "react-hook-form"
import {useContext, useEffect, useReducer, useRef, useState} from "react"
import {
    DeviceView,
    InfoContext,
    LoadingContext,
    ToastContext,
    TranslationContext,
} from "~/app/Context"
import CreateModel from "../../../mobile/components/create"
import {CSSTransition} from "react-transition-group"
import {useRouter} from "next/router"
import Styles from "./products.module.scss"
import {useDispatch} from "react-redux"
import {open} from "~/app/State/collapse"
import moment from "jalali-moment"
import client from "~/app/apollo-client"
import {HandleApiError} from "~/app/Helpers/MutationHandler"
import General from "../../../mobile/components/tabs/general"
import dynamic from "next/dynamic"
import {setErrors} from "~/app/Hooks/Api"
import Button from "@admin/Button"
import _ from "lodash"
import Tutorials from "~/pages/products/mobile/components/tabs/tutorials"
import Shield from "@admin/Shield"

const Attributes = dynamic(
    () => import("../../../mobile/components/tabs/attributes"),
    {ssr: true}
)
const Variants = dynamic(
    () => import("../../../mobile/components/tabs/variants"),
    {ssr: true}
)
const Extra = dynamic(() => import("../../../mobile/components/tabs/extra"), {
    ssr: true,
})
const RelatedProducts = dynamic(
    () => import("../../../mobile/components/tabs/related-products"),
    {ssr: true}
)
const Gallery = dynamic(
    () => import("../../../mobile/components/tabs/gallery"),
    {ssr: true}
)
const Seo = dynamic(() => import("../../../mobile/components/tabs/seo"), {
    ssr: true,
})
const Tutorial = dynamic(() =>
    import("../../../mobile/components/tabs/tutorials")
)

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

const containsError = (field, section) => {
    return section.findIndex((item) => Object.keys(field).includes(item)) !== -1
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

const validations = [
    statusFields,
    ["seo"],
    galleryFields,
    ["attribute_groups"],
    variantFields,
    extraFields,
    ["collections"],
]

const tabs = [
    General,
    Seo,
    Gallery,
    Attributes,
    Variants,
    Extra,
    RelatedProducts,
    Tutorial,
]

const TabComponents = [
    {
        Tab: General,
        permission: "products_preview_main_tab",
        title: "product status",
    },
    {
        Tab: Seo,
        permission: "products_preview_seo_tab",
        title: "seo and optimization",
    },
    {
        Tab: Gallery,
        permission: "products_preview_images_tab",
        title: "product images",
    },
    {
        Tab: Attributes,
        permission: "products_preview_table_tab",
        title: "product table",
    },
    {
        Tab: Variants,
        permission: "products_preview_price_tab",
        title: "product attributes",
    },
    {
        Tab: Extra,
        permission: "products_preview_advanced_tab",
        title: "advanced",
    },
    {
        Tab: RelatedProducts,
        permission: "products_preview_related_tab",
        title: "related products",
    },
    {
        Tab: Tutorials,
        permission: "products_preview_tutorial_tab",
        title: "Tutorial",
    },
]

export default function Wrapped() {
    const [section, setSection] = useState(0)
    const [data, setData] = useState({
        attributes: [],
        result: [],
        categories: [],
        tags: [],
    })
    const [model, setModel] = useState("")
    const [showInfo, setShowInfo] = useState(false)
    const [title, setTitle] = useState("")
    const [size, setSize] = useState("Lg")
    const [alertInfo, setAlertInfo] = useState(true)

    const pageRef = useRef(null)

    const mainRef = useRef(null)

    const defaultValues = {
        collections: {
            related_products: {
                collection_type: 1,
                collection_list: [],
            },
        },
        status: 2,
        type: 4,
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

    const setLoading = () => {
    }
    // const setLoading = useContext(LoadingContext)
    const fireToast = useContext(ToastContext)
    const dispatch = useDispatch()
    const router = useRouter()

    const refs = useRef([])

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
    const {id} = router.query

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

    const onScroll = (event) => {
        let scroll = 0,
            section = 0
        try {
            refs.current.forEach((item) => {
                scroll += item.clientHeight
                if (scroll < event.target.scrollTop) section++
                else throw ""
            })
        } catch (e) {
        }
        setSection(section)
    }

    useEffect(() => {
        dispatch(open("products-variant"))
        let isMounted = true
        mainRef.current = document.querySelector("main")

        mainRef.current.addEventListener("scroll", onScroll)

        getData().then((res) => {
            if (!isMounted) return
            setData({...res.data, product: null})
            reset(_.merge(defaultValues, res.data.product))
            // reset(_.merge(res.data.product, defaultValues))
            setLoading(false)
        })

        const handler = () => {
            return "asdasdsad"
        }

        window.onbeforeunload = handler
        router.events.on("routeChangeStart", handler)

        return () => {
            mainRef.current.removeEventListener("scroll", onScroll)
            window.onbeforeunload = null
            router.events.off("routeChangeStart", handler)
            isMounted = false
        }
    }, [])

    useEffect(() => {
        // setTab({type: section})

        if (!Object.keys(data).length) {
            return () => {
            }
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
                        type: 4,
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

    function scrollTo(section) {
        let top = 90

        for (let i = 0; i < section; i++) {
            top += refs.current[i].clientHeight + 10
        }
        mainRef.current.scrollTo({
            top,
            behavior: "smooth",
        })
    }

    return (
        <div className="mb-5" ref={pageRef}>
            <div className={Styles.tab}/>
            <GridContainer className={Styles.container}>
                <Grid size={12} className={Styles.content}>
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
                        {TabComponents.map(({Tab, title, permission}, key) => (
                            <Shield id={permission} route="/products" key={key}>
                                <section
                                    id={`section-${key}`}
                                    ref={(ref) => (refs.current[key] = ref)}
                                >
                                    <Tab
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
                                </section>
                            </Shield>
                        ))}
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

            <div className={Styles.sticky}>
                {section === 0 ? (
                    <Button
                        type="white"
                        onClick={scrollTo.bind(this, section + 1)}
                        className={`d-flex w-50 justify-content-around align-items-center ${
                            containsError(errors, validations[section + 1])
                                ? Styles.error
                                : ""
                        }`}
                    >
                        {translation("next")}
                        <i className="fas fa-angle-left"/>
                    </Button>
                ) : section >= tabs.length - 2 ? (
                    <div className="d-flex w-100">
                        <Button
                            onClick={scrollTo.bind(this, section - 2)}
                            type="white"
                            className={`d-flex w-50 ml-1 justify-content-around align-items-center ${
                                containsError(errors, validations[section - 1])
                                    ? Styles.error
                                    : ""
                            }`}
                        >
                            <i className="fas fa-angle-right"/>
                            {translation("previous")}
                        </Button>
                        <Button
                            onClick={handleSubmit(createProduct)}
                            type="success"
                            className="w-50 mr-1"
                        >
                            {translation("Submit")}
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex w-100">
                        <Button
                            type="white"
                            className={`d-flex w-100 ml-1 justify-content-around align-items-center ${
                                containsError(errors, validations[section - 1])
                                    ? Styles.error
                                    : ""
                            }`}
                            onClick={scrollTo.bind(this, section - 2)}
                        >
                            <i className="fas fa-angle-right"/>
                            {translation("previous")}
                        </Button>
                        <Button
                            onClick={scrollTo.bind(this, section + 1)}
                            type="white"
                            className={`d-flex w-100 mr-1 justify-content-around align-items-center ${
                                containsError(errors, validations[section + 1])
                                    ? Styles.errorLeft
                                    : ""
                            }`}
                        >
                            {translation("next")}
                            <i className="fas fa-angle-left"/>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
