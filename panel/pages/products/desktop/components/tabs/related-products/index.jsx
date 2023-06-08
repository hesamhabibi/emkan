import { useContext, useEffect, useState } from "react"
import Section from "../../section"
import { Grid } from "@admin/Grid"
import { TranslationContext } from "~/app/Context"
import Styles from "./related-products.module.scss"
import { useDispatch } from "react-redux"
import Button from "@admin/Button"
import { openModal } from "~/app/State/modal"
import RelatedProductModal from "./modal"
import Alert from "@admin/Alert"
import client from "~/app/apollo-client"
import { gql } from "@apollo/client"
import Table from "@admin/Table"

const getPreviewQuery = gql`
  query ($id: ID!, $filter: ProductFilter) {
    result: getCollectionProducts(id: $id, filter: $filter) {
      id
      title # multi language
      title_panel
      title_web
      summary # multi language
      summary_panel
      summary_web
      description # multi language
      description_panel
      description_web
      strengths
      strengths_panel
      strengths_web
      weaknesses
      weaknesses_panel
      weaknesses_web
      main_features
      main_features_panel
      main_features_web
      status # ["inactive": 1, "show": 2, "draft": 3]
      publishAt
      has_rating
      is_special
      type # ["product": 1, "digital": 2, "service": 3, "preview": 4]
      category_id
      brand_id
      seo_id
      tag_ids
      tag_group_id
      user_id
      visit_count
      createdAt
      updatedAt

      details {
        product_code # String
        warehouse # String
        use_count # Boolean
        count # Int
        count_status # Int
        count_unit # Int
        limit_min # Int
        limit_max # Int
        length # Int cm
        width # Int cm
        height # Int cm
        weight # Int grams
      }
      price {
        id
        price
        offer_price
        offer_startAt
        offer_expireAt
        discount_percent
        createdAt
        updatedAt
      }
      seo {
        title # multi language
        title_panel
        title_web
        description # multi language
        description_panel
        description_web
        keywords # multi language
        keywords_panel
        keywords_web
        url
        url_status
        canonical_url
        redirect_url_301
        redirect_url_404
        robots_status
        createdAt
        updatedAt
      }
      media {
        media_id
        alt # multi language
        url

        # media
      }
      media_gallery {
        media_id
        main
        alt # multi language
        url

        # media
      }
      video {
        media_id
        alt # multi language
        url

        # media
      }
      files {
        media_id
        alt # multi language
        url

        # media
      }
      attribute_groups {
        attribute_group_id
        attributes {
          attribute_id
          attribute_value_id

          # attribute
          # attribute_value
          # value # multi language
          # value_panel
          # value_web
        }

        # attribute_group
      }

      has_variant # boolean
      variant {
        name # multi language
        name_panel
        name_web
        type # {"text": 1, "color": 2, "shop": 3, "file":4 }
        labels {
          key
          title # multi language
          title_panel
          title_web
          values # JSON
        }
      }
      mix_variant {
        # array with exact length 1
        keys # array of String
        is_main_price # boolean
        is_active # boolean
        sort
        price_id
        details {
          product_code # String
          warehouse # String
          use_count # Boolean
          count # Int
          count_status # Int
          count_unit # Int
          limit_min # Int
          limit_max # Int
          length # Int cm
          width # Int cm
          height # Int cm
          weight # Int grams
        }

        # price
        # price_history
      }

      collections {
        related_products {
          collection_type # {"static": 1, "dynamic": 2}
          collection_id

          # collection
          # collection_title
          # collection_title_panel
          # collection_title_web
          # collection_list
        }
      }

      tutorials {
        file_key
        title
        title_panel
        title_web
        user_access_ids

        # user_accesses
      }

      # price_history
      # categories
      # brand
      # tags
      # tag_group
      # comments
      # user
    }
  }
`

export default function RelatedProducts({
  control,
  data,
  watch,
  getValues,
  setValue,
  setModel,
  info,
  setInfo,
}) {
  const translation = useContext(TranslationContext)

  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [title, setTitle] = useState("")
  const [callback, setCallback] = useState(() => {})

  const getData = async () => {}

  function createInstance() {
    return undefined
  }

  const createModal = () => {
    setTitle(translation("Manage Related Product", "products"))
    setCallback(() => createInstance)
    dispatch(openModal("related-products"))
  }

  async function getPreview(id) {
    try {
      const res = await client.query({
        query: getPreviewQuery,
        variables: { id },
      })
      setProducts(res.data.result)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const collection = getValues("collections.related_products.collection_id")

    if (collection) getPreview(collection)

    getData().then((res) => {})
  }, [watch("collections.related_products.collection_id")])

  return (
    <>
      <Section>
        <Grid size={12}>
          <h5
            className={`d-flex justify-content-between align-items-center ${Styles.header}`}
          >
            {translation("related products", "products")}
            <div
              onClick={setInfo.bind(null, !info)}
              className={`mr-auto ml-2 ${!info ? Styles.active : ""}`}
            >
              <i className="fad fa-question-circle fa-lg" />
            </div>
            <span>
              <Button onClick={createModal} type="primary">
                <i className="fas fa-plus-circle ml-2" />
                {translation("Add Related Product", "products")}
              </Button>
            </span>
          </h5>
        </Grid>
        {info && (
          <Grid size={12}>
            <Alert className="text-justify" type="info">
              {translation("related_products_info", "products")}
            </Alert>
          </Grid>
        )}
        <Grid size={12}>
          <Table
            data={products}
            actions={[]}
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
                td: (row) => row.mix_variant[0].details.product_code,
              },
              {
                title: "title_panel",
                td: (row) =>
                  `${row.title_panel} - (${row.variant[0].name_panel})`,
              },
            ]}
          />
        </Grid>
      </Section>
      <RelatedProductModal
        watch={watch}
        control={control}
        callback={callback}
        setValue={setValue}
        data={data}
        title={title}
        getValues={getValues}
        setData={setProducts}
      />
    </>
  )
}
