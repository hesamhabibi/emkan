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
  error,
  remove,
  setError,
  label,
  video,
  videoRef,
}) {
  const translation = useContext(TranslationContext)

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
      <div className={Styles.formControl}>
        <div onClick={() => input.current.click()} className={Styles.addImage}>
          <span>
            <i className="fad fa-photo-video fa-2x" />
            <p>{translation(value ? "Edit Video" : "Add Video")}</p>
          </span>
        </div>
        {(video || value?.url) && (
          <>
            <div className={Styles.imagePreview}>
              <button
                onClick={remove}
                type="button"
                className={`${Styles.deleteAction} fas fa-trash-alt`}
              />
              <video
                ref={videoRef}
                // alt={translation("image not found")}
                onError={() => setError(true)}
                controls
              >
                <source
                  src={
                    error
                      ? "/images/not-found.png"
                      : video
                      ? URL.createObjectURL(video)
                      : value.url
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
                      : value.url
                      ? `${process.env.apiHost}${value.url}`
                      : null
                  }
                  type="video/ogg"
                />
              </video>
              {progress !== 0 && (
                <div className={Styles.Loading}>
                  <span>
                    <ProgressBar percent={progress} />
                  </span>
                </div>
              )}
              <div className={Styles.imageActions}>
                <Button
                  type="success"
                  loading={progress !== 0}
                  disabled={!changed}
                  onClick={callback}
                  style={{ marginRight: "5px" }}
                >
                  <i className="ml-1 fad fa-arrow-alt-from-bottom" />
                  {translation("Submit")}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
