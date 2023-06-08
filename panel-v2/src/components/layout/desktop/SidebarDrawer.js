import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {rout_list} from "../../../constants/rout-list";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Collapse} from "@mui/material";

const openedMixin = (theme, drawer_width) => ({
  width: drawer_width, transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
  }), overflowX: 'hidden',
});

const closedMixin = (theme, drawer_width) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.complex,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})((arg) => {
  const {theme, open, drawer_width} = arg;
  return {
    width: drawer_width, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawer_width), '& .MuiDrawer-paper': openedMixin(theme, drawer_width),
    }),
    ...(!open && {
      ...closedMixin(theme, drawer_width), '& .MuiDrawer-paper': closedMixin(theme, drawer_width),
    }),
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.desktop_body,
      borderRight: theme.palette.divider.background1,

    },
  }
},);

export default function SidebarDrawer({
                                        open_sidebar,
                                        handle_drawer_close,
                                        drawer_width,
                                        DrawerHeader
                                      }) {

  const {direction} = useLanguageContext();
  const {t} = useTranslation();

  const [open_submenu_collapse, set_open_submenu_collapse] = useState(() => {
    const collapse_routes = rout_list?.filter(item => item?.children?.length > 0);
    let collapses = {};
    collapse_routes?.forEach(item => {
      collapses = {
        ...collapses,
        [item.key]: false
      }
    })
    return collapses;
  });

  const handle_menu_collapse = (key) => {
    set_open_submenu_collapse({
      ...open_submenu_collapse,
      [key]: !open_submenu_collapse[key]
    });
  };

  return (
    <Drawer
      drawer_width={drawer_width}
      variant="permanent"
      open={open_sidebar ? 1 : 0}
    >
      {/*sidebar drawer header*/}
      <DrawerHeader sx={{justifyContent: 'space-between !important'}}>
        {/*logo info*/}
        <Box sx={{display: 'flex', alignItems: 'center'}}>

          {/*sidebar drawer logo*/}
          <Box
            component="img"
            sx={{height: 40, width: 40,}}
            alt="logo"
            src={`./assets/images/bt-logo.png`}
          />
          <Divider orientation="vertical" variant="middle" flexItem sx={{ml: 1, py: 2}}/>
          {/*sidebar drawer company name*/}
          <Typography sx={{ml: 1,}}>
            {t('dashboardHeader.title')}
          </Typography>
        </Box>
        {/*open & close drawer button*/}
        <IconButton onClick={handle_drawer_close}>
          {direction === 'rtl' ? <ChevronRightIcon color="primary"/> : <ChevronLeftIcon color="primary"/>}
        </IconButton>
      </DrawerHeader>
      <Divider/>
      {/*sidebar drawer body*/}
      <List>
        {rout_list.map((item, index) => (
          <ListItem key={index} disablePadding sx={{display: 'block'}}>
            {
              item?.children?.length > 0 ?
                <>
                  <ListItemButton
                    sx={{
                      px: 2.5,
                      py: '5px'
                    }}
                    onClick={() => handle_menu_collapse(item?.key)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 2,
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '.75rem'
                      }}
                      primary={t(item.title)}
                    />
                    {open_submenu_collapse[item?.key] ?
                      <ExpandLess color="primary"/>
                      :
                      <ExpandMore color="primary"/>}
                  </ListItemButton>
                  <Collapse in={open_submenu_collapse[item?.key]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {
                        item?.children?.map((item, index) => (
                          <ListItemButton
                            key={index}
                            sx={{
                              py: '5px',
                              pl: 5
                            }}>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 2,
                                justifyContent: 'center',
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primaryTypographyProps={{
                                fontSize: '.75rem'
                              }}
                              primary={t(item.title)}
                            />
                          </ListItemButton>
                        ))
                      }
                    </List>
                  </Collapse>
                </>
                :
                <ListItemButton
                  href={item.path}
                  sx={{
                    px: 2.5,
                    py: '5px'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: '.75rem'
                    }}
                    primary={t(item.title)}
                  />
                </ListItemButton>
            }
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}