import { Card, Skeleton } from "@mui/material";
import React from "react";
import TextFieldInput from "../../../components/inputs/text-field-input";
import { useTranslation } from "react-i18next";
import SelectBox from "../../../components/inputs/select-box";

export default function Index({
  user_management_layout_position,
  form,
  write_form,
  //   roles,
  accesses,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Card
        sx={(theme) => ({
          margin: "5px 1px",
          height: user_management_layout_position(),
          position: "relative",
          width: "-webkit-fill-available",
          background: theme.palette.background.default,
          borderRadius: "20px",
          padding: "15px",
          overflowY: "scroll",
        })}
      >
        <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_2"),
            value: form?.name,
            name: "name",
            onChange: write_form,
            errors: form?.errors?.name,
          }}
        />
        <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_3"),
            value: form?.last_name,
            name: "last_name",
            onChange: write_form,
            errors: form?.errors?.last_name,
          }}
        />
        <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_4"),
            value: form?.username,
            name: "username",
            onChange: write_form,
            errors: form?.errors?.username,
          }}
        />
        <TextFieldInput
          {...{
            label: t("usersTable.password"),
            value: form?.password,
            name: "password",
            onChange: write_form,
            errors: form?.errors?.password,
            type: "password",
          }}
        />
        <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_5"),
            value: form?.email,
            name: "email",
            onChange: write_form,
            errors: form?.errors?.email,
          }}
        />
        <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_6"),
            value: form?.mobile,
            name: "mobile",
            onChange: write_form,
            errors: form?.errors?.mobile,
          }}
        />
        {/* <TextFieldInput
          {...{
            label: t("usersTable.table_header_col_7"),
            value: form?.access_id,
            name: "access_id",
            onChange: write_form,
            errors: form?.errors?.access_id,
          }}
        /> */}
        <SelectBox
          {...{
            label: t("usersTable.table_header_col_7"),
            onChange: write_form,
            value: form?.access_id,
            name: "access_id",
            options: accesses,
          }}
        />
      </Card>
    </>
  );
}
