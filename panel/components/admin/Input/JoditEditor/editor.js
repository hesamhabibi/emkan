import { Jodit } from "jodit"
import { useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { buttonsXS, buttonsSM, buttonsMD, buttons } from "./buttons"

import fa from "./lang/fa.json"
import axios from "axios"
import { UserContext } from "~/app/Context"

import Styles from "./jodit.module.scss"

const options = {
  enableDragAndDropFileToEditor: true,

  height: 300,

  i18n: {
    fa,
  },

  events: {
    // getIcon(name, control, clearName) {
    //   // console.log({ name, control, clearName })
    //
    //   return ""
    // },
  },
  buttonsXS,
  buttonsMD,
  buttonsSM,
  buttons,
}

const Editor = ({ onChange, onBlur, value, ...props }) => {
  const container = useRef(null)
  const imageInput = useRef(null)
  const editor = useRef(null)
  const user = useContext(UserContext)

  const [width, setWidth] = useState(0)

  const router = useRouter()

  const addImage = async (e) => {
    e.preventDefault()
    if (!e.target.files.length || !editor.current) return

    const formData = new FormData()

    formData.append("file", e.target.files[0])

    try {
      const res = await axios.post(
        `${process.env.apiHost}api/media/upload-text-editor-image`,
        formData,
        {
          headers: {
            token: typeof user === "object" ? JSON.parse(localStorage.getItem("user")).token : "",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            setWidth((data.loaded / data.total) * 100)
          },
        }
      )
      editor.current.selection.insertImage(
        `${process.env.apiHost}${res.data.data.url}`
      )
      setTimeout(() => setWidth(0), 1500)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    editor.current = new Jodit(container.current, {
      language: router.locale,
      ...options,
      buttons: [
        ...options.buttons,
        {
          iconURL: "/panel-img/icons/image-regular.svg",
          exec: function (editor) {
            imageInput.current.click()
          },
        },
      ],
    })

    editor.current.events.on("change", (value) => onChange(value))

    return () => {
      editor.current.destruct()
    }
  }, [])

  useEffect(() => {
    if (!editor.current || !value) return

    editor.current.value = value
  }, [editor, value])

  return (
    <>
      <input
        className="d-none"
        type="file"
        accept="image/*"
        onChange={addImage}
        ref={imageInput}
      />
      {!!width && (
        <div className={Styles.progress} style={{ width: `${width}%` }} />
      )}
      <div>
        <textarea ref={container} />
      </div>
    </>
  )
}

export default Editor
