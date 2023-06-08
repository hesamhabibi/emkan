import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { useApolloClient } from "~/app/Hooks/Api"
import { useMutation } from "~/app/Hooks"
import queries from "./queries"
import Fields from "./fields"
import Filter from "@admin/Filter"
import { useForm } from "react-hook-form"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import { openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import Modal from "./modal"

const Tab = ({ number }) => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const [data, setData] = useState({ data: [], paginate: {} })

  const [ticket, setTicket] = useState({})
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  const { control, handleSubmit, setError, clearErrors, reset, watch } =
    useForm()

  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    setData,
    id: "editForms",
    clearErrors,
    setLoading,
    setError,
  })

  const showComments = (item) => {
    setTicket(item)
    dispatch(openModal("ticket-manager"))
  }

  const getPages = async (page = 1, data) => {
    fireLoading(true)
    try {
      const res = await getPage({
        page,
        fields: { ...(data || filters), reply_to_id: null, department: number },
        exactFields: ["department", "reply_to_id"],
        query: queries.tab,
      })
      setData(res.result)

    } catch (e) {
      console.log(e)
    }

    fireLoading(false)
  }

  const filterPage = async (data) => {
    setFilters(data)
    await getPages(1, data)
  }

  useEffect(() => {
    let isMounted = true

    getPage({
      query: queries.tab,
      fields: { department: number, reply_to_id: null },
      exactFields: ["department", "reply_to_id"],
    }).then(({ result }) => {
      if (!isMounted) return

      fireLoading(false)
      setData(result)
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <Filter callback={filterPage} inputs={Fields.filterFields(translation)} />
      <Table
        data={data.data}
        fields={Fields.tableFields(translation)}
        actions={[
          {
            icon: "fa-comments",
            onClick: showComments,
            perm: "tickets_comment_action",
          },
        ]}
      />
      <Pagination
        page={data.paginate.page}
        getPage={getPages}
        pages={data.paginate.pages}
      />
      <Modal setData={setData} ticket={ticket} setTicket={setTicket} />
    </>
  )
}

export default Tab
