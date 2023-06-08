import { useContext, useEffect, useState } from "react"
import AdminLayout from "@admin/Layout"
import { LoadingContext, TranslationContext } from "~/app/Context"
import Filter from "@admin/Filter"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "./queries.jsx"
import Tabs from "@admin/Tab"
import Tab from "./tab"

const Tickets = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const [data, setData] = useState([])

  const { getPage } = useApolloClient()

  useEffect(() => {
    let isMounted = true
    getPage({ page: 1, fields: {}, query: queries.all }).then((res) => {
      if (isMounted) {
        setData(res.result)
        fireLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AdminLayout title={translation("Tickets")}>
      <Tabs>
        {data.map((item, key) => (
          <div title={item.title_panel} key={key}>
            <Tab number={item.number} key={key} />
          </div>
        ))}
      </Tabs>
    </AdminLayout>
  )
}

export default Tickets
