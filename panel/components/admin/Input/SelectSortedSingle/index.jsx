import { Fragment, useEffect, useRef, useState } from "react"
import { make_tree } from "~/app/Tree"
import Errors from "@admin/Input/Errors"
import Styles from "./select.module.scss"

export default function SelectSortedSingle({
  label,
  data,
  options,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  className,
  placeholder,
}) {
  const [focused, setFocused] = useState(false)

  const selectBox = useRef(null)

  const changeValue = (item) => {
    if (item.disabled) return

    onChange(item.id)
    setFocused(false)
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

  const ChildList = ({ item, deep = 0 }) =>
    deep === 0 ? (
      item.map((item, key) => (
        <Fragment key={key}>
          <li
            key={key}
            disabled={item.disabled}
            onClick={changeValue.bind(this, item)}
          >
            {Array.from(new Array(deep)).map(() => "-")} {item.name}
          </li>
          {item.children.length ? (
            <ChildList item={item.children} deep={deep + 1} />
          ) : null}
        </Fragment>
      ))
    ) : (
      <ul>
        {item.map((item, key) => (
          <Fragment key={key}>
            <li
              key={key}
              disabled={item.disabled}
              onClick={changeValue.bind(this, item)}
            >
              {Array.from(new Array(deep)).map(() => "-")} {item.name}
            </li>
            {item.children.length ? (
              <ChildList item={item.children} deep={deep + 1} />
            ) : null}
          </Fragment>
        ))}
      </ul>
    )

  return (
    <>
      <div className={Styles.formGroup}>
        {Boolean(label) && <label>{label}</label>}

        <div
          ref={selectBox}
          className={`${Styles.formSelect} ${
            invalid ? Styles.invalid : ""
          } ${className}`}
        >
          <i
            className={`far fa-angle-down ${focused ? "fa-rotate-180" : ""}`}
          />
          <input
            onBlur={onBlur}
            type="text"
            onClick={setFocused.bind(this, !focused)}
            className={`${Styles.formControl}`}
            value={
              (typeof value === "object"
                ? data?.find(
                    (item) => JSON.stringify(item.id) === JSON.stringify(value)
                  )
                : data?.find((item) => item.id === value)
              )?.name ||
              placeholder ||
              ""
            }
            readOnly
            {...options}
          />
        </div>

        <ul
          className={`${Styles.selectDropDown} ${focused ? Styles.active : ""}`}
        >
          <ChildList item={make_tree(data)} />
        </ul>
      </div>
      <Errors errors={error} />
    </>
  )
}

SelectSortedSingle.defaultProps = {
  rtl: false,
}
