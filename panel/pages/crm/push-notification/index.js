import AdminLayout from "@admin/Layout"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import { useMutation } from "~/app/Hooks"
import queries from "../queries"
import Fields from "./fields"
import Button from "@admin/Button"
import Styles from "../crm.module.scss"
import Table from "@admin/Table"
import AddBtn from "@admin/CrudLayout/Add"
import Filter from "@admin/Filter"
import Pagination from "@admin/Pagination"
import ModalForms from "@admin/Forms"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Modal from "@admin/Modal"
import Tag from "@admin/Tag"
import { useRouter } from "next/router"
import moment from "jalali-moment"
import Shield from "@admin/Shield"

const exactFields = ["type"]

const type = 3

const PushNotification = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const dispatch = useDispatch()

  const router = useRouter()

  moment.locale(router.locale)

  const [data, setData] = useState({ data: [], users: [], paginate: {} })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [showData, setShowData] = useState({})

  const {
    control,
    setError,
    clearErrors,
    reset,
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm()

  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    id: "editForms",
    clearErrors,
    setError,
    setData,
    setLoading,
  })

  const createInstance = async (data) => {
    data.send_to = data.send_to.map((item) => ({
      receiver_user_id: item.receiver_user_id,
      receiver_value: item.receiver_value,
    }))
    if (data.date) data.date = `${data.date?.unix()}000`
    await mutate({
      mutation: queries.create,
      action: "Create",
      variables: { input: filterFields({ data, fields: Fields.allowed }) },
    })

    fireLoading(true)
    getPage({
      page: 1,
      query: queries.all,
      fields: { ...filters, type },
      exactFields,
    }).then((res) => {
      fireLoading(false)
      setData({ ...res.result, users: res.users })
    })
  }

  const createModal = () => {
    reset({ date: moment() })
    dispatch(openModal("editForms"))
  }

  const redoAction = (item) => {
    if (item.date) item.date = moment(data.date)
    else item.date = moment.now()
    reset(item)
    dispatch(openModal("editForms"))
  }

  const viewAction = (item) => {
    // reset(item)
    setShowData(item)
    dispatch(openModal("viewReport"))
  }

  const getPages = async (page = 1) => {
    const res = await getPage({
      page,
      query: queries.all,
      fields: { ...filters, type },
      exactFields,
    })

    setData({ ...res.result, users: res.users })
    fireLoading(false)
  }

  const filterPage = async (data) => {
    setFilters(data)
    const res = await getPage({
      page: 1,
      query: queries.all,
      fields: { ...data, type },
      exactFields,
    })

    setData({ ...res.result, users: res.users })
    fireLoading(false)
  }

  const users = watch("send_to")

  useEffect(() => {
    let isMounted = true

    getPage({
      page: 1,
      query: queries.all,
      fields: { ...filters, type },
      exactFields,
    }).then((res) => {
      if (!isMounted) return
      fireLoading(false)
      setData({ ...res.result, users: res.users })
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AdminLayout
      action={
        <Shield id="crm_push_notification_create_action" action>
          <Button type="success" onClick={createModal}>
            {translation("Add CRM")}
            <i className="fas fa-plus-circle mr-2" />
          </Button>
        </Shield>
      }
      title={translation("CRM Push Notification")}
    >
      <Filter
        defaultValues={{
          status: "",
        }}
        inputs={Fields.filterFields(translation)}
        callback={filterPage}
      />
      <Table
        button={
          <Shield id="crm_push_notification_create_action" action>
            <Button onClick={createModal} type="success">
              {translation("Add CRM")}
              <i className="fas fa-plus-circle mr-2" />
            </Button>
          </Shield>
        }
        data={data.data}
        fields={Fields.tableFields(translation)}
        actions={Fields.tableActions({ view: viewAction, sms: redoAction })}
      />
      <Pagination
        page={data.paginate?.page}
        getPage={getPages}
        pages={data.paginate?.pages}
      />

      <Shield id="crm_push_notification_create_action" action>
        <AddBtn title={translation("Add CRM")} callback={createModal} />
      </Shield>
      <Modal
        actions={[
          {
            name: translation("Cancel"),
            disabled: false,
            onClick: (close) => close(),
          },
        ]}
        hasInfo={false}
        title={translation("view")}
        id="viewReport"
      >
        <div className="text-right p-3">
          <div className={Styles.info}>
            <div style={{ borderLeft: "1px solid gray" }} className={`mt-1`}>
              <div>{translation("title", "sms")}</div>
              <div>{translation("status", "sms")}</div>
              <div>{translation("date", "sms")}</div>
            </div>
            <div>
              <div>{showData.title}</div>
              <div>
                {showData.status === 1 ? (
                  <Tag type="info">{translation("Pending", "sms")}</Tag>
                ) : showData.status === 2 ? (
                  <Tag type="success">{translation("Success", "sms")}</Tag>
                ) : (
                  <Tag type="error">{translation("Reject", "sms")}</Tag>
                )}
              </div>
              <div>
                {showData.date
                  ? new Date(parseInt(showData.date)).toLocaleString(
                      router.locale
                    )
                  : "-"}
              </div>
            </div>
          </div>
          <div>
            <div>
              {translation("message", "sms")}:{" "}
              <div dangerouslySetInnerHTML={{ __html: showData.message }} />
            </div>
            {!!showData.response && (
              <div className="mt-5">
                {translation("response", "sms")} -- {"  "}
                <div>{showData.response || "-"}</div>
              </div>
            )}
          </div>
          {showData?.send_to?.length ? (
            <Table
              section="sms"
              data={showData.send_to}
              actions={[]}
              fields={[
                {
                  title: "full_name",
                  td: (it) =>
                    data.users.find((item) => item.id === it.receiver_user_id)
                      ?.full_name,
                },
              ]}
            />
          ) : (
            <p className="text-center mt-4">{translation("no record found")}</p>
          )}
        </div>
      </Modal>
      <ModalForms
        callback={handleSubmit(createInstance)}
        form={Fields.form(
          translation,
          getValues,
          setValue,
          users,
          data.users,
          clearErrors
        )}
        loading={loading}
        id="editForms"
        state={translation("Add CRM")}
        control={control}
      />
    </AdminLayout>
  )
}

export default PushNotification
