import React, {useState} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MainAppBar from "./mainAppBar";
import SettingSwipeableDrawer from "./SettingSwipableDrawer";
import SidebarDrawer from "./SidebarDrawer";
import {styled} from "@mui/material/styles";
import Footer from "./footer";

const drawer_width = 275;
const appbar_height = 64;

const StyledBox = styled(Box)(({theme, open_sidebar}) => {
  return {
    background: theme.palette.background.desktop_body,
    padding: '24px 24px 42px',
    height: `calc(100vh - ${appbar_height}px)`,
    marginTop: '65px',
    // marginBottom: '5px',
    position: 'fixed',
    right: 0,
    left: open_sidebar ? `${drawer_width}px` : `calc(${theme.spacing(7)} + 1px)`,
    overflowY: 'scroll',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex,
    }),
  }
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer({children}) {

  const [open_sidebar, set_open_sidebar] = useState(true);
  const [open_setting, set_open_setting] = useState(false);

  const handle_drawer_open = open => set_open_sidebar(open)
  const open_setting_handler = open => set_open_setting(open);
  const handle_drawer_close = () => {
    set_open_sidebar(false);
  }

  return (
    <>
      <Box sx={(theme) => ({display: 'flex', background: theme.palette.background.desktop_body,})}>
        <CssBaseline/>

        {/*sidebar drawer*/}
        <SidebarDrawer
          {...({
            open_sidebar,
            set_open_sidebar,
            handle_drawer_close,
            DrawerHeader,
            drawer_width,
          })}
        />

        {/*app bar*/}
        <MainAppBar
          {...({
            appbar_height,
            drawer_width,
            open_sidebar,
            set_open_sidebar,
            open_setting,
            set_open_setting,
            open_setting_handler,
            handle_drawer_open,
          })}
        />

        {/*pages*/}
        <StyledBox
          open_sidebar={open_sidebar ? 1 : 0}
          drawer_width={drawer_width}
          component="main"
        >
          {children}
        </StyledBox>

        <Footer
          drawer_width={drawer_width}
          open_sidebar={open_sidebar ? 1 : 0}
        />

        {/*setting drawer*/}
        <SettingSwipeableDrawer
          {...({
            open_setting,
            set_open_setting,
            DrawerHeader
          })}
        />
      </Box>
    </>
  )
}