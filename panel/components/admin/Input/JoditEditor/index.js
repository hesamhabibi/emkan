import dynamic from "next/dynamic"
import Errors from "@admin/Input/Errors"

const Editor = dynamic(() => import("./editor"), { ssr: false })

const JoditEditor = ({
  label,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  ...extra
}) => {
  return (
    <>
      <label>{label}</label>
      <Editor onChange={onChange} value={value} onBlur={onBlur} {...extra} />
      <Errors errors={error} />
    </>
  )
}

export default JoditEditor
