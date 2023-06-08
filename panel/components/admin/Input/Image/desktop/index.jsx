import { useContext } from "react"
import Styles from "./image.module.scss"
import ProgressBar from "../ProgressBar"
import { TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import { useDispatch } from "react-redux"
import { showImage } from "~/app/State/preview"
import Text from "@admin/Input/Text"

export default function Desktop({
  callback,
  input,
  changed,
  onChange,
  progress,
  value,
  className,
  setChanged,
  remove,
  error,
  setError,
  label,
  change,
  info,
}) {
  const translation = useContext(TranslationContext)

  const dispatch = useDispatch()

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
        accept="image/*"
      />
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className={Styles.formControl}
      >
        <div onClick={() => input.current.click()} className={Styles.addImage}>
          <span className="d-flex flex-column">
            <i className="fal fa-image fa-2x" />
            {translation(value?.url || value?.tmp ? "Edit Image" : "Add Image")}
            <p className={Styles.muted}>
              {!!info && <small className="ml-2">{translation(info)}</small>}
              <small>({translation("maximum 5mb")})</small>
            </p>
          </span>
        </div>
        {(value?.url || value?.tmp) && (
          <>
            <div className={Styles.imagePreview}>
              {progress !== 0 && (
                <div className={Styles.Loading}>
                  <span>
                    <ProgressBar percent={progress} />
                  </span>
                </div>
              )}
              <div className="d-flex align-items-center w-100">
                <img
                  width={50}
                  height={50}
                  onClick={dispatch.bind(
                    this,
                    showImage(
                      error
                        ? "/images/not-found.png"
                        : value.tmp
                        ? URL.createObjectURL(value.tmp)
                        : value.url
                        ? `${process.env.apiHost}${value.url}`
                        : "/images/not-found.png"
                    )
                  )}
                  src={
                    error
                      ? "/images/not-found.png"
                      : value?.tmp
                      ? URL.createObjectURL(value?.tmp)
                      : value?.url
                      ? `${process.env.apiHost}${value?.url}`
                      : "/images/not-found.png"
                  }
                  onError={() => setError(true)}
                />
                <Text
                  className="mr-2 w-100"
                  placeholder={translation("image text")}
                  validate={(onChange, e) => onChange(e.target.value)}
                  fieldState={{}}
                  field={{
                    value: value?.alt,
                    onChange: (text) => {
                      value.alt = text
                      change({ ...value })
                    },
                    onBlur: null,
                  }}
                />
              </div>
              <div className="mr-auto">
                <button
                  onClick={remove}
                  type="button"
                  className={`${Styles.deleteAction} fas fa-trash-alt`}
                />
              </div>
            </div>
            {changed && (
              <div className={Styles.imageActions}>
                <Button
                  onClick={callback}
                  style={{ marginRight: 2 }}
                  disabled={progress !== 0}
                  type="success"
                  className="w-100 mt-2"
                  loading={progress !== 0}
                >
                  {translation("Upload")}
                  <i className="mr-2 fad fa-arrow-alt-from-bottom" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
