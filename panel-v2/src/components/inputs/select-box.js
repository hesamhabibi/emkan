import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SelectBox({ label, name, value, onChange, options }) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl sx={{ marginBottom: "15px" }} fullWidth>
        <InputLabel id="select-box-label">{label}</InputLabel>
        <Select
          labelId="select-box-label"
          label="select-box"
          id="select-box"
          size="large"
          name={name}
        //   value={value}
        defaultValue={value}
          onChange={(e) => {
            if (onChange) {
              return onChange(e);
            }
            return e;
          }}
        >
          {options?.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {t(item.title)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
