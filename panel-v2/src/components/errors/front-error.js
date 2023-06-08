import React from "react";
import {Modal, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
import useErrorStatus from "../../hooks/CheckError";

const StyledModal = styled(Modal)(({theme}) => ({
    '& .MuiModal-backdrop': {
        background: theme.palette.background.default
    }
}))

const Index = () => {

    const {t} = useTranslation();
    const {reset_error} = useErrorStatus();

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
                    alignItems: 'center',
                    padding: 2
                }}>
                <BugReportTwoToneIcon
                    color="primary"
                    sx={(theme) => ({
                        fontSize: 80,
                        // color: theme?.palette?.color?.defaultFont
                    })}/>
                <Box>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 18,
                            py: 1,
                        })}
                    >
                        {t('errors.error-500-title')}
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 16,
                            pb: 3,
                        })}
                    >
                        {t('errors.error-500-text')}
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme?.palette?.color?.defaultFont,
                            fontSize: 13,
                        })}
                    >
                        {t('errors.error-500-description')}
                    </Typography>

                    <button onClick={() => {
                        reset_error()
                    }}>
                        reset button
                    </button>
                </Box>
            </Box>
        </StyledModal>
    );
}

export default Index;