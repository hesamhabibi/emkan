import { useContext } from "react"
import Styles from "./image.module.scss"
import Popup from "@admin/Popup"
import { TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import { closePopup, openPopup } from "~/app/State/popups"
import { useDispatch } from "react-redux"

export default function Desktop({
  callback,
  input,
  changed,
  onChange,
  progress,
  value,
  className,
  setChanged,
  label,
}) {
  const translation = useContext(TranslationContext)

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

  return (
    <div className={`${Styles.formGroup} ${className}`}>
      {Boolean(label) && <label>{label}</label>}
      <input
        ref={input}
        className={Styles.input}
        type="file"
        onChange={onChange}
        accept="text/plain, application/pdf"
      />
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className={Styles.formControl}
      >
        <div className={Styles.addImage}>
          <Button onClick={() => input.current.click()} type="primary">
            <i className={`fas ${value ? "fa-edit" : "fa-plus-circle"} ml-1`} />
            {translation(value ? "Edit File" : "Choose File")}
          </Button>
          {Boolean(Object.keys(value || {}).length) && (
            <>
              {changed && (
                <Button
                  onClick={callback}
                  disabled={progress !== 0}
                  type="success"
                  loading={progress !== 0}
                >
                  <i className="fas fa-cloud-upload ml-1" />
                  {translation("upload")}
                </Button>
              )}

              {value.url ? (
                <a href={`${process.env.apiHost}${value.url}`} target="_blank">
                  <Button type="info">
                    <i className="fas fa-eye ml-1" />
                    {translation("view")}
                  </Button>
                </a>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

Desktop.defaultProps = {
  className: "",
}
