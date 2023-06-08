import Styles from "./card.module.scss"
import { useForm } from "react-hook-form"
import Input from "@admin/Input"
import Button from "@admin/Button"
import { useContext } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "../../queries"
import City from "~/pages/settings/components/city"

const types = {
  1: "select-searchable",
  2: "select-multiple",
  3: "text",
  4: "textarea",
  5: "number",
  6: "bool",
  7: "float",
  8: "image-simple",
  9: "multi-language",
  10: "textarea_multi_language",
  11: "texteditor_multi_language",
}

const components = {
  reports_send_via: "toggle",
  logo_image: "image-simple",
  panel_content_languages: "select-multiple",
  web_content_languages: "select-multiple",
  web_default_language: "select-searchable",
}

export default function Card({
  title,
  description,
  type,
  extra_data,
  default_value,
  data_key,
  id,
}) {
  const translation = useContext(TranslationContext)
  const setLoading = useContext(LoadingContext)
  const fireToast = useContext(ToastContext)
  const { mutate } = useApolloClient()

  const defaultValues = {}

  defaultValues[title] = default_value

  const { control, handleSubmit } = useForm({
    defaultValues,
  })

  const submit = async (data) => {
    setLoading(true)
    const res = await mutate(
      { input: { value: data[title] }, id },
      queries.update
    )
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
    }
    setLoading(false)
  }

  return (
    <GridContainer gap="Sm" className={Styles.container}>
      <Grid size={3}>
        <span>
          <span data-tooltip={description}>
            <i className="fad fa-question-circle" />
          </span>
          <p>{title}</p>
        </span>
      </Grid>
      {data_key === "neighboring_states" ? (
        <Grid size={7}>
          <Input
            control={control}
            name={title}
            type="select-multiple"
            data={extra_data}
          />
        </Grid>
      ) : data_key === "shop_city" ? (
        <>
          <City control={control} name={title} data={extra_data} />
        </>
      ) : type === 6 ? (
        <Grid size={7}>
          <Input
            control={control}
            name={title}
            type="toggle"
            data={[
              {
                id: true,
                name: translation("Yes"),
              },
              {
                id: false,
                name: translation("No"),
              },
            ]}
          />
        </Grid>
      ) : type === 10 ? (
        <Grid size={7}>
          <Input
            control={control}
            name={title}
            type="multi-language"
            component="textarea"
          />
        </Grid>
      ) : type === 11 ? (
        <Grid size={7}>
          {" "}
          <Input
            control={control}
            name={title}
            type="multi-language"
            component="text-editor"
          />
        </Grid>
      ) : (
        <Grid size={7}>
          <Input
            control={control}
            name={title}
            type={components[data_key] || types[type]}
            data={
              extra_data
                ? components[data_key] === "toggle"
                  ? extra_data
                  : (extra_data || []).map((item) => ({
                      id: item,
                      name: item.name_fa,
                    }))
                : []
            }
            data_key="code"
          />
        </Grid>
      )}
      <Grid size={2}>
        <Button onClick={handleSubmit(submit)} className="w-100" type="success">
          {translation("Submit")}
        </Button>
      </Grid>
    </GridContainer>
  )
}
