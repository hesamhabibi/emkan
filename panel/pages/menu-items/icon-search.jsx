import { useContext } from "react";
import { TranslationContext } from "~/app/Context";
import FontAwesomeIcons from "./FontAwesome.json";
import Styles from "./icon-search.module.scss";

export default function IconSearch({
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  section,
  title,
}) {
  const translation = useContext(TranslationContext);

  return (
    <>
      <div className={Styles.container}>
        <label>{translation(title, section)}</label>
        <input
          type="text"
          className={`${Styles.formControl} ${error ? Styles.invalid : ""}`}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className={Styles.horizontal}>
        {FontAwesomeIcons.filter((icon) => icon.includes(value || "")).map(
          (icon, key) => {
            return (
              <i className={icon} onClick={() => onChange(icon)} key={key} />
            );
          }
        )}
      </div>
    </>
  );
}
