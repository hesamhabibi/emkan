import React, {useEffect, useState} from "react";
import useOnlineStatus from "../../hooks/CheckInternet";
import {Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";
import PortableWifiOffTwoToneIcon from '@mui/icons-material/PortableWifiOffTwoTone';

const StyledModal = styled(Modal)(({theme}) => ({
    '& .MuiModal-backdrop': {
        background: theme.palette.background.default
    }
}))

const Index = () => {
    const [show, set_show] = useState(false);

    const online = useOnlineStatus();
    const {t} = useTranslation();

    const handle_close_modal = () => set_show(false);
    const handle_show_modal = () => set_show(true);

    useEffect(() => {
        if (online !== true) handle_show_modal()
        if (online === true) handle_close_modal()
    })

    return (
        <StyledModal
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            open={show}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <PortableWifiOffTwoToneIcon
                    sx={(theme) => ({
                        fontSize: 80,
                        color: theme?.palette?.color?.defaultFont
                    })}
                />
                <Box>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 16,
                            py: 1,
                        })}
                    >
                        {t('errors.no-network-title')}
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 13,
                            pb: 1,
                        })}
                    >
                        {t('errors.no-network-text')}
                    </Typography>
                </Box>
            </Box>
        </StyledModal>
    );
}

export default Index;