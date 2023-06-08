import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { generate_nested_object_with_keys } from "../../helpers/obj";
import nestedObjectOnChange from "../../helpers/nestedObjectOnChange";

const ToggleButtonCover = styled(Box)(({ theme }) => ({
  "& button:first-of-type": {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  "& button:last-of-type": {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export default function ToggleButtonComponent({
  items,
  onChange,
  name,
  value,
  label,
  form,
}) {
  const { t } = useTranslation();
  const [button_value, set_button_value] = useState(value);

  let event = {
    target: {
      name: name,
      value: value,
    },
  };

  const handle_click = (arg) => set_button_value(arg);

  useEffect(() => {
    event.target.value = button_value;
    const names = name.split(".");
    if (names?.length > 1) {
      event = nestedObjectOnChange(names, !value, form, event);
      //   const main_object_name = names[0];
      //   const other_names = names?.filter((item) => item !== main_object_name);
      //   event.target = {
      //     name: main_object_name,
      //     value: generate_nested_object_with_keys(
      //       form[main_object_name] || {},
      //       other_names,
      //       !value
      //     ),
      //   };
    } else {
      event.target = {
        name,
        value: !value,
      };
    }
    return onChange(event);
  }, [button_value]);

  return (
    <>
      <Box>
        {/*mode buttons title*/}
        <Typography sx={{ paddingBottom: "5px", paddingLeft: "5px" }}>
          {t(label)}
        </Typography>

        <ToggleButtonCover>
          {items?.map((item, key) => (
            <Button
              sx={{
                padding: "7px 10px",
                lineHeight: button_value === item?.value ? 1.75 : 1.65,
                width: "50%",
              }}
              key={key}
              variant={button_value === item?.value ? "contained" : "outlined"}
              onClick={() => handle_click(item.value)}
            >
              {item?.icon && <span>{item?.icon}</span>}
              {t(item?.title)}
            </Button>
          ))}
        </ToggleButtonCover>
      </Box>
    </>
  );
}
