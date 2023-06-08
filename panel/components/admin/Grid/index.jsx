import Styles from "./grid.module.scss";

export function GridContainer({
  children,
  className,
  gap,
  forwardRef,
  ...props
}) {
  return (
    <div
      ref={forwardRef}
      className={`${Styles.gridContainer12} ${className} ${
        Styles[`gridGap${gap}`]
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

GridContainer.defaultProps = {
  className: "",
};

export function Grid({ children, size, className, ...props }) {
  return (
    <div className={`${Styles[`gridItem${size}`]} ${className}`} {...props}>
      {children}
    </div>
  );
}

Grid.defaultProps = {
  className: "",
};
