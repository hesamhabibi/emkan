import { useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useApolloClient } from "~/app/Hooks/Api"
import { useMutation } from "~/app/Hooks"
import AdminLayout from "@admin/Layout"
import queries from "./queries"
import Fields from "./fields"
import Filter from "@admin/Filter"
import Pagination from "@admin/Pagination"
import Table from "@admin/Table"
import Styles from "./orders.module.scss"
import { openModal } from "~/app/State/modal"
import Modal from "@admin/Modal"
import _ from "lodash"
import { useRouter } from "next/router"
import { int2Comma, notificationData } from "~/app/global"
import Persian from "persianjs"
import Popup from "@admin/Popup"
import Input from "@admin/Input"
import { closePopup, openPopup } from "~/app/State/popups"
import client from "~/app/apollo-client"
// im

const statusTypes = [
  { name: "not_set", id: 0 },
  { name: "reject", id: 1 },
  { name: "complete", id: 2 },
  { name: "pending", id: 3 },
  { name: "packing", id: 4 },
  { name: "sending", id: 5 },
  { name: "sent", id: 6 },
]

const Orders = () => {
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)
  const fireLoading = useContext(LoadingContext)

  const router = useRouter()

  // ---
  const [data, setData] = useState({ data: [] })
  // const [callback, setCallback] = useState(() => {})
  const [loading, setLoading] = useState()
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({})
  const [factor, setFactor] = useState({ products: [], user: {} })

  const dispatch = useDispatch()

  const { control, handleSubmit, reset, setError, clearErrors } = useForm()

  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    setError,
    setData,
    setLoading,
    id: "editForms",
    clearErrors,
  })

  const getPages = async (page = 1) => {
    fireLoading(true)
    let res = []
    try {
      res = await client.query({
        query: queries.all,
        variables: {
          page: 1,
          limit: 15,
          filter: {
            ...filter,
            is_inquiry: [{value: 0}],
          },
        },
      })
      res = res.data
    } catch (e) {
      console.log(e)
    }
    return res
  }

  const filterPage = async (data) => {
    fireLoading(true)
    let res = []
    const createdAt = []
    try {
      if (data.to_date) {
        createdAt.push({
          operator: "LessThanOrEqual",
          value: `${data.to_date?.unix()}000`,
        })
      }
      if (data.from_date) {
        createdAt.push({
          operator: "MoreThanOrEqual",
          value: `${data.from_date?.unix()}000`,
        })
      }

      const filter = {
        number: data.number ? [{ operator: "Regex", value: data.number }] : [],
        status: data.status ? [{ value: data.status }] : [],
        type: data.type ? [{ value: data.type }] : [],
        user_id: data.user_id ? [{ value: data.user_id }] : [],
        createdAt,
      }

      setFilter(filter)

      res = await client.query({
        query: queries.all,
        variables: {
          page: 1,
          limit: 15,
          filter: {
            ...filter,
            is_inquiry: [{value: 0}],
          },
        },
      })
      res = res.data
    } catch (e) {
      console.log(e)
    }
    setData(res.result)
    setUsers(res.users)
    fireLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    getPages(1).then((res) => {
      if (!isMounted) return
      setUsers(res.users)
      setData(res.result)
      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const seeFactory = (row) => {
    dispatch(openModal("editForms"))
    setFactor(row)
  }

  const setStatus = (row) => {
    reset({ status: row.status, id: row.id, send_with: 0 })
    dispatch(openPopup("status-actions"))
  }

  const submitStatus = async (data) => {
    const res = await mutate({
      mutation: queries.setStatusOrder,
      variables: {
        id: data.id,
        input: { ...data, id: undefined },
      },
      action: "edit",
    })
    if (res.status) dispatch(closePopup("status-actions"))
  }

  const postTrack = (row) => {
    reset({ id: row.id, post_track_code: row.post_track_code, send_with: 0 })
    dispatch(openPopup("track-actions"))
    setFactor(row)
  }

  const submitPostTrack = async (data) => {
    const res = await mutate({
      mutation: queries.postTrack,
      variables: {
        id: data.id,
        input: { ...data, id: undefined },
      },
      action: "edit",
    })
    if (res.status) dispatch(closePopup("track-actions"))
  }

  const statusActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("status-actions")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(submitStatus),
    },
  ]

  const factoryActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("track-actions")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(submitPostTrack),
    },
  ]

  return (
    <AdminLayout title={translation("Orders")}>
      <Filter
        callback={(data) => filterPage(data)}
        inputs={Fields.filterFields(translation, users)}
        id="filters"
      />
      <Table
        className={(row) => (row.status === 0 ? Styles.bgRed : "")}
        data={data.data}
        fields={Fields.tableFields(translation, router.locale, setStatus)}
        actions={Fields.tableActions({
          factor: seeFactory,
          postTrack,
        })}
      />
      <Popup
        title={translation("set factory")}
        actions={factoryActions}
        id="track-actions"
        status="info"
      >
        <Input
          control={control}
          type="text"
          label={translation("post track code")}
          name="post_track_code"
        />
        <div className="mt-3">
          <Input
            label={translation("send with")}
            control={control}
            name="send_with"
            data={notificationData(translation)}
            type="toggle"
          />
        </div>
      </Popup>
      <Popup
        title={translation("set status")}
        actions={statusActions}
        id="status-actions"
        status="info"
      >
        <Input
          label={translation("status")}
          data={statusTypes.map((item) => ({
            ...item,
            name: translation(item.name, "order"),
          }))}
          control={control}
          name="status"
          type="toggle"
        />
        <div className="mt-3">
          <Input
            label={translation("send with")}
            data={notificationData(translation)}
            control={control}
            name="send_with"
            type="toggle"
          />
        </div>
      </Popup>
      <Modal
        hasInfo={false}
        full_screen
        title={translation("factor")}
        actions={[]}
        id="editForms"
      >
        <div className={Styles.wrapper}>
          <div className={Styles.header}>
            <div>
              <p>
                {translation("customer name")}:{" "}
                <strong>{factor.user.full_name}</strong>
              </p>
              <p>
                {translation("customer phone number")}:{" "}
                <strong>{factor.user.mobile}</strong>
              </p>
            </div>
            <div>
              <p>
                {translation("factor code")}: <strong>{factor.number}</strong>
              </p>
              <p>
                {translation("date")}:
                <strong>
                  {factor.date
                    ? new Date(parseInt(factor.date, 10))
                        .toLocaleString(router.locale)
                        .replace("،", " - ")
                    : " - "}
                </strong>
              </p>
            </div>
          </div>
          <table role="table">
            <thead>
              <tr>
                <th />
                <th>{translation("product code")}</th>
                <th>{translation("product name")}</th>
                <th>{translation("description")}</th>
                <th>{translation("count")}</th>
                <th>{translation("price")}</th>
                <th>{translation("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {factor.products.map((item, key) => {
                const mixVariant = item.product.order_mix_variant.find((mix) =>
                  _.isEqual(mix.keys, item.mix_variant_keys)
                )

                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{mixVariant.details.product_code}</td>
                    <td>
                      {item.product.title} -{" "}
                      {item.product.variant
                        .map((item) => item.labels)
                        .flat(2)
                        .filter((variant) =>
                          _.includes(variant.key, item.mix_variant_keys)
                        )
                        .map((item) => item.title_panel)
                        .join(" - ")}
                    </td>
                    <td>{item.note}</td>
                    <td>{item.count}</td>
                    <td className="text-right">
                      {int2Comma(item.price.main_price)}
                    </td>
                    <td className="text-right">
                      {int2Comma(item.price.main_price * item.count)}
                    </td>
                  </tr>
                )
              })}
              <tr className={Styles.footer}>
                <td />
                <td />
                <td />
                <td className={Styles.border} colSpan="2">
                  {translation("total numbers")}
                  {": "}
                  {factor.products.reduce((past, item) => past + item.count, 0)}
                </td>
                <td className={Styles.border}>{translation("sum")}</td>
                <td>
                  {int2Comma(factor.total_prices?.sum_product_price || 0)}
                </td>
              </tr>
              <tr className={`${Styles.footer} ${Styles.noBorder}`}>
                <td colSpan={5} rowSpan={4}>
                  <span className="d-flex flex-column justify-content-center">
                    <p>
                      {translation("User Name")}: {factor.user.full_name}
                    </p>
                    <p>
                      {translation("User Mobile")}: {factor.user.mobile}
                    </p>
                    <p>
                      {translation("User Email")}: {factor.user.email}
                    </p>
                    <p>
                      {translation("User Address")}:{" "}
                      {factor.address
                        ? `${factor.address?.state.name ?? ""} - ${
                            factor.address?.city.name ?? ""
                          } - ${factor.address?.address ?? ""}`
                        : "-"}
                    </p>
                    <p className="mb-0">
                      {translation("Postal Code")}:{" "}
                      {factor.address?.postal_code ?? "-"}
                    </p>
                  </span>
                </td>
                <td className={Styles.border}>
                  {translation("Discount")} ({translation("Code")})
                </td>
                <td className={Styles.border}>
                  {int2Comma(
                    (factor.total_prices?.sum_product_price || 0) -
                      (factor.total_prices?.total_price_with_discount || 0)
                  )}
                </td>
              </tr>
              <tr className={`${Styles.footer} ${Styles.noBorder}`}>
                <td className={Styles.border}>{translation("Post Price")}</td>
                <td className={Styles.border}>
                  {int2Comma(factor.total_prices?.post_price || 0)}
                </td>
              </tr>
              <tr className={`${Styles.footer} ${Styles.noBorder}`}>
                <td className={`${Styles.border} font-weight-bold`}>
                  {translation("Total sum")}
                </td>
                <td className={`${Styles.border} font-weight-bold`}>
                  {int2Comma(factor.total_prices?.payment_price || 0)}
                </td>
              </tr>
              <tr className={`${Styles.footer} ${Styles.noBorder}`}>
                {/*<td className={Styles.borderBottom} />*/}
                {/*<td className={Styles.borderBottom} />*/}
                {/*<td className={Styles.borderBottom} />*/}
                {/*<td className={Styles.borderBottom} />*/}
                {/*<td className={Styles.borderBottom} />*/}
                <td colSpan={2} className={Styles.border}>
                  <small>
                    {
                      Persian(
                        `${factor.total_prices?.payment_price || 0}`
                      ).digitsToWords()._str
                    }
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <Pagination
        page={data.paginate?.page}
        getPage={getPages}
        pages={data.paginate?.pages}
      />
    </AdminLayout>
  )
}

export default Orders
