import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {useHeaderComponentContext} from "../../../contexts/HeaderComponentContext";
import {Children, cloneElement, isValidElement, useEffect, useState} from "react";


const StyledSwipeableDrawer = styled(SwipeableDrawer)(({theme, drawerbleeding, type}) => ({
    '& .MuiBackdrop-root': {
        background: theme.palette.background.backdrop
    },
    '& .MuiPaper-root.MuiDrawer-paper': {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        margin: '0 1px',
        background: theme.palette.background.default,
        height: type ? `calc(30% - ${drawerbleeding}px)` : `calc(90% - ${drawerbleeding}px)`,
    }
}));

const StyledBox = styled(Box)(({theme, type}) => ({
    '&': {
        paddingTop: '10px',
        background: type && theme.palette.color.redAlert
    }
}));

const Puller = styled(Box)(({theme}) => ({
    width: 120,
    height: 6,
    background: theme.palette.background.backdrop,
    borderRadius: 3,
    position: 'absolute',
    top: 10,
    left: '50%',
    right: '50%',
    transform: 'translate(-50%, 50%) !important',

}));

export default function Index(props) {

    const {breadcrumbs} = useHeaderComponentContext();
    const {open, set_open, name, children, type, data} = props;
    const drawerbleeding = breadcrumbs.length > 0 ? 20 : 5;

    return (
        <>
            <StyledSwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => set_open(name, false)}
                onOpen={() => set_open(name, true)}
                swipeAreaWidth={drawerbleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                type={type}
                drawerbleeding={drawerbleeding}
            >
                <Box
                    sx={{
                        padding: (!type) && '0 10px 15px',
                        height: '100%',
                        overflow: 'auto',
                        marginTop:'25px',
                        marginBottom:'50px'
                    }}
                >
                    <StyledBox type={type}>
                        <Puller/>
                    </StyledBox>
                    {children && children}
                </Box>
            </StyledSwipeableDrawer>
        </>
    )
}
