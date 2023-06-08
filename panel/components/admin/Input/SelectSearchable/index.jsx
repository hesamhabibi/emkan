import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./select.module.scss"
import Errors from "@admin/Input/Errors"
import { TranslationContext } from "~/app/Context"
import Info from "@admin/Input/Info"
import Text from "@admin/Input/Text"

export default function SelectSearchable({
  label,
  data,
  options,
  info,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  placeholder,
}) {
  const translation = useContext(TranslationContext)

  const [focused, setFocused] = useState(false)
  const [search, setSearch] = useState("")

  const selectBox = useRef(null)

  const changeValue = (item) => {
    if (item.disabled) return
    onChange(item.id)
    setFocused(false)
    setSearch("")
  }

  const onClickRemove = (e) => {
    if (selectBox.current && !selectBox.current.contains(e.target))
      setFocused(false)
  }

  useEffect(() => {
    focused
      ? document.addEventListener("click", onClickRemove)
      : document.removeEventListener("click", onClickRemove)

    return () => {
      document.removeEventListener("click", onClickRemove)
    }
  }, [focused])

  const filtered = data.filter((item) => (item.name || "")?.includes(search))

  return (
    <>
      {Boolean(label) && <label>{label}</label>}
      <div ref={selectBox} className={Styles.formGroup}>
        <div
          className={`${Styles.formSelect} ${invalid ? Styles.invalid : ""}`}
        >
          <span className={Styles.icon}>
            <i
              className={`far fa-angle-down ${focused ? "fa-rotate-180" : ""}`}
            />
          </span>
          <p
            className={`${Styles.formControl} ${focused ? Styles.focus : ""}`}
            onClick={setFocused.bind(this, !focused)}
            {...options}
          >
            {(typeof value === "object"
              ? data.find(
                (item) => JSON.stringify(item.id) === JSON.stringify(value)
              )
              : data.find((item) => (String(item.id) === String(value)))
            )?.name ||
              placeholder ||
              ""}
          </p>
        </div>

        <ul
          className={`${Styles.selectDropDown} ${focused ? Styles.active : ""}`}
        >
          <li className={Styles.search}>
            <Text
              placeholder={translation("search")}
              field={{ value: search, onChange: setSearch }}
              validate={(callback, e) => callback(e.target.value)}
              fieldState={{}}
            />
          </li>
          {(filtered.length
            ? filtered
            : [{ name: translation("no record"), disabled: true }]
          ).map((item, key) => (
            <li
              key={key}
              onClick={changeValue.bind(this, item)}
              disabled={item.disabled}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <Info text={info} />
      <Errors errors={error} />
    </>
  )
}
