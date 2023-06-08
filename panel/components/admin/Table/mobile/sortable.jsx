import { Fragment, useContext } from "react"
import { TranslationContext } from "~/app/Context"
import { ReactSortable } from "react-sortablejs"
import Styles from "./sortable.module.scss"
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
  title_field,
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
      {fields.map((field, key) => {
        if (field.show && !field.show(row)) return null

        return (
          <Shield id={field.perm} key={key}>
            <td>
              {key === 0 && (
                <i
                  className={`fas fa-grip-vertical fa-lg ${Styles.moveIcon}`}
                />
              )}
              {key === 0 ? (
                <>
                  <span>
                    {field.td
                      ? field.td(row, key)
                      : typeof row[field.title] === "object" && row[field.title]
                      ? JSON.stringify(row[field.title])
                      : row[field.title] || "--"}
                  </span>
                </>
              ) : (
                <Fragment key={key}>
                  <small className="font-weight-bold">
                    {translation(field.title, section)}:
                  </small>
                  <span className="mr-auto">
                    {field.td
                      ? field.td(row, key)
                      : typeof row[field.title] === "object" && row[field.title]
                      ? JSON.stringify(row[field.title])
                      : row[field.title] || "--"}
                  </span>
                </Fragment>
              )}
            </td>
          </Shield>
        )
      })}
      {!!actions.length && (
        <td className="justify-content-center">
          {actions.map((action, key) => {
            if (action.show && !action.show(row)) return null

            return (
              <Shield id={actions.perm} action key={key}>
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

  if (!data.length)
    return <p className="text-center mt-5">{translation("no record found")}</p>

  return (
    <div className={Styles.tableInner}>
      <table className={Styles.table}>
        {data.length === 0 ? null : (
          <>
            <ReactSortable
              onSort={callback}
              {...sortableOptions}
              tag="tbody"
              list={data}
              setList={setData}
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
