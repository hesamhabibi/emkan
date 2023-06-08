import { useController } from "react-hook-form"
import Styles from "./image.module.scss"

const Image = ({ label, control, url }) => {
  const {} = useController({
    name: "media",
    control,
  })
  return <div className={Styles.container}></div>
}

export default Image
