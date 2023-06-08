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
import Tree from "@admin/Tree"
import { array_pluck } from "~/app/Tree"
import AddBtn from "@admin/CrudLayout/Add"
import Shield from "@admin/Shield"

const type = 3

export default function Categories() {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const fireToast = useContext(ToastContext)
  const isDesktop = useContext(DeviceView)

  const [loading, setLoading] = useState(false)
  const [delId, setDelId] = useState(null)
  const [data, setData] = useState([])
  const [title, setTitle] = useState(null)
  const [callback, setCallback] = useState(null)

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
          type,
        },
        id: data.id,
      },
    })
  }

  const createModal = (item) => {
    if (item) {
      reset({ ...Fields.defaultValues, parent_id: item.id, sort: 9999999 })
    } else {
      reset(Fields.defaultValues)
    }
    setCallback(() => createInstance)
    setTitle(translation("create product", "category"))
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    reset(item)
    setCallback(() => updateInstance)
    setTitle(
      translation("edit product", "category") +
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

  const submitSort = async (data) => {
    const list = array_pluck(data, ["id", "parent_id", "sort"])
    await mutate({
      mutation: queries.sort,
      action: "",
      variables: { input: list },
    })
  }

  return (
    <AdminLayout
      action={
        <Shield id="categories_product_create_action" action>
          <Button type="success" onClick={createModal}>
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Category")}
          </Button>
        </Shield>
      }
      title={`${translation("Categories")} - ${translation("Products")}`}
    >
      <Shield id="categories_see_table">
        <Tree
          data={data.sort((a, b) => a.sort - b.sort)}
          section="category"
          setData={setData}
          sort={submitSort}
          title="title_panel"
          actions={Fields.tableActions(
            {
              create: createModal,
              edit: editModal,
              delete: deleteOption,
            },
            translation
          )}
        />
      </Shield>
      <Shield id="categories_product_create_action" action>
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
