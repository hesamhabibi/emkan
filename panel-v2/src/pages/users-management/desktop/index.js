import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import TextFieldInput from "../../../components/inputs/text-field-input";
import EditIcon from "@mui/icons-material/Edit";
import ButtonCustom from "../../../components/buttons";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import routesName from "../../../constants/routes";
import SelectBox from "../../../components/inputs/select-box";

const Index = ({
  form,
  write_form,
  submit_user,
  edit_mode,
  loading,
  accesses,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Card
        sx={(theme) => ({
          height: "100%",
          borderRadius: "12px",
          background: theme.palette.background.paper,
        })}
      >
        <Box
          sx={{
            height: "60px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {edit_mode
              ? t("usersTable.edit_user_btn")
              : t("usersTable.create_user_btn")}
          </Typography>

          <ButtonCustom
            button_text={"dashboardMenuItems.users_title"}
            color_type="info"
            iconButton={<ArrowBackIcon />}
            href={routesName["users"]}
          />
        </Box>
        <Divider />
        <CardContent
          sx={{
            height: "calc(100% - 120px)",
          }}
        >
          <Grid
            container
            columns={{ md: 12 }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, md: 2 }}
          >
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_2"),
                    value: form?.name,
                    name: "name",
                    onChange: write_form,
                    errors: form?.errors?.name,
                  }}
                />
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_3"),
                    value: form?.last_name,
                    name: "last_name",
                    onChange: write_form,
                    errors: form?.errors?.last_name,
                  }}
                />
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_4"),
                    value: form?.username,
                    name: "username",
                    onChange: write_form,
                    errors: form?.errors?.username,
                  }}
                />
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
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
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_5"),
                    value: form?.email,
                    name: "email",
                    onChange: write_form,
                    errors: form?.errors?.email,
                  }}
                />
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_6"),
                    value: form?.mobile,
                    name: "mobile",
                    onChange: write_form,
                    errors: form?.errors?.mobile,
                  }}
                />
              )}
            </Grid>
            <Grid item md={6}>
              {loading ? (
                <Skeleton sx={{ width: "100%", height: "50px" }} />
              ) : (
                <SelectBox
                  {...{
                    label: t("usersTable.table_header_col_7"),
                    onChange: write_form,
                    value: form?.access_id,
                    name: "access_id",
                    options: accesses,
                  }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            height: "60px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {loading ? (
            <Skeleton sx={{ width: "110px", height: "50px" }} />
          ) : (
            <ButtonCustom
              button_text={
                edit_mode
                  ? t("usersTable.edit_user_btn")
                  : t("usersTable.create_user_btn")
              }
              startIcon={edit_mode ? <EditIcon /> : <AddIcon />}
              onClick={() => submit_user()}
            />
          )}
        </CardActions>
      </Card>
    </>
  );
};
export default Index;
