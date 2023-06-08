import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {styled} from "@mui/material/styles";

const StyledAlert = styled(Alert)(({theme}) => ({
    '&': {
        borderRadius: '10px'
    },
    '& .MuiAlert-message': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));

const StyledBox = styled(Box)(({theme}) => ({
    '&': {
        width: '6px',
        height: '48px',
        borderRadius: '10px',
        marginRight: '10px'
    },
}));

export default function NotificationContentDrawer() {

    const {direction} = useLanguageContext();
    return (
        <>
            <Stack sx={{width: '100%'}} spacing={2}>
                <StyledAlert severity="error" icon={false}>
                    <Box component='main' sx={{display: 'flex', alignItems: 'center'}}>
                        <StyledBox
                            sx={(theme) => ({
                                color: theme.palette.color.redAlert,
                                background: theme.palette.color.redAlert
                            })}
                        > | </StyledBox>
                        <Box>
                            <AlertTitle><strong>Commnet in Sport T-shert</strong></AlertTitle>
                            ۲ دقیقه پیش
                        </Box>
                    </Box>
                    {direction === 'rtl' ?
                        <KeyboardArrowLeftIcon sx={(theme) => ({color: theme.palette.color.redAlert})}/>
                        :
                        <KeyboardArrowRightIcon sx={(theme) => ({color: theme.palette.color.redAlert})}/>
                    }
                </StyledAlert>
                <StyledAlert severity="success" icon={false}>
                    <Box component='main' sx={{display: 'flex', alignItems: 'center'}}>
                        <StyledBox
                            sx={(theme) => ({
                                color: theme.palette.color.greenAlert,
                                background: theme.palette.color.greenAlert
                            })}
                        > | </StyledBox>
                        <Box>
                            <AlertTitle><strong>Commnet in Sport T-shert</strong></AlertTitle>
                            ۲ دقیقه پیش
                        </Box>
                    </Box>
                    {direction === 'rtl' ?
                        <KeyboardArrowLeftIcon sx={(theme) => ({color: theme.palette.color.greenAlert})}/>
                        :
                        <KeyboardArrowRightIcon sx={(theme) => ({color: theme.palette.color.greenAlert})}/>
                    }
                </StyledAlert>
                <StyledAlert severity="info" icon={false}>
                    <Box component='main' sx={{display: 'flex', alignItems: 'center'}}>
                        <StyledBox
                            sx={(theme) => ({
                                color: theme.palette.color.blueAlert,
                                background: theme.palette.color.blueAlert
                            })}
                        > | </StyledBox>
                        <Box>
                            <AlertTitle><strong>Commnet in Sport T-shert</strong></AlertTitle>
                            ۲ دقیقه پیش
                        </Box>
                    </Box>
                    {direction === 'rtl' ?
                        <KeyboardArrowLeftIcon sx={(theme) => ({color: theme.palette.color.blueAlert})}/>
                        :
                        <KeyboardArrowRightIcon sx={(theme) => ({color: theme.palette.color.blueAlert})}/>
                    }
                </StyledAlert>
                <StyledAlert severity="warning" icon={false}>
                    <Box component='main' sx={{display: 'flex', alignItems: 'center'}}>
                        <StyledBox
                            sx={(theme) => ({
                                color: theme.palette.color.yellowAlert,
                                background: theme.palette.color.yellowAlert
                            })}
                        > | </StyledBox>
                        <Box>
                            <AlertTitle><strong>Commnet in Sport T-shert</strong></AlertTitle>
                            ۲ دقیقه پیش
                        </Box>
                    </Box>
                    {direction === 'rtl' ?
                        <KeyboardArrowLeftIcon sx={(theme) => ({color: theme.palette.color.yellowAlert})}/>
                        :
                        <KeyboardArrowRightIcon sx={(theme) => ({color: theme.palette.color.yellowAlert})}/>
                    }
                </StyledAlert>
            </Stack>
        </>
    )
}