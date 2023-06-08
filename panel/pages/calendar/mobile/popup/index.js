import { useContext, useEffect, useRef, useState } from "react"
import Button from "@admin/Button"
import Styles from "./popup.module.scss"
import Tag from "@admin/Tag"
import Input from "@admin/Input"
import { TranslationContext } from "~/app/Context"

export default function Popup({
  popup,
  control,
  setPopup,
  callback,
  state,
  data,
}) {
  const popupRef = useRef(null)
  const [mouseDown, setMouseDown] = useState(false)

  const translation = useContext(TranslationContext)

  const setStyles = (e) => {
    popupRef.current.style.top =
      e.pageY + popupRef.current.clientHeight / 2 - 14.4 + "px"
    popupRef.current.style.left = e.pageX + "px"
  }

  useEffect(() => {
    if (mouseDown) document.addEventListener("mousemove", setStyles)
    else document.removeEventListener("mousemove", setStyles)
    return () => {
      document.removeEventListener("mousemove", setStyles)
    }
  }, [mouseDown])

  const movePopup = (val) => {
    setMouseDown(val)
  }

  return (
    <div className={`${popup ? Styles.opened : ""} ${Styles.container}`}>
      <div ref={popupRef} className={`${Styles.popup}`}>
        <div
          onMouseDown={movePopup.bind(this, true)}
          onMouseUp={movePopup.bind(this, false)}
          className={Styles.header}
        >
          <i onClick={() => setPopup(false)} className="far fa-times" />
        </div>

        <div className={Styles.content}>
          <div className="text-center">
            <Tag type="primary">{state}</Tag>
          </div>

          <div className="mt-3">
            <Input
              name="title"
              control={control}
              label={translation("title")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="textarea"
              control={control}
              name="description"
              label={translation("description")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="time"
              control={control}
              name="start_date"
              label={translation("start_date")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="time"
              control={control}
              name="end_date"
              label={translation("end_date")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="select-multiple"
              data={data}
              name="access_user_ids"
              control={control}
              label={translation("users")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="toggle"
              label={translation("can_edit")}
              control={control}
              data={[]}
              name="can_edit"
            />
          </div>
          <div className="mt-3">
            <Button type="success" onClick={callback} className="w-100">
              ذخیره یادآور
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
