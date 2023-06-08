import { useState, useContext, useEffect } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { action_types, ReactJsonConfigs } from "~/app/global"
import { useMutation } from "~/app/Hooks"
import { closePopup, openPopup } from "~/app/State/popups"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import { Grid, GridContainer } from "@admin/Grid"
import { useApolloClient } from "~/app/Hooks/Api"
import Fields from "./fields"
import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Styles from "./reports.module.scss"
import Pagination from "@admin/Pagination"
import InfoModal from "@admin/Forms/ModalInfo"
import Popup from "@admin/Popup"
import queries from "./queries"
import Tag from "@admin/Tag"
import dynamic from "next/dynamic"

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

export default function Tab({ code }) {
  const { getPage } = useApolloClient()

  const setLoading = useContext(LoadingContext)
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const [tag, setTag] = useState("")

  const [data, setData] = useState({})
  const [filter, setFilter] = useState([])
  const [showData, setShowData] = useState({})
  const [extra, setExtra] = useState({ parameters: "", error: "" })

  const { mutate } = useMutation({
    id: "editInfo",
    setLoading,
    setData,
    setError: () => {},
    clearErrors: () => {},
  })

  const filterPage = async (data) => {
    setLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      fields: { ...data, status_code: code },
      query: queries.all,
      exactFields: ["status_code"],
    })
  }

  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      setLoading(false)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const transKeys = (obj) => {
    const res = {}
    Object.keys(obj).forEach((key) => {
      res[translation(key)] = obj[key]
    })
    return res
  }

  const getNextPage = async (page) => {
    setLoading(true)
    const res = await getPage({
      page,
      fields: { ...filter, status_code: code },
      query: queries.all,
      exactFields: ["status_code"],
    })
    setData(res.result)
    setLoading(false)
  }

  const submitModal = (item) => {
    setShowData(item)
    dispatch(openPopup("confirm-action"))
  }

  const showModal = (item) => {
    const row = { ...data.data.find((r) => r.id === item) }
    const { parameters, error } = row

    setExtra({
      parameters: parameters || {},
      error: error || {},
      device_info: row.device_info || {},
    })

    row.full_name = row.user?.full_name
    row.status = translation(`status-${row.status}`, "reports")
    row.createdAt = new Date(parseInt(row.createdAt, 10)).toLocaleString(
      "fa-IR"
    )
    setTag(
      <Tag className="text-center" type="info">
        {row.status_code}
      </Tag>
    )

    delete row.user
    delete row.parameters
    delete row.error

    // row.ip = row.device_info?.ipv4;
    // row.ipv6 = row.device_info?.ip;
    // row.user_agent = row.device_info?.user_agent;
    delete row.device_info

    if (row.action_type)
      row.action_type = translation(
        action_types.find((item) => item.id === row.action_type)?.name
      )

    setShowData(transKeys(row))

    dispatch(openModal("editInfo"))
  }

  const setStatus = async () => {
    await mutate({
      action: "edit",
      variables: { id: showData, status: 2 },
      mutation: queries.setStatus,
    })
    dispatch(closePopup("confirm-action"))
  }

  const confirmActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("confirm-action")),
    },
    {
      background: "#00ff00",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: setStatus,
    },
  ]

  return (
    <div>
      <Filter
        inputs={Fields.filterFields}
        defaultValues={{ status: "" }}
        callback={(data) => {
          filterPage(data).then((res) => {
            setData(res.result)
            setLoading(false)
          })
        }}
        section="reports"
        id="filters"
      />

      <Table
        data={data.data}
        section="reports"
        translation={translation}
        actions={Fields.tableActions({
          show: showModal,
          submit: submitModal,
        })}
        fields={Fields.tableFields(translation)}
      />

      <div className="text-center">
        <InfoModal
          hasInfo={false}
          id="editInfo"
          section="report"
          title={translation("Report Info")}
          tag={tag}
          fields={showData}
          render={
            <div className="p-3">
              <GridContainer className="text-left ltr" gap="Lg">
                <Grid size={12}>
                  <Tag className={Styles.bold} type="warning">
                    Parameters
                  </Tag>
                </Grid>
                <Grid className="mb-4" size={12}>
                  <ReactJson
                    {...ReactJsonConfigs}
                    src={{} || extra.parameters}
                  />
                </Grid>
                <Grid size={12}>
                  <Tag className={Styles.bold} type="error">
                    Error
                  </Tag>
                </Grid>
                <Grid size={12}>
                  <ReactJson {...ReactJsonConfigs} src={extra.error} />
                </Grid>
                <Grid size={12}>
                  <ReactJson {...ReactJsonConfigs} src={extra.device_info} />
                </Grid>
              </GridContainer>
            </div>
          }
        />
      </div>
      <Pagination
        page={data.paginate?.page}
        getPage={getNextPage}
        pages={data.paginate?.pages}
      />
      <Popup
        status="success"
        id="confirm-action"
        actions={confirmActions}
        title={translation("confirmation", "reports")}
      >
        <p>{translation("reports-set", "reports")}</p>
      </Popup>
    </div>
  )
}
