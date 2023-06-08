import React from "react";
import Box from "@mui/material/Box";
import {Button, Collapse, Grid, Slide} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {useTranslation} from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import Divider from "@mui/material/Divider";
import RefreshIcon from '@mui/icons-material/Refresh';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DateTimePickerComponent from "../../../components/inputs/date-time-picker";
import {styled} from "@mui/material/styles";
import BadgePulse from "../../../components/badge-pulsing"

const StyledPaper = styled(Paper)(
  ({theme}) => ({
    '&': {
      background: theme.palette.background.paper,
      borderRadius: "12px",
      marginBottom: "15px",
    }
  })
);

export default function Filter({
                                 write_form,
                                 filter_form,
                                 clear_form,
                                 apply_filter,
                                 open_filter_collapse,
                                 set_open_filter_collapse,
                                 active_filter
                               }) {

  const {mode} = useModeColorContext();
  const {t} = useTranslation();

  return (
    <>
      <StyledPaper
        id='filter-component'
        elevation={0}
        sx={{
          borderRadius: "12px",
          marginBottom: "15px"
        }}
      >
        {/*collapse button*/}
        <Box
          sx={{
            width: '100%',
            display: 'block',
            padding: 0,
            height: '54px'
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Button
            disableRipple
            onClick={() => {
              set_open_filter_collapse(prev => !prev)
            }}
            sx={(theme) => ({
              borderRadius: open_filter_collapse ? '12px 12px 0 0' : '12px',
              display: 'flex',
              alignItems: "center",
              justifyContent: 'space-between',
              width: "100%",
              padding: '15px 10px 15px 0',
              color: mode === 'light' ? 'black' : 'white',
              '&:hover': {
                background: theme.palette.background.item_background_light,
              },
              transition: theme.transitions.create(['background', 'borderRadius'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.complex,
              }),
            })}
          >
            <Box component='span' sx={{display: 'flex', alignItems: 'center'}}>
              <FilterAltIcon sx={{minWidth: "40px"}}/>
              <Typography>
                {t('common.filter')}
              </Typography>
            </Box>
            <Box component='span' sx={{display: 'flex', alignItems: 'center'}}>
              {active_filter?.desktop && <BadgePulse/>}
              {open_filter_collapse ? <ExpandLess/> : <ExpandMore/>}
            </Box>
          </Button>
        </Box>

        {/*collapse*/}
        <Collapse
          in={open_filter_collapse}
          timeout="auto"
          // unmountOnExit
        >
          {open_filter_collapse && <Divider/>}
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{xs: 1, md: 2}}
            columns={{md: 12}}
            component="div"
            sx={{
              padding: '15px',
              margin: 0,
              height: '115px'
            }}
          >

            {/*filter title*/}
            <Grid item md={3}>
              <TextFieldInput
                {...({
                  text_field_label: t('common.title'),
                  value: filter_form?.name,
                  name: 'name',
                  onChange: write_form
                })}
              />
            </Grid>
            {/*filter created date*/}
            <Grid item md={3}>
              <DateTimePickerComponent
                {...({
                  label: t('common.created_at'),
                  value: filter_form?.created_at,
                  name: 'created_at',
                  onChange: write_form,
                })}
              />
            </Grid>

            {/*filter updated date*/}
            <Grid item md={3}>
              <DateTimePickerComponent
                {...({
                  label: t('common.updated_at'),
                  value: filter_form?.updated_at,
                  name: 'updated_at',
                  onChange: write_form,
                })}
              />
            </Grid>
          </Grid>

          <Divider/>
          {/*buttons*/}
          <Box
            sx={{
              padding: '10px 15px',
              textAlign: 'end',
              height: '55px'
            }}
          >
            {/*filter reset button*/}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon/>}
              onClick={() => clear_form()}
            >
              {t('common.clear_label')}
            </Button>

            {/*filter operation button*/}
            <Button
              variant="contained"
              startIcon={<PlaylistAddCheckIcon/>}
              sx={(theme) => ({
                ml: 2,
                background: theme.palette.background.blue_button,
                '&:hover,&:active,&:focus': {
                  background: theme.palette.background.blue_button,
                },
                color: theme?.palette?.color?.defaultFontContained
              })}
              onClick={apply_filter}
            >
              {t('common.apply')}
            </Button>

          </Box>
        </Collapse>
      </StyledPaper>
    </>
  )
}