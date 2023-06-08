import React from "react";
import Box from "@mui/material/Box";
import {Button, Divider, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import TextFieldInput from "../../../components/inputs/text-field-input";
import RefreshIcon from '@mui/icons-material/Refresh';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DateTimePickerComponent from "../../../components/inputs/date-time-picker";
import {useDialogContext} from "../../../contexts/DialogContext";
import SelectBox from "../../../components/inputs/select-box";
// import {rows_per_page_list} from "../../../constants/PaginationConfigs";
import {styled} from "@mui/material/styles";

const StylredBox = styled(Box)(({theme}) => ({
    '&': {
        position: 'fixed',
        bottom: 20,
        left: 0,
        right: 0,
        width: 'calc(100% - 20px)',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        background: theme.palette.background.default
    }
}))

export default function Filter({
                                   filter_form,
                                   write_form,
                                   clear_form,
                                   apply_filter,
                                   data_option,
                                   write_option_data
                               }) {
    const {t} = useTranslation();

    const {
        dialog_close_last_deep,
    } = useDialogContext();

    return (
        <Box sx={{padding: '10px'}}>

            <Divider
                textAlign="left"
                sx={{
                    mb: 2,
                    fontFamily: "IRANSans-Regular"
                }}
            >{t('common.filter')}
            </Divider>

            {/*filter title*/}
            <TextFieldInput
                {...({
                    text_field_label: t('common.title'),
                    value: filter_form?.name,
                    name: 'name',
                    onChange: write_form
                })}
            />

            {/*filter created date*/}
            <DateTimePickerComponent
                {...({
                    label: t('common.created_at'),
                    value: filter_form?.created_at,
                    name: 'created_at',
                    onChange: write_form,
                })}
            />

            {/*filter updated date*/}
            <DateTimePickerComponent
                {...({
                    label: t('common.updated_at'),
                    value: filter_form?.updated_at,
                    name: 'updated_at',
                    onChange: write_form,
                })}
            />
            <Divider
                textAlign="left"
                sx={{
                    mb: 2,
                    fontFamily: "IRANSans-Regular"
                }}
            >{t('common.sort')}
            </Divider>

            <SelectBox
                label={t('common.title')}
            />
            <SelectBox
                label={t('common.created_at')}
            />
            <SelectBox
                label={t('common.updated_at')}
            />

            <Divider
                textAlign="left"
                sx={{
                    mb: 2,
                    fontFamily: "IRANSans-Regular"
                }}
            >{t('pagination.row_per_page')}
            </Divider>

            <Select
                labelId="row-per-page-select-label"
                id="row-per-page-select-label"
                value={data_option?.per_page}
                onChange={(e) => write_option_data('per_page', e.target.value)}
                sx={{
                    fontSize: 13,
                    width: '100%',

                }}
            >
                {/* {
                    rows_per_page_list.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))
                } */}
            </Select>

            {/*filter buttons*/}
            <StylredBox>

                {/*filter reset button*/}
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon/>}
                    onClick={() => {
                        clear_form()
                        dialog_close_last_deep()
                    }}
                    sx={{
                        borderRadius: '20px !important',
                        width: '100%',
                        padding: '10px 16px',
                    }}
                >
                    {t('common.clear_label')}
                </Button>

                {/*filter operation button*/}
                <Button
                    variant="contained"
                    startIcon={<PlaylistAddCheckIcon/>}
                    onClick={() => {
                        apply_filter()
                        dialog_close_last_deep()
                    }}
                    sx={(theme) => ({
                        background: theme.palette.background.blue_button,
                        '&:hover,&:active,&:focus': {
                            background: theme.palette.background.blue_button,
                        },
                        color: theme?.palette?.color?.defaultFontContained,
                        borderRadius: '20px !important',
                        width: '100%',
                        padding: '10px 16px',
                    })}
                >
                    {t('common.apply')}
                </Button>

            </StylredBox>
        </Box>
    )
}