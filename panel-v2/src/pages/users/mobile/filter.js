import React from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useDialogContext } from "../../../contexts/DialogContext";
import ButtonCustom from "../../../components/buttons";
import { styled } from "@mui/material/styles";
import { options } from "../../../constants/SelectOptionConfigs";
import SelectBox from "../../../components/inputs/select-box";
import {limit_options} from "../../../constants/PaginationConfigs";

const StyledBox = styled(Box)(({ theme }) => ({
  "&": {
    position: "fixed",
    bottom: 20,
    left: 0,
    right: 0,
    width: "calc(100% - 20px)",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    background: theme.palette.background.default,
  },
}));

export default function Filter({
  filter_form,
  write_form,
  clear_form,
  apply_filter,
  data_option,
  write_option_data_mobile,
  apply_filter_mobile,
  //   roles,
  accesses,
}) {
  // const [text_field_value, set_text_field_value] = useState('');
  const { t } = useTranslation();
  const { dialog_close_last_deep } = useDialogContext();

  return (
    <Box sx={{ padding: "10px" }}>
      <Divider
        textAlign="left"
        sx={{
          mb: 2,
          fontFamily: "IRANSans-Regular",
        }}
      >
        {t("common.filter")}
      </Divider>

      {/*filter title*/}
      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_2"),
          value: filter_form?.name,
          onChange: write_form,
          name: "name",
        }}
      />
      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_3"),
          value: filter_form?.last_name,
          onChange: write_form,
          name: "last_name",
        }}
      />
      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_4"),
          value: filter_form?.username,
          onChange: write_form,
          name: "username",
        }}
      />
      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_5"),
          value: filter_form?.email,
          onChange: write_form,
          name: "email",
        }}
      />

      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_6"),
          value: filter_form?.mobile,
          onChange: write_form,
          name: "mobile",
        }}
      />
      <TextFieldInput
        {...{
          label: t("usersTable.table_header_col_7"),
          value: filter_form?.access_id,
          onChange: write_form,
          name: "access_id",
        }}
      />
      {/* <SelectBox
        {...{
          label: t("usersTable.table_header_col_6"),
          onChange: write_form,
          name: "role_id",
          value: filter_form?.role_id,
          options: roles,
        }}
      /> */}
      <Divider
        textAlign="left"
        sx={{
          mb: 2,
          fontFamily: "IRANSans-Regular",
        }}
      >
        {t("common.sort")}
      </Divider>
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_2"),
          onChange: write_option_data_mobile,
          name: "name",
          value: data_option?.sort_name,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_3"),
          onChange: write_option_data_mobile,
          name: "last_name",
          value: data_option?.sort_last_name,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_4"),
          onChange: write_option_data_mobile,
          name: "username",
          value: data_option?.sort_username,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_5"),
          onChange: write_option_data_mobile,
          name: "email",
          value: data_option?.sort_email,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_6"),
          onChange: write_option_data_mobile,
          name: "mobile",
          value: data_option?.sort_mobile,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("usersTable.table_header_col_7"),
          onChange: write_option_data_mobile,
          name: "access_id",
          value: data_option?.sort_access_id,
          options: options,
        }}
      />
      <Divider
        textAlign="left"
        sx={{
          mb: 2,
          fontFamily: "IRANSans-Regular",
        }}
      >
        {t("pagination.row_limit")}
      </Divider>

      <SelectBox
        {...{
          label: t("pagination.row_limit"),
          onChange: write_option_data_mobile,
          name: "limit",
          value: data_option?.limit,
          options: limit_options
        }}
      />

      {/*filter buttons*/}
      <StyledBox>
        {/*filter reset button*/}
        <ButtonCustom
          button_text={"common.clear_label"}
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => {
            clear_form();
            dialog_close_last_deep();
          }}
          sx={{ width: "100%" }}
        />

        {/*apply filter operation button*/}
        <ButtonCustom
          button_text={"common.apply"}
          variant="outlined"
          color_type={"info"}
          startIcon={<PlaylistAddCheckIcon />}
          onClick={() => {
            apply_filter_mobile();
            dialog_close_last_deep();
          }}
          sx={{ width: "100%" }}
        />
      </StyledBox>
    </Box>
  );
}
