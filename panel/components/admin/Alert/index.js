import AlertStyle from "./alert.module.scss";

const Alert = ({ type, className, children }) => {
  return (
    <div className={`${AlertStyle.alert} ${AlertStyle[type]} ${className}`}>
      {children}
    </div>
  );
};

Alert.defaultProps = {
  className: "",
};

export default Alert;
