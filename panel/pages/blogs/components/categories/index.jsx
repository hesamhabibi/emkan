import { Grid, GridContainer } from "@admin/Grid"
import { useForm } from "react-hook-form"
import { Fragment, useContext, useEffect, useState } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import { useMutation } from "~/app/Hooks"
import Input from "@admin/Input"
import Tab from "@admin/Tab"
import queries from "./queries"
import Fields from "./fields"

export default function Categories({ data, setAction, callback, type = 1 }) {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      active: true,
      show_in_menu: true,
    },
  })

  const fireToast = useContext(ToastContext)
  const [loading, setLoading] = useState(false)

  const { mutate } = useMutation({
    setError,
    clearErrors,
    setLoading,
    id: "create-form",

    setData: () => {},
  })

  const translation = useContext(TranslationContext)

  const storeCategory = async (form) => {
    const res = await mutate({
      mutation: queries.create,
      action: "create",
      variables: { input: { ...form, type } },
    })
    if (res.status) callback([...data.categories, res.res.data.result])
  }

  useEffect(() => {
    setAction({
      name: translation("Submit"),
      disabled: loading,
      onClick: handleSubmit(storeCategory),
    })
  }, [])

  let inputsKey = 0

  const fields = Fields.fields(
    getValues,
    setValue,
    fireToast,
    translation,
    data.categories || []
  )

  return fields.length > 1 ? (
    <div className="text-right">
      <Tab>
        {fields.map((fieldset, key) => (
          <div title={fieldset.title} key={key} icon={fieldset.icon}>
            <GridContainer gap="Lg" className="px-3">
              {fieldset.form.map((input, key) => {
                if (!input.size) {
                  if (input.render)
                    return (
                      <Fragment key={key}>
                        {input.render({
                          label: translation(input.name, "category"),
                          control,
                          ...input,
                        })}
                      </Fragment>
                    )

                  return (
                    <Fragment size={input.size} key={key}>
                      <Input
                        key={inputsKey++}
                        label={translation(input.name, "category")}
                        control={control}
                        {...input}
                      />
                    </Fragment>
                  )
                }

                if (input.render)
                  return (
                    <Grid size={input.size} key={key}>
                      {input.render({
                        label: translation(input.name, "category"),
                        control,
                        ...input,
                      })}
                    </Grid>
                  )

                return (
                  <Grid size={input.size} key={key}>
                    <Input
                      key={inputsKey++}
                      label={translation(input.name, "category")}
                      control={control}
                      {...input}
                    />
                  </Grid>
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
          return (
            <Grid size={input.size} key={key}>
              {input.render ? (
                input.render({
                  control,
                  label: translation(input.name, "category"),
                  ...input,
                })
              ) : (
                <Input
                  control={control}
                  label={translation(input.name, "category")}
                  {...input}
                />
              )}
            </Grid>
          )
        })}
      </GridContainer>
    </div>
  ) : null
}
