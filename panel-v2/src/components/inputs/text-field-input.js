import React from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../contexts/LanguagesContext";
import { random_string } from "../../helpers/string";
import nested_object_onChange from "../../helpers/nestedObjectOnChange";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "&": {
    marginBottom: "15px",
  },
  "& .MuiButton-text": {
    padding: 0,
    justifyContent: "end",
    minWidth: "fit-content !important",
  },
  "& input:-internal-autofill-selected": {
    background: "transparent !important",
  },
}));

export default function TextFieldInput({
  value,
  name,

  onChange,
  text_field_label,
  errors,
  form,
  label,
  type = "text",
}) {
  // console.log(value);
  const { t } = useTranslation();
  return (
    <>
      <StyledTextField
        fullWidth
        error={errors && errors?.length > 0}
        helperText={errors && errors?.length > 0 ? errors[0] : undefined}
        // key={key || `form-${name}-${random_string()}`}
        // value={value}
        autoComplete="off"
        variant="outlined"
        label={t(label)}
        // dir={lang && languageConfigs[lang].dir}
        type={type}
        onChange={(event) => {
          const names = name.split(".");
          if (names?.length > 1) {
            console.log("console", names);
            event = nested_object_onChange(
              names,
              event.target.value,
              form,
              event
            );
            console.log("console", event);
          }
          if (onChange) {
            return onChange(event);
          }
          return event;
        }}
        name={name}
        defaultValue={value}
        InputProps={
          value?.length > 0
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() =>
                        onChange({ target: { name: name, value: "" } })
                      }
                    >
                      <CloseIcon />
                    </Button>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </>
  );
}
