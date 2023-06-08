import React from 'react';
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import TextFieldInput from "../../../components/inputs/text-field-input";
import EditIcon from "@mui/icons-material/Edit";

const Index = ({
                   form,
                   write_form,
                   submit_role,
                   edit_mode
               }) => {

    const {t} = useTranslation();

    return (
        <>
            <form>
                <TextFieldInput
                    {...({
                        text_field_label: t('rolesTable.role_name'),
                        value: form?.name,
                        name: 'name',
                        onChange: write_form,
                        errors: form?.errors?.name
                    })}
                />

                {/*create role button*/}
                <Box sx={{textAlign: 'end', marginTop: 2}}>
                    <Button
                        startIcon={edit_mode ? <EditIcon/> : <AddIcon/>}
                        variant="contained"
                        color="primary"
                        sx={{color: 'white'}}
                        onClick={() => submit_role()}
                    >
                        {edit_mode ?
                            t('rolesTable.edit_role_btn')
                            :
                            t('rolesTable.create_role_btn')
                        }
                    </Button>
                </Box>
            </form>
        </>
    );
}
export default Index