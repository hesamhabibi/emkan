import Input from "@admin/Input"
import { Grid, GridContainer } from "@admin/Grid"
import Modal from "@admin/Modal"
import { useDispatch } from "react-redux"
import { useContext } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"
import { close, open, toggle } from "~/app/State/collapse"
import Styles from "~/pages/discount-codes/discount.module.scss"
import Collapse from "@admin/Collapse"
import Button from "@admin/Button"

const sections = ["first", "second", "third", "fourth", "fifth"]

const makeId = (length) => {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const types = {
  1: () => null,
  2: ({ data, control, translation }) => (
    <Input
      type="select-multiple"
      control={control}
      data={data.categories}
      label={translation("Categories")}
      name="settings.condition.values"
    />
  ),
  3: ({ control, data, translation }) => (
    <Input
      type="select-multiple"
      control={control}
      label={translation("Brands")}
      name="settings.condition.values"
      data={data.brands}
    />
  ),
  4: ({ control, data, translation }) => (
    <Input
      type="select-multiple"
      label={translation("Campaigns")}
      control={control}
      data={data.campaigns}
      name="settings.condition.values"
    />
  ),
}

const accessTypes = {
  1: "users",
  2: "accesses",
}

const Mobile = ({
  modalActions,
  title,
  control,
  watch,
  extra,
  getValues,
  setValue,
}) => {
  const translation = useContext(TranslationContext)

  return (
    <Modal id="editForms" actions={modalActions} title={title}>
      <Section title={translation("discount code")} id="first-section">
        <Input
          name="title"
          label={translation("title")}
          type="multi-language"
          control={control}
          gridSize={12}
        />
        <Grid size={12}>
          <Input
            name="code"
            label={translation("discount code")}
            control={control}
            type="text"
            group={
              <Button
                className={Styles.button}
                type="primary"
                onClick={() => setValue("code", makeId(8))}
              >
                {translation("generate code")}
              </Button>
            }
          />
        </Grid>
      </Section>

      <Section title={translation("discount condition")} id="second-section">
        <Grid size={12}>
          <Input
            name="settings.condition.type"
            label={translation("condition type")}
            type="select"
            control={control}
            data={[
              { name: translation("Factor"), id: 1 },
              { name: translation("Category"), id: 2 },
              { name: translation("Brand"), id: 3 },
              { name: translation("Campaign"), id: 4 },
            ]}
          />
        </Grid>
        <Grid size={12}>
          {watch("settings.condition.type") &&
            types[getValues("settings.condition.type") || 1]({
              control,
              translation,
              data: extra,
            })}
        </Grid>
      </Section>

      <Section title={translation("discount value")} id="third-section">
        <Grid size={12}>
          <Input
            name="type"
            label={translation("type")}
            type="select"
            control={control}
            data={[
              {
                name: translation("percent"),
                id: 1,
              },
              {
                name: translation("amount"),
                id: 2,
              },
            ]}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="value"
            label={translation("value")}
            control={control}
            type="number"
            group={translation(
              watch("type") && getValues("type") === 1 ? "percent" : "amount"
            )}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="min_price"
            label={translation("min price")}
            control={control}
            type="number"
            group={translation("toman")}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="max_price"
            label={translation("max price")}
            control={control}
            type="number"
            group={translation("toman")}
          />
        </Grid>
      </Section>

      <Section id="fourth-section" title={translation("discount accessories")}>
        <Grid size={12}>
          <Input
            name="settings.access.type"
            label={translation("access_type")}
            type="select"
            control={control}
            data={[
              {
                name: translation("User"),
                id: 1,
              },
              {
                name: translation("Access"),
                id: 2,
              },
            ]}
          />
        </Grid>
        <Grid size={12}>
          {watch("settings.access.type") && (
            <Input
              type="select-multiple"
              label={`${translation("values")} ${translation("access_type")}`}
              control={control}
              data={extra[accessTypes[getValues("settings.access.type")]]}
              name="settings.access.values"
            />
          )}
        </Grid>
        <Grid size={12}>
          <Input
            type="select"
            control={control}
            label={translation("use limit type")}
            name="settings.use_limit.type"
            data={[
              { id: 1, name: translation("user based") },
              { id: 2, name: translation("code based") },
            ]}
          />
        </Grid>
        <Grid size={12}>
          <Input
            type="number"
            control={control}
            label={translation("use limit")}
            name="settings.use_limit.count"
            group={translation("visit count")}
          />
        </Grid>
      </Section>

      <Section title={translation("discount date")} id="fifth-section">
        <Grid size={12}>
          <Input
            name="startAt"
            label={translation("Start at")}
            type="date-time-icon"
            control={control}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="expireAt"
            label={translation("Expire at")}
            control={control}
            type="date-time-icon"
          />
        </Grid>
      </Section>
    </Modal>
  )
}

const Desktop = ({
  modalActions,
  title,
  control,
  watch,
  extra,
  getValues,
  setValue,
}) => {
  const translation = useContext(TranslationContext)
  return (
    <Modal id="editForms" actions={modalActions} title={title}>
      <Section title={translation("discount code")} id="first-section">
        <Input
          name="title"
          label={translation("title")}
          type="multi-language"
          control={control}
          gridSize={6}
        />
        <Grid size={12}>
          <Input
            name="code"
            label={translation("discount code")}
            control={control}
            type="text"
            group={
              <Button
                className={Styles.button}
                type="primary"
                onClick={() => setValue("code", makeId(8))}
              >
                {translation("generate code")}
              </Button>
            }
          />
        </Grid>
      </Section>
      <Section title={translation("discount condition")} id="second-section">
        <Grid size={4}>
          <Input
            name="settings.condition.type"
            label={translation("condition type")}
            type="select"
            control={control}
            data={[
              { name: translation("Factor"), id: 1 },
              { name: translation("Category"), id: 2 },
              { name: translation("Brand"), id: 3 },
              { name: translation("Campaign"), id: 4 },
            ]}
          />
        </Grid>
        <Grid size={8}>
          {watch("settings.condition.type") &&
            types[getValues("settings.condition.type") || 1]({
              control,
              translation,
              data: extra,
            })}
        </Grid>
      </Section>

      <Section title={translation("discount value")} id="third-section">
        <Grid size={6}>
          <Input
            name="type"
            label={translation("type")}
            type="select"
            control={control}
            data={[
              {
                name: translation("percent"),
                id: 1,
              },
              {
                name: translation("amount"),
                id: 2,
              },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="value"
            label={translation("value")}
            control={control}
            type="number"
            group={translation(
              watch("type") && getValues("type") === 1 ? "percent" : "amount"
            )}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="min_price"
            label={translation("min price")}
            control={control}
            type="number"
            group={translation("toman")}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="max_price"
            label={translation("max price")}
            control={control}
            type="number"
            group={translation("toman")}
          />
        </Grid>
      </Section>

      <Section id="fourth-section" title={translation("discount accessories")}>
        <Grid size={4}>
          <Input
            name="settings.access.type"
            label={translation("access_type")}
            type="select"
            control={control}
            data={[
              {
                name: translation("User"),
                id: 1,
              },
              {
                name: translation("Access"),
                id: 2,
              },
            ]}
          />
        </Grid>
        <Grid size={8}>
          {watch("settings.access.type") && (
            <Input
              type="select-multiple"
              label={`${translation("values")} ${translation("access_type")}`}
              control={control}
              data={extra[accessTypes[getValues("settings.access.type")]]}
              name="settings.access.values"
            />
          )}
        </Grid>
        <Grid size={6}>
          <Input
            type="select"
            control={control}
            label={translation("use limit type")}
            name="settings.use_limit.type"
            data={[
              { id: 1, name: translation("user based") },
              { id: 2, name: translation("code based") },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <Input
            type="number"
            control={control}
            label={translation("use limit")}
            name="settings.use_limit.count"
            group={translation("visit count")}
          />
        </Grid>
      </Section>

      <Section title={translation("discount date")} id="fifth-section">
        <Grid size={6}>
          <Input
            name="startAt"
            label={translation("Start at")}
            type="date-time-icon"
            control={control}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="expireAt"
            label={translation("Expire at")}
            control={control}
            type="date-time-icon"
          />
        </Grid>
      </Section>
    </Modal>
  )
}

const DefaultModal = ({
  modalActions,
  title,
  control,
  watch,
  extra,
  getValues,
  setValue,
}) => {
  const isDesktop = useContext(DeviceView)

  return isDesktop ? (
    <Desktop
      title={title}
      control={control}
      getValues={getValues}
      watch={watch}
      modalActions={modalActions}
      extra={extra}
      setValue={setValue}
    />
  ) : (
    <Mobile
      title={title}
      control={control}
      getValues={getValues}
      watch={watch}
      modalActions={modalActions}
      extra={extra}
      setValue={setValue}
    />
  )
}

const Section = ({ id, children, title }) => {
  const dispatch = useDispatch()
  const translation = useContext(TranslationContext)

  const index = sections.findIndex((item) => id.includes(item))

  const toggleOut = (key) => {
    dispatch(close(id))
    dispatch(open(key))
  }

  return (
    <>
      <div onClick={dispatch.bind(null, toggle(id))} className={Styles.card}>
        {title}
        <i className="far fa-angle-down" />
      </div>
      <Collapse id={id}>
        <GridContainer gap="Lg" className={Styles.container}>
          {children}
          <Grid size={12} className="d-flex justify-content-end">
            <span className="d-flex">
              {index !== 0 && (
                <Button
                  type="white"
                  className="ml-2 px-3"
                  onClick={toggleOut.bind(
                    null,
                    `${sections[index - 1]}-section`
                  )}
                >
                  {translation("previous")}
                </Button>
              )}
              {index !== sections.length - 1 && (
                <Button
                  type="primary"
                  className="px-3"
                  onClick={toggleOut.bind(
                    null,
                    `${sections[index + 1]}-section`
                  )}
                >
                  {translation("next")}
                </Button>
              )}
            </span>
          </Grid>
        </GridContainer>
      </Collapse>
    </>
  )
}

export default DefaultModal
