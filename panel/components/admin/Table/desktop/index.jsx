import Styles from "./table.module.scss"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Shield from "@admin/Shield"

export default function Table({
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
          <Shield key={key} id={field.perm}>
            <td
              className={
                !actions.length && key + 1 === fields.length ? Styles.last : ""
              }
            >
              {field.td
                ? field.td(row) || "-"
                : typeof row[field.title] === "object" && row[field.title]
                ? JSON.stringify(row[field.title])
                : row[field.title] || "-"}
            </td>
          </Shield>
        )
      })}
      {!!actions.length && (
        <td>
          {actions.map((action, key) => {
            if (action.show && !action.show(row)) return null

            return action.render ? (
              <Shield key={key} id={action.perm} action>
                {action.render(row, key)}
              </Shield>
            ) : (
              <Shield key={key} id={action.perm} action>
                <span
                  key={key}
                  data-tooltip-location={action.dir}
                  data-tooltip={translation(action.tooltip, section)}
                >
                  <button
                    disabled={action.disabled ? action.disabled(row) : false}
                    className={`${action.root || "far"} ${action.icon} mx-1`}
                    type="button"
                    onClick={action.onClick.bind(this, row)}
                  >
                    {action.title}
                  </button>
                </span>
              </Shield>
            )
          })}
        </td>
      )}
    </tr>
  )

  return (
    <div className={Styles.tableInner}>
      <table className={Styles.table}>
        {data.length === 0 ? null : (
          <>
            {Boolean(headless) || (
              <thead>
                <tr>
                  {fields.map((field, key) => {
                    if (field.show && !field.show(data[0])) return null

                    return (
                      <Shield key={key} id={field.perm}>
                        <th>{translation(field.title, section)}</th>
                      </Shield>
                    )
                  })}
                  {!!actions.length && <th />}
                </tr>
              </thead>
            )}
            <tbody>{data.map(tableData)}</tbody>
          </>
        )}
      </table>
    </div>
  )
}

Table.defaultProps = {
  actions: [],
  fields: [],
  data: [],
  section: null,
}
