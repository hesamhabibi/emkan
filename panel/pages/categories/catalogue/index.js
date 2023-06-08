import { useContext, useEffect, useState } from "react"
import { DeviceView, ToastContext, TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import { useApolloClient } from "~/app/Hooks/Api"
import AdminLayout from "@admin/Layout"
import queries from "../queries"
import Fields from "./fields"
import Button from "@admin/Button"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import { closePopup, openPopup } from "~/app/State/popups"
import ModalForms from "@admin/Forms"
import Popup from "@admin/Popup"
import Sortable from "@admin/Table/sortable"
import { array_pluck } from "~/app/Tree"
import TableStyles from "~/styles/components/table.module.scss"
import AddBtn from "@admin/CrudLayout/Add"
import Shield from "@admin/Shield"

const type = 4

export default function Categories() {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const isDesktop = useContext(DeviceView)
  const fireToast = useContext(ToastContext)

  const [loading, setLoading] = useState(false)
  const [delId, setDelId] = useState(null)
  const [data, setData] = useState([])
  const [title, setTitle] = useState(null)
  const [callback, setCallback] = useState(null)
  const [changed, setChanged] = useState(false)

  const {
    control,
    clearErrors,
    setError,
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm()

  const { mutate } = useMutation({
    clearErrors,
    setError,
    setLoading,
    setData,
    id: "editForms",
  })

  const { getPage } = useApolloClient()

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: {
        input: {
          ...filterFields({ data, fields: Fields.allowed }),
          parent_id: null,
          type,
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
          ...filterFields({ data, fields: Fields.allowed }),
          parent_id: null,
          type,
        },
        id: data.id,
      },
    })
  }

  const createModal = () => {
    reset(Fields.defaultValues)
    setCallback(() => createInstance)
    setTitle(translation("create catalogue", "category"))
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    reset(item)
    setCallback(() => updateInstance)
    setTitle(
      translation("edit catalogue", "category") +
        " " +
        `"${item.title_panel ?? "-"}"`
    )
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    setDelId(item.id)
    dispatch(openPopup("delete-action"))
  }

  const deleteRow = async () => {
    await mutate({
      mutation: queries.delete,
      variables: { id: delId },
      action: "delete",
    })
  }

  const getNextPage = async (page) => {
    setLoading(translation)

    return await getPage({
      page,
      fields: { type },
      query: queries.all,
      exactFields: ["type"],
    })
  }

  useEffect(() => {
    let isMounted = true

    getNextPage(1).then((res) => {
      if (!isMounted) return
      setData(res.result)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

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

  const submitSort = async (flatted) => {
    await mutate({
      mutation: queries.sort,
      variables: { input: array_pluck(flatted, ["id", "parent_id", "sort"]) },
      action: "",
    })
  }

  const activateSort = data.length ? (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      {translation("Save Categories Sorting Changes")}
      <div className={TableStyles.buttons}>
        <i
          onClick={() => {
            getNextPage(1).then((res) => {
              setData(res.result)
              setLoading(false)
            })
            setChanged(false)
          }}
          className={`fas fa-times ${TableStyles.close}`}
        />
        <Button
          onClick={() => {
            setChanged(false)
            submitSort(data)
          }}
          type="success"
        >
          {translation("Save")}
        </Button>
      </div>
    </div>
  ) : null

  return (
    <AdminLayout
      action={
        <Shield id="categories_catalogue_create_action" action>
          <Button type="success" onClick={createModal}>
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Category")}
          </Button>
        </Shield>
      }
      title={`${translation("Categories")} - ${translation("Catalogue")}`}
    >
      {changed && activateSort}
      <Sortable
        setData={setData}
        callback={() => setChanged(true)}
        data={data.sort((a, b) => a.sort - b.sort)}
        section="category"
        actions={Fields.tableActions(
          {
            create: createModal,
            edit: editModal,
            delete: deleteOption,
          },
          translation
        )}
        fields={Fields.tableFields(translation)}
      />
      <Shield id="categories_catalogue_create_action" action>
        <AddBtn title={translation("Add Category")} callback={createModal} />
      </Shield>
      <ModalForms
        form={Fields.fields(getValues, setValue, fireToast, translation)}
        id="editForms"
        section="category"
        state={title}
        loading={loading}
        callback={handleSubmit(callback)}
        control={control}
      />
      <Popup
        id="delete-action"
        actions={deleteActions}
        status="danger"
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
      <div className="pb-5" />
    </AdminLayout>
  )
}
