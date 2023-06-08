import React from 'react';
import Box from '@mui/material/Stack';
import {useTranslation} from "react-i18next";
import {Button, Typography} from "@mui/material";

export default function Index(props) {
    const {t} = useTranslation();

    const {onCancel, onConfirm, set_open, name, data} = props;

    // console.log('data', data);

    return (
        <Box sx={{fontFamily: 'IRANSans-Regular'}}>
            <Box
                sx={(theme) => ({
                    background: theme?.palette?.color?.redAlert,
                    display: 'flex',
                    flexDirection: 'initial',
                    alignItems: 'center',
                    padding: '16px 10px',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                })}
            >
                <Typography
                    sx={(theme) => ({color: 'white', fontSize: 14})}>
                    {t('confirmation.delete-title')}
                </Typography>
            </Box>
            <Typography sx={{p: '15px', fontSize: 14}}>
                {t('confirmation.delete-description')}
            </Typography>

            {/*fixed buttons*/}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    left: 0,
                    right: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'initial',
                        justifyContent: 'end',
                        alignItems: 'center',
                        margin: '0 15px',
                        gap: 1
                    }}
                >
                    <Button
                        sx={(theme) => ({
                            width: '100%',
                            padding: '10px 0',
                            borderRadius: '10px',
                            color: theme?.palette?.color?.defaultFont,
                            '&:hover,&:active,&:focus': {
                                color: theme?.palette?.color?.redAlert,
                                background: 'transparent'
                            }
                        })}
                        onClick={() => onCancel ? onCancel() : set_open(name, false)}
                    >
                        {t('confirmation.cancel_button')}
                    </Button>
                    <Button variant="contained"
                            sx={(theme) => ({
                                color: 'white',
                                background: theme?.palette?.color?.redAlert,
                                width: '100%',
                                padding: '10px 0',
                                borderRadius: '10px',
                                '&:hover,&:active,&:focus': {
                                    background: theme?.palette?.color?.redAlert,
                                }
                            })}
                            onClick={() => onConfirm ? onConfirm(data) : set_open(name, false)}
                    >
                        {t('confirmation.confirm_button')}
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}