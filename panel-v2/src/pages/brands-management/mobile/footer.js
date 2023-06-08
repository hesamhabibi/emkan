import React from "react";
import {Box, Button, Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';

const Footer = ({
                    submit_brand,
                    edit_mode
                }) => {
    const {t} = useTranslation();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 'calc(100% - 25px)',
                    margin: 'auto',
                    padding: '8px 0',
                }}
            >
                {/*create role button*/}
                <Button
                    startIcon={edit_mode ? <EditIcon/> : <AddIcon/>}
                    variant="contained"
                    color="primary"
                    sx={(theme) => ({
                        width: '100%',
                        borderRadius: '10px',
                        color: 'white'
                    })}
                    onClick={submit_brand}
                >
                    {edit_mode 
                       ? t("brands.edit_brand_btn")
                       : t("brands.create_brand_btn")
                    }
                </Button>
            </Box>
            <Divider sx={(theme) => ({margin: '0 15px', borderColor: theme.palette.background.item_background})}/>
        </>
    )
}
export default Footer