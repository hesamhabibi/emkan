import Desktop from "./desktop"
import Mobile from "./mobile"
import { useContext } from "react"
import { DeviceView } from "~/app/Context"

const Comment = ({ ...props }) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

export default Comment
