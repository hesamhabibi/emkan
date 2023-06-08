import Table from "@admin/Table"
import Fields from "~/pages/products/fields"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { closePopup, openPopup } from "~/app/State/popups"
import dynamic from "next/dynamic"
import { useMutation } from "~/app/Hooks"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import { useDispatch } from "react-redux"
import queries from "~/pages/products/queries"
import { openModal } from "~/app/State/modal"
import Chart from "./chart"
import { useRouter } from "next/router"
import Comment from "~/components/Comment"

const FilterComponent = dynamic(() => import("./components"), { ssr: false })

const types = ["", "physical", "digital", "service", "preview"]

export default function Tab({ type }) {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const { handleSubmit, setError, reset, clearErrors, getValues } = useForm()

  const { getPage } = useApolloClient()
  const [filter, setFilter] = useState({})
  const dispatch = useDispatch()

  const [comments, setComments] = useState([])
  const [data, setData] = useState({})
  const [modelId, setModelId] = useState(null)

  const router = useRouter()

  const filterPage = async (data = null) => {
    fireLoading(true)
    if (!data) data = {}
    setFilter(data)
    return await getPage({
      fields: { ...data, type },
      query: queries.all,
      exactFields: ["type"],
    })
  }

  const getNextPage = async (page = 1) => {
    fireLoading(true)
    const res = await getPage({
      page,
      fields: { ...filter, type },
      query: queries.all,
      exactFields: ["type"],
    })
    setData(res.result)
    fireLoading(false)
  }

  function commentModal(item) {
    setComments(item.comments)
    setModelId(item.id)
    dispatch(openModal("comments"))
  }

  const changePage = async (page) => {
    fireLoading(true)
    const res = await getPage({
      page,
      fields: { ...filter, type },
      query: queries.all,
      exactFields: ["type"],
    })
    fireLoading(false)
    setData(res.result)
    return res
  }

  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: { id: data.id },
      action: "delete",
    })
  }

  const { mutate } = useMutation({
    id: "editForms",
    clearErrors,
    setError,
    setLoading: fireLoading,
    setData,
  })

  const editModal = (item) => {
    router.push(`/products/update/${types[item.type]}?id=${item.id}`)
  }

  const deleteOption = (item) => {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
  }

  const priceAction = (item) => {
    reset(item)
    dispatch(openModal("price-action"))
  }

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("delete-action")),
    },
    {
      background: "#e40031",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(deleteRow),
    },
  ]

  return (
    <>
      <FilterComponent
        setData={setData}
        filterPage={filterPage}
        fireLoading={fireLoading}
      />
      <Comment
        refresh={changePage.bind(this, 1)}
        setComments={setComments}
        model_id={modelId}
        type="blog"
        comments={comments}
      />
      <Table
        data={data.data}
        section="products"
        translation={translation}
        actions={Fields.tableActions({
          edit: editModal,
          delete: deleteOption,
          priceAction,
          comments: commentModal,
        })}
        fields={Fields.tableFields(translation)}
      />
      <Chart getPage={getNextPage} data={getValues()} />
      <Pagination
        page={data?.paginate?.page}
        getPage={changePage}
        pages={data?.paginate?.pages}
      />
      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </>
  )
}
