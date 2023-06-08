import Mobile from "./mobile"
import Desktop from "./desktop"
import { useContext } from "react"
import { DeviceView } from "~/app/Context"

const Time = ({ ...props }) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

export default Time
