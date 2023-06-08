import { useContext } from "react"
import { DeviceView } from "~/app/Context"
import Desktop from "./desktop"
import Mobile from "./mobile"

const Modal = ({ ...props }) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

export default Modal
