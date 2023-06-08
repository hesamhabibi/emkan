import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { array_pluck } from "~/app/Tree"
import { useRouter } from "next/router"
import { useApolloClient } from "~/app/Hooks/Api"
import { useDispatch } from "react-redux"
import { useMutation } from "~/app/Hooks"
import AddBtn from "@admin/CrudLayout/Add"
import queries from "./queries"
import Fields from "./fields"
import TreeComponent from "@admin/Tree"
import Popup from "@admin/Popup"
import Back from "@admin/CrudLayout/Back"
import ModalForms from "@admin/Forms"
import Perm from "@admin/Shield"
import { TranslationContext } from "~/app/Context"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openModal } from "~/app/State/modal"
import { closePopup, openPopup } from "~/app/State/popups"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"

export default function TreeId() {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const { id } = useRouter().query

  const { handleSubmit, setError, clearErrors, reset, control } = useForm({
    defaultValues: Fields.defaultValues,
  })

  const [data, setData] = useState([])
  const [callback, setCallback] = useState(null)
  const [loading, setLoading] = useState(true)
  const [delId, setDelId] = useState(null)
  const [state, setState] = useState(null)

  const { mutate } = useMutation({
    setError,
    setLoading,
    clearErrors,
    setData,
    id: "editForms",
  })

  const createInstance = async (data) => {
    await mutate({
      variables: {
        input: {
          ...filterFields({ data, fields: Fields.allowed }),
          kind_status: 1,
          type: 4,
          sort: 999999,
          parent_id: data.parent_id || id,
        },
      },
      mutation: queries.create,
      action: "create",
    })
  }

  const updateInstance = async (data) => {
    await mutate({
      variables: {
        input: {
          ...filterFields({ data, fields: Fields.allowed }),
          kind_status: 1,
          parent_id: data.parent_id || id,
        },
        id: data.id,
      },
      mutation: queries.update,
      action: "edit",
    })
  }

  const createModal = (item) => {
    if (item) {
      reset({ ...Fields.defaultValues, parent_id: item.id })
    } else {
      reset({ ...Fields.defaultValues, parent_id: id })
    }
    setState(translation("create", "menuItems"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const getNextPage = async (page) => {
    setLoading(true)
    const res = await getPage({
      page,
      fields: {
        type: 4,
      },
      query: queries.all,
      exactFields: ["type"],
      params: { parent_id: id },
    })
    setData(res.result)
    setLoading(false)
  }

  const editModal = (item) => {
    reset(item)
    setState(translation("edit", "menuItems"))
    setCallback(() => updateInstance)
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    setDelId(item.id)
    dispatch(openPopup("delete-action"))
  }

  useEffect(() => {
    getNextPage(1).then(() => setLoading(false))
  }, [])

  const submitSort = async (flatted) => {
    const flat_list = array_pluck(flatted, ["id", "parent_id", "sort"])
    await mutate({
      variables: {
        input: flat_list,
      },
      mutation: queries.sort,
      action: "",
    })
  }

  const deleteRow = async () => {
    await mutate({
      variables: {
        id: delId,
      },
      mutation: queries.delete,
      action: "delete",
    })
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
      onClick: () => deleteRow(),
    },
  ]

  return (
    <AdminLayout
      action={
        <Button type="success" onClick={createModal}>
          <i className="fas fa-plus-circle ml-1" />
          {translation("Add Component Tree")}
        </Button>
      }
      title={translation("Component Tree")}
    >
      <Back title={translation("back")} url="/components/menu-items" />
      <TreeComponent
        data={data}
        actions={Fields.tableActions(
          {
            create: createModal,
            change: editModal,
            delete: deleteOption,
          },
          translation
        )}
        root_parent={id}
        title="name"
        sort={submitSort}
        translation={translation}
      />
      <Perm
        id="components_menu_items_create_action"
        route="/components/menu-items"
        action
      >
        <AddBtn title={translation("Add Menu Item")} callback={createModal} />
      </Perm>

      <div className="text-center">
        <ModalForms
          size="sm"
          form={Fields.fields}
          state={state}
          control={control}
          section="menuItems"
          id="editForms"
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
    </AdminLayout>
  )
}
