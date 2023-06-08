import { Grid, GridContainer } from "@admin/Grid"
import { Fragment, useContext, useEffect, useState } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import Tab from "@admin/Tab"
import Input from "@admin/Input"
import Fields from "~/pages/brands/fields"
import queries from "~/pages/brands/queries"

export default function Brands({ data, setAction, callback }) {
  const translation = useContext(TranslationContext)

  const fireToast = useContext(ToastContext)

  const { control, handleSubmit, setError, clearErrors, getValues, setValue } =
    useForm({
      defaultValues: {
        active: true,
        show_in_menu: true,
      },
    })
  const fields = Fields.form(getValues, setValue, fireToast, translation)

  let inputsKey = 0

  const [loading, setLoading] = useState(false)

  const { mutate } = useMutation({
    setError,
    clearErrors,
    setLoading,
    id: "create-form",
    setData: () => {},
  })

  const storeBrand = async (form) => {
    const res = await mutate({
      mutation: queries.create,
      action: "create",
      variables: { input: form },
    })
    if (res.status) callback([...data.brands, res.res.data.result])
  }

  useEffect(() => {
    setAction({
      name: translation("Submit"),
      disabled: loading,
      onClick: handleSubmit(storeBrand),
    })
  }, [])

  return fields.length > 1 ? (
    <div className="text-right">
      <Tab>
        {fields.map((fieldset, key) => (
          <div title={fieldset.title} key={key} icon={fieldset.icon}>
            <GridContainer gap="Lg" className="px-3">
              {fieldset.form.map((input, key) => {
                if (input.render)
                  return input.size ? (
                    <Grid size={input.size} key={key}>
                      {input.render({
                        label: translation(input.name, "brands"),
                        control,
                        ...input,
                      })}
                    </Grid>
                  ) : (
                    <Fragment key={key}>
                      {input.render({
                        label: translation(input.name, "brands"),
                        control,
                        ...input,
                      })}
                    </Fragment>
                  )

                return input.size ? (
                  <Grid size={input.size} key={key}>
                    <Input
                      key={inputsKey++}
                      label={translation(input.name, "brands")}
                      control={control}
                      {...input}
                    />
                  </Grid>
                ) : (
                  <Fragment key={key}>
                    <Input
                      key={inputsKey++}
                      label={translation(input.name, "brands")}
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
            <Grid size={input.size} key={key}>
              {input.render ? (
                input.render({
                  control,
                  label: translation(input.name, "brands"),
                  ...input,
                })
              ) : (
                <Input
                  control={control}
                  label={translation(input.name, "brands")}
                  {...input}
                />
              )}
            </Grid>
          ) : (
            <Fragment key={key}>
              {input.render ? (
                input.render({
                  control,
                  label: translation(input.name, "brands"),
                  ...input,
                })
              ) : (
                <Input
                  control={control}
                  label={translation(input.name, "brands")}
                  {...input}
                />
              )}
            </Fragment>
          )
        })}
      </GridContainer>
    </div>
  ) : null
}
