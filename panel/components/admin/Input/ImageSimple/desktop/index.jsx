import { useContext, useState } from "react"
import Styles from "./image.module.scss"
import { PopupManual } from "@admin/Popup"
import { TranslationContext } from "~/app/Context"
import Button from "@admin/Button"

export default function Desktop({
  callback,
  input,
  changed,
  onChange,
  progress,
  value,
  className,
  setChanged,
  error,
  setError,
  label,
}) {
  const translation = useContext(TranslationContext)

  const [popup, setPopup] = useState(false)

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragEnter = (e) => {
    e.preventDefault()
  }

  const dragLeave = (e) => {
    e.preventDefault()
  }

  const fileDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    onChange(files[0])
    setChanged(true)
  }

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Close"),
      onClick: () => setPopup(false),
    },
  ]

  return (
    <div className={`${Styles.formGroup} ${className}`}>
      {Boolean(label) && <label>{label}</label>}
      <input
        ref={input}
        className={Styles.input}
        type="file"
        onChange={onChange}
        accept="image/*"
      />
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className={Styles.formControl}
      >
        <div className={Styles.addImage}>
          <span className="d-flex">
            <Button onClick={() => input.current.click()} type="primary">
              <i
                className={`fas ${value ? "fa-edit" : "fa-plus-circle"} ml-1`}
              />
              <span>{translation(value ? "Edit Image" : "Add Image")}</span>
            </Button>
            {Boolean(Object.keys(value || {}).length) && (
              <>
                {!error && value.tmp && changed && (
                  <>
                    <Button
                      onClick={callback}
                      disabled={progress !== 0}
                      type="success"
                      loading={progress !== 0}
                    >
                      <i className="fas fa-cloud-upload ml-1" />
                      {translation("upload")}
                    </Button>
                  </>
                )}
                <Button onClick={setPopup.bind(this, true)} type="orange">
                  <i className="fas fa-eye ml-1" />
                  {translation("view")}
                </Button>
              </>
            )}
          </span>
        </div>
      </div>
      {Boolean(value) && (
        <PopupManual
          setOpened={setPopup}
          opened={popup}
          className="text-center"
          title={translation("view image")}
          id="view-actions"
          actions={actions}
          status="info"
        >
          <img
            src={
              error
                ? "/images/not-found.png"
                : value.url
                ? `${process.env.apiHost}${value.url}`
                : value.tmp
                ? URL.createObjectURL(value.tmp)
                : null
            }
            className={Styles.imagePreview}
            alt={translation("image not found")}
            onError={(e) => setError(true)}
          />
        </PopupManual>
      )}
    </div>
  )
}

Desktop.defaultProps = {
  className: "",
}
