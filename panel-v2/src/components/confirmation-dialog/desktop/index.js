import * as React from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';

const Index = ({set_open, name, onCancel, onConfirm, data}) => {

    const {t} = useTranslation();

    return (
        <>
            <DialogTitle
                id="alert-dialog-title"
                sx={(theme) => ({
                    background: theme?.palette?.color?.redAlert,
                    display: 'flex',
                    flexDirection: 'initial',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                })}
            >
                <Typography
                    sx={(theme) => ({color: 'white', fontSize: 14})}>
                    {t('confirmation.delete-title')}
                </Typography>
                <IconButton onClick={onCancel ? onCancel : set_open(name, false)}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{p: 0}}>
                <DialogContentText
                    sx={{px: '15px', py: '20px', fontSize: 14}}
                    id="alert-dialog-description"
                >
                    {t('confirmation.delete-description')}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    flexDirection: 'initial',
                    justifyContent: 'end',
                    alignItems: 'center',
                    margin: '15px 15px 5px',
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
                            background: "transparent"
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
            </DialogActions>
        </>
    );
}
export default Index;