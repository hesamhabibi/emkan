import AdminLayout from "@admin/Layout"
import { useContext, useEffect, useState } from "react"
import Button from "@admin/Button"
// import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "./queries"
import Fields from "./fields"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import dynamic from "next/dynamic"
import AddBtn from "@admin/CrudLayout/Add"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import ModalForms from "@admin/Forms"
import { closePopup, openPopup } from "~/app/State/popups"
import Popup from "@admin/Popup"
import Shield from "@admin/Shield"

const Filter = dynamic(() => import("@admin/Filter"), { ssr: false })

export default function Brands() {
  const translation = useContext(TranslationContext)

  const fireLoading = useContext(LoadingContext)
  const fireToast = useContext(ToastContext)
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setValue,
    getValues,
  } = useForm()

  const [title, setTitle] = useState("")
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(() => {})
  const [data, setData] = useState({})

  const { mutate } = useMutation({
    setError,
    setData,
    setLoading,
    id: "editForms",
    clearErrors,
  })

  const { getPage } = useApolloClient()

  const getPages = async ({ page = 1, data = {} }) => {
    fireLoading(true)
    if (Object.keys(data).length) setFilter(data)
    return await getPage({
      page,
      query: queries.all,
      fields: Object.keys(data).length ? data : filter,
    })
  }

  useEffect(() => {
    let isMounted = true
    getPages({ page: 1 }).then((res) => {
      if (!isMounted) return
      setData(res.result)
      fireLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
      },
    })
  }

  const updateInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
        id: data.id,
      },
    })
  }

  const createModal = () => {
    reset(Fields.defaultValues)
    setCallback(() => createInstance)
    setTitle(translation("create", "brands"))
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    reset(item)
    setCallback(() => updateInstance)
    setTitle(translation("edit", "brands"))
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
  }

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: { id: data.id },
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
      onClick: handleSubmit(deleteRow),
    },
  ]

  return (
    <AdminLayout
      title={translation("Brands")}
      action={
        <Shield action id="brands_create_action">
          <Button type="success" onClick={createModal}>
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Brand")}
          </Button>
        </Shield>
      }
    >
      <Filter
        inputs={Fields.filterFields(translation)}
        callback={(data) => {
          getPages({ data }).then((res) => {
            setData(res.result)
            fireLoading(false)
          })
        }}
        defaultValues={{
          active: "",
          show_in_menu: "",
        }}
        section="brands"
        id="filters"
      />
      <Table
        data={data.data}
        section="brands"
        actions={Fields.tableActions({
          change: editModal,
          delete: deleteOption,
        })}
        fields={Fields.tableFields(translation)}
      />
      <Pagination
        page={data.paginate?.page}
        getPage={(page) =>
          getPages({ page }).then((res) => {
            setData(res.result)
            fireLoading(false)
          })
        }
        pages={data.paginate?.pages}
      />
      <Shield action id="brands_create_action">
        <AddBtn callback={createModal} title={translation("Add Brand")} />
      </Shield>

      <ModalForms
        state={title}
        loading={loading}
        section="brands"
        callback={handleSubmit(callback)}
        form={Fields.form(getValues, setValue, fireToast, translation)}
        control={control}
        id="editForms"
      />

      <Popup
        id="delete-action"
        actions={deleteActions}
        status="danger"
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </AdminLayout>
  )
}
