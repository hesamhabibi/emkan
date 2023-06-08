import { useContext, useEffect, useRef, useState } from "react"
import {
  DeviceView,
  ToastContext,
  TranslationContext,
  UserContext,
} from "~/app/Context"
import Desktop from "./desktop"
import Mobile from "./mobile"
import axios from "axios"
import Errors from "@admin/Input/Errors"
import client from "~/app/apollo-client"
import { gql } from "@apollo/client"

export default function ImageGallery({
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  url,
  info,
  ...extra
}) {
  const isDesktop = useContext(DeviceView)
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)
  const user = useContext(UserContext)

  const [changed, setChanged] = useState(true)
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [errors, setError] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    if (!e.target?.files.length) return
    const files = [...e.target.files]
    if (images.length)
      setImages([...files.map((item) => ({ image: item, alt: "" })), ...images])
    else setImages(files.map((item) => ({ image: item, alt: "" })))
    inputRef.current.value = null
    setChanged(true)
  }

  const progressbar = (key, data) =>
    setProgress({ total: data.total, loaded: data.loaded, key })

  useEffect(() => {
    setChanged(true)
  }, [mainImage])

  const uploadImage = async (image, key) => {
    const formData = new FormData()
    formData.append("file", image.image)
    formData.append("alt", image.alt)
    formData.append("main", !!image.main)
    let data = {}
    try {
      const res = await axios.post(url, formData, {
        headers: {
          token: typeof user === "object" ? JSON.parse(localStorage.getItem("user")).token : "",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressbar.bind(this, key),
      })
      data = res.data.data
      setChanged(false)
      setTimeout(() => setProgress(0), 500)
    } catch (e) {
      fireToast(e.response?.data?.message || translation("Problem occurred"), {
        status: "error",
      })
      setProgress(0)
      return false
    }

    return {
      url: data.url,
      media_id: data.id,
      alt: data.alt,
      sort: 9,
      main: data.main,
    }
  }

  const uploadImages = async () => {
    const data = []
    for (let i = 0; i < images.length; i++) {
      const res = await uploadImage(images[i], i)
      if (!res) {
        onChange([...(value || []), ...data])
        setImages((prev) => {
          prev.splice(0, i)
          return [...prev]
        })
        return
      }
      if (i === 0 && (value || []).findIndex((item) => item.main) === -1)
        res.main = true
      data.push(res)
    }
    setImages([])
    onChange([...(value || []), ...data])
    fireToast(translation("Image Uploaded"), {
      status: "success",
    })
  }

  const removeUploaded = async (item, key) => {
    try {
      await client.mutate({
        mutation: gql`
          mutation ($id: ID) {
            result: deleteMedia(id: $id) {
              success
              message
            }
          }
        `,
        variables: { id: item.media_id },
      })
      value.splice(key, 1)
      onChange([...value])
    } catch (e) {
      console.log(e)
    }
  }

  const removeImage = (id) => {
    images.splice(id, 1)
    setImages([...images])
    setChanged(true)
  }

  return (
    <>
      {isDesktop ? (
        <Desktop
          {...extra}
          remove={removeImage}
          removeUploaded={removeUploaded}
          images={images}
          callback={uploadImages}
          error={errors}
          setImages={setImages}
          setError={setError}
          onChange={handleChange}
          changed={changed}
          progress={progress}
          input={inputRef}
          setMain={setMainImage}
          onSort={onChange}
          main={mainImage}
          value={value}
          info={info}
        />
      ) : (
        <Mobile
          {...extra}
          remove={removeImage}
          removeUploaded={removeUploaded}
          callback={uploadImages}
          onChange={handleChange}
          input={inputRef}
          changed={changed}
          onSort={onChange}
          setImages={setImages}
          images={images}
          progress={progress}
          error={errors}
          setError={setError}
          main={mainImage}
          setMain={setMainImage}
          value={value}
          info={info}
        />
      )}
      <Errors errors={error} />
    </>
  )
}

ImageGallery.defaultProps = {
  info: "image info",
}
