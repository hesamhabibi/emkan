import Section from "../../mobile/components/section"
import { Grid } from "@admin/Grid"
import Input from "@admin/Input"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "../../mobile/components/tabs/tutorials.module.scss"

export default function Extra({ control, setInfo, info, watch, getValues }) {
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
      <Grid size={12}>
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
      <Grid size={4}>
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
      <Grid size={12}>
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
      <Grid size={12}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("Restful", "products"),
              id: 1,
            },
            {
              name: translation("GraphQL", "products"),
              id: 2,
            },
          ]}
          label={translation("api config", "products")}
          control={control}
          name="services.api_config.type"
        />
      </Grid>
      <Grid size={12}>
        <Input
          direction="ltr"
          type="textarea"
          control={control}
          name="services.api_config.app_key"
          label={translation("App key", "products")}
        />
      </Grid>
      <Grid size={12}>
        <Input
          direction="ltr"
          type="text"
          control={control}
          name="services.api_config.url"
          label={translation("Url", "products")}
        />
      </Grid>
      {watch("services.api_config.type") &&
        getValues("services.api_config.type") === 2 && (
          <Grid size={12}>
            <Input
              type="textarea"
              direction="ltr"
              control={control}
              name="services.api_config.mutation"
              label={translation("Mutation", "products")}
            />
          </Grid>
        )}
    </Section>
  )
}
