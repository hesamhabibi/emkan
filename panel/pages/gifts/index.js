import { useContext, useEffect, useState } from "react"
import {
  InfoContext,
  LoadingContext,
  ToastContext,
  TranslationContext,
} from "~/app/Context"
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
import Button from "@admin/Button"
import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import moment from "jalali-moment"
import AddBtn from "@admin/CrudLayout/Add"
import ModalForms from "@admin/Forms"

moment.locale("fa")

const defaultValues = {
  type: 1,
  extra_fields: {
    has_timer: true,
    show: true,
    expireAt: moment(),
    startAt: moment(),
  },
  list: [],
}

const CampaignsGifts = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)
  const fireToast = useContext(ToastContext)

  // ---- states
  const [data, setData] = useState({})
  const [callback, setCallback] = useState(() => undefined)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({})
  const [variants, setVariants] = useState([])

  // ---- Hooks
  const dispatch = useDispatch()

  const {
    control,
    setValue,
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
    data.list = (data.list || []).map((item) => {
      item.mix_variant_keys = item.mix_variant_keys.flat()
      return item
    })

    data.extra_fields.score = parseInt(data.extra_fields.score, 10)
    data.extra_fields.expireAt = `${
      data.extra_fields.expireAt.unix() || moment().unix()
    }000`
    data.extra_fields.startAt = `${
      data.extra_fields.startAt.unix() || moment().unix()
    }000`

    await mutate({
      mutation: queries.create,
      variables: {
        input: filterFields({ fields: Fields.allowedFields, data }),
      },
      action: "create",
    })
  }

  const createModal = () => {
    setVariants([])
    reset(defaultValues)
    setCallback(() => createInstance)
    setTitle(translation("create", "gifts"))
    dispatch(openModal("editForms"))
  }

  const editInstance = async (data) => {
    if (data.list) {
      data.list = (data.list || []).map((item) => {
        item.mix_variant_keys = item.mix_variant_keys.flat()
        return item
      })
    }

    data.extra_fields.title_panel = undefined

    data.extra_fields.score = parseInt(data.extra_fields.score, 10)
    data.extra_fields.expireAt = `${
      data.extra_fields.expireAt.unix() || moment().unix()
    }000`
    data.extra_fields.startAt = `${
      data.extra_fields.startAt.unix() || moment().unix()
    }000`

    if (data.condition?.limit)
      data.condition.limit = parseInt(data.condition?.limit, 10)

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
    if (item.list?.length) {
      setVariants(item.list.map((item) => ({ ...item.product })))
      item.list = item.list.map((item) => ({ ...item, product: undefined }))
    } else {
      setVariants([])
    }
    reset({
      ...item,
      extra_fields: {
        ...item.extra_fields,
        expireAt: moment(parseInt(item.extra_fields.expireAt, 10)),
        startAt: moment(parseInt(item.extra_fields.startAt, 10)),
      },
    })

    setCallback(() => editInstance)
    setTitle(translation("edit", "gifts"))
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

  return (
    <AdminLayout
      title={translation("Gifts")}
      action={
        <Button type="success" onClick={createModal}>
          {translation("Add Gift")}
          <i className="fas fa-plus-circle mr-2" />
        </Button>
      }
    >
      <Filter
        callback={(data) => {
          filterPage(data).then((res) => {
            fireLoading(false)
            setData(res.result)
          })
        }}
        inputs={Fields.filterFields(translation)}
        defaultValues={{
          extra_fields: {
            show: "",
          },
        }}
        section="campaigns"
      />
      <InfoContext.Provider value={false}>
        <ModalForms
          callback={handleSubmit(callback)}
          form={Fields.fields(
            translation,
            getValues,
            setValue,
            fireToast,
            setVariants,
            watch,
            [],
            variants
          )}
          state={title}
          id="editForms"
          control={control}
          section="campaigns"
          loading={loading}
        />
      </InfoContext.Provider>
      <Table
        button={
          <Button type="success" onClick={createModal}>
            {translation("Add Gift")}
            <i className="fas fa-plus-circle mr-2" />
          </Button>
        }
        actions={Fields.tableActions({ edit: editModal, delete: deleteOption })}
        fields={Fields.tableFields}
        data={data.data}
      />
      <AddBtn title={translation("Add Gift")} callback={createModal} />
      <Pagination
        getPage={getPages}
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

export default CampaignsGifts
