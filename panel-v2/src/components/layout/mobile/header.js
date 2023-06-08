import React from "react";
import {Box, ListItem, Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {useHeaderComponentContext} from "../../../contexts/HeaderComponentContext";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {useDialogContext} from "../../../contexts/DialogContext";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";


const StyledPaper = styled(Paper)(({theme, breadcrumbs}) => ({
    '& ': {
        zIndex: theme.zIndex.drawer + 1,
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        borderRadius: '20px',
        margin: '10px 5px 0',
        height: breadcrumbs?.length > 0 ? '75px' : '56px',
        padding: '0px 15px',
        background: theme.palette.background.default,
        boxShadow: theme.shadows.small,
        display: breadcrumbs?.length > 0 ? 'initial' : 'flex',
        justifyContent: breadcrumbs?.length > 0 ? 'initial' : 'space-between',
        alignItems: breadcrumbs?.length > 0 ? 'initial' : 'center',
    }
}));

export default function Header() {

    const navigate = useNavigate();
    const {mode} = useModeColorContext();
    const {title_page, breadcrumbs} = useHeaderComponentContext();
    const {direction} = useLanguageContext();
    const {
        dialog_open_handler,
        check_open_dialog,
        dialog_close_last_deep,
        dialog_title
    } = useDialogContext();

    const {t} = useTranslation();

    return (
        <>
            {/*header & breadcrumb paper*/}
            <StyledPaper
                elevation={0}
                mode={mode}
                breadcrumbs={breadcrumbs}
            >
                {/*default header*/}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        direction: direction === 'ltr' && 'rtl',
                    }}
                >
                    {/*setting icon*/}
                    <IconButton
                        sx={{margin: 0}}
                        color="inherit"
                        edge="end"
                        onClick={() => {
                            dialog_open_handler('setting_mobile', true)
                        }}
                    >
                        <SettingsOutlinedIcon color="primary"/>
                    </IconButton>
                    {/*page title*/}
                    {
                        (check_open_dialog && dialog_title()) ?
                            <Typography>{t(dialog_title())}</Typography>
                            :
                            <Typography sx={{fontSize: 13}}>{t(title_page)}</Typography>
                    }

                    {/*close & back icon*/}
                    {
                        check_open_dialog ?
                            <IconButton onClick={() => dialog_close_last_deep()}>
                                <CloseIcon color="primary"/>
                            </IconButton>
                            :
                            <IconButton>
                                <KeyboardBackspaceIcon
                                    color="primary"
                                    onClick={(e) => navigate( -1)}
                                />
                            </IconButton>
                    }
                </Box>

                {/*breadcrumb*/}
                {
                    breadcrumbs?.length > 0 &&
                    <>
                        <Divider sx={(theme) => ({margin: 0, borderColor: theme.palette.background.item_background})}/>
                        <List
                            sx={{
                                fontFamily: 'IRANSans-Regular',
                                padding: '5px',
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
                                        }}>
                                        {t(item.title)}
                                        {
                                            (breadcrumbs?.length - 1 !== index && direction === 'rtl') &&
                                            <KeyboardDoubleArrowLeftIcon
                                                sx={{fontSize: 10, padding: '0 2px 0 4px', marginBottom: '-2px'}}/>
                                        }
                                        {
                                            (breadcrumbs?.length - 1 !== index && direction === 'ltr') &&
                                            <KeyboardDoubleArrowRightIcon
                                                sx={{fontSize: 10, paddingLeft: '0 2px 0 4px', marginBottom: '-2px'}}/>
                                        }
                                    </ListItem>
                                )
                            })}
                        </List>
                    </>
                }
            </StyledPaper>
        </>
    )
}