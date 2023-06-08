import Styles from "./table.module.scss"
import Perm from "@admin/Shield"
import Tag from "@admin/Tag"
import Button from "@admin/Button"
import { Grid, GridContainer } from "@admin/Grid"

export default function Table({
  data,
  actions,
  fields,
  translation,
  full,
  title,
  tag,
  header,
}) {
  return (
    <GridContainer gap="Lg">
      {data.map((row, key) => (
        <Grid size={full ? 12 : 4} key={key} className={Styles.card}>
          <div className={Styles.title}>
            <h5>{row[title]}</h5>
            <span>
              {row[tag] ? (
                <Tag type="success">{translation("Internal Link")}</Tag>
              ) : row[tag] !== undefined ? (
                <Tag type="orange">{translation("External Link")}</Tag>
              ) : null}
            </span>
          </div>

          <div className={Styles.action}>
            <p className={Styles.link}>{row[header]}</p>
          </div>

          <div className={Styles.description}>
            <small>{row.description}</small>
          </div>
          {Boolean(fields.length) &&
            fields.map((field, index) => (
              <Perm id={field.perm} key={index} action>
                <Button
                  className="w-100 my-3"
                  onClick={() => field.onClick(row)}
                  type="white"
                >
                  {field.title}
                </Button>
              </Perm>
            ))}
          <div className={Styles.description}>
            <hr />
          </div>

          <div className={Styles.actions}>
            {actions.map((btn, index) => (
              <button
                data-tooltip-location={btn.dir}
                data-tooltip={btn.tooltip}
                key={index}
                onClick={() => btn.onClick(row)}
              >
                <i className={btn.icon} />
              </button>
            ))}
          </div>
        </Grid>
      ))}
    </GridContainer>
  )
}

Table.defaultProps = {
  title: "name",
  tag: "is_internal",
  header: "action",
}
