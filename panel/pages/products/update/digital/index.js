import AdminLayout from "@admin/Layout"
import { useContext } from "react"
import {DeviceView, TranslationContext} from "~/app/Context"
import dynamic from "next/dynamic"
import Loading from "~/pages/products/create/physical/loading"

const Desktop = dynamic(() => import("./desktop/wrapped"),
  { ssr: false, loading: Loading })

const Mobile = dynamic(() => import("./mobile/wrapped"),
  { ssr: false, loading: Loading })

export default function Create() {
  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)

  return (
    <AdminLayout title={translation("edit", "products")}>
      {
        isDesktop ? <Desktop />: <Mobile />
      }
    </AdminLayout>
  )
}
