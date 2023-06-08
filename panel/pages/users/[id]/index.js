import { useContext, useState } from "react"
import { TranslationContext } from "~/app/Context"
import Addresses from "./addresses"
import AdminLayout from "@admin/Layout"
import AddBtn from "@admin/CrudLayout/Add"
import Button from "@admin/Button"

export default function UserInfo() {
  const translation = useContext(TranslationContext)

  const [action, setAction] = useState({})

  return (
    <AdminLayout
      action={
        <Button type="success" onClick={action.onClick}>
          <i className="fas fa-plus-circle ml-1" />
          {action.title}
        </Button>
      }
      title={translation("Addresses", "user")}
    >
      {/*<Tab>*/}
      {/*<div title={translation("Information", "user")}>test</div>*/}
      <div title={translation("Addresses", "user")}>
        <Addresses setAction={setAction} />
      </div>
      {/*</Tab>*/}
      <AddBtn title={action.title} callback={action.onClick} />
    </AdminLayout>
  )
}
