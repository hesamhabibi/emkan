import { useContext, useRef, useState } from "react"
import Mobile from "./mobile"
import Desktop from "./desktop"
import axios from "axios"
import queries from "./queries"
import {
  DeviceView,
  ToastContext,
  TranslationContext,
  UserContext,
} from "~/app/Context"
import client from "~/app/apollo-client"
import Errors from "@admin/Input/Errors"
import Info from "@admin/Input/Info"

const cancelToken = axios.CancelToken.source()

export default function Video({
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  url,
  info,
  options,
  ...extra
}) {
  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)
  const fireToast = useContext(ToastContext)
  const user = useContext(UserContext)

  const [errors, setError] = useState(false)
  const [changed, setChanged] = useState(false)
  const [progress, setProgress] = useState(0)
  const [video, setVideo] = useState(null)

  const videoRef = useRef(null)

  const inputRef = useRef(null)

  const handleChange = (image) => {
    if (videoRef.current) videoRef.current.load()
    setError(false)
    if (!image.target.files[0]) return
    setVideo(image.target.files[0])
    inputRef.current.value = null
    setChanged(true)
  }

  const uploadImage = async () => {
    const formData = new FormData()
    // formData.append("alt", formGroup.getValues().alt);
    formData.append("file", video)
    formData.append("cancelToken", JSON.stringify(cancelToken))
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token:
            typeof user === "object"
              ? JSON.parse(localStorage.getItem("user")).token
              : "",
        },
        onUploadProgress: progressbar,
      })
      const data = res.data.data
      onChange({ url: data.url, media_id: data.id, alt: data.alt })
      fireToast(res.data.message, { status: "success" })
      setChanged(false)
    } catch (e) {
      fireToast(e.response?.data.message || translation("Problem occurred"), {
        status: "error",
      })
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

  return (
    <>
      {isDesktop ? (
        <Desktop
          {...options}
          onChange={handleChange}
          video={video}
          changed={changed}
          error={errors}
          setError={setError}
          videoRef={videoRef}
          value={value}
          callback={uploadImage}
          progress={progress}
          input={inputRef}
          setChanged={setChanged}
          remove={removeImage}
          {...extra}
        />
      ) : (
        <Mobile
          {...options}
          video={video}
          onChange={handleChange}
          changed={changed}
          error={errors}
          value={value}
          setError={setError}
          videoRef={videoRef}
          callback={uploadImage}
          progress={progress}
          input={inputRef}
          setChanged={setChanged}
          remove={removeImage}
          {...extra}
        />
      )}
      <Info text={info} />
      <Errors errors={error} />
    </>
  )
}
