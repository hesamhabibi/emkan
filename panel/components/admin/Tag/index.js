import Styles from "./tags.module.scss"

export default function Tag({
  children,
  type,
  className,
  style,
  Tag,
  onClick,
}) {
  if (Tag)
    return (
      <Tag
        onClick={onClick}
        style={style}
        className={`${Styles.tag} ${Styles[type]} ${className}`}
      >
        {children}
      </Tag>
    )

  return (
    <small
      onClick={onClick}
      style={style}
      className={`${Styles.tag} ${Styles[type]} ${className}`}
    >
      {children}
    </small>
  )
}
Tag.defaultProps = {
  className: "",
  style: {},
  onclick: () => {},
}
