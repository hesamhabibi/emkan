import Mobile from "./mobile"
import Desktop from "./desktop"
import { useContext, useEffect, useRef } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"
import { useSelector } from "react-redux"

export default function ModalForms({
  loading,
  id,
  callback,
  state,
  form,
  hasInfo,
  ...props
}) {
  const isDesktop = useContext(DeviceView)
  const translation = useContext(TranslationContext)

  const tab = useSelector((state) => state.tabs.value[`${id}-tab`])

  const tabRef = useRef(null)

  const actions = [
    {
      name: translation("Cancel"),
      disabled: false,
      onClick: (close) => close(id),
    },
  ]
  if (callback) {
    actions[1] = {
      name: translation("Submit"),
      disabled: loading,
      onClick: callback,
    }
  }

  useEffect(() => {
    if (!tabRef.current) return

    tabRef.current.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [tab])

  return isDesktop ? (
    <Desktop
      id={id}
      formGroup={form}
      state={state}
      callback={callback}
      loading={loading}
      actions={actions}
      hasInfo={hasInfo}
      tabRef={tabRef}
      {...props}
    />
  ) : (
    <Mobile
      id={id}
      formGroup={form}
      state={state}
      callback={callback}
      loading={loading}
      hasInfo={hasInfo}
      actions={actions}
      tabRef={tabRef}
      {...props}
    />
  )
}

ModalForms.defaultProps = {
  id: "editForm",
}
