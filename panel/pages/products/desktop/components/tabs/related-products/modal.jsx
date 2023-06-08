import { useContext, useEffect, useReducer, useState } from "react"
import Modal from "@admin/Modal"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import Styles from "./components/manual.module.scss"
import client from "~/app/apollo-client"
import { gql } from "@apollo/client"
import { useDispatch } from "react-redux"
import { closeModal } from "~/app/State/modal"

const queryData = gql`
  {
    collections: getAllCollections {
      id
      source
      extra_fields {
        name: title_panel
      }
    }
  }
`

const RelatedProductModal = ({ title, watch, control, getValues }) => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const dispatch = useDispatch()

  const [selectTitle, setTitle] = useState("")
  const [selectData, setSelectData] = useState([])
  const [collections, setCollections] = useState([])

  const submit = () => {
    dispatch(closeModal("related-products"))
  }

  const modalActions = [
    {
      name: translation("Cancel"),
      onClick: (close) => close(),
    },
    {
      name: translation("Submit"),
      onClick: submit,
    },
  ]

  /**
   * Get required data from server.
   */
  async function getData() {
    try {
      const res = await client.query({
        query: queryData,
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
    return []
  }

  useEffect(() => {
    getData().then((res) => {
      fireLoading(false)
      setCollections(res.collections)
    })
  }, [])

  useEffect(() => {
    const collection_type = getValues(
      "collections.related_products.collection_type"
    )

    setTitle(collection_type === 1 ? "manual collection" : "auto collection")
    setSelectData(
      collections.filter((item) => item.source === (collection_type || 1))
    )
  }, [watch("collections.related_products.collection_type"), collections])

  return (
    <Modal
      title={title}
      id="related-products"
      actions={modalActions}
      full_screen
    >
      <GridContainer gap="Lg" className={`m-3 text-right ${Styles.container}`}>
        <Grid size={12}>
          <h6>{translation("collection public information", "products")}</h6>
          <hr className="mt-3" />
        </Grid>
        <Grid size={6} className="w-100">
          <Input
            label={translation("collection type", "products")}
            control={control}
            name="collections.related_products.collection_type"
            type="toggle"
            data={[
              {
                name: translation("manual", "products"),
                color: "#3ECF8E",
                id: 1,
              },
              {
                name: translation("dynamic", "products"),
                color: "#EC6060",
                id: 2,
              },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <Input
            label={translation(selectTitle, "products")}
            type="select-searchable"
            data={
              selectData.map((item) => ({
                id: item.id,
                name: item.extra_fields.name || translation("without name"),
              })) || []
            }
            control={control}
            name="collections.related_products.collection_id"
          />
        </Grid>
      </GridContainer>
    </Modal>
  )
}

export default RelatedProductModal
