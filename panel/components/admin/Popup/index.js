import Styles from "./popup.module.scss"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closePopup } from "~/app/State/popups"

export default function Popup({
  id,
  actions,
  title,
  children,
  status,
  className,
}) {
  const show = useSelector((state) => state.popups.value[id])
  const dispatch = useDispatch()

  const popup = useRef(null)

  const removeToggle = (e) => {
    if (popup.current && !popup.current.contains(e.target))
      dispatch(closePopup(id))
  }

  const keyDown = (e) => {
    switch (e.key) {
      case "Enter":
        return actions[actions.length - 1].onClick()

      case "Escape":
        return dispatch(closePopup(id))
    }
  }

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", keyDown)
    }
    return () => {
      document.removeEventListener("keydown", keyDown)
    }
  }, [show])

  return (
    <div
      onClick={removeToggle}
      className={`${Styles.popup} ${show ? Styles.show : ""}`}
    >
      <div ref={popup} className={Styles.card}>
        <div className={Styles[`title-${status}`]}>
          <h6>{title}</h6>
        </div>
        <div className={`${Styles.body} ${className}`}>{children}</div>

        <div className={Styles.footer}>
          {actions.map((btn, key) => {
            return (
              <button
                key={key}
                type="button"
                style={{
                  boxShadow: btn.boxShadow,
                  background: btn.background,
                  color: btn.color,
                }}
                onClick={btn.onClick}
              >
                {btn.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function PopupManual({
  actions,
  title,
  children,
  status,
  className,
  opened,
  setOpened,
}) {
  const popup = useRef(null)

  const removeToggle = (e) => {
    if (popup.current && !popup.current.contains(e.target)) setOpened(false)
  }

  const keyDown = (e) => {
    switch (e.key) {
      case "Enter":
        return actions[actions.length - 1].onClick()

      case "Escape":
        return setOpened(false)
    }
  }

  useEffect(() => {
    if (opened) {
      document.addEventListener("keydown", keyDown)
    }
    return () => {
      document.removeEventListener("keydown", keyDown)
    }
  }, [opened])

  return (
    <div
      onClick={removeToggle}
      className={`${Styles.popup} ${opened ? Styles.show : ""}`}
    >
      <div ref={popup} className={Styles.card}>
        <div className={Styles[`title-${status}`]}>
          <h6>{title}</h6>
        </div>
        <div className={`${Styles.body} ${className}`}>{children}</div>

        <div className={Styles.footer}>
          {actions.map((btn, key) => {
            return (
              <button
                key={key}
                type="button"
                style={{
                  boxShadow: btn.boxShadow,
                  background: btn.background,
                  color: btn.color,
                }}
                onClick={btn.onClick}
              >
                {btn.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Popup.defaultProps = {
  className: "",
}
