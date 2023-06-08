import Styles from "./strengths.module.scss";
import Button from "@admin/Button";
import Popup from "@admin/Popup";
import { useContext, useEffect, useState } from "react";
import { TranslationContext } from "~/app/Context";
import { closePopup, openPopup } from "~/app/State/popups";
import { useDispatch } from "react-redux";
import Input from "@admin/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Strengths({
  field: { onChange, value },
  watch,
  values,
  // fieldState: { invalid, error, ...props },
}) {
  const translation = useContext(TranslationContext);
  const dispatch = useDispatch();
  const { control, getValues, reset } = useForm();

  const [disabled, setDisabled] = useState(false);

  const locale = useRouter().locale;

  const addStr = () => {
    if (value) {
      onChange([...value, getValues().text]);
    } else {
      onChange([getValues().text]);
    }
    dispatch(closePopup("add-strength"));
  };

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("add-strength")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: addStr,
    },
  ];

  const open = () => {
    reset({});
    dispatch(openPopup("add-strength"));
  };

  function deleteOption(key) {
    value.splice(key, 1);
    onChange([...value]);
  }

  useEffect(() => {
    const values1 = values();
    setDisabled(!!values1.main_features?.length);
  }, [watch("main_features")]);

  return (
    <>
      <Popup
        id="add-strength"
        actions={actions}
        status="info"
        className={Styles.popup}
        title={translation("Add Strength", "products")}
      >
        <Input
          control={control}
          gridSize={12}
          type="multi-language"
          name="text"
          label={translation("title")}
        />
      </Popup>
      <div className={Styles.container}>
        <Button
          disabled={disabled}
          type="success"
          className="w-100"
          onClick={open}
        >
          <i className="fas fa-plus-circle ml-1" />
          {translation("Add Strength", "products")}
        </Button>
        {(value || []).map((item, key) => (
          <li key={key} className="d-flex justify-content-between">
            {item[locale]}
            <i
              onClick={deleteOption.bind(null, key)}
              className="far fa-times-circle mr-2"
            />
          </li>
        ))}
      </div>
    </>
  );
}
