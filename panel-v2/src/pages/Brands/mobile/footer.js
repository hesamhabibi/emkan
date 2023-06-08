import React from "react";
import {Box, Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import {useDialogContext} from "../../../contexts/DialogContext";
import routesName from "../../../constants/routes";
import ButtonCustom from "../../../components/buttons";


export default function Footer({active_filter}) {
    const {dialog_open_handler} = useDialogContext();

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
                {/*add button*/}
                <ButtonCustom
                    button_text={'common.add'}
                    iconButton={<AddIcon/>}
                    href={routesName["brands-management"]}
                    sx={{width: '100%'}}
                />

                <ButtonCustom
                    button_text={'common.filter'}
                    variant="outlined"
                    color_type={'info'}
                    startIcon={<SortSharpIcon/>}
                    onClick={() => {dialog_open_handler('filterRole', true)}}
                    sx={{width: '100%'}}
                    badgePulse={active_filter?.mobile}
                />
            </Box>
            <Divider sx={(theme) => ({margin: '0 15px', borderColor: theme.palette.background.item_background})}/>
        </>
    )
}