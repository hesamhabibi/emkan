import IconButton from "@mui/material/IconButton";
import React from 'react';
import {useTranslation} from "react-i18next";
import {InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {styled} from "@mui/material/styles";

const StyledPaper = styled(Paper)(({theme}) => ({
    '&': {
        background:theme.palette.background.item_background,
    },
}));
export default function MobileSearchBox() {

    const {t} = useTranslation();
    const {mode} = useModeColorContext();

    return (
        <>
            {/*search box*/}
            <StyledPaper
                component="form"
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'auto',
                    borderRadius: 3,
                    padding: '8px'
                }}
            >
                <IconButton
                    sx={{padding: '6px'}}
                    aria-label="search">
                    <SearchIcon color="primary"/>
                </IconButton>
                <InputBase
                    sx={{flex: 1, fontSize: 12}}
                    placeholder={t('appBar.search_placeholder')}
                    inputProps={{'aria-label': 'search google maps'}}
                />
            </StyledPaper>
        </>
    )
}