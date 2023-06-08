import React, {useState} from "react";
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useFooterComponentContext} from "../../../contexts/FooterComponentContext";
import {useDialogContext} from "../../../contexts/DialogContext";
import {styled} from "@mui/material/styles";

const StyledBox = styled(Box)(({theme}) => ({
    '&': {
        background: theme.palette.background.default,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '20px',
        margin: '0 5px 10px',
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.1), 0px 0px 0px 0px rgba(0,0,0,0.12), 0px 1px 5px 0px rgba(0,0,0,0.10)',
    },
}));

export default function Footer() {

    const [mobile_navbar_value, set_mobile_navbar_value] = useState(0);

    const {footer_component} = useFooterComponentContext();
    const {dialog_open_handler} = useDialogContext();


    return (
        <>
            <StyledBox>
                {footer_component && footer_component}
                <BottomNavigation
                    showLabels
                    value={mobile_navbar_value}
                    onChange={(event, newValue) => {
                        set_mobile_navbar_value(newValue);
                    }}
                    sx={(theme) => ({
                        borderTopLeftRadius: footer_component ? 0 : '20px',
                        borderTopRightRadius: footer_component ? 0 : '20px',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        height: footer_component ? '45px' : '56px',
                        background: theme.palette.background.default,
                        overflow: 'hidden'
                    })}
                >
                    <BottomNavigationAction
                        onClick={() => {
                            dialog_open_handler('navbar_menu_mobile', true)
                        }}
                        icon={<MenuIcon/>}
                    />
                    <BottomNavigationAction
                        onClick={() => {
                            dialog_open_handler('notification_mobile', true)
                        }}
                        icon={<NotificationsNoneIcon/>}/>
                    <BottomNavigationAction
                        onClick={() => {
                            dialog_open_handler('profile_mobile', true)
                        }}
                        icon={<PersonOutlineIcon/>}/>
                </BottomNavigation>
            </StyledBox>
        </>
    )
}