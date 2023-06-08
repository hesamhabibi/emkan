import Input from "@admin/Input"
import Tab from "@admin/Tab"
import { Fragment, useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Modal from "@admin/Modal"
import { Grid, GridContainer } from "@admin/Grid"
import Shield from "@admin/Shield"
import HasPerm from "~/app/perm"
import { useRouter } from "next/router"

export default function Desktop({
  formGroup,
  state,
  callback,
  section,
  actions,
  tag,
  size,
  loading,
  control,
  id,
  full_screen,
  prevent_update,
  hasInfo,
  tabRef,
  ...props
}) {
  const translation = useContext(TranslationContext)

  const router = useRouter()

  let inputsKey = 0

  return (
    <Modal
      size={size}
      full_screen={full_screen}
      title={state}
      actions={actions}
      tag={tag}
      id={id}
      hasInfo={hasInfo}
    >
      {formGroup.length > 1 ? (
        <div ref={tabRef} className="text-right">
          <Tab id={`${id}-tab`} sticky>
            {formGroup
              .filter((item) => HasPerm({ id: item.perm, router }))
              .map((fieldset, key) => (
                <div title={fieldset.title} key={key} icon={fieldset.icon}>
                  <GridContainer gap="Lg" className="px-3">
                    {fieldset.form.map((input, key) => {
                      if (input.render)
                        return input.size ? (
                          <Shield id={input.perm} key={key}>
                            <Grid size={input.size}>
                              {input.render({
                                label: input.label
                                  ? input.label
                                  : translation(input.name, section),
                                control,
                                ...input,
                              })}
                            </Grid>
                          </Shield>
                        ) : (
                          <Shield key={key} id={input.perm}>
                            {input.render({
                              label: input.label
                                ? input.label
                                : translation(input.name, section),
                              control,
                              ...input,
                            })}
                          </Shield>
                        )

                      return input.size ? (
                        <Shield id={input.perm} key={key}>
                          <Grid size={input.size}>
                            <Input
                              key={inputsKey++}
                              label={
                                input.label
                                  ? input.label
                                  : translation(input.name, section)
                              }
                              control={control}
                              {...input}
                            />
                          </Grid>
                        </Shield>
                      ) : (
                        <Shield key={key} id={input.perm}>
                          <Input
                            label={
                              input.label
                                ? input.label
                                : translation(input.name, section)
                            }
                            control={control}
                            {...input}
                          />
                        </Shield>
                      )
                    })}
                  </GridContainer>
                </div>
              ))}
          </Tab>
        </div>
      ) : formGroup.length ? (
        <div className="text-right">
          <GridContainer gap="Lg" className="p-3">
            {formGroup[0].map((input, key) => {
              if (input.render)
                return input.size ? (
                  <Shield id={input.perm} key={key}>
                    <Grid size={input.size}>
                      {input.render({
                        control,
                        label: input.label
                          ? input.label
                          : translation(input.name, section),
                        ...input,
                      })}
                    </Grid>
                  </Shield>
                ) : (
                  <Shield key={key} id={input.perm}>
                    {input.render({
                      control,
                      label: input.label
                        ? input.label
                        : translation(input.name, section),
                      ...input,
                    })}
                  </Shield>
                )

              return input.size ? (
                <Shield id={input.perm} key={key}>
                  <Grid size={input.size}>
                    <Input
                      control={control}
                      key={inputsKey++}
                      label={
                        input.label
                          ? input.label
                          : translation(input.name, section)
                      }
                      {...input}
                    />
                  </Grid>
                </Shield>
              ) : (
                <Shield key={key} id={input.perm}>
                  <Input
                    control={control}
                    label={
                      input.label
                        ? input.label
                        : translation(input.name, section)
                    }
                    {...input}
                  />
                </Shield>
              )
            })}
          </GridContainer>
        </div>
      ) : null}
    </Modal>
  )
}
