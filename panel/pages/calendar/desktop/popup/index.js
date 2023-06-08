import { useContext, useEffect, useRef, useState } from "react"
import Button from "@admin/Button"
import Styles from "./popup.module.scss"
import Tag from "@admin/Tag"
import Input from "@admin/Input"
import { TranslationContext } from "~/app/Context"
import Shield from "@admin/Shield"

export default function Popup({
  popup,
  control,
  setPopup,
  callback,
  state,
  data,
  isowner,
  getValues,
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

          <Shield id="calendar_title_field">
            <div className="mt-1">
              <Input
                name="title"
                control={control}
                label={translation("title")}
              />
            </div>
          </Shield>
          <Shield id="calendar_description_field">
            <div className="mt-1">
              <Input
                type="textarea"
                control={control}
                name="description"
                label={translation("description")}
              />
            </div>
          </Shield>
          <Shield id="calendar_start_date_field">
            <div className="mt-1">
              <Input
                type="time"
                control={control}
                name="start_date"
                label={translation("start_date")}
              />
            </div>
          </Shield>
          <Shield id="calendar_end_date_field">
            <div className="mt-1">
              <Input
                type="time"
                control={control}
                name="end_date"
                label={translation("end_date")}
              />
            </div>
          </Shield>
          {isowner && getValues().is_owner && (
            <Shield id="calendar_access_user_ids_field">
              <div className="mt-1">
                <Input
                  type="select-multiple"
                  data={data}
                  name="access_user_ids"
                  control={control}
                  label={translation("users")}
                />
              </div>
              <div className="mt-1">
                <Input
                  type="toggle"
                  label={translation("can_edit")}
                  control={control}
                  data={[
                    {
                      name: translation("True"),
                      color: "#3ECF8E",
                      id: true,
                    },
                    {
                      name: translation("False"),
                      color: "#EC6060",
                      id: false,
                    },
                  ]}
                  name="can_edit"
                />
              </div>
            </Shield>
          )}
          <div className="mt-1">
            <Button type="success" onClick={callback} className="w-100">
              ذخیره یادآور
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
