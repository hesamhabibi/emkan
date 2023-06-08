import React from 'react';
import {Button, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const StyledBox = styled(Box)(({theme}) => ({
    '&': {
        background: theme.palette.background.item_background_light,
        minHeight: 35,
        padding: '10px',
        margin: '5px 0 10px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));
const ProfileBox = styled(Box)(({theme}) => ({
    '&': {
        background: theme.palette.background.default,
        height: 75,
        width: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
}));

const StyledListSubheader = styled(ListSubheader)(({theme}) => ({
    '&': {
        background: theme.palette.background.default,
        lineHeight: '23px',
        padding: '8px',
        marginTop: '10px'
    },
}));
const StyledListItem = styled(ListItem)(({theme}) => ({
    '&': {
        background: theme.palette.background.item_background_light,
        borderRadius: '10px',
        marginBottom: '5px'
    },
}));
const StyledActiveListItem = styled(ListItem)(({theme}) => ({
    '&': {
        borderRadius: '10px',
        marginBottom: '5px',
        background: theme.palette.action.background,
    },
}));
const StyledIconButton = styled(Button)(({theme}) => ({
    '&': {
        borderRadius: '10px',
        width: '100%',
        padding: '12px 16px',
        duration: theme.transitions.duration
    },
}));


export default function ProfileContentDrawer() {
    const {direction} = useLanguageContext();
    const {t} = useTranslation();

    return (

        <>
            {/*user info box*/}
            <StyledBox>
                {/*image & text box*/}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    {/*profile image box*/}
                    <ProfileBox>
                        {/*imag*/}
                        <Box
                            component="img"
                            sx={{
                                width: 36,
                                height: 41,
                            }}
                            alt="logo"
                            src={`./assets/images/user-astronaut.png`}
                        />
                    </ProfileBox>
                    {/*text box*/}
                    <Box>
                        <Typography>name</Typography>
                        <Typography>email@gmail.con</Typography>
                        <Button sx={{fontSize: 12}}>{t('profile.edit')}</Button>
                    </Box>
                </Box>

                {direction === 'rtl' ?
                    <KeyboardArrowLeftIcon color="primary"/>
                    :
                    <KeyboardArrowRightIcon color="primary"/>}

            </StyledBox>

            {/*copy link button*/}
            <StyledIconButton
                sx={(theme)=> ({
                    background: theme.palette.background.item_background_light,
                    justifyContent: 'start',
                })}
            >
                <InsertLinkRoundedIcon color="primary"/>
                <Typography sx={{ml: 1}}>link</Typography>
            </StyledIconButton>

            <List
                subheader={
                    <StyledListSubheader
                        component="div"
                        id="nested-list-subheader1">
                        {t('profile.switch')}
                    </StyledListSubheader>}
            >
                <StyledActiveListItem>
                    <ListItemIcon sx={{minWidth: 0, mr: 1,}}>
                        <CheckCircleOutlineOutlinedIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={'name'}/>
                </StyledActiveListItem>

                <StyledListItem>
                    <ListItemIcon sx={{minWidth: 0, mr: 1,}}>
                        <SwitchAccountIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary={'account name'}/>
                </StyledListItem>
            </List>

            <StyledIconButton
                sx={(theme)=> ({
                    background: theme.palette.color.redAlert,
                    justifyContent:'center',
                    color:theme?.palette?.color?.defaultFont,
                    position:'fixed',
                    bottom: 15,
                    left:0,
                    right:0,
                    borderRadius:'20px !important',
                    width:'calc(100% - 10px) !important',
                    margin: 'auto'
                })}
            >
                <Typography sx={{ml: 1}}>{t('common.logout')}</Typography>
            </StyledIconButton>
        </>
    )
}