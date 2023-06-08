import Styles from "./card.module.scss";
import { useForm } from "react-hook-form";
import Input from "@admin/Input";
import Button from "@admin/Button";
import { useContext } from "react";
import { LoadingContext, TranslationContext } from "~/app/Context";
import { Grid, GridContainer } from "@admin/Grid";
import queries from "../../queries";
import { setErrors, useApolloClient } from "~/app/Hooks/Api";

const types = {
  1: "select-searchable",
  2: "select-multiple",
  3: "text",
  4: "textarea",
  5: "number",
  6: "bool",
  7: "float",
};

const components = {
  reports_send_via: "toggle",
  logo_image: "image-simple",
  panel_content_languages: "select-multiple",
  web_content_languages: "select-multiple",
  web_default_language: "select-searchable",
};

export default function EditableCard({
  title,
  description,
  type,
  extra_data,
  data_key,
  default_value,
  id,
  edit,
  del,
}) {
  const translation = useContext(TranslationContext);

  const setLoading = useContext(LoadingContext);
  const { mutate } = useApolloClient();

  const { control, handleSubmit, setError } = useForm({
    defaultValues: default_value,
  });

  const submit = async (data) => {
    setLoading(true);
    const res = await mutate({ input: { value: data }, id }, queries.update);
    // setErrors(res.errors, setError);
    setLoading(false);
  };

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
      <Grid size={7}>
        <Input
          control={control}
          name={title}
          type={components[data_key] || types[type]}
          data={
            extra_data
              ? components[data_key] === "toggle"
                ? extra_data
                : extra_data.map((item) => ({ id: item, name: item.name_fa }))
              : []
          }
          data_key="code"
        />
      </Grid>
      <Grid size={1}>
        <Button onClick={handleSubmit(submit)} className="w-100" type="success">
          {translation("Submit")}
        </Button>
      </Grid>
      <Grid size={1} className="d-flex justify-content-around">
        <span data-tooltip={translation("edit", "settings")}>
          <i className="far fa-edit" onClick={edit.bind(this, id)} />
        </span>
        <span data-tooltip={translation("delete", "settings")}>
          <i className="far fa-trash-alt" onClick={del.bind(this, id)} />
        </span>
      </Grid>
    </GridContainer>
  );
}
