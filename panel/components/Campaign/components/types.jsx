import { Grid, GridContainer } from "@admin/Grid"
import Styles from "~/components/Campaign/components/manual.module.scss"
import Input from "@admin/Input"

export default [
  undefined, (translation, control) => (
    <GridContainer gap="Lg" className={`m-3 text-right ${Styles.container}`}>
      <Input
        type="multi-language"
        control={control}
        gridSize={6}
        name="extra_fields.title"
        label={translation("Title Section", "products")}
      />
      <Grid size={6}>
        <Input
          type="toggle"
          data={[
            {
              name: translation("Show"),
              color: "#3ECF8E",
              id: true,
            },
            {
              name: translation("Hide"),
              color: "#EC6060",
              id: false,
            },
          ]}
          label={translation("show")}
          control={control}
          name="extra_fields.show"
        />
      </Grid>
      <Grid size={12}>
        <Input
          component="textarea"
          type="multi-language"
          control={control}
          name="extra_fields.description"
          label={translation("description")}
        />
      </Grid>
      <Grid size={12}>
        <Input
          type="image"
          label={translation("image")}
          name="extra_fields.media"
          control={control}
          url={`${process.env.apiHost}/api/media/upload-image-collection`}
        />
      </Grid>
      <Grid size={12}>
        <Input
          type="image"
          label={translation("image cover")}
          name="extra_fields.cover"
          control={control}
          url={`${process.env.apiHost}/api/media/upload-image-collection`}
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="date-time-icon"
          label={translation("Start at")}
          control={control}
          name="extra_fields.startAt"
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="date-time-icon"
          label={translation("Expire at")}
          control={control}
          name="extra_fields.expireAt"
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
          control={control}
          name="extra_fields.has_timer"
          label={translation("has timer")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          type="select-searchable"
          control={control}
          name="extra_fields.cover_position"
          label={translation("cover position")}
          data={[
            { id: 1, name: translation("up") },
            { id: 2, name: translation("up-right") },
            { id: 3, name: translation("right") },
            { id: 4, name: translation("down-right") },
            { id: 5, name: translation("down") },
            { id: 6, name: translation("down-left") },
            { id: 7, name: translation("left") },
            { id: 8, name: translation("up-left") },
          ]}
        />
      </Grid>
    </GridContainer>
  ),
  function (translation, control) {
    return this[1](translation, control)
  },
  (translation, control) => (
    <GridContainer gap="Lg" className={`m-3 text-right ${Styles.container}`}>
      <Input
        type="multi-language"
        control={control}
        gridSize={6}
        name="extra_fields.title"
        label={translation("Title Section", "products")}
      />
    </GridContainer>
  ),
  function (translation, control) {
    return this[3](translation, control)
  },
]
