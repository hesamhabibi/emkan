import React from "react";
import Box from "@mui/material/Box";
import { Divider, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DateTimePickerComponent from "../../../components/inputs/date-time-picker";
import { useDialogContext } from "../../../contexts/DialogContext";
import SelectBox from "../../../components/inputs/select-box";
import { styled } from "@mui/material/styles";
import ButtonCustom from "../../../components/buttons";
import { options } from "../../../constants/SelectOptionConfigs";
import { rows_limit_list } from "../../../constants/PaginationConfigs";

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
  write_option_data,
  write_option_data_mobile,
}) {
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
          label: t("common.title"),
          value: filter_form?.title,
          name: "title",
          onChange: write_form,
        }}
      />

      {/*filter created date*/}
      <DateTimePickerComponent
        {...{
          label: t("common.createdAt"),
          value: filter_form?.createdAt,
          name: "createdAt",
          onChange: write_form,
        }}
      />

      {/*filter updated date*/}
      <DateTimePickerComponent
        {...{
          label: t("common.updatedAt"),
          value: filter_form?.updatedAt,
          name: "updatedAt",
          onChange: write_form,
        }}
      />
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
          label: t("common.title"),
          onChange: write_option_data_mobile,
          name: "sort_title",
          value: data_option?.sort_title,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("common.createdAt"),
          onChange: write_option_data_mobile,
          name: "sort_createdAt",
          value: data_option?.sort_createdAt,
          options: options,
        }}
      />
      <SelectBox
        {...{
          label: t("common.updatedAt"),
          onChange: write_option_data_mobile,
          name: "sort_updatedAt",
          value: data_option?.sort_updatedAt,
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

      <Select
        labelId="row-per-page-select-label"
        id="row-per-page-select-label"
        label={t("pagination.row_limit")}
        value={data_option?.limit}
        name="limit"
        onChange={write_option_data_mobile}
        sx={{ fontSize: 13, width: "100%" }}
      >
        {rows_limit_list.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

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
            apply_filter();
            dialog_close_last_deep();
          }}
          sx={{ width: "100%" }}
        />
      </StyledBox>
    </Box>
  );
}
