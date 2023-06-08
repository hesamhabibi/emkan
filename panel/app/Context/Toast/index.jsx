import React, { useEffect, useState, useRef, useContext } from "react"
import { TransitionGroup, Transition } from "react-transition-group"
import Styles from "./toast.module.scss"
import { DeviceView } from "~/app/Context"

export const ToastContext = React.createContext((msg, options = null) => {})

export default function Toast({ children }) {
  const [toasts, setToasts] = useState([])
  const lastToastLength = useRef(0)
  const toastID = useRef(0)

  const isDesktop = useContext(DeviceView)

  useEffect(() => {
    if (toasts.length <= lastToastLength.current) {
      lastToastLength.current = toasts.length
      return
    }
    lastToastLength.current = toasts.length
    setTimeout(() => {
      setToasts((prevState) => {
        const aux = Array.from(prevState)
        aux.pop()
        return aux
      })
    }, toasts[0]?.duration || 5000)
  }, [toasts])

  const animateEnter = (element) => {
    element.classList.add(Styles.toastEnter)
  }

  const animateExit = (element) => {
    element.classList.add(Styles.toastLeave)
  }

  const removeToast = (index) => {
    setToasts((prev) => {
      const aux = Array.from(prev)
      aux.splice(index, 1)
      return [...aux]
    })
  }

  const addToast = (
    toast,
    { status = null, duration = 5000, actions = null } = {}
  ) => {
    if (!actions) actions = []
    setToasts((prevState) => {
      const aux = Array.from(prevState)
      aux.push({
        msg: toast,
        id: toastID.current + 1,
        status,
        duration,
        actions,
      })
      return aux
    })
  }

  const toastItems = toasts.map(
    (toast, index) =>
      Boolean(toast?.msg) && (
        <Transition
          key={index}
          onEntering={animateEnter}
          onExit={animateExit}
          timeout={500}
          unmountOnExit
        >
          <div className={`${Styles.toast} ${Styles[toast.status] || ""}`}>
            {!!toast.actions.length && (
              <div className={Styles.actions}>
                {toast.actions.map((item, key) => (
                  <button
                    key={key}
                    style={{
                      backgroundColor: item.background,
                      color: item.color,
                    }}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            )}
            <span>{toast.msg}</span>
            <i
              onClick={removeToast.bind(this, index)}
              className="fas fa-times"
            />
          </div>
        </Transition>
      )
  )

  return (
    <>
      <div className={`${Styles.container} ${isDesktop ? "" : Styles.mobile}`}>
        <TransitionGroup component={null}>{toastItems}</TransitionGroup>
      </div>
      <ToastContext.Provider value={addToast}>{children}</ToastContext.Provider>
    </>
  )
}
