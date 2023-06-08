import IconButton from "@mui/material/IconButton";
import React from 'react';
import {useTranslation} from "react-i18next";
import {InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {styled} from "@mui/material/styles";

const StyledPaper = styled(Paper)(({theme}) => ({
    '&': {
        border: '1px solid',
        borderColor:theme.palette.action.light_border,
        background: theme.palette.background.desktop_body
    },
}));

export default function DesktopSearchBox() {

    const {t} = useTranslation();

    return (
        <>
            {/*appbar search box*/}
            <StyledPaper
                component="form"
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 200,
                    borderRadius: 3,
                    padding: '3px'
                }}
            >
                <IconButton
                    sx={{padding: '6px'}}
                    aria-label="search">
                    <SearchIcon color="primary"/>
                </IconButton>
                <InputBase
                    sx={{ flex: 1,fontSize:12}}
                    placeholder={t('appBar.search_placeholder')}
                    inputProps={{'aria-label': 'search google maps'}}
                />
            </StyledPaper>
        </>

    )
}