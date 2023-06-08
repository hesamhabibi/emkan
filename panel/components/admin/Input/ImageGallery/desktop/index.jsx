import Button from "@admin/Button"
import { useContext, useEffect } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "./gallery.module.scss"
import ProgressBar from "@admin/Input/Image/ProgressBar"
import Text from "@admin/Input/Text"
import { ReactSortable } from "react-sortablejs"
import { sortableOptions } from "@admin/Table/desktop/sortable"
import { useDispatch } from "react-redux"
import { showImage } from "~/app/State/preview"

export default function ImageGallery({
  label,
  remove,
  callback,
  onChange,
  progress,
  value,
  input,
  setError,
  error,
  images,
  setImages,
  removeUploaded,
  onSort,
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
    const files = [...e.dataTransfer.files]

    if (!files.length) return
    if (images.length)
      setImages(files.map((item) => ({ image: item, alt: "", sort: 9 })))
    else
      setImages([
        ...files.map((item) => ({ image: item, alt: "", sort: 9 })),
        ...images,
      ])
  }

  const setMainImage = (key) => {
    value = value.map((item) => ({ ...item, main: false }))
    value[key].main = true
    onSort([...value])
  }

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
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className={Styles.formControl}
      >
        <div onClick={() => input.current.click()} className={Styles.addImage}>
          <span>
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
                <Text
                  className="w-100"
                  placeholder={translation("image text")}
                  validate={(onChange, e) => onChange(e.target.value)}
                  fieldState={{}}
                  field={{
                    value: image.alt,
                    onChange: (value) =>
                      setImages(() => {
                        images[key].alt = value
                        return [...images]
                      }),
                    onBlur: null,
                  }}
                />
                <div className="d-flex mr-auto">
                  <div
                    className={Styles.disabled}
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
                  <div className={Styles.imagePreview}>
                    <i
                      className={`fas fa-grip-vertical fa-lg ml-3 ${Styles.move}`}
                    />
                    <img
                      onClick={dispatch.bind(
                        this,
                        showImage(`${process.env.apiHost}${image.url}`)
                      )}
                      src={
                        error
                          ? "/images/not-found.png"
                          : image.url
                          ? `${process.env.apiHost}${image.url}`
                          : "/images/not-found.png"
                      }
                      width={50}
                      height={50}
                      alt={translation("image not found")}
                      onError={() => setError(true)}
                    />
                    <Text
                      className="w-100"
                      placeholder={translation("image text")}
                      validate={(onChange, e) => onChange(e.target.value)}
                      fieldState={{}}
                      field={{
                        value: image.alt,
                        onChange: (text) => {
                          value[key].alt = text
                          onSort([...value])
                        },
                        onBlur: null,
                      }}
                    />
                    <div className="mr-auto d-flex">
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
        {!!images.length && (
          <Button onClick={callback} loading={progress !== 0} type="success">
            {translation("Upload")}
            <i className="mr-2 fad fa-arrow-alt-from-bottom" />
          </Button>
        )}
      </div>
    </div>
  )
}
