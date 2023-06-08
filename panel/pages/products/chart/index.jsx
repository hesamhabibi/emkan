import Desktop from "./desktop"
import Mobile from "./mobile"
import { useContext } from "react"
import { DeviceView } from "~/app/Context"

export const toInt = (field) => (field ? parseInt(field, 10) : null)

const Chart = ({ ...props }) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

export default Chart
