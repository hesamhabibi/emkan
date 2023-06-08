import queries from "../../digital/queries"
import { Grid, GridContainer } from "@admin/Grid"
import { useForm } from "react-hook-form"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import {
  InfoContext,
  LoadingContext,
  ToastContext,
  TranslationContext,
} from "~/app/Context"
import CreateModel from "../../../desktop/components/create"
import { CSSTransition, Transition } from "react-transition-group"
import Sidebar from "./components/sidebar"
import { useRouter } from "next/router"
import Styles from "../../../desktop/products.module.scss"
import { useDispatch } from "react-redux"
import { open } from "~/app/State/collapse"
import moment from "jalali-moment"
import client from "~/app/apollo-client"
import { HandleApiError } from "~/app/Helpers/MutationHandler"
import { deepCopyObject } from "~/app/Helpers/ObjectHelper"

import General from "../../../desktop/components/tabs/general"
import dynamic from "next/dynamic"
import { setErrors } from "~/app/Hooks/Api"
import _ from "lodash"

const Attributes = dynamic(() =>
  import("../../../desktop/components/tabs/attributes")
)
const Variants = dynamic(() =>
  import("../../../desktop/components/tabs/variants")
)
const Extra = dynamic(() => import("../../../service/desktop"))
const RelatedProducts = dynamic(() =>
  import("../../../desktop/components/tabs/related-products")
)
const Gallery = dynamic(() =>
  import("../../../desktop/components/tabs/gallery")
)
const Seo = dynamic(() => import("../../../desktop/components/tabs/seo"))

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
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

    case 4:
      return Attributes

    case 5:
      return Variants

    case 6:
      return Extra

    case 7:
      return RelatedProducts
  }
}

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
  services: {
    api_config: {
      type: 1,
    },
  },
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

  useEffect(() => {
    dispatch(open("products-variant"))
    let isMounted = true

    getData().then((res) => {
      if (!isMounted) return
      setData({ ...res.data, product: null })
      reset(_.merge(deepCopyObject(defaultValues), res.data.product))
      // reset(_.merge(res.data.product, defaultValues))
      setLoading(false)
    })

    const handler = () => {
      return "Changes you have made will not be saved"
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
    setToggle(false)
    pageRef.current.scrollIntoView({ top: 0, behavior: "smooth" })
    const timeout = setTimeout(() => {
      setTab({ type: section })
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

    // change date formats for offer_startAt and offer_expireAt
    if (data.price.offer_startAt && data.price.offer_startAt.unix)
      data.price.offer_startAt = `${data.price.offer_startAt.unix()}000`
    if (data.price.offer_expireAt && data.price.offer_expireAt.unix)
      data.price.offer_expireAt = `${data.price.offer_expireAt.unix()}000`

    for (let i in data.mix_variant) {
      delete data.mix_variant[i].title // todo: for debug
      if (data.mix_variant[i].price.offer_startAt && data.mix_variant[i].price.offer_startAt.unix)
        data.mix_variant[i].price.offer_startAt = `${data.mix_variant[i].price.offer_startAt.unix()}000`;
      if (data.mix_variant[i].price.offer_expireAt && data.mix_variant[i].price.offer_expireAt.unix)
        data.mix_variant[i].price.offer_expireAt = `${data.mix_variant[i].price.offer_expireAt.unix()}000`;
    }

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

  return (
    <div ref={pageRef}>
      <div className={Styles.tab} />
      <GridContainer gap="Lg" className={Styles.container}>
        <Grid size={3} className={Styles.sidebar}>
          <Sidebar
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
