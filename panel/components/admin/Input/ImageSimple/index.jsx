import { useContext, useRef, useState } from "react"
import Mobile from "./mobile"
import Desktop from "./desktop"
import axios from "axios"
import queries from "./queries"
import { DeviceView, ToastContext, TranslationContext, UserContext } from "~/app/Context"
import client from "~/app/apollo-client"

const cancelToken = axios.CancelToken.source()

export default function ImageSimple({
  field: { onChange, value, onBlur },
  fieldState: { invalid, ...props },
  url,
  options,
  ...extra
}) {
  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)
  const fireToast = useContext(ToastContext)
  const user = useContext(UserContext)


  const [error, setError] = useState(false)
  const [changed, setChanged] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  const handleChange = (image) => {
    setError(false)
    if (!image.target.files[0]) return
    onChange({ ...value, tmp: image.target.files[0] })
    setChanged(true)
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", value.tmp)
    formData.append("cancelToken", JSON.stringify(cancelToken))
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": process.env.apiHost,
          token: typeof user === "object" ? JSON.parse(localStorage.getItem("user")).token : "",
        },
        onUploadProgress: progressbar,
      })
      const data = res.data.data
      onChange({ url: data.url, media_id: data.id, alt: data.alt })
      fireToast(res.data.message, { status: "success" })
      setChanged(false)
    } catch (e) {
      fireToast(e.response.data.message || translation("Problem occurred"), {
        status: "error",
      })
      console.log(e)
    }
    setProgress(0)
  }

  const deleteImage = async () => {
    const res = await client.mutate({
      mutation: queries.delete,
      variables: { id: value.media_id },
    })

    fireToast(res.data.result.message)
  }

  const removeImage = () => {
    if (value.url)
      deleteImage().then(() => {
        onChange({})
        setChanged(true)
      })
    inputRef.current.value = null
    onChange({})
  }

  const progressbar = (data) =>
    setProgress({ total: data.total, loaded: data.loaded })

  return isDesktop ? (
    <Desktop
      {...options}
      {...extra}
      onChange={handleChange}
      changed={changed}
      error={error}
      setError={setError}
      value={value}
      callback={uploadImage}
      progress={progress}
      input={inputRef}
      setChanged={setChanged}
      remove={removeImage}
    />
  ) : (
    <Mobile
      {...extra}
      {...options}
      onChange={handleChange}
      changed={changed}
      error={error}
      value={value}
      setError={setError}
      callback={uploadImage}
      progress={progress}
      input={inputRef}
      setChanged={setChanged}
      remove={removeImage}
    />
  )
}

ImageSimple.defaultProps = {
  url: `${process.env.apiHost}api/media/upload-image`,
}
