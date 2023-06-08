import { useContext } from "react"
import Styles from "./image.module.scss"
import ProgressBar from "../ProgressBar"
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
  remove,
  error,
  setError,
  label,
  video,
  videoRef,
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
      <label>{label}</label>
      <input
        ref={input}
        className={Styles.input}
        type="file"
        onChange={onChange}
        accept="video/*"
      />
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className={Styles.formControl}
      >
        <div onClick={() => input.current.click()} className={Styles.addImage}>
          <span>
            <i className="fad fa-photo-video fa-2x" />
            <p>
              {translation(
                value?.tmp || value?.url ? "Edit Video" : "Add Video"
              )}
            </p>
          </span>
        </div>
        {(video || value?.url) && (
          <>
            <div className={Styles.imagePreview}>
              <i
                onClick={remove}
                className={`${Styles.deleteAction} fas fa-trash-alt`}
              />
              <video ref={videoRef} onError={() => setError(true)} controls>
                <source
                  src={
                    error
                      ? "/images/not-found.png"
                      : video
                      ? URL.createObjectURL(video)
                      : value?.url
                      ? `${process.env.apiHost}${value.url}`
                      : null
                  }
                  type="video/mp4"
                />
                <source
                  src={
                    error
                      ? "/images/not-found.png"
                      : video
                      ? URL.createObjectURL(video)
                      : value?.url
                      ? `${process.env.apiHost}${value.url}`
                      : null
                  }
                  type="video/ogg"
                />
              </video>
              <div className={Styles.imageActions}>
                {!error && (
                  <>
                    <Button
                      onClick={callback}
                      style={{ marginRight: 2 }}
                      disabled={!changed || progress !== 0}
                      type="success"
                      loading={progress !== 0}
                    >
                      {translation("Submit")}
                    </Button>
                  </>
                )}
              </div>
              {progress !== 0 && (
                <div className={Styles.Loading}>
                  <span>
                    <ProgressBar percent={progress} />
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
