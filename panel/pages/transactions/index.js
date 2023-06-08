import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import AdminLayout from "@admin/Layout"
import Filter from "@admin/Filter"
import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "./queries"
import Fields from "./fields"
import client from "~/app/apollo-client"

const Transactions = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const [data, setData] = useState({ data: [], paginate: {} })
  const [filters, setFilters] = useState({})

  const { getPage } = useApolloClient()

  const getPages = async (page = 1) => {
    fireLoading(true)
    let res = []
    try {
      res = await client.query({
        query: queries.all,
        variables: {
          page,
          limit: 15,
          filter: filters,
        },
      })
      res = res.data.result
    } catch (e) {
      console.log(e)
    }
    return res
  }

  const filterPage = async (data) => {
    fireLoading(true)
    let res = []
    const paidAt = []
    try {
      if (data.to_date) {
        paidAt.push({
          operator: "LessThanOrEqual",
          value: `${data.to_date?.unix()}000`,
        })
      }
      if (data.from_date) {
        paidAt.push({
          operator: "MoreThanOrEqual",
          value: `${data.from_date?.unix()}000`,
        })
      }

      setFilters({
        amount: data.price ? [{ operator: "regex", value: data.price }] : [],
        unique_number: data.unique_number
          ? [{ operator: "regex", value: data.unique_number }]
          : [],
        paidAt,
        gateway: data.gateway
          ? [{ operator: "exact", value: data.gateway }]
          : [],
      })

      res = await client.query({
        query: queries.all,
        variables: {
          page: 1,
          limit: 15,
          filter: filters,
        },
      })
      res = res.data.result
    } catch (e) {
      console.log(e)
    }
    setData(res)
    fireLoading(false)
  }

  useEffect(() => {
    getPages(1).then((res) => {
      setData(res)
      fireLoading(false)
    })
  }, [])

  return (
    <AdminLayout title={translation("Transactions")}>
      <Filter
        inputs={Fields.filterFields(translation)}
        id="filters"
        callback={filterPage}
      />
      <Table
        data={data.data}
        fields={Fields.tableFields(translation)}
        actions={[]}
      />
      <Pagination
        pages={data.paginate?.pages}
        getPage={(page) =>
          getPages(page).then((res) => {
            setData(res)
            fireLoading(false)
          })
        }
        page={data.paginate?.page}
      />
    </AdminLayout>
  )
}

export default Transactions
