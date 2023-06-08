import { Grid, GridContainer } from "@admin/Grid"
import { useForm } from "react-hook-form"
import { Fragment, useContext, useEffect, useState } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"
import { useMutation } from "~/app/Hooks"
import Input from "@admin/Input"
import Tab from "@admin/Tab"
import queries from "./queries"
import Fields from "./fields"

export default function Categories({ data, setAction, callback }) {
  const { control, handleSubmit, reset, clearErrors, setError } = useForm({})

  const [loading, setLoading] = useState(false)

  const { mutate } = useMutation({
    setError,
    clearErrors,
    setLoading,
    id: "create-form",
    setData: () => {},
  })

  const fields = Fields.fields(
    translation,
    data.result.filter((item) => item.deep === 1)
  )

  const translation = useContext(TranslationContext)

  const storeCategory = async (form) => {
    const res = await mutate({
      mutation: queries.create,
      action: "",
      variables: { input: { ...form, deep: 2 } },
    })
    if (res.status) callback([...data.result, res.res.data.result])
  }

  useEffect(() => {
    setAction({
      name: translation("Submit"),
      disabled: loading,
      onClick: handleSubmit(storeCategory),
    })
  }, [])

  let inputsKey = 0

  return (
    <DeviceView.Provider value={true}>
      {fields.length > 1 ? (
        <div className="text-right">
          <Tab>
            {fields.map((fieldset, key) => (
              <div title={fieldset.title} key={key} icon={fieldset.icon}>
                <GridContainer gap="Lg" className="px-3">
                  {fieldset.form.map((input, key) => {
                    if (input.render)
                      return input.size ? (
                        <Grid size={12} key={key}>
                          {input.render({
                            label: translation(input.name, "tags"),
                            control,
                            ...input,
                          })}
                        </Grid>
                      ) : (
                        <Fragment key={key}>
                          {input.render({
                            label: translation(input.name, "tags"),
                            control,
                            ...input,
                          })}
                        </Fragment>
                      )

                    return input.size ? (
                      <Grid size={12} key={key}>
                        <Input
                          key={inputsKey++}
                          label={translation(input.name, "tags")}
                          control={control}
                          {...input}
                        />
                      </Grid>
                    ) : (
                      <Fragment key={key}>
                        <Input
                          key={inputsKey++}
                          label={translation(input.name, "tags")}
                          control={control}
                          {...input}
                        />
                      </Fragment>
                    )
                  })}
                </GridContainer>
              </div>
            ))}
          </Tab>
        </div>
      ) : fields.length ? (
        <div className="text-right">
          <GridContainer gap="Lg" className="p-3">
            {fields[0].map((input, key) => {
              return input.size ? (
                <Grid size={12} key={key}>
                  {input.render ? (
                    input.render({
                      control,
                      label: translation(input.name, "tags"),
                      ...input,
                    })
                  ) : (
                    <Input
                      control={control}
                      label={translation(input.name, "tags")}
                      {...input}
                    />
                  )}
                </Grid>
              ) : (
                <Fragment key={key}>
                  {input.render ? (
                    input.render({
                      control,
                      label: translation(input.name, "tags"),
                      ...input,
                    })
                  ) : (
                    <Input
                      control={control}
                      label={translation(input.name, "tags")}
                      {...input}
                    />
                  )}
                </Fragment>
              )
            })}
          </GridContainer>
        </div>
      ) : null}
    </DeviceView.Provider>
  )
}
