import Styles from "./table.module.scss";
import Tag from "@admin/Tag";
import Perm from "@admin/Shield";
import Button from "@admin/Button";
import { Grid, GridContainer } from "@admin/Grid";

export default function Table({ data, actions, fields, title, tag, header }) {
  return (
    <GridContainer gap="Lg">
      {data.map((row, key) => (
        <Grid size={12} key={key} className={Styles.card}>
          <div className={Styles.title}>
            <h5>{row[title]}</h5>
            {row[tag] !== undefined ? (
              <span className={Styles.tag}>
                {row[tag] ? (
                  <Tag type="success">internal Link</Tag>
                ) : (
                  <Tag type="orange">External Link</Tag>
                )}
              </span>
            ) : null}
          </div>

          <div className={Styles.action}>
            <p className={Styles.link}>{row[header]}</p>
            <div className={Styles.description}>
              <p>{row.description}</p>
            </div>
          </div>
          {Boolean(fields.length) && (
            <GridContainer gap="Lg" className={Styles.fields}>
              {fields.map((field, index) => {
                return (
                  <Grid key={index} size={12}>
                    <Button
                      type="white"
                      onClick={() => field.onClick(row)}
                      className="w-100"
                    >
                      {field.title}
                    </Button>
                  </Grid>
                );
              })}
            </GridContainer>
          )}
          <hr />
          <div className={Styles.actions}>
            {actions.map((btn, index) => (
              <Perm id={btn.perm} key={index} action>
                <button
                  data-tooltip-location={btn.dir}
                  data-tooltip={btn.tooltip}
                  onClick={() => btn.onClick(row)}
                >
                  <i className={btn.icon} />
                </button>
              </Perm>
            ))}
          </div>
        </Grid>
      ))}
    </GridContainer>
  );
}

Table.defaultProps = {
  title: "name",
  tag: "is_internal",
  header: "action",
};
