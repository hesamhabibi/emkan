import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./select-multiple.module.scss"
import Errors from "@admin/Input/Errors"
import { TranslationContext } from "~/app/Context"
import Text from "@admin/Input/Text"

export default function SelectMultiple({
  label,
  data,
  options,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  placeholder,
}) {
  const translation = useContext(TranslationContext)

  const [focused, setFocused] = useState(false)
  const [hover, setHover] = useState(-1)
  const [search, setSearch] = useState("")

  const selectBox = useRef(null)

  const addValue = (item) => {
    if (item === null || item.disabled) return

    setHover(-1)

    setSearch("")
    if (value) onChange([...value, item.id])
    else onChange([item.id])
    setFocused(false)
  }

  const onClickRemove = (e) => {
    if (selectBox.current && !selectBox.current.contains(e.target))
      setFocused(false)
  }

  const keyPress = (evt) => {
    if (evt.key === "ArrowDown") {
      onChange((prev) => {
        setHover((hov) =>
          hov + 1 <
          data.filter(
            (item) =>
              item.name?.includes(search) &&
              !prev.find((val) => val === item.id)
          ).length
            ? hov + 1
            : hov
        )

        return prev
      })
    } else if (evt.key === "ArrowUp") {
      setHover((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (evt.key === "Enter") {
      setHover((hov) => {
        if (hov === -1) return hov
        onChange((prev) => {
          return [
            ...prev,
            data.filter(
              (item) =>
                item.name?.includes(search) &&
                !prev.find((val) => val === item.id)
            )[hov].id,
          ]
        })
        return -1
      })
    }
  }

  const deleteOption = (item) =>
    onChange(value.filter((selected) => selected !== item))

  useEffect(() => {
    if (focused) {
      document.addEventListener("keydown", keyPress)
      document.addEventListener("click", onClickRemove)
    } else {
      setHover(-1)
      document.removeEventListener("keydown", keyPress)
      document.removeEventListener("click", onClickRemove)
    }
    return () => {
      document.removeEventListener("keydown", keyPress)
      document.removeEventListener("click", onClickRemove)
    }
  }, [focused])

  const filtered = data.filter((item) =>
    typeof item === "object"
      ? item.name?.includes(search) &&
        !value?.find((val) => JSON.stringify(val) === JSON.stringify(item.id))
      : item.name?.includes(search) && !value?.find((val) => val === item.id)
  )

  return (
    <>
      {Boolean(label) && <label>{label}</label>}
      <div className={Styles.formGroup} ref={selectBox}>
        <div
          onClick={(e) => {
            e.stopPropagation()
            setFocused(!focused)
          }}
          className={`${Styles.formSelectMultiple} ${
            focused ? Styles.actived : ""
          } ${invalid ? Styles.invalid : ""}`}
        >
          <span className={Styles.icon}>
            <i
              className={`far fa-angle-down ${focused ? "fa-rotate-180" : ""}`}
            />
          </span>
          {value?.map((item, key) => (
            <small key={key} className={Styles.tag}>
              <button type="button" onClick={deleteOption.bind(this, item)}>
                <i className="fas fa-times ml-1" />
              </button>
              {typeof item === "object"
                ? data.find(
                    (row) => JSON.stringify(row.id) === JSON.stringify(item)
                  )?.name
                : data.find((row) => row.id === item)?.name}
            </small>
          ))}
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
              className={hover === key ? Styles.liFocus : ""}
              key={key}
              onClick={addValue.bind(this, item)}
              disabled={item.disabled}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <Errors errors={error} />
    </>
  )
}

SelectMultiple.defaultProps = {
  data: [],
}
