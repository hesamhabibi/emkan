import React from "react";
import {Button, Chip, Modal, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import useCheckError from "../../hooks/CheckError";
import RefreshIcon from '@mui/icons-material/Refresh';

const StyledModal = styled(Modal)(({theme}) => ({
  '& .MuiModal-backdrop': {
    background: theme.palette.background.default
  }
}))

const Index = ({error}) => {
  const {t} = useTranslation();
  const {reset_error} = useCheckError();
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
        <ErrorTwoToneIcon
          color="primary"
          sx={(theme) => ({
            fontSize: 80,
            // color: theme.palette.color.defaultFont
          })}/>
        <Box>
          <Typography
            sx={(theme) => ({
              color: theme.palette.color.defaultFont,
              fontSize: 18,
              py: 1,
            })}
          >
            {t('errors.error-500-title')}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.color.defaultFont,
              fontSize: 16,
              pb: 3,
            })}
          >
            <Chip variant="outlined" color="error"
                  label={error?.details?.response?.statusText || error?.details?.code}/>
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.color.defaultFont,
              fontSize: 13,
              pb: 3,
            })}
          >
            {t('errors.error-500-description')}
          </Typography>

          <Button
            sx={(theme) => ({
              width: '200px',
              borderRadius: '15px',
              padding: '6px 0',
              background: theme.palette.background.default
            })}
            variant="outlined"
            startIcon={<RefreshIcon/>}
            onClick={() => {
              reset_error()
              window.location.reload();
            }}
          >
            {t('errors.try-again')}
          </Button>

        </Box>
      </Box>
    </StyledModal>
  );
}

export default Index;