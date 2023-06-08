import { useContext, useState } from "react"
import Styles from "./image.module.scss"
import ProgressBar from "../ProgressBar"
import { TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import Text from "@admin/Input/Text"
import { showImage } from "~/app/State/preview"
import { useDispatch } from "react-redux"
import { PopupManual } from "@admin/Popup"
import { closePopup, openPopup } from "~/app/State/popups"

export default function Mobile({
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
  change,
  info,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const [opened, setOpened] = useState(false)

  const popupActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => {
        setOpened(false)
        value.alt = ""
        change({ ...value })
      },
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: () => setOpened(false),
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
      <div className={Styles.formControl}>
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
              <div className="d-flex align-items-center">
                <img
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
                  width={50}
                  height={50}
                  src={
                    error
                      ? "/images/not-found.png"
                      : value?.tmp
                      ? URL.createObjectURL(value?.tmp)
                      : value?.url
                      ? `${process.env.apiHost}${value?.url}`
                      : "/images/not-found.png"
                  }
                  // alt={translation("image not found")}
                  onError={() => setError(true)}
                />
              </div>

              {progress !== 0 && (
                <div className={Styles.Loading}>
                  <span>
                    <ProgressBar percent={progress} />
                  </span>
                </div>
              )}
              <div className="d-flex align-items-center justify-content-end">
                <button
                  onClick={setOpened.bind(null, true)}
                  type="button"
                  className={`fas fa-cogs ${Styles.settings}`}
                />
                <button
                  onClick={remove}
                  type="button"
                  className={`${Styles.deleteAction} fas fa-trash-alt`}
                />
              </div>
            </div>
            {changed && (
              <Button
                type="success"
                className="mt-2"
                loading={progress !== 0}
                onClick={callback}
                style={{ marginRight: "5px" }}
              >
                <i className="ml-1 fad fa-arrow-alt-from-bottom" />
                {translation("Upload")}
              </Button>
            )}
          </>
        )}
      </div>
      <PopupManual
        title={translation("Advanced")}
        status="info"
        actions={popupActions}
        opened={opened}
        setOpened={setOpened}
      >
        <Text
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
      </PopupManual>
    </div>
  )
}
