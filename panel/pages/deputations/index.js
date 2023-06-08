import { useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import { useMutation } from "~/app/Hooks"
import queries from "./queries"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Fields from "./fields"
import { openModal } from "~/app/State/modal"
import { closePopup, openPopup } from "~/app/State/popups"
import AdminLayout from "@admin/Layout"
import Table from "@admin/Table"
import Button from "@admin/Button"
import AddBtn from "@admin/CrudLayout/Add"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import ModalForms from "@admin/Forms"
import dynamic from "next/dynamic"
import Shield from "@admin/Shield"

const FilterComponents = dynamic(() => import("./components"), { ssr: false })

const defaultValues = {}

const Deputation = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  // ---- states
  const [data, setData] = useState({})
  const [callback, setCallback] = useState(() => undefined)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({})
  const [extra, setExtra] = useState({ cities: [], states: [] })

  // ---- Hooks
  const dispatch = useDispatch()

  const {
    control,
    getValues,
    reset,
    clearErrors,
    watch,
    setError,
    handleSubmit,
  } = useForm({
    defaultValues,
  })

  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    setData,
    id: "editForms",
    clearErrors,
    setError,
    setLoading,
  })

  // --- callbacks
  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      variables: {
        input: filterFields({ fields: Fields.allowedFields, data }),
      },
      action: "create",
    })
  }

  const createModal = () => {
    reset(defaultValues)
    setCallback(() => createInstance)
    setTitle(translation("create deputation"))
    dispatch(openModal("editForms"))
  }

  const editInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      variables: {
        input: filterFields({ fields: Fields.allowedFields, data }),
        id: data.id,
      },
      action: "edit",
    })
  }

  const editModal = async (item) => {
    reset(item)

    setCallback(() => editInstance)
    setTitle(translation("edit deputation"))
    dispatch(openModal("editForms"))
  }

  const changePage = async (page) => {
    fireLoading(true)
    const res = await getPage({
      page,
      fields: filter,
      query: queries.all,
      exactFields: ["state_id", "city_id"],
    })
    setExtra({ ...res, result: undefined })
    fireLoading(false)
    setData(res.result)
    return res
  }

  const filterPage = async (data) => {
    fireLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
      exactFields: ["state_id", "city_id"],
    })
  }

  const deleteInstance = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: data,
      action: "delete",
    })
  }

  const deleteOption = (item) => {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
    setCallback(() => deleteInstance)
  }

  // --- useEffects

  useEffect(() => {
    let isMounted = true
    changePage().then((res) => {
      if (!isMounted) return
      fireLoading(false)
      setData(res.result)
      setExtra({ ...res, result: undefined })
    })
    return () => {
      isMounted = false
      fireLoading(false)
    }
  }, [])

  // --- extra data

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
      onClick: handleSubmit(callback),
    },
  ]

  const onChange = watch("state_id")

  return (
    <AdminLayout
      title={translation("Deputations")}
      action={
        <Shield id="deputations_create_action" action>
          <Button type="success" onClick={createModal}>
            {translation("Add Deputation")}
            <i className="fas fa-plus-circle mr-2" />
          </Button>
        </Shield>
      }
    >
      <FilterComponents
        inputs={Fields.filterFields(
          extra.cities?.value || [],
          extra.states?.value || [],
          onChange,
          getValues
        )}
        callback={(data) =>
          filterPage(data).then((res) => {
            fireLoading(false)
            setData(res.result)
            setExtra({ ...res, result: undefined })
          })
        }
      />

      <Table
        button={
          <Shield id="deputations_create_action" action>
            <Button type="success" onClick={createModal}>
              {translation("Add Deputation")}
              <i className="fas fa-plus-circle mr-2" />
            </Button>
          </Shield>
        }
        actions={Fields.tableActions({ edit: editModal, delete: deleteOption })}
        fields={Fields.tableFields}
        data={data.data}
      />
      <ModalForms
        form={Fields.fields(
          extra.cities?.value || [],
          extra.states?.value || [],
          onChange,
          getValues
        )}
        loading={loading}
        state={title}
        id="editForms"
        control={control}
        callback={handleSubmit(callback)}
      />
      <Shield id="deputations_create_action" action>
        <AddBtn title={translation("Add Deputation")} callback={createModal} />
      </Shield>
      <Pagination
        getPage={changePage}
        pages={data.paginate?.pages}
        page={data.paginate?.page}
      />
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

export default Deputation
