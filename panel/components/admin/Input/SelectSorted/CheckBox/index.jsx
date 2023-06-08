import classNames from "classnames";
import Styles from "./checkbox.module.scss";

export default function Checkbox({ label, onChange, value, size }) {
  const checkBoxClassName = classNames({
    [Styles.checked]: value,
  });

  const handleCheckBox = () => onChange(!value);

  return (
    <div className={Styles.formGroup}>
      <div
        className={`${Styles.checkBox} ${checkBoxClassName} ${size}`}
        onClick={handleCheckBox}
      />
      <label>{label}</label>
    </div>
  );
}

Checkbox.defaultProps = {
  size: "",
};
