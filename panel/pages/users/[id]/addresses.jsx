import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { useApolloClient } from "~/app/Hooks/Api"
import { useRouter } from "next/router"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { closePopup, openPopup } from "~/app/State/popups"
import { openModal } from "~/app/State/modal"
import Table from "@admin/Table"
import Filter from "@admin/Filter"
import ModalForms from "@admin/Forms"
import Pagination from "@admin/Pagination"
import Fields from "./fields"
import queries from "./queries"
import Popup from "@admin/Popup"

export default function Addresses({ setAction }) {
  const {
    control,
    watch,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    getValues,
  } = useForm()

  const fireLoading = useContext(LoadingContext)
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const router = useRouter()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [callback, setCallback] = useState(() => {})
  const [state, setState] = useState("")

  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    id: "editForms",
    setError,
    clearErrors,
    setData: (fn) =>
      setData((prev) => ({
        ...prev,
        result: { data: fn(prev.result.data), paginate: prev.result.paginate },
      })),
    setLoading,
  })

  const onChange = watch("state_id")

  const getPages = async (page = 1) => {
    fireLoading(true)
    return await getPage({
      query: queries.all,
      page,
      fields: {
        model_name: "UserModel",
        model_id: router.query.id,
        ...filters,
      },
      exactFields: ["model_name", "model_id"],
    })
  }

  useEffect(() => {
    let isMounted = true
    setAction({ onClick: createModal, title: translation("Add Address") })
    getPages(1).then((res) => {
      if (!isMounted) return
      setData(res)
      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const filterPages = async (data) => {
    fireLoading(true)
    setFilters(data)
    const res = await getPage({
      page: 1,
      query: queries.all,
      fields: { model_name: "UserModel", model_id: router.query.id, ...data },
      exactFields: ["model_name", "model_id"],
    })
    setData(res)
    fireLoading(false)
  }

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: {
        input: {
          ...filterFields({ data, fields: Fields.allowed }),
          user_id: router.query.id,
        },
      },
    })
  }

  const createModal = () => {
    setState(translation("Add Address", "user"))
    reset({
      is_default: false,
    })
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const editInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),

        id: data.id,
      },
    })
  }

  const editModal = (item) => {
    setState(`${translation("Update Address", "user")}`)
    reset(item)
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const deleteInstance = async (data) => {
    await mutate({
      mutation: queries.delete,
      action: "delete",
      variables: { id: data.id },
    })
  }

  const deleteOption = (item) => {
    reset(item)
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
      onClick: handleSubmit(deleteInstance),
    },
  ]

  return (
    <>
      <Filter
        id="filters"
        section="user"
        inputs={Fields.filterFields(
          data.cities?.value || [],
          data.states?.value || [],
          onChange,
          getValues
        )}
        callback={filterPages}
      />
      <Table
        fields={Fields.tableFields}
        actions={Fields.tableActions(
          {
            edit: editModal,
            delete: deleteOption,
          },
          translation
        )}
        section="user"
        data={data.result?.data || []}
      />
      <Pagination
        page={data.result?.paginate.page}
        getPage={getPages}
        pages={data.result?.paginate.pages}
      />
      <ModalForms
        callback={handleSubmit(callback)}
        id="editForms"
        state={state}
        section="user"
        control={control}
        form={Fields.fields(
          data.states?.value || [],
          data.cities?.value || [],
          onChange,
          getValues,
          translation
        )}
        loading={loading}
      />
      <Popup
        id="delete-action"
        actions={deleteActions}
        status="danger"
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </>
  )
}
