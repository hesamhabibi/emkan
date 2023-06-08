import { useState, useEffect, useContext } from "react"
import { TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import queries from "./queries"
import Fields from "./fields"
import { useApolloClient } from "~/app/Hooks/Api"
import { useDispatch } from "react-redux"
import { useMutation } from "~/app/Hooks"
import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import AddBtn from "@admin/CrudLayout/Add"
import Perm from "@admin/Shield"
import ModalForms from "@admin/Forms"
import Back from "@admin/CrudLayout/Back"
import { openModal } from "~/app/State/modal"
import { closePopup, openPopup } from "~/app/State/popups"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"

export default function Columns() {
  const translation = useContext(TranslationContext)

  const dispatch = useDispatch()

  const { id } = useRouter().query

  const { getPage } = useApolloClient()

  const [data, setData] = useState([])
  const [callback, setCallback] = useState(null)
  const [formInputs, setFormInputs] = useState([])
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [delId, setDelId] = useState(null)
  const [filter, setFilter] = useState({})

  const { handleSubmit, setError, clearErrors, reset, control } = useForm({
    defaultValues: Fields.defaultValues,
  })

  const { mutate } = useMutation({
    setLoading,
    setData,
    setError,
    clearErrors,
    id: "editForms",
  })

  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      setLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const createInstance = async (data, close) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: {
        input: {
          name: data.name,
          key: data.key,
          field: data.field,
          description: data.description,
          type: 2,
          parent_id: id,
          kind_status: 1,
        },
      },
    })
  }

  const updateInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: {
          name: data.name,
          field: data.field,
          key: data.key,
          description: data.description,
          type: 2,
          parent_id: id,
          kind_status: 1,
        },
        id: data.id,
      },
    })
  }

  const backendInstance = async (data, close) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: {
          action: data.action,
          action_type: data.action_type,
          kind_status: 1,
        },
        id: data.id,
      },
    })
  }

  const deleteInstance = async () => {
    await mutate({
      mutation: queries.delete,
      action: "delete",
      variables: {
        id: delId,
      },
    })
  }

  const filterPage = async (data) => {
    setLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: { ...filter, type: 2, parent_id: id, kind_status: 1 },
      query: queries.all,
      exactFields: ["type", "parent_id", "kind_status"],
    })
  }

  const createModal = () => {
    clearErrors()
    reset(Fields.defaultValues)
    setFormInputs(Fields.fields)
    setState(translation("create-column", "menuItems"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const updateModal = (item) => {
    clearErrors()
    reset(item)
    setFormInputs(Fields.fields)
    setState(translation("edit-column", "menuItems"))
    setCallback(() => updateInstance)
    dispatch(openModal("editForms"))
  }

  const deletePopup = (item) => {
    setDelId(item.id)
    dispatch(openPopup("delete-action"))
  }

  const backendModal = (item) => {
    clearErrors()
    reset(item)
    setFormInputs(Fields.backFields)
    setState(translation("Action Fields", "menuItems"))
    setCallback(() => backendInstance)
    dispatch(openModal("editForms"))
  }

  const getNextPage = async (page) => {
    setLoading(true)
    const res = await getPage({
      page,
      fields: { ...filter, type: 2, parent_id: id, kind_status: 1 },
      query: queries.all,
      exactFields: ["type", "parent_id", "kind_status"],
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
      onClick: deleteInstance,
    },
  ]

  return (
    <AdminLayout
      action={
        <Button type="success" onClick={createModal}>
          <i className="fas fa-plus-circle ml-1" />
          {translation("Add Column")}
        </Button>
      }
      title={translation("Columns")}
    >
      <Back title={translation("back")} url={"/components/menu-items"} />
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
      <Table
        data={data.data}
        section="menuItems"
        translation={translation}
        actions={Fields.tableActions({
          backend: backendModal,
          change: updateModal,
          delete: deletePopup,
        })}
        fields={Fields.tableFields(translation)}
      />
      <Pagination
        page={data.paginate?.page}
        getPage={getNextPage}
        pages={data.paginate?.pages}
      />
      <div className="text-center">
        <ModalForms
          size="sm"
          form={formInputs}
          state={state}
          section="menuItems"
          id="editForms"
          control={control}
          callback={handleSubmit(callback)}
        />
      </div>

      <Perm
        id="components_menu_items_create_action"
        action
        route="/components/menu-items"
      >
        <AddBtn callback={createModal} title={translation("Add Column")} />
      </Perm>
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
