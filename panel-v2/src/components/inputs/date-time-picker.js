import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLanguageContext } from "../../contexts/LanguagesContext";
import { Button, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { styled } from "@mui/material/styles";
import { DateTimeField, DateTimePicker } from "@mui/x-date-pickers";

function ButtonField(props) {
  const {
    set_open_date_picker,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => set_open_date_picker?.((prev) => !prev)}
    >
      <CalendarMonthIcon />
    </Button>
  );
}

function ButtonDatePicker({ name, value, onChange, slots = {} }) {
  const [open_date_picker, set_open_date_picker] = useState(false);
  const { t } = useTranslation();
  const { direction } = useLanguageContext();

  return (
    <DateTimePicker
      slots={{ field: ButtonField, ...slots }}
      slotProps={{
        field: { set_open_date_picker },
        actionBar: { actions: ["clear", "today"] },
        textField: { fullWidth: true },
      }}
      onChange={(date, arg2) => {
        console.log("date", date, arg2);
        const _event = { target: { name: name, value: date } };
        // console.log(new Date(date).toLocaleString());
        if (onChange) {
          return onChange(_event);
        }
        return _event;
      }}
      value={value}
      open={open_date_picker}
      onClose={() => set_open_date_picker(false)}
      onOpen={() => set_open_date_picker(true)}
      components={{
        LeftArrowIcon:
          direction === "rtl" ? KeyboardArrowRightIcon : KeyboardArrowLeftIcon,
        RightArrowIcon:
          direction === "rtl" ? KeyboardArrowLeftIcon : KeyboardArrowRightIcon,
      }}
      localeText={{
        clearButtonLabel: t("common.clear_label"),
        todayButtonLabel: t("common.today_label"),
      }}
      views={["year", "month", "day", "hours", "minutes"]}
    />
  );
}

const StyledDateTimePicker = styled(DateTimeField)(({ theme }) => ({
  "&": {
    marginBottom: "15px",
  },
  "& .MuiButton-text": {
    padding: 0,
    justifyContent: "end",
    minWidth: "fit-content !important",
  },
}));

export default function DateTimePickerComponent({
  label,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <StyledDateTimePicker
        fullWidth
        format="HH:mm  y/MM/dd"
        label={label}
        name={name}
        value={value}
        onChange={(date) => {
          const _event = { target: { name, value: date } };
          console.log("---------------------date", date, _event);
          if (onChange) {
            return onChange(_event);
          }
          return _event;
        }}
        InputProps={
          value
            ? {
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <Button
                        sx={{ mr: 1 }}
                        onClick={() =>
                          onChange((e) => {
                            const _event = {
                              target: { name: name, value: null },
                            };
                            console.log("---------------------e", e, _event);
                            if (onChange) {
                              return onChange(_event);
                            }
                            return _event;
                          })
                        }
                      >
                        <CloseIcon />
                      </Button>
                      <ButtonDatePicker
                        name={name}
                        value={value}
                        onChange={(e) => {
                          console.log("---------------------e", e);

                          if (onChange) {
                            return onChange(e);
                          }
                          return e;
                        }}
                      />
                    </InputAdornment>
                  </>
                ),
              }
            : {
                endAdornment: (
                  <InputAdornment position="end">
                    <ButtonDatePicker
                      name={name}
                      value={value}
                      onChange={(e) => {
                        console.log("---------------------e", e);
                        if (onChange) {
                          return onChange(e);
                        }
                        return e;
                      }}
                    />
                  </InputAdornment>
                ),
              }
        }
      />
    </>
  );
}
