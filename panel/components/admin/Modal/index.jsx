import { useContext, useEffect, useRef, useState } from "react"

import Desktop from "./desktop"
import Mobile from "./mobile"
import { ToastContext, TranslationContext, DeviceView } from "~/app/Context"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "~/app/State/modal"
import { resetTab } from "~/app/State/tabs"

export default function Modal({ id, ...props }) {
  const state = useSelector((state) => state.modals.value[id])
  const dispatch = useDispatch()

  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)
  const fireToast = useContext(ToastContext)
  const escPressedCount = useRef(0)

  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    setTimeout(() => {
      dispatch(closeModal(id))
      setClosing(false)
    }, 200)
  }

  const keyDown = (e) => {
    if (e.key === "Escape") {
      if (escPressedCount.current > 0) {
        close()
        escPressedCount.current = 0
      } else {
        escPressedCount.current++
        fireToast(translation("Press again to exit"))
        setTimeout(() => (escPressedCount.current = 0), 2000)
      }
    }
  }

  useEffect(() => {
    if (state) {
      document.addEventListener("keydown", keyDown)
      dispatch(resetTab(`${id}-tab`))
    }

    return () => {
      document.removeEventListener("keydown", keyDown)
    }
  }, [state])

  return state ? (
    isDesktop ? (
      <Desktop {...props} closeModal={close} closing={closing} />
    ) : (
      <Mobile {...props} closeModal={close} closing={closing} />
    )
  ) : null
}
