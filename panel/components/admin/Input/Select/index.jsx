import { useContext, useEffect, useRef, useState } from "react";
import Styles from "./select.module.scss";
import Errors from "@admin/Input/Errors";
import { TranslationContext } from "~/app/Context";
import Info from "@admin/Input/Info";

export default function Select({
  label,
  data,
  options,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  className,
  placeholder,
  rtl,
  info,
}) {
  const translation = useContext(TranslationContext);

  const [focused, setFocused] = useState(false);

  const selectBox = useRef(null);

  const changeValue = (item) => {
    if (item.disabled) return;

    onChange(item.id);
    setFocused(false);
  };

  const onClickRemove = (e) => {
    if (selectBox.current && !selectBox.current.contains(e.target))
      setFocused(false);
  };

  useEffect(() => {
    focused
      ? document.addEventListener("click", onClickRemove)
      : document.removeEventListener("click", onClickRemove);

    return () => {
      document.removeEventListener("click", onClickRemove);
    };
  }, [focused]);

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
                ? data.find(
                    (item) => JSON.stringify(item.id) === JSON.stringify(value)
                  )
                : data.find((item) => item.id === value)
              )?.name ||
              placeholder ||
              ""
            }
            readOnly
            {...options}
          />
        </div>

        <ul
          className={`${Styles.selectDropDown} ${
            focused ? Styles.active : ""
          } ${rtl ? "" : "text-center"}`}
        >
          {(data.length
            ? data
            : [{ id: "", name: translation("no record"), disabled: true }]
          ).map((item, key) => (
            <li
              key={key}
              disabled={item.disabled}
              onClick={changeValue.bind(this, item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <Info text={info} />
      <Errors errors={error} />
    </>
  );
}

Select.defaultProps = {
  rtl: false,
};
