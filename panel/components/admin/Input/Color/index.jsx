import Styles from "./color.module.scss";
import Errors from "@admin/Input/Errors";
import Info from "@admin/Input/Info";

export default function Color({
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
  const changeColor = (color) => {
    const value = color.target.value;
    if (value.length > 7)
      return;

    if (value[0] !== "#")
      onChange("#" + value)
    else
        onChange(value)
  };

  return (
    <>
      <label>{label}</label>
      <div className={Styles.formGroup}>
        <input
          type="text"
          value={value || ""}
          onChange={changeColor}
          className={Styles.formControl}
        />
        <input
          type="color"
          value={value || ""}
          onChange={(value) => {
            onChange(value.target.value);
          }}
          className={Styles.colorControl}
        />
      </div>
      <Info text={info} />
      <Errors errors={error} />
    </>
  );
}
