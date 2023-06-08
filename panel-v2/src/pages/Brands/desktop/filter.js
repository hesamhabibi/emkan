import React from "react";
import Box from "@mui/material/Box";
import { Button, Collapse, Grid, Slide, ToggleButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
import { random_string } from "../../../helpers/string";
import ToggleButtonComponent from "../../../components/inputs/toggle-button";

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
}) {
  const { t } = useTranslation();

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
              // height: "115px",
            }}
          >
            {/*filter title*/}
            <Grid item md={4}>
              <TextFieldInput
                {...{
                  label: t("common.title"),
                  value: filter_form?.title || "",
                  name: "title",
                  onChange: write_form,
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextFieldInput
                {...{
                  label: t("common.description"),
                  value: filter_form?.description || "",
                  name: "description",
                  onChange: write_form,
                }}
              />
            </Grid>
            <Grid item md={4}>
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
                value={filter_form?.show_in_menu || false}
              />
            </Grid>
            {/*filter created date*/}
            <Grid item md={4}>
              <DateTimePickerComponent
                {...{
                  label: t("common.createdAt"),
                  value: filter_form?.createdAt,
                  name: "createdAt",
                  onChange: write_form,
                }}
              />
            </Grid>

            {/*filter updated date*/}
            <Grid item md={4}>
              <DateTimePickerComponent
                {...{
                  label: t("common.updatedAt"),
                  value: filter_form?.updatedAt,
                  name: "updatedAt",
                  onChange: write_form,
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
              onClick={() => {
                apply_filter();
                set_open_filter_collapse(false);
              }}
              startIcon={<PlaylistAddCheckIcon />}
              button_text={"common.apply"}
              color_type="info"
            />
          </Box>
        </Collapse>
      </StyledPaper>
    </>
  );
}
