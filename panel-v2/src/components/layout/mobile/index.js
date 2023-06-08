import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Footer from "./footer";
import Header from "./header";
import MenuContentDrawer from "./menu-content-drawer";
import SettingContentDrawer from "./setting-content-drawer";
import {styled} from "@mui/material/styles";
import ProfileContentDrawer from "./profile-content-drawer";
import NotificationContentDrawer from "./notification-content-drawer";
import {useHeaderComponentContext} from "../../../contexts/HeaderComponentContext";
import {useFooterComponentContext} from "../../../contexts/FooterComponentContext";
import {useDialogContext} from "../../../contexts/DialogContext";


const Bodybox = styled(Box)(({theme}) => ({
    '&': {
        background: theme.palette.background.body,
    },
}));

export default function Index({children}) {

    const {breadcrumbs} = useHeaderComponentContext();
    const {footer_component} = useFooterComponentContext();
    const {init_dialog} = useDialogContext();

    useEffect(() => {
        init_dialog({
            name: 'navbar_menu_mobile',
            component: <MenuContentDrawer/>,
            open: false,
            title: 'common.menu'
        })

        init_dialog({
            name: 'notification_mobile',
            component: <NotificationContentDrawer/>,
            open: false,
            title: 'common.notifications'
        })

        init_dialog({
            name: 'profile_mobile',
            component: <ProfileContentDrawer/>,
            open: false,
            title: 'common.menu'
        })

        init_dialog({
            name: 'setting_mobile',
            component: <SettingContentDrawer/>,
            open: false,
            title: 'common.setting'
        })
    }, []);


    return (
        <Bodybox component={'main'}
                 sx={(theme) => ({
                     height: '100vh',
                     margin: 0,
                     overflowY: 'hidden'
                 })}>

            <Header/>

            <Box
                sx={{
                    height: breadcrumbs?.length > 0 ? 'calc(100vh - 195px)' : 'calc(100vh - 140px)',
                    marginTop: breadcrumbs?.length > 0 ? '85px' : '65px',
                    marginBottom: footer_component ? '110px' : '70px',
                    overflowY: 'auto',
                    marginLeft: '5px',
                    marginRight: '5px',
                }}
            >
                {children}

            </Box>

            <Footer/>
        </Bodybox>
    )
}