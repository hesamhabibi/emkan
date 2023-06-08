import React, {Children, cloneElement, isValidElement, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import {styled} from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({theme}) => ({
    '& .MuiPaper-root': {
        margin: 0,
        width: '400px',
        borderRadius: '15px'

    },
    '& #dialog-content': {
        background: theme.palette.background.default,
    }
}))

export default function Index(props) {
    const {open, set_open, name, children, type, data} = props;

    return (
        <StyledDialog
            open={open}
            onClose={() => set_open(name, false)}
            // onOpen={() => set_open(name, true)}
            type={type}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box
                id={'dialog-content'}
                sx={(theme) => ({
                    boxShadow: 10,
                })}>
                {children && children}
            </Box>

        </StyledDialog>
    );
}