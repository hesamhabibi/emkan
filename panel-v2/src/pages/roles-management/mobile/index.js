import React, {useEffect} from 'react';
import {FormControl} from "@mui/material";
import {useTranslation} from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import Footer from "./footer";
import {useFooterComponentContext} from "../../../contexts/FooterComponentContext";

const Index = ({
                   form,
                   write_form,
                   submit_role,
                   edit_mode
               }) => {

    const {t} = useTranslation();
    const {set_footer_component} = useFooterComponentContext();

    useEffect(() => {
        set_footer_component(
            <Footer
                {...({
                    submit_role,
                    edit_mode
                })}
            />)
    }, [form])

    return (
        <FormControl
            sx={{
                margin: '15px 10px 0',
                height: 'calc(100vh - 210px)',
                position: 'relative',
                width: '-webkit-fill-available'
            }}
        >
            <TextFieldInput
                {...({
                    text_field_label: t('rolesTable.role_name'),
                    value: form?.name,
                    name: 'name',
                    onChange: write_form,
                    errors: form?.errors?.name
                })}
            />

        </FormControl>
    );
}

export default Index