import Button from "@admin/Button"
import { useContext, useState } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "./gallery.module.scss"
import ProgressBar from "@admin/Input/Image/ProgressBar"
import Text from "@admin/Input/Text"
import { ReactSortable } from "react-sortablejs"
import { sortableOptions } from "@admin/Table/desktop/sortable"
import { useDispatch } from "react-redux"
import { showImage } from "~/app/State/preview"
import { PopupManual } from "@admin/Popup"

export default function Mobile({
  label,
  remove,
  callback,
  onChange,
  progress,
  value,
  setImages,
  input,
  setError,
  error,
  images,
  removeUploaded,
  onSort,
  info,
}) {
  const translation = useContext(TranslationContext)

  const [opened, setOpened] = useState(false)
  const [focus, setFocus] = useState({ state: "image", key: -1 })

  const dispatch = useDispatch()

  const setMainImage = (key) => {
    value = value.map((item) => ({ ...item, main: false }))
    value[key].main = true
    onSort([...value])
  }

  const focusImage = (key) => {
    setFocus({ state: "image", key })
    setOpened(true)
  }

  const focusUploaded = (key) => {
    setFocus({ state: "uploaded", key })
    setOpened(true)
  }

  const popupActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => {
        setOpened(false)
        if (focus.state !== "image") {
          value[focus.key].alt = ""
          onSort([...value])
        } else {
          images[focus.key].alt = ""
          setImages([...images])
        }
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
    <div>
      <label>{label}</label>
      <input
        ref={input}
        className={Styles.input}
        type="file"
        multiple
        onChange={onChange.bind(this)}
        accept="image/*"
      />
      <div className={Styles.formControl}>
        <div onClick={() => input.current.click()} className={Styles.addImage}>
          <span className="d-flex flex-column justify-content-center align-items-center">
            <i className="fal fa-image fa-2x" />
            <span>{translation("Add Image")}</span>
            <p className={Styles.muted}>
              <small className="ml-2">{translation(info)}</small>
              <small>({translation("maximum 5mb")})</small>
            </p>
          </span>
        </div>
        <div className={Styles.imageCard}>
          {images.map((image, key) => (
            <span key={key}>
              <div className={Styles.imagePreview}>
                <i
                  className={`fas fa-grip-vertical fa-lg ml-3 ${Styles.move} ${Styles.disabled}`}
                />
                <img
                  onClick={dispatch.bind(
                    this,
                    showImage(URL.createObjectURL(image.image))
                  )}
                  width={50}
                  height={50}
                  src={URL.createObjectURL(image.image)}
                  alt={translation("image not found")}
                />
                <div className="d-flex mr-auto">
                  <button
                    onClick={focusImage.bind(this, key)}
                    type="button"
                    className={`${Styles.settings} fas fa-cogs`}
                  />
                  <div
                    data-tooltip-location="right"
                    data-tooltip={translation("delete image")}
                  >
                    <button
                      onClick={remove.bind(this, key)}
                      type="button"
                      className={`${Styles.deleteAction} fas fa-trash-alt`}
                    />
                  </div>
                </div>
                {Boolean(Object.keys(progress).length) && progress.key === key && (
                  <div className={Styles.Loading}>
                    <span>
                      <ProgressBar percent={progress} />
                    </span>
                  </div>
                )}
              </div>
            </span>
          ))}
          <ReactSortable
            {...sortableOptions}
            list={(value || []).sort((a, b) => a.sort - b.sort)}
            setList={(values) =>
              onSort([
                ...values.map((item, key) => ({
                  ...item,
                  sort: key,
                  chosen: undefined,
                  selected: undefined,
                })),
              ])
            }
          >
            {(value || [])
              .sort((a, b) => a.sort - b.sort)
              .map((image, key) => (
                <span key={key}>
                  <div className={`${Styles.imagePreview} ${Styles.uploaded}`}>
                    <i
                      className={`fas fa-grip-vertical fa-lg ml-3 ${Styles.move}`}
                    />
                    <img
                      onClick={dispatch.bind(
                        this,
                        showImage(`${process.env.apiHost}${image.url}`)
                      )}
                      width={50}
                      height={50}
                      src={
                        error
                          ? "/images/not-found.png"
                          : image.url
                          ? `${process.env.apiHost}/${image.url}`
                          : "/images/not-found.png"
                      }
                      alt={translation("image not found")}
                      onError={() => setError(true)}
                    />
                    <div className="mr-auto d-flex">
                      <button
                        onClick={focusUploaded.bind(this, key)}
                        type="button"
                        className={`${Styles.settings} fas fa-cogs`}
                      />
                      <div
                        data-tooltip-location="right"
                        data-tooltip={translation("main image")}
                      >
                        <button
                          onClick={setMainImage.bind(this, key)}
                          type="button"
                          className={`${Styles.mainAction} ${
                            image.main ? "fas fa-check-square" : "far fa-square"
                          } fa-lg`}
                        />
                      </div>
                      <button
                        onClick={removeUploaded.bind(this, image, key)}
                        type="button"
                        className={`${Styles.deleteAction} fas fa-trash-alt`}
                      />
                    </div>

                    {Boolean(Object.keys(progress).length) &&
                      progress.key === key && (
                        <div className={Styles.Loading}>
                          <span>
                            <ProgressBar percent={progress} />
                          </span>
                        </div>
                      )}
                  </div>
                </span>
              ))}
          </ReactSortable>
        </div>
        {!!images?.length && (
          <div>
            <Button
              onClick={callback}
              loading={progress !== 0}
              className="w-100"
              type="success"
            >
              <i className="ml-1 fad fa-arrow-alt-from-bottom" />
              {translation("Upload")}
            </Button>
          </div>
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
            value:
              focus.state === "image"
                ? images[focus.key]?.alt
                : value[focus.key]?.alt,
            onChange: (text) => {
              if (focus.state === "image") {
                images[focus.key].alt = text
                setImages([...images])
              } else {
                value[focus.key].alt = text
                onSort([...value])
              }
            },
            onBlur: null,
          }}
        />
      </PopupManual>
    </div>
  )
}
