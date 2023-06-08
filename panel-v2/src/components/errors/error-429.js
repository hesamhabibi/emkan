import React from "react";
import {Modal, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

const StyledModal = styled(Modal)(({theme}) => ({
    '& .MuiModal-backdrop': {
        background: theme.palette.background.default
    }
}))

const Index = () => {

    const {t} = useTranslation();

    return (
        <StyledModal
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            open={true}
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
                <ErrorTwoToneIcon
                    color="primary"
                    sx={(theme) => ({
                        fontSize: 80,
                        // color: theme?.palette?.color?.defaultFont
                    })}/>
                <Box>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 16,
                            py: 1,
                        })}
                    >
                        {t('errors.error-429-title')}
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 13,
                            pb: 1,
                        })}
                    >
                        {t('errors.error-429-text')}
                    </Typography>
                </Box>
            </Box>
        </StyledModal>
    );
}

export default Index;