import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Divider from "@mui/material/Divider";
import React from 'react';
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {useTranslation} from "react-i18next";
import DesktopSearchBox from "./desktop-search-box";
import {useHeaderComponentContext} from "../../../contexts/HeaderComponentContext";
import {ListItem} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import List from "@mui/material/List";


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})((arg) => {
    const {theme, open, drawer_width, appbar_height} = arg;
    return {
        height: `${appbar_height}px`,
        maxHeight: `${appbar_height}px`,
        minHeight: `${appbar_height}px`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'],
            {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        ...((open) && {
            marginLeft: drawer_width,
            width: `calc(100% - ${drawer_width}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            '&': {
                backgroundColor: theme.palette.background.desktop_body
            },
            '& .muirtl-glyf0p-MuiPaper-root-MuiAppBar-root': {
                backgroundColor: theme.palette.background.desktop_body
            }
        }),
    }
});

const OutlinedIconButton = styled(IconButton)(({theme}) => ({
    '&': {
        border: '1px solid',
        borderColor: theme.palette.action.light_border,
        borderRadius: 12,
    },
}));

export default function MainAppBar({
                                       appbar_height,
                                       drawer_width,
                                       open_sidebar,
                                       open_setting_handler,
                                       handle_drawer_open,
                                   }) {

    const {direction} = useLanguageContext();
    const {mode} = useModeColorContext();
    const {t} = useTranslation();
    const {title_page, breadcrumbs} = useHeaderComponentContext();
    const {header_component} = useHeaderComponentContext();


    return (
        <AppBar
            drawer_width={drawer_width}
            appbar_height={appbar_height}
            position="fixed"
            open={open_sidebar ? 1 : 0}
            _direction={direction}
            sx={(theme) => ({
                boxShadow: 0,
                background: theme.palette.background.desktop_body
            })}
        >
            <Toolbar sx={{justifyContent: "space-between"}}>

                {/*appBar right side (menu icon & title)*/}
                <Box sx={{...(!open_sidebar && {display: 'flex'}), alignItems: 'center'}}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={handle_drawer_open}
                        edge="start"
                        sx={{...(open_sidebar && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        color={mode === 'light' ? 'black' : 'white'}
                        sx={{
                            ...(!open_sidebar && {ml: 2})
                        }}
                    >
                        {t(title_page)}
                    </Typography>
                    {breadcrumbs?.length > 0 &&
                        <List
                            sx={{
                                fontFamily: 'IRANSans-Regular',
                                padding: 0,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textAlign: 'center'
                            }}>
                            {breadcrumbs.map((item, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            display: 'inline',
                                            fontSize: 12,
                                            padding: 0
                                        }}
                                    >
                                        {t(item.title)}
                                        {
                                            (breadcrumbs?.length - 1 !== index && direction === 'rtl') &&
                                            <KeyboardDoubleArrowLeftIcon
                                                sx={{
                                                    fontSize: 12,
                                                    padding: '0 2px 0 4px',
                                                    marginBottom: '-4px',
                                                    width: '20px',
                                                    height: '12px',
                                                }}/>
                                        }
                                        {
                                            (breadcrumbs?.length - 1 !== index && direction === 'ltr') &&
                                            <KeyboardDoubleArrowRightIcon
                                                sx={{
                                                    fontSize: 10,
                                                    paddingLeft: '0 2px 0 4px',
                                                    marginBottom: '-4px',
                                                    width: '20px',
                                                    height: '12px',
                                                }}/>
                                        }
                                    </ListItem>
                                )
                            })}
                        </List>
                    }

                </Box>

                {/*appBar left side (search & buttons)*/}
                <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>

                    {/*appbar search box*/}
                    <DesktopSearchBox/>

                    {header_component && header_component}

                    {/*appbar setting icon*/}
                    <OutlinedIconButton
                        color="inherit"
                        edge="end"
                        onClick={() => open_setting_handler(true)}
                        sx={{marginRight: '1px'}}
                    >
                        <SettingsOutlinedIcon color="primary"/>
                    </OutlinedIconButton>

                    {/*appbar notification icon*/}
                    <OutlinedIconButton
                        color="inherit"
                        edge="end"
                    >
                        <NotificationsNoneIcon color="primary"/>
                    </OutlinedIconButton>
                </Box>
            </Toolbar>
            <Divider/>
        </AppBar>
    )
}