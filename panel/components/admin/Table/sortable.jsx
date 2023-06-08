import { useContext, useState } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"
import Desktop from "./desktop/sortable"
import Mobile from "./mobile/sortable"
import Empty from "@admin/Empty"

export default function Sortable({ data, button, onClick, ...props }) {
  const isDesktop = useContext(DeviceView)

  const [focusKey, setFocusKey] = useState(-1)

  if (!data?.length)
    return (
      <div className="mt-5">
        <Empty button={button} />
      </div>
    )

  const clicked = onClick
    ? (item, key) => {
        setFocusKey(key)
        onClick(item, key)
      }
    : null

  return isDesktop ? (
    <Desktop
      data={data}
      onClick={clicked}
      focusKey={focusKey}
      setFocusKey={setFocusKey}
      {...props}
    />
  ) : (
    <Mobile
      data={data}
      onClick={clicked}
      focusKey={focusKey}
      setFocusKey={setFocusKey}
      {...props}
    />
  )
}
