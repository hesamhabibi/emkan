import { useRouter } from "next/router"
import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import { DeviceView, ToastContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import Fields from "./fields"
import queries from "./queries"
import Perm from "@admin/Shield"
import AddBtn from "@admin/CrudLayout/Add"
import Filter from "@admin/Filter"
import TableCard from "@admin/Card"
import ModalForms from "@admin/Forms"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import { useMutation } from "~/app/Hooks"
import { closePopup, openPopup } from "~/app/State/popups"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openModal } from "~/app/State/modal"
import Tag from "@admin/Tag";


export default function Tab({ type, setAction , tabName }) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const [data, setData] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState([])
  const [state, setState] = useState([])
  const [delId, setDelId] = useState(null)
  const [callback, setCallback] = useState(null)

  const router = useRouter()

  const { handleSubmit, setError, clearErrors, reset, control } = useForm({
    defaultValues: Fields.defaultValues,
  })

  const { mutate } = useMutation({
    setError,
    setData,
    setLoading,
    id: "editForms",
    clearErrors,
  })

  const createInstance = async (data) => {
    await mutate({
      variables: { input: { ...data, kind_status: type, type: 1 } },
      mutation: queries.create,
      action: "create",
    })
  }

  const editInstance = async (data) => {
    await mutate({
      variables: {
        input: {
          ...filterFields({ data, fields: queries.allowed }),
          kind_status: type,
          type: 1,
        },
        id: data.id,
      },
      mutation: queries.update,
      action: "edit",
    })
  }

  const addModal = () => {
    reset(Fields.defaultValues)
    setState(translation("add access"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    reset(item)
    setState(`${translation("edit access")} "${item.name}"`)
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    setDelId(item.id)
    dispatch(openPopup("delete-action"))
  }

  const deleteRow = async () => {
    await mutate({
      variables: { id: delId },
      mutation: queries.delete,
      action: "delete",
    })
  }

  const filterPage = async (data) => {
    setLoading(true)
    data = { ...data, kind_status: type, type: 1 }
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
      exactFields: ["type", "kind_status"],
    })
  }

  useEffect(() => {
    let isMounted = true
    setAction(() => addModal)
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const getNextPage = async (page) => {
    setLoading(true)
    const res = await getPage({
      page,
      limit: 15,
      fields: filter,
      query: queries.all,
      exactFields: ["type", "kind_status"],
    })
    setData(res.result)
    setLoading(false)
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
      onClick: deleteRow,
    },
  ]

  return (
    <div>
      <Filter
        inputs={Fields.filterFields}
        callback={(data) => {
          filterPage(data).then((res) => {
            setData(res.result)
            setLoading(false)
          })
        }}
        section="menuItems"
        id="filters"
      />
      <div className="mt-3 p-2">
        <TableCard
          data={data.data}
          translation={translation}
          // full
          actions={Fields.tableActions(
            {
              change: editModal,
              delete: deleteOption,
            },
            translation
          )}
          fields={Fields.tableFields(router, translation)}
          title="name"
          header="action"
        />
      </div>

      <Pagination
        page={data.paginate?.page}
        getPage={getNextPage}
        pages={data.paginate?.pages}
      />
      <div className="text-center">
        <ModalForms
          form={Fields.fields}
          size="sm"
          state={state}
          tag={<Tag type="info"> {tabName} </Tag>}
          control={control}
          id="editForms"
          section="menuItems"
          callback={handleSubmit(callback)}
          loading={loading}
        />
      </div>
      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>

      <Perm id="components_menu_items_create_action" action>
        <AddBtn
          title={translation("Add Menu Item")}
          setAction={setAction}
          callback={addModal}
        />
      </Perm>
    </div>
  )
}
