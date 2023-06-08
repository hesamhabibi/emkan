import { useContext } from "react"
import { DeviceView } from "~/app/Context"
import Mobile from "./mobile"
import Desktop from "./desktop"

const Date = ({ ...props }) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

export default Date
