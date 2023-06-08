import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import ModalForms from "@admin/Forms"
import { useApolloClient } from "~/app/Hooks/Api"
import { ToastContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openModal } from "~/app/State/modal"
import { useRouter } from "next/router"
import Fields from "./fields"
import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import Perm from "@admin/Shield"
import queries from "./queries"
import AddBtn from "@admin/CrudLayout/Add"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import ModalInfo from "@admin/Forms/ModalInfo"
import Tag from "@admin/Tag"

export default function Users() {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const fireToast = useContext(ToastContext)
  const router = useRouter()

  const [formInputs, setFormInputs] = useState([])
  const [data, setData] = useState({})
  const [size, setSize] = useState("Lg")
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState([])
  const [state, setState] = useState("")
  const [showData, setShowData] = useState({})
  const [callback, setCallback] = useState(null)
  const [accesses, setAccesses] = useState([])

  const { mutate, getPage, setErrors } = useApolloClient()

  const { handleSubmit, control, setError, clearErrors, reset } = useForm({
    defaultValues: Fields.defaultValues,
  })

  const createInstance = async (data, close) => {
    clearErrors()
    setLoading(true)
    const res = await mutate(
      {
        input: filterFields({
          fields: [...Fields.allowedFields, "password"],
          data,
        }),
      },
      queries.create
    )
    setErrors(res.errors, setError)
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
      close()
      setData((prev) => {
        prev.data.push(res.res.data.result)
        return { ...prev }
      })
    }
    setLoading(false)
  }

  const editInstance = async (data, close) => {
    clearErrors()
    setLoading(true)
    const { id } = data
    const res = await mutate(
      { input: filterFields({ data, fields: Fields.allowedFields }), id },
      queries.update
    )
    setErrors(res.errors, setError)
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
      close()
      setData((prev) => {
        const index = prev.data.findIndex((item) => item.id === data.id)
        prev.data[index] = res.res.data.result
        return { ...prev }
      })
    }
    setLoading(false)
  }

  const changePassword = async (data, close) => {
    clearErrors()
    setLoading(true)
    const { id } = data
    const res = await mutate(
      {
        input: {
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
        id,
      },
      queries.changePassword
    )
    setErrors(res.errors, setError)
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
      close()
    }
    setLoading(false)
  }

  const addModal = () => {
    setSize("Lg")
    reset(Fields.defaultValues)
    setFormInputs(Fields.addFields(accesses, translation))
    setState(translation("create", "user"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const editModal = (item) => {
    setSize("Lg")
    setFormInputs(Fields.editFields(accesses, translation))
    reset(item)
    setState(translation("edit", "user"))
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const passwordModal = (item) => {
    setSize("sm")
    setFormInputs(Fields.passwordFields)
    reset(item)
    setState(translation("Change Password", "user"))
    setCallback(() => changePassword)
    dispatch(openModal("editForms"))
  }

  const filterPage = async (data) => {
    setLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
      exactFields: ["is_active", "access_id"],
    })
  }

  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      setAccesses(res.accesses)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const showModal = (item) => {
    delete item.access_id

    setShowData({
      ...item,
      access: item?.access?.name ? (
        <Tag className="text-center" type="success">
          {item?.access?.name}
        </Tag>
      ) : (
        <Tag className="text-center" type="info">
          {translation("no Access", "user")}
        </Tag>
      ),
    })
    dispatch(openModal("infoModal"))
  }

  const getNextPage = async (page) => {
    setLoading(true)
    const res = await getPage({
      page,
      limit: 15,
      fields: filter,
      query: queries.all,
      exactFields: ["is_active", "access_id"],
    })
    setAccesses(res.accesses)
    setData(res.result)
    setLoading(false)
  }

  return (
    <AdminLayout
      title={translation("users")}
      action={
        <Button type="success" onClick={addModal}>
          <i className="fas fa-plus-circle ml-1" />
          {translation("add user")}
        </Button>
      }
    >
      <Filter
        inputs={Fields.filterFields(translation, accesses)}
        callback={(data) => {
          filterPage(data).then((res) => {
            setAccesses(res.accesses)
            setData(res.result)
            setLoading(false)
          })
        }}
        defaultValues={{ is_active: "" }}
        section="user"
        id="filters"
      />

      <Table
        data={data.data}
        section="user"
        actions={Fields.tableActions(
          {
            change: editModal,
            password: passwordModal,
            show: showModal,
          },
          router
        )}
        fields={Fields.tableFields(translation)}
      />
      <div className="text-center">
        <ModalForms
          form={formInputs}
          size={size}
          id="editForms"
          state={state}
          section="user"
          callback={handleSubmit(callback)}
          control={control}
          loading={loading}
        />
        <ModalInfo
          id="infoModal"
          section="user"
          title={translation("information", "user")}
          fields={{
            ...showData,
            is_active: showData.is_active ? (
              <Tag type="success" className="text-center">
                {translation("active", "user")}
              </Tag>
            ) : (
              <Tag type="error" className="text-center">
                {translation("inactive", "user")}
              </Tag>
            ),
          }}
        />
      </div>
      <Pagination
        page={data.paginate?.page}
        getPage={getNextPage}
        pages={data.paginate?.pages}
      />
      <Perm id="users_create_user" action>
        <AddBtn callback={addModal} title={translation("add user")} />
      </Perm>
    </AdminLayout>
  )
}
