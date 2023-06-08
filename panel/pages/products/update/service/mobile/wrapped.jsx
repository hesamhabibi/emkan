import queries from "../../digital/queries"
import { Grid, GridContainer } from "@admin/Grid"
import { useForm } from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react"
import {
  InfoContext,
  ToastContext,
  TranslationContext,
  LoadingContext,
} from "~/app/Context"
import CreateModel from "../../../mobile/components/create"
import { CSSTransition } from "react-transition-group"
import { useRouter } from "next/router"
import Styles from "../../../mobile/products.module.scss"
import { useDispatch } from "react-redux"
import { open } from "~/app/State/collapse"
import moment from "jalali-moment"
import client from "~/app/apollo-client"
import { HandleApiError } from "~/app/Helpers/MutationHandler"
import General from "../../../mobile/components/tabs/general"
import dynamic from "next/dynamic"
import { setErrors } from "~/app/Hooks/Api"
import Button from "@admin/Button"
import _ from "lodash"

const Attributes = dynamic(() =>
  import("../../../mobile/components/tabs/attributes")
)
const Variants = dynamic(() =>
  import("../../../mobile/components/tabs/variants")
)
const Extra = dynamic(() => import("../../../service/mobile"))
const RelatedProducts = dynamic(() =>
  import("../../../mobile/components/tabs/related-products")
)
const Gallery = dynamic(() => import("../../../mobile/components/tabs/gallery"))
const Seo = dynamic(() => import("../../../mobile/components/tabs/seo"))

const toInt = (field) => (field ? parseInt(field, 10) : null)

const price2Int = (fieldset) => {
  fieldset.price = toInt(fieldset.price)
  fieldset.offer_price = toInt(fieldset.offer_price)

  return fieldset
}

const containsError = (field, section) => {
  return section.findIndex((item) => Object.keys(field).includes(item)) !== -1
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

const extraFields = ["has_comment", "is_special", "has_rating" ,"only_description" ,"show_price"]

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

const details2Int = (fieldset) => {
  // fieldset.weight = toInt(fieldset)
  fields.forEach((item) => {
    fieldset[item] = toInt(fieldset[item])
  })

  return fieldset
}

const tabs = [
  General,
  Seo,
  Gallery,
  Attributes,
  Variants,
  Extra,
  RelatedProducts,
]

const defaultValues = {
  collections: {
    related_products: {
      collection_type: 1,
      collection_list: [],
    },
  },
  status: 2,
  type: 1,
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

  const setLoading = useContext(LoadingContext)
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
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  })

  const { id } = router.query

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
    } catch (e) {}
    setSection(section)
  }

  useEffect(() => {
    dispatch(open("products-variant"))
    let isMounted = true
    mainRef.current = document.querySelector("main")

    mainRef.current.addEventListener("scroll", onScroll)

    getData().then((res) => {
      if (!isMounted) return
      setData({ ...res.data, product: null })
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

  const autoSeo = () => {
    const values = getValues()
    router.locales.forEach((item) => {
      if (!values.seo)
        values.seo = {
          title: {},
          keywords: {},
        }

      if (!values.seo.title[item]) {
        values.seo.title[item] = values.title[item]
      }
      if (!values.seo.keywords[item]) {
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
      if (!(values.seo.description || {})[item]) {
        values.seo.description = { ...(values.seo.description || {}) }
        values.seo.description[item] = values.summary[item]
      }
    })
    setValue("seo", values.seo)
  }

  useEffect(() => {
    // setTab({type: section})

    if (!Object.keys(data).length) {
      return () => {}
    }

    if (Object.keys(data).length) autoSeo()
  }, [section])

  useEffect(() => {
    if (data?.tags)
      setData((prevState) => {
        prevState.result = prevState.tags
        delete prevState.tags
        return { ...prevState }
      })
    if (data?.tag_groups)
      setData((prevState) => {
        prevState.result = prevState.tag_groups
        delete prevState.tag_groups
        return { ...prevState }
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
      <div className={Styles.tab} />
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
            {tabs.map((Tab, key) => (
              <section
                key={key}
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
            <i className="fas fa-angle-left" />
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
              <i className="fas fa-angle-right" />
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
              <i className="fas fa-angle-right" />
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
              <i className="fas fa-angle-left" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
