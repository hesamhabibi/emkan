import AdminLayout from "@admin/Layout"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Wrapper from "./wrapper"

const Attributes = () => {
  const translation = useContext(TranslationContext)

  return (
    <AdminLayout title={translation("Attributes")}>
      <Wrapper />
    </AdminLayout>
  )
}

export default Attributes
