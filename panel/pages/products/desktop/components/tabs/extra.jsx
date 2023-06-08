import Section from "../section"
import { Grid } from "@admin/Grid"
import Input from "@admin/Input"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "./tutorials.module.scss"

export default function Extra({ control, setInfo, info }) {
  const translation = useContext(TranslationContext)

  return (
    <Section>
      <Grid size={12}>
        <h5 className={`d-flex justify-content-between ${Styles.header}`}>
          {translation("advanced", "products")}
          <div
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </div>
        </h5>
      </Grid>
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("True"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("False"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("is special", "products")}
          control={control}
          info={translation("is_special_info", "products")}
          name="is_special"
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("True"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("False"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("has rating", "products")}
          control={control}
          info={translation("can_rate_info", "products")}
          name="has_rating"
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("True"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("False"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("has comment", "products")}
          info={translation("can_comment_info", "products")}
          control={control}
          name="has_comment"
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("True"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("False"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("only_description", "products")}
          info={translation("only_description", "products")}
          control={control}
          name="only_description"
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("True"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("False"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("show_price", "products")}
          info={translation("show_price", "products")}
          control={control}
          name="show_price"
        />
      </Grid>
    </Section>
  )
}
