import React, { useEffect } from "react";
import { FormControl, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import Footer from "./footer";
import { useFooterComponentContext } from "../../../contexts/FooterComponentContext";
import ToggleButtonComponent from "../../../components/inputs/toggle-button";

const Index = ({ form, write_form, submit_brand, edit_mode,upload_media }) => {
  const { t } = useTranslation();
  const { set_footer_component } = useFooterComponentContext();

  useEffect(() => {
    set_footer_component(
      <Footer
        {...{
          submit_brand,
          edit_mode,
        }}
      />
    );
  }, [form]);

  return (
    <FormControl
      sx={{
        margin: "15px 10px 0",
        height: "calc(100vh - 210px)",
        position: "relative",
        width: "-webkit-fill-available",
        overflowY:"scroll"
      }}
    >
      <TextFieldInput
        {...{
          // key: Math.floor(Math.random() * 1000),
          label: "common.title",
          form: form,
          name: "title.fa",
          onChange: write_form,
          value: form && form?.title?.fa ? form?.title?.fa : "",
        }}
      />

      <TextFieldInput
        {...{
          // key:random_string(),
          label: "common.description",
          form: form,
          name: "description.fa",
          onChange: write_form,
          value: form && form?.description?.fa ? form?.description?.fa : "",
        }}
      />

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
    </FormControl>
  );
};

export default Index;
