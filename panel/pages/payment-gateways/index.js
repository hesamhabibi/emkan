import AdminLayout from "@admin/Layout"
import { useContext, useEffect, useState } from "react"
import { DeviceView, LoadingContext, TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import ModalForms from "@admin/Forms"
import AddBtn from "@admin/CrudLayout/Add"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import { useMutation } from "~/app/Hooks"
import Fields from "./fields"
import Modal from "@admin/Modal"
import queries from "./queries"
import Styles from "./payment-gateways.module.scss"
import { closeModal, openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import { Grid, GridContainer } from "@admin/Grid"
import { useRouter } from "next/router"
import Text from "@admin/Input/Text"
import Sortable from "@admin/Table/sortable"
import { closePopup, openPopup } from "~/app/State/popups"
import { array_pluck } from "~/app/Tree"
import Popup from "@admin/Popup"
import TableStyles from "~/styles/components/table.module.scss"
import Shield from "@admin/Shield"

const PaymentGateways = () => {
  // context

  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)
  const fireLoading = useContext(LoadingContext)

  // states

  const [title, setTitle] = useState("")
  const [data, setData] = useState({ data: [], gateways: [] })
  const [callback, setCallback] = useState((data) => {})
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState([])
  const [changed, setChanged] = useState(false)

  const [search, setSearch] = useState("")

  // hooks
  const { control, handleSubmit, setError, reset, clearErrors } = useForm()

  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const router = useRouter()

  const is_desktop = useContext(DeviceView)

  const { mutate } = useMutation({
    id: "editForms",
    clearErrors,
    setError,
    setData,
    setLoading,
  })

  // functions

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: { input: data },
    })
  }

  const createModal = () => {
    setTitle(translation("Create Payment"))
    setCallback(() => createInstance)
    dispatch(openModal("payment-method"))
  }

  const editInstance = async (data) => {
    return await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: { ...data, id: undefined, sort: undefined },
        id: data.id,
      },
    })
  }

  const editModal = (item) => {
    setFields(data.gateways.find((gw) => gw.gateway === item.gateway).fields)
    setTitle(translation("Edit Payment"))
    setCallback(() => editInstance)
    reset({ ...item, title_panel: undefined })
    dispatch(openModal("editForms"))
  }

  const deleteInstance = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: { id: data.id },
      action: "delete",
    })
  }

  const deleteOption = (data) => {
    reset(data)
    dispatch(openPopup("delete-action"))
  }

  const getPages = async (page = 1) => {
    return await getPage({ page, fields: [], query: queries.all })
  }

  const setGateway = (item) => {
    setFields(item.fields)
    reset({ gateway: item.gateway, status: true, fields: { sandBox: true } })
    dispatch(closeModal("payment-method"))
    dispatch(openModal("editForms"))
  }

  // useEffects

  useEffect(() => {
    let isMounted = true

    getPages(1).then((res) => {
      fireLoading(false)
      if (!isMounted) return

      setData({ data: res.result, gateways: res.gateways.value })
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
      onClick: handleSubmit(deleteInstance),
    },
  ]

  const submitSort = async (flatted) => {
    await mutate({
      mutation: queries.sort,
      variables: { input: array_pluck(flatted, ["id", "parent_id", "sort"]) },
      action: "",
    })
  }

  const activateSort = data.data.length ? (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      {translation("Save Categories Sorting Changes")}
      <div className={TableStyles.buttons}>
        <i
          onClick={() => {
            getPages(1).then((res) => {
              setData({ data: res.result, gateways: res.gateways.value })
              setLoading(false)
            })
            setChanged(false)
          }}
          className={`fas fa-times ${TableStyles.close}`}
        />
        <Button
          onClick={() => {
            setChanged(false)
            submitSort(data.data)
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
      title={translation("Payment Gateways")}
      action={
        <Shield id="payment_gateways_create_action" action>
          <Button onClick={createModal} type="success">
            {translation("Add Payment Gateway")}
            <i className="mr-2 fas fa-plus-circle" />
          </Button>
        </Shield>
      }
    >
      {changed && activateSort}
      <Sortable
        setData={(res) => setData({ ...data, data: res })}
        data={data.data}
        callback={() => setChanged(true)}
        button={
          <Shield id="payment_gateways_create_action" action>
            <Button onClick={createModal} type="success">
              {translation("Add Payment Gateway")}
              <i className="mr-2 fas fa-plus-circle" />
            </Button>
          </Shield>
        }
        fields={Fields.tableFields(translation, data.gateways, is_desktop)}
        actions={Fields.tableActions({ edit: editModal, delete: deleteOption })}
      />
      <Modal
        title={translation("Choose Gateway")}
        hasInfo={false}
        actions={[]}
        id="payment-method"
      >
        <GridContainer className="m-2" gap="Lg">
          <Grid size={12}>
            <Text
              field={{ onChange: setSearch, value: search }}
              fieldState={{}}
              validate={(callback, e) => callback(e.target.value)}
              placeholder={translation("search")}
            />
          </Grid>
          {(() => {
            const gateways = data.gateways
              .filter((item) => item.title[router.locale].includes(search))
              .map((item, key) => (
                <Grid
                  className={Styles.card}
                  key={key}
                  size={is_desktop ? 3 : 6}
                >
                  <div onClick={setGateway.bind(null, item)}>
                    <img width="100" src={process.env.apiHost + item.logo} />
                    <p className="text-center">{item.title[router.locale]}</p>
                  </div>
                </Grid>
              ))

            if (!gateways.length)
              return (
                <Grid size={12} className="text-center">
                  {translation("no record found")}
                </Grid>
              )

            return gateways
          })()}
          {}
        </GridContainer>
      </Modal>
      <ModalForms
        state={title}
        callback={handleSubmit(callback)}
        id="editForms"
        control={control}
        form={Fields.form(fields, translation)}
        loading={loading}
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
      <Shield id="payment_gateways_create_action" action>
        <AddBtn
          callback={createModal}
          title={translation("Add Payment Gateway")}
        />
      </Shield>
    </AdminLayout>
  )
}

export default PaymentGateways
