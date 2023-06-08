import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { TranslationContext, LoadingContext } from "~/app/Context"
import { useApolloClient } from "~/app/Hooks/Api"
import AddBtn from "@admin/CrudLayout/Add"
import Pagination from "@admin/Pagination"
import Fields from "./fields"
import queries from "./queries"
import Popup from "@admin/Popup"
import { closePopup, openPopup } from "~/app/State/popups"
import { closeModal, openModal } from "~/app/State/modal"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Table from "@admin/Table"
import { useMutation } from "~/app/Hooks"
import { close, open } from "~/app/State/collapse"
import moment from "jalali-moment"
import { toInt } from "~/pages/products/chart"
import Modal from "./modal"
import dynamic from "next/dynamic"
import Shield from "@admin/Shield"

const FilterComponent = dynamic(() => import("./components"), { ssr: false })

const defaultValues = {
  startAt: moment(),
  expireAt: moment(),
  status: 1,
}

const fieldsToInt = ["status", "type", "value", "max_price", "min_price"]

const sections = ["first", "second", "third", "fourth", "fifth"]

const DiscountCodes = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  // ---- states
  const [data, setData] = useState({})
  const [callback, setCallback] = useState(() => undefined)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({})
  const [extra, setExtra] = useState({
    brands: [],
    categories: [],
    campaigns: [],
  })

  // ---- Hooks
  const dispatch = useDispatch()

  const {
    control,
    reset,
    clearErrors,
    setError,
    handleSubmit,
    watch,
    setValue,
    getValues,
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

  const submitWrapper = (callback) => {
    return (data) => {
      fieldsToInt.forEach((item) => {
        data[item] = toInt(data[item])
      })
      data.settings.use_limit.type = toInt(data.settings.use_limit.type)
      data.settings.use_limit.count = toInt(data.settings.use_limit.count)
      data.settings.condition.type = toInt(data.settings.condition.type)
      data.settings.access.type = toInt(data.settings.access.type)
      data.expireAt = `${data.expireAt.unix()}000`
      data.startAt = `${data.startAt.unix()}000`
      callback(data)
    }
  }

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

  const closeSections = () => {
    sections.forEach((item) => {
      dispatch(close(`${item}-section`))
    })
    dispatch(open("first-section"))
  }

  const createModal = () => {
    closeSections()
    dispatch(closeModal("manage-campaigns"))
    reset(defaultValues)
    setCallback(() => createInstance)
    setTitle(translation("create", "discount"))
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

  const setExtraData = (data) => {
    data.campaigns = data.campaigns.map((item) => ({
      id: item.id,
      name: item.extra_fields.title_panel,
    }))

    setExtra({ ...data, result: undefined })
  }

  const editModal = async (item) => {
    closeSections()
    reset({
      ...item,
      startAt: moment(parseInt(item.startAt, 10)),
      expireAt: moment(parseInt(item.expireAt, 10)),
    })
    setCallback(() => editInstance)
    setTitle(`${translation("edit", "discount")} "${item.title_panel}"`)
    dispatch(openModal("editForms"))
  }

  const getPages = async (page = 1) => {
    fireLoading(true)

    return await getPage({
      page,
      fields: filter,
      query: queries.all,
      exactFields: [],
    })
  }

  const setStatus = async (item, value) => {
    await mutate({
      mutation: queries.setStatus,
      variables: {
        status: value ? 1 : 2,
        id: item.id,
      },
      action: "edit",
    })
    // console.log(item, value)
  }

  const filterPage = async (data) => {
    fireLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
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
    getPages().then((res) => {
      if (!isMounted) return
      fireLoading(false)
      setData(res.result)
      setExtraData(res)
    })
    return () => {
      isMounted = false
      fireLoading(false)
    }
  }, [])

  useEffect(() => {
    setValue("settings.condition.values", [])
  }, [watch("settings.condition.type")])

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

  const modalActions = [
    {
      name: translation("Cancel"),
      onClick: (close) => close(),
    },
    {
      name: translation("Submit"),
      onClick: handleSubmit(submitWrapper(callback)),
      disabled: loading,
    },
  ]

  return (
    <AdminLayout
      title={translation("Discount Codes")}
      action={
        <Shield id="discount_codes_create_action" action>
          <Button type="success" onClick={createModal}>
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Discount Code")}
          </Button>
        </Shield>
      }
    >
      <FilterComponent
        inputs={Fields.filterFields}
        setData={setData}
        fireLoading={fireLoading}
        filterPage={(data) => {
          filterPage(data).then((res) => {
            setData(res.result)
            setExtraData(res)
            fireLoading(false)
          })
        }}
        section="discount"
        id="filters"
      />

      <div className="mt-3">
        <Table
          data={data.data}
          translation={translation}
          actions={Fields.tableActions(
            {
              setStatus,
              edit: editModal,
              delete: deleteOption,
            },
            translation
          )}
          fields={Fields.tableFields}
          section="discount"
        />
      </div>
      <Modal
        title={title}
        control={control}
        getValues={getValues}
        watch={watch}
        modalActions={modalActions}
        extra={extra}
        setValue={setValue}
      />
      <Pagination
        pages={data.paginate?.pages}
        getPage={getPages}
        page={data.paginate?.page}
      />

      <Shield id="discount_codes_create_action" action>
        <AddBtn
          title={translation("Add Discount Code")}
          callback={createModal}
        />
      </Shield>

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

export default DiscountCodes
