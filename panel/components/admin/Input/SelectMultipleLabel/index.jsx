import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./select-multiple-label.module.scss"
import { TranslationContext } from "~/app/Context"
import Text from "@admin/Input/Text"

export default function SelectMultipleLabel({
  label,
  size,
  data,
  placeholder,
  errors,
  onTab,
  addable,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
}) {
  const [focused, setFocused] = useState(false)
  const [search, setSearch] = useState("")

  const translation = useContext(TranslationContext)

  const [hover, setHover] = useState(-1)

  const selectBox = useRef(null)

  const addValue = (item) => {
    setHover(-1)
    if (item === null || item.disabled) return

    setSearch("")

    onChange(
      ((values) => {
        if (values?.length) return [...values, item.id]
        return [item.id]
      })(value)
    )
    setFocused(false)
  }

  const onClickRemove = (e) => {
    if (selectBox && !selectBox?.current?.contains(e.target)) setFocused(false)
  }

  const keyPress = (evt) => {
    if (evt.key === "ArrowDown") {
      onChange((prev) => {
        setHover((hov) =>
          hov + 1 <
          data.filter(
            (item) =>
              item.name.startsWith(search) &&
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
                item.name.startsWith(search) &&
                !prev.find((val) => val === item.id)
            )[hov].id,
          ]
        })
        return -1
      })
    } else if (evt.key === "Tab") {
      if (!addable) return
      evt.preventDefault()
      setSearch((prev) => {
        onTab(prev)
        setFocused(false)
        return ""
      })
    }
  }

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

  const searchData = () => {
    const res = data
      .filter(
        (item) =>
          item.name.startsWith(search) &&
          !(value || []).find((val) =>
            typeof item.id === "string"
              ? val === item.id
              : JSON.stringify(val) === JSON.stringify(item.id)
          )
      )
      .map((item, key) => (
        <li
          className={hover === key ? Styles.liFocus : ""}
          key={key}
          onClick={() => addValue(item)}
          disabled={item.disabled}
        >
          {item.name}
        </li>
      ))

    return res.length ? (
      res
    ) : addable ? (
      <li
        onClick={() => {
          onTab(search)
          setSearch("")
        }}
      >
        {translation("press tab to add")}
      </li>
    ) : (
      <li disabled>{translation("no record found")}</li>
    )
  }

  return (
    <>
      {Boolean(label) && <label>{label}</label>}
      <div ref={selectBox} className={Styles.formGroup}>
        <div
          onClick={(e) => {
            e.preventDefault()
            setFocused(!focused)
          }}
          className={`${Styles.formSelectMultiple} ${size} ${
            focused ? Styles.actived : ""
          } ${errors ? Styles.invalid : ""}`}
        >
          <span className={Styles.dropdown}>
            <i
              className={`far fa-angle-down ${focused ? "fa-rotate-180" : ""}`}
            />
          </span>
          <span className={Styles.placeholder}>{placeholder}</span>
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
          {searchData()}
        </ul>
      </div>
    </>
  )
}
