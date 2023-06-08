import React from "react";
import {Box, Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";
import {useTranslation} from "react-i18next";

const StyledBox = styled(Box)(({theme, drawer_width, open_sidebar}) => ({
  '&': {
    zIndex: zIndex.drawer,
    position: 'fixed',
    bottom: 0,
    left: open_sidebar ? `${drawer_width}px` : `calc(${theme.spacing(7)} + 1px)`,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    height: '40px',
    background: theme.palette.background.desktop_body
  },
}));

function Footer({
                  drawer_width,
                  open_sidebar
                }) {

  const {t} = useTranslation();

  return (
    <StyledBox
      drawer_width={drawer_width}
      open_sidebar={open_sidebar ? 1 : 0}
    >
      <Divider/>
      <Typography
        component={'span'}
        sx={{
          fontSize: '12px',
          margin: '0 24px'
        }}>
        {t('common.powered_by')} :
        <Typography
          component={'span'}
          sx={(theme) => ({
            color: theme.palette.primary.main,
            display: 'inline',
            fontSize: '12px',
            marginLeft: '5px'
          })}
        >
          {t('common.branch_team_exception')}
        </Typography>
      </Typography>
    </StyledBox>
  )
}

export default Footer