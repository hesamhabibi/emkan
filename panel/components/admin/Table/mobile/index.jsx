import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "./table.module.scss"
import Shield from "@admin/Shield"

export default function Mobile({
  data,
  fields,
  section,
  actions,
  headless,
  onClick,
  className,
}) {
  const translation = useContext(TranslationContext)

  const tableData = (row, index) => (
    <tr
      className={className ? className(row) : ""}
      style={{ cursor: onClick ? "pointer" : "" }}
      onClick={onClick ? onClick.bind(this, row) : null}
      key={index}
    >
      {fields.map((field, key) => {
        if (field.show && !field.show(row)) return null

        return (
          <Shield id={field.perm} key={key}>
            <td data-label={headless ? "" : translation(field.title, section)}>
              {field.td
                ? field.td(row, key) || "-"
                : typeof row[field.title] === "object" && row[field.title]
                ? JSON.stringify(row[field.title]) || "-"
                : row[field.title] || "-"}
            </td>
          </Shield>
        )
      })}

      {actions?.length ? (
        <td className="justify-content-center d-flex align-items-center">
          {actions.map((action, key) => {
            if (action.show && !action.show(row)) return null

            return action.render ? (
              <Shield key={key} id={action.perm} action>
                {action.render(row, key)}
              </Shield>
            ) : (
              <Shield key={key} id={action.perm} action>
                <button
                  disabled={action.disabled ? action.disabled(row) : false}
                  className={`${action.root || "far"} ${
                    action.icon
                  } fa-lg mx-1`}
                  type="button"
                  onClick={action.onClick.bind(this, row)}
                >
                  {action.title}
                </button>
              </Shield>
            )
          })}
        </td>
      ) : null}
    </tr>
  )

  return (
    <table className={Styles.table}>
      {data.length === 0 ? null : <tbody>{data.map(tableData)}</tbody>}
    </table>
  )
}

Mobile.defaultProps = {
  actions: [],
  fields: [],
  data: [],
  section: null,
}
