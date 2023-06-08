import Styles from "./buttons.module.scss";

export default function Button({
  type,
  children,
  className,
  onClick,
  loading,
  disabled,
  mobile,
  submit,
  options,
  ...extra
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`${Styles[type]} ${className} ${
        loading ? Styles.loading : ""
      } ${mobile ? Styles.mobile : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...options}
      {...extra}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  loading: false,
  options: {},
  submit: false,
};
