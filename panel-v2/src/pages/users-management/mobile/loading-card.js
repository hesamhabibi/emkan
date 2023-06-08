import {Card, Skeleton} from "@mui/material";
import React from "react";

export default function LoadingCard({
                                        user_management_layout_position
                                    }) {

    return (
        <>
            <Card
                sx={(theme) => ({
                    margin: '5px 0',
                    height: user_management_layout_position(),
                    position: 'relative',
                    width: '-webkit-fill-available',
                    background: theme.palette.background.paper,
                    borderRadius: '20px',
                    padding: '15px'
                })}
            >
                <Skeleton sx={{width: '100%', height: '50px',marginBottom:'5px'}}/>
                <Skeleton sx={{width: '100%', height: '50px',marginBottom:'5px'}}/>
                <Skeleton sx={{width: '100%', height: '50px',marginBottom:'5px'}}/>
                <Skeleton sx={{width: '100%', height: '50px',marginBottom:'5px'}}/>
                <Skeleton sx={{width: '100%', height: '50px',marginBottom:'5px'}}/>
            </Card>
        </>
    )
}