import React from "react";
import {Box, Divider} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import ButtonCustom from "../../../components/buttons";

const Footer = ({
                    submit_user,
                    edit_mode
                }) => {
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
                <ButtonCustom
                    button_text={edit_mode ?  'usersTable.edit_user_btn' : 'usersTable.create_user_btn'}
                    startIcon={edit_mode ? <EditIcon/> : <AddIcon/>}
                    onClick={() => submit_user()}
                    sx={{
                        width: '100%',
                    }}
                />

            </Box>
            <Divider sx={(theme) => ({margin: '0 15px', borderColor: theme.palette.background.item_background})}/>
        </>
    )
}
export default Footer