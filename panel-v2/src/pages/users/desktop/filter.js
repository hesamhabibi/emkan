import React from "react";
import Box from "@mui/material/Box";
import { Button, Collapse, Grid } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import { ExpandLess, ExpandMore, Title } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DateTimePickerComponent from "../../../components/inputs/date-time-picker";
import { styled } from "@mui/material/styles";
import BadgePulse from "../../../components/badge-pulsing";
import ButtonCustom from "../../../components/buttons";
import SelectBox from "../../../components/inputs/select-box";

const StyledPaper = styled(Paper)(({ theme }) => ({
  "&": {
    background: theme.palette.background.paper,
    borderRadius: "12px",
    marginBottom: "15px",
  },
}));

const CollapseButton = styled(Button)(({ theme, open_filter_collapse }) => ({
  "&": {
    borderRadius: open_filter_collapse ? "12px 12px 0 0" : "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "15px 10px 15px 0",
    color: theme.palette.color.defaultFont,
    "&:hover": {
      background: theme.palette.background.item_background_light,
    },
    transition: theme.transitions.create(["background", "borderRadius"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,
    }),
  },
}));

export default function Filter({
  write_form,
  filter_form,
  clear_form,
  apply_filter,
  open_filter_collapse,
  set_open_filter_collapse,
  active_filter,
  accesses,
  get_global_query_params
}) {
    const _get_global_query_params = get_global_query_params();
  const { t } = useTranslation();

  const accesses_option = [...accesses, {value:"",title:t("usersTable.no_access")}];

  return (
    <>
      <StyledPaper
        id="filter-component"
        elevation={0}
        sx={{
          borderRadius: "12px",
          marginBottom: "15px",
        }}
      >
        {/*collapse button*/}
        <Box
          sx={{
            width: "100%",
            display: "block",
            padding: 0,
            height: "54px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <CollapseButton
            disableRipple
            onClick={() => {
              set_open_filter_collapse((prev) => !prev);
            }}
            open_filter_collapse={open_filter_collapse}
          >
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FilterAltIcon sx={{ minWidth: "40px" }} />
              <Typography>{t("common.filter")}</Typography>
            </Box>
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {active_filter?.desktop && <BadgePulse />}
              {open_filter_collapse ? <ExpandLess /> : <ExpandMore />}
            </Box>
          </CollapseButton>
        </Box>

        {/*collapse*/}
        <Collapse in={open_filter_collapse} timeout="auto">
          <form
            onSubmit={(e) => {
              apply_filter(e);
              set_open_filter_collapse(false);
            }}
          >
            {open_filter_collapse && <Divider />}
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, md: 2 }}
              columns={{ md: 12 }}
              component="div"
              sx={{
                padding: "15px",
                margin: 0,
                // height: '115px'
              }}
            >
              {/*filter title*/}
              <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_2"),
                    value: _get_global_query_params?.name || "",
                    name: "name",
                    // onChange: write_form,
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_3"),
                    value: _get_global_query_params?.last_name || "",
                    name: "last_name",
                    // onChange: write_form,
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_4"),
                    value: _get_global_query_params?.username || "",
                    name: "username",
                    // onChange: write_form,
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_5"),
                    value: _get_global_query_params?.email || "",
                    name: "email",
                    // onChange: write_form,
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_6"),
                    value: _get_global_query_params?.mobile || "",
                    name: "mobile",
                    // onChange: write_form,
                  }}
                />
              </Grid>
              {/* <Grid item md={3}>
                <TextFieldInput
                  {...{
                    label: t("usersTable.table_header_col_7"),
                    value: filter_form?.access_id || "",
                    name: "access_id",
                    onChange: write_form,
                  }}
                />
              </Grid> */}
              <Grid item md={3}>
              <SelectBox
                {...{
                  label: t("usersTable.table_header_col_7"),
                //   onChange: write_form,
                  name: "access_id",
                  value: _get_global_query_params?.access_id,
                  options: accesses_option,
                }}
              />
            </Grid>
              {/*filter created date*/}
              <Grid item md={3}>
                <DateTimePickerComponent
                  {...{
                    label: t("common.createdAt"),
                    value: _get_global_query_params?.createdAt,
                    name: "createdAt",
                    // onChange: write_form,
                  }}
                />
              </Grid>

              {/*filter updated date*/}
              <Grid item md={3}>
                <DateTimePickerComponent
                  {...{
                    label: t("common.updatedAt"),
                    value: _get_global_query_params?.updatedAt,
                    name: "updatedAt",
                    // onChange: write_form,
                  }}
                />
              </Grid>
            </Grid>

            <Divider />
            {/*buttons*/}
            <Box
              sx={{
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "5px",
                height: "55px",
              }}
            >
              {/*reset button*/}
              <ButtonCustom
                color="primary"
                onClick={() => clear_form()}
                startIcon={<RefreshIcon />}
                button_text={"common.clear_label"}
                // coloType={'green'}
              />

              {/*filter operation button*/}
              <ButtonCustom
                type="submit"
                //    onClick={}
                startIcon={<PlaylistAddCheckIcon />}
                button_text={"common.apply"}
                color_type="info"
              />
            </Box>
          </form>
        </Collapse>
      </StyledPaper>
    </>
  );
}
