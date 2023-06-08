import React, {useState} from "react";
import {DateField} from "@mui/x-date-pickers/DateField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useTranslation} from "react-i18next";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useLanguageContext} from "../../contexts/LanguagesContext";
import {Button, InputAdornment} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {styled} from "@mui/material/styles";


function ButtonField(props) {
    const {
        set_open_date_picker,
        id,
        disabled,
        InputProps: {ref} = {},
        inputProps: {'aria-label': ariaLabel} = {},
    } = props;

    return (
        <Button
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            onClick={() => set_open_date_picker?.((prev) => !prev)}
        >
            <CalendarMonthIcon/>
        </Button>
    );
}

function ButtonDatePicker({name, value, onChange, slots = {}}) {
    const [open_date_picker, set_open_date_picker] = useState(false);
    const {t} = useTranslation();
    const {direction} = useLanguageContext()

    return (
        <DatePicker
            slots={{field: ButtonField, ...slots}}
            slotProps={{
                field: {set_open_date_picker},
                actionBar: {actions: ['clear', 'today']},
                textField: {fullWidth: true}
            }}
            onChange={(date, arg2) => {
                return onChange({target: {name: name, value: date}})
            }}
            value={value}
            open={open_date_picker}
            onClose={() => set_open_date_picker(false)}
            onOpen={() => set_open_date_picker(true)}
            components={{
                LeftArrowIcon: direction === 'rtl' ? KeyboardArrowRightIcon : KeyboardArrowLeftIcon,
                RightArrowIcon: direction === 'rtl' ? KeyboardArrowLeftIcon : KeyboardArrowRightIcon,
            }}
            localeText={{
                clearButtonLabel: t('common.clear_label'),
                todayButtonLabel: t('common.today_label')
            }}
        />
    );
}

export default function DatePickerComponent({
                                                label,
                                                value,
                                                onChange,
                                                name
                                            }) {


    const StyledDateField = styled(DateField)(({theme}) => ({
        '& .MuiButton-text': {
            padding: 0,
            justifyContent: 'end',
            minWidth: 'fit-content !important'
        }
    }));


    return (
        <>
            <StyledDateField
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={(date, arg2) => {
                    return onChange({target:{name,value: date}})
                }}
                InputProps={
                    value ?
                        {
                            endAdornment: (
                                <>
                                    <InputAdornment position="end">
                                        <Button
                                            sx={{mr: 1}}
                                            onClick={() => onChange({target: {name: name, value: null}})}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                        <ButtonDatePicker
                                            name={name}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    </InputAdornment>
                                </>
                            ),
                        }
                        :
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ButtonDatePicker
                                        name={name}
                                        value={value}
                                        onChange={onChange}
                                    />
                                </InputAdornment>
                            ),
                        }}
            />
        </>
    )
}