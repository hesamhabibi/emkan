import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import { ReactSortable } from "react-sortablejs"
import Styles from "@admin/Table/desktop/table.module.scss"
import Shield from "@admin/Shield"

export const sortableOptions = {
  group: "treeData",
  animation: "200",
  swapThreshold: "0.5",
  forceFallback: true,
  handle: ".fa-grip-vertical",
  ghostClass: Styles.tableMove,
}

export default function Sortable({
  data,
  fields,
  section,
  actions,
  setData,
  callback,
  onClick,
  headless,
  focusKey,
  setFocusKey,
  ...extra
}) {
  const translation = useContext(TranslationContext)

  const tableData = (row, index) => (
    <tr
      style={{ cursor: onClick ? "pointer" : "" }}
      onClick={onClick ? onClick.bind(this, row, index) : null}
      key={index}
      className={focusKey === index ? Styles.focused : ""}
    >
      <td>
        <i className={`fas fa-grip-vertical fa-lg ${Styles.moveIcon}`} />
      </td>
      {fields.map((field, key) => {
        if (field.show && !field.show(row)) return null

        return (
          <Shield id={field.perm} key={key}>
            <td key={key}>
              {field.td
                ? field.td(row, key)
                : typeof row[field.title] === "object" && row[field.title]
                ? JSON.stringify(row[field.title])
                : row[field.title] || "--"}
            </td>
          </Shield>
        )
      })}
      {Boolean(actions.length) && (
        <td className="text-center">
          {actions.map((action, key) => {
            if (action.show && !action.show(row)) return null

            return (
              <Shield id={action.perm} action key={key}>
                <span
                  key={key}
                  data-tooltip-location={action.dir}
                  data-tooltip={translation(action.tooltip, section)}
                >
                  <button
                    className={`${action.root || "far"} ${action.icon} mx-1`}
                    type="button"
                    onClick={(e) => e.stopPropagation() || action.onClick(row)}
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

  const changeSort = (data) => {
    return data.map((item, sort) => ({
      ...item,
      sort,
      chosen: undefined,
      selected: undefined,
    }))
  }

  if (!data.length)
    return <p className="text-center mt-5">{translation("no record found")}</p>

  return (
    <div className={Styles.tableInner}>
      <table className={Styles.table}>
        {data.length === 0 ? null : (
          <>
            {Boolean(headless) || (
              <thead>
                <tr>
                  <th />
                  {fields.map((field, key) => {
                    if (field.show && !field.show(data[0])) return null

                    return (
                      <Shield key={key} id={field.perm}>
                        <th>{translation(field.title, section)}</th>
                      </Shield>
                    )
                  })}
                  <th />
                </tr>
              </thead>
            )}
            <ReactSortable
              onSort={callback}
              {...sortableOptions}
              tag="tbody"
              list={data}
              setList={(data) => setData(changeSort(data))}
              {...extra}
            >
              {data.map(tableData)}
            </ReactSortable>
          </>
        )}
      </table>
    </div>
  )
}

Sortable.defaultProps = {
  actions: [],
  fields: [],
  data: [],
  section: null,
}
