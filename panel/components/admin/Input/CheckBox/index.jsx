import classNames from "classnames";
import Styles from "./checkbox.module.scss";

export default function Checkbox({ label, field: { onChange, value }, size }) {
  const checkBoxClassName = classNames({
    [Styles.checked]: value,
  });

  const handleCheckBox = (e) => {
    e.stopPropagation();
    onChange(!value);
  };

  return (
    <div className={Styles.formGroup}>
      <label>{label}</label>
      <div
        className={`${Styles.checkBox} ${checkBoxClassName} ${size}`}
        onClickCapture={handleCheckBox}
      />
    </div>
  );
}

Checkbox.defaultProps = {
  size: "",
};
