import React from "react";
import {Box, Button, Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import {useTranslation} from "react-i18next";
import {useDialogContext} from "../../../contexts/DialogContext";
import routesName from "../../../constants/routes";
import Link from "@mui/material/Link";

// const ButtonComponent = () => {
//     throw Error("error!");
//     return <></>;
// };
export default function Footer() {
    const {t} = useTranslation();
    const {dialog_open_handler} = useDialogContext();
    //
    // const onClick = () => {
    //     try {
    //         throw Error("error!");
    //     } catch (e) {
    //         throw Error(e);
    //     }
    // }
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
                <Link
                    href={routesName["roles-management"]}
                    underline="none"
                    sx={(theme) => ({
                        width: '100%',
                        borderRadius: '15px',
                        padding: '6px 0',
                        background: theme.palette.background.default,
                        borderWidth:'1px',
                        borderStyle:'solid',
                        borderColor: theme.palette.primary.main,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:1,
                        fontFamily:'IRANSans-regular',
                        fontSize:'14px'
                    })}
                >
                    <AddIcon sx={{fontSize:14}}/>
                    {t('common.add')}
                </Link>

                {/*filter button*/}
                <Button
                    sx={(theme) => ({
                        width: '100%',
                        borderRadius: '15px',
                        padding: '6px 0',
                        color: theme.palette.background.blue_button,
                        borderColor: theme.palette.background.blue_button,
                        '&:active,&:focus,&:hover': {borderColor: theme.palette.background.blue_button,},
                        background: theme.palette.background.default
                    })}
                    variant="outlined"
                    startIcon={<SortSharpIcon/>}
                    onClick={() => {dialog_open_handler('filterRole', true)}}
                >
                    {t('common.filter')}
                </Button>
            </Box>
            <Divider sx={(theme) => ({margin: '0 15px', borderColor: theme.palette.background.item_background})}/>
        </>
    )
}