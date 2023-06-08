import Styles from "./textarea.module.scss";
import Errors from "@admin/Input/Errors";
import Info from "@admin/Input/Info";

export default function Textarea({
  label,
  disabled,
  placeholder,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  info,
}) {
  return (
    <div className={Styles.formGroup}>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        disabled={disabled}
        className={`${Styles.formControl} ${error ? Styles.invalid : ""}`}
      />
      <Info text={info} />
      <Errors errors={error} />
    </div>
  );
}
