import { useContext } from "react"
import Styles from "./filter.module.scss"
import Button from "@admin/Button"
import Perm from "@admin/Shield"
import Input from "@admin/Input"
import { TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { toggle } from "~/app/State/collapse"
import Collapse from "@admin/Collapse"
import { Grid, GridContainer } from "@admin/Grid"

export default function Filter({
  id,
  inputs,
  handleSubmit,
  collapse,
  setCollapse,
  clearFilters,
  changeFilter,
  section,
  control,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  return (
    <div className={Styles.filter}>
      <Button
        onClick={() => {
          dispatch(toggle(id))
          setCollapse(!collapse)
        }}
        type="primary"
        className={Styles.button}
      >
        <span>
          <i className="fas fa-search" />
          <p>{translation("Search Filter")}</p>
        </span>
        <i className={`fas fa-angle-down ${collapse ? "fa-rotate-180" : ""}`} />
      </Button>
      <Collapse id={id}>
        <div className="p-3 bg-white">
          <GridContainer gap="Md">
            {inputs[0].map((input, key) => (
              <Perm key={key} id={input.perm}>
                <Grid size={12}>
                  <Input
                    control={control}
                    label={translation(input.name, section)}
                    {...input}
                  />
                </Grid>
              </Perm>
            ))}
            <Grid size={12}>
              <hr />
            </Grid>
          </GridContainer>
          <div className={`${Styles.justifyEnd}`}>
            <span>
              <button
                type="button"
                onClick={clearFilters}
                className="fas fa-redo"
              />
              <Button
                type="primarySm"
                onClick={handleSubmit(changeFilter)}
                className={Styles.submitFilter}
              >
                {translation("search")}
              </Button>
            </span>
          </div>
        </div>
      </Collapse>
    </div>
  )
}
