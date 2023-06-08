import classNames from "classnames"
import Styles from "./text.module.scss"
import Errors from "../Errors"
import Info from "../Info"
import { useRef, useState } from "react"

export default function Text({
  label,
  placeholder,
  size,
  className,
  type,
  options,
  validate,
  direction,
  group,
  info,
  disabled,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
}) {
  const [width, setWidth] = useState(0)

  const classSizeInput = classNames({
    [Styles.formControlLg]: size === "lg",
    [Styles.formControlSm]: size === "sm",
  })

  return (
    <div className={`${Styles.container} ${className}`}>
      {Boolean(label) && <label>{label}</label>}
      <div
        className={`${Styles[`form-control-${direction || "rtl"}`]} ${
          disabled ? Styles.disabled : ""
        } ${invalid ? Styles.invalid : ""} ${group ? Styles.indent : ""} ${
          direction === "ltr" ? Styles.indentLeft : ""
        } ${classSizeInput || ""}`}
      >
        {Boolean(group) && typeof group === "string" ? (
          <div
            ref={(ref) => setWidth(ref?.clientWidth)}
            className={`${Styles.group} ${
              direction === "ltr" ? Styles.groupLeft : ""
            }`}
          >
            {group}
          </div>
        ) : (
          <div
            ref={(ref) => setWidth(ref?.clientWidth)}
            className={`${Styles.groupNode} ${
              direction === "ltr" ? Styles.nodeLeft : ""
            }`}
          >
            {group}
          </div>
        )}
        <input
          disabled={disabled}
          style={
            direction === "rtl"
              ? { paddingLeft: `${30 + width}px` }
              : { paddingLeft: `${13 + width}px` }
          }
          value={value || ""}
          onChange={validate.bind(this, onChange)}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          {...options}
        />
        {Boolean(value?.length) && !disabled && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
            }}
            className={Styles.clear}
          >
            <i className="fas fa-times-circle" />
          </div>
        )}
      </div>
      <Info text={info} />
      <Errors errors={error} />
    </div>
  )
}

Text.defaultProps = {
  direction: "rtl",
  className: "",
}
