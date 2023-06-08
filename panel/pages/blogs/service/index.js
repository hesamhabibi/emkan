import { useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import Fields from "./fields"
import queries from "./queries"
import { useApolloClient } from "~/app/Hooks/Api"
import { useForm } from "react-hook-form"
import Table from "@admin/Table"
import ModalForms from "@admin/Forms"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import { closePopup, openPopup } from "~/app/State/popups"
import Popup from "@admin/Popup"
import { useMutation } from "~/app/Hooks"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Pagination from "@admin/Pagination"
import dynamic from "next/dynamic"
import AddBtn from "@admin/CrudLayout/Add"
import Comment from "~/components/Comment"
import moment from "jalali-moment"
import Shield from "@admin/Shield"

const type = 5

const FilterComponent = dynamic(() => import("./components"), { ssr: false })

const Create = dynamic(() => import("../components/index"), { ssr: false })

export default function Blogs() {
  const translation = useContext(TranslationContext)

  const fireLoading = useContext(LoadingContext)
  const fireToast = useContext(ToastContext)

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(() => {})
  const [filter, setFilter] = useState({})
  const [title, setTitle] = useState("")
  const [extra, setExtra] = useState({})
  const [comments, setComments] = useState([])
  const [modelId, setModelId] = useState(null)
  const [modalData, setModalData] = useState({
    title: "",
    size: "md",
    model: "categories",
  })

  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const {
    handleSubmit,
    control,
    setError,
    reset,
    clearErrors,
    getValues,
    setValue,
  } = useForm()

  const { mutate } = useMutation({
    id: "editForms",
    clearErrors,
    setError,
    setLoading,
    setData,
  })

  const filterPage = async (data = null) => {
    fireLoading(true)
    if (!data) data = {}
    setFilter(data)
    const res = await getPage({
      fields: { ...data, type },
      query: queries.all,
      exactFields: ["type"],
    })
    setExtra({ ...res, result: undefined })

    return res
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
    setExtra({ ...res, result: undefined })
    return res
  }

  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      fireLoading(false)
      setExtra({ ...res, result: undefined })
    })

    return () => {
      isMounted = false
    }
  }, [])

  const createInstance = async (data) => {
    data.publishAt = `${data.publishAt.unix()}000`
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: {
        input: { ...filterFields({ data, fields: Fields.allowed }), type },
      },
    })
  }

  const editInstance = async (data) => {
    data.publishAt = `${data.publishAt.unix()}000`
    const input = filterFields({ data, fields: Fields.allowed });
    delete input.seo.title_panel;
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: input,
        id: data.id,
      },
    })
  }

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: { id: data.id },
      action: "delete",
    })
  }

  const createModal = () => {
    reset(Fields.defaultValues)
    setTitle(translation("Add Service"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    reset({ ...item, publishAt: moment(parseInt(item.publishAt || "0", 10)) })
    setTitle(translation("Edit Service"))
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
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

  function commentModal(item) {
    setComments(item.comments)
    setModelId(item.id)
    dispatch(openModal("comments"))
  }

  return (
    <AdminLayout
      action={
        <Shield id="blogs_service_create_action" action>
          <Button onClick={createModal} type="success">
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Service")}
          </Button>
        </Shield>
      }
      title={translation("Service")}
    >
      <FilterComponent
        setData={setData}
        filterPage={filterPage}
        fireLoading={fireLoading}
      />
      <Table
        data={data.data}
        section="blog"
        translation={translation}
        actions={Fields.tableActions({
          edit: editModal,
          delete: deleteOption,
          comments: commentModal,
        })}
        fields={Fields.tableFields(translation)}
      />
      <Pagination
        page={data?.paginate?.page}
        getPage={changePage}
        pages={data?.paginate?.pages}
      />
      <Shield id="blogs_service_create_action" action>
        <AddBtn title={translation("Add Service")} callback={createModal} />
      </Shield>
      <Comment
        refresh={changePage.bind(this, 1)}
        setComments={setComments}
        model_id={modelId}
        type="blog"
        comments={comments}
      />
      <ModalForms
        form={Fields.fields({
          categories: extra.categories || [],
          tags: extra.tags || [],
          getValues,
          setValue,
          fireToast,
          translation,
          setModalData,
          dispatch,
        })}
        id="editForms"
        state={title}
        section="blog"
        callback={handleSubmit(callback)}
        control={control}
        loading={loading}
      />
      <Create {...modalData} data={extra} setData={setExtra} />
      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </AdminLayout>
  )
}
