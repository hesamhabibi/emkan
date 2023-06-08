import React from "react";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TextFieldInput from "../../../components/inputs/text-field-input";
import EditIcon from "@mui/icons-material/Edit";
import ToggleButtonComponent from "../../../components/inputs/toggle-button";
import { random_string } from "../../../helpers/string";

const Index = ({ form, write_form, submit_brand, edit_mode, upload_media }) => {
  const { t } = useTranslation();

  return (
    <>
      <form>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ md: 2 }}
          columns={{ md: 12 }}
        >
          <Grid item md={6}>
            <TextFieldInput
              {...({
                // key: Math.floor(Math.random() * 1000),
                label: "common.title",
                form: form,
                name: "title.fa",
                onChange: write_form,
                value: form && form?.title?.fa ? form?.title?.fa : "",
              })}
            />
          </Grid>
          <Grid item md={6}>
            <TextFieldInput
              {...({
                // key:random_string(),
                label: "common.description",
                form: form,
                name: "description.fa",
                onChange: write_form,
                value:
                  form && form?.description?.fa ? form?.description?.fa : "",
              })}
            />
          </Grid>
        </Grid>
        <ToggleButtonComponent
          items={[
            {
              title: "brands.showInMenu",
              value: true,
            },
            {
              title: "brands.notShowInMenu",
              value: false,
            },
          ]}
          onChange={write_form}
          name="show_in_menu"
          label={"brands.showInMenu"}
          form={form}
          value={form?.show_in_menu || false}
        />

        <section>
          <h4>{t("brands.uploadImgTitle")}</h4>
          <input type="file" name="media" onChange={upload_media} />
        </section>

        {/*create role button*/}
        <Box sx={{ textAlign: "end", marginTop: 2 }}>
          <Button
            startIcon={edit_mode ? <EditIcon /> : <AddIcon />}
            variant="contained"
            color="primary"
            sx={{ color: "white" }}
            onClick={submit_brand}
          >
            {edit_mode
              ? t("brands.edit_brand_btn")
              : t("brands.create_brand_btn")}
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Index;
