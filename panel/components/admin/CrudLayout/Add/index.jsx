import { useContext } from "react"
import { DeviceView } from "~/app/Context"
import Styles from "./add.module.scss"

import Button from "@admin/Button"

export default function AddBtn({ callback, title, icon }) {
  const isDesktop = useContext(DeviceView)

  if (!isDesktop)
    return (
      <div className={`${Styles.add}`}>
        <Button type="success" onClick={callback}>
          <span>{title}</span>
          <i className={`${icon} mr-2`} />
        </Button>
      </div>
    )

  return null
}

AddBtn.defaultProps = {
  icon: "fas fa-plus-circle",
}
