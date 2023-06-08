import React from "react";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";
import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

export default function Index() {
    const {t} = useTranslation();

    return (
        <Box
            sx={{
                margin: '10px',
                height: 'calc(100vh - 215px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}
        >
            <LibraryAddTwoToneIcon
                color="primary"
                sx={(theme) => ({
                    fontSize: 80,
                })}
            />

            <Typography
                sx={(theme) => ({
                    textAlign: 'center',
                    color: theme?.palette?.color?.defaultFont
                })}
            >
                {t('errors.no-data')}
            </Typography>

            <Button
                sx={(theme) => ({
                    borderRadius: '15px',
                    padding: '8px 20px',
                    mt:3,
                    background: theme?.palette?.background?.default
                })}
                variant="outlined"
                startIcon={<AddIcon/>}
            >
                {t('common.add')}
            </Button>
        </Box>
    )
}